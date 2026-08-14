-- ============================================================================
-- BRANCH DASHBOARD SCHEMA MIGRATION
-- PostgreSQL with Supabase
-- This migration adds tables required for Branch Dashboard functionality
-- ============================================================================

-- ============================================================================
-- 1. CREATE DRIVERS TABLE (For Driver App + Branch Management)
-- ============================================================================
CREATE TABLE IF NOT EXISTS drivers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  branch_id UUID NOT NULL,
  
  -- Driver Info
  vehicle_type VARCHAR(100), -- 'car', 'van', 'truck', etc
  vehicle_registration VARCHAR(50),
  license_number VARCHAR(100),
  license_expiry_date DATE,
  photo_url TEXT, -- Supabase Storage URL
  
  -- Status
  availability_status VARCHAR(50) DEFAULT 'available' 
    CHECK (availability_status IN ('available', 'busy', 'on_leave', 'offline')),
  
  -- Assignment
  current_booking_id UUID,
  
  -- Metadata
  total_deliveries INTEGER DEFAULT 0,
  rating DECIMAL(3, 2) DEFAULT 0,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE CASCADE,
  FOREIGN KEY (current_booking_id) REFERENCES bookings(id) ON DELETE SET NULL
);

CREATE INDEX idx_drivers_branch_id ON drivers(branch_id);
CREATE INDEX idx_drivers_availability_status ON drivers(availability_status);
CREATE INDEX idx_drivers_user_id ON drivers(user_id);

-- Enable RLS on drivers table
ALTER TABLE drivers ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Branch admins can see drivers in their branch
CREATE POLICY driver_branch_access ON drivers
  FOR SELECT
  USING (
    branch_id = (SELECT branch_id FROM users WHERE id = auth.uid())
    OR
    auth.uid() IN (SELECT id FROM users WHERE role = 'super_admin')
  );

-- ============================================================================
-- 2. CREATE BRANCH_SERVICES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS branch_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id UUID NOT NULL,
  service_id UUID NOT NULL,
  
  -- Branch-specific customization
  custom_price DECIMAL(10, 2), -- Override base price if needed
  is_available BOOLEAN DEFAULT TRUE,
  availability_description TEXT,
  custom_image_url TEXT, -- Branch-specific image stored in Supabase
  
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE CASCADE,
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
  UNIQUE(branch_id, service_id)
);

CREATE INDEX idx_branch_services_branch_id ON branch_services(branch_id);
CREATE INDEX idx_branch_services_service_id ON branch_services(service_id);
CREATE INDEX idx_branch_services_is_available ON branch_services(is_available);

-- Enable RLS on branch_services table
ALTER TABLE branch_services ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Branch admins can see services for their branch
CREATE POLICY branch_services_access ON branch_services
  FOR SELECT
  USING (
    branch_id = (SELECT branch_id FROM users WHERE id = auth.uid())
    OR
    auth.uid() IN (SELECT id FROM users WHERE role = 'super_admin')
  );

-- ============================================================================
-- 3. CREATE BRANCH_SETTLEMENTS TABLE (For Payment Tracking)
-- ============================================================================
CREATE TABLE IF NOT EXISTS branch_settlements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id UUID NOT NULL,
  
  -- Settlement Period
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  
  -- Financial Data
  total_earnings DECIMAL(12, 2) DEFAULT 0,
  commission_percentage DECIMAL(5, 2) DEFAULT 0,
  commission_amount DECIMAL(12, 2) DEFAULT 0,
  net_settlement DECIMAL(12, 2) DEFAULT 0,
  
  -- Status
  status VARCHAR(50) DEFAULT 'pending' 
    CHECK (status IN ('pending', 'approved', 'paid', 'disputed')),
  
  -- Payment Details
  payment_date DATE,
  payment_method VARCHAR(50),
  payment_reference VARCHAR(255),
  notes TEXT,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE CASCADE
);

CREATE INDEX idx_branch_settlements_branch_id ON branch_settlements(branch_id);
CREATE INDEX idx_branch_settlements_status ON branch_settlements(status);
CREATE INDEX idx_branch_settlements_period ON branch_settlements(period_start, period_end);

-- Enable RLS on branch_settlements table
ALTER TABLE branch_settlements ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Branch admins can see settlements for their branch
CREATE POLICY branch_settlements_access ON branch_settlements
  FOR SELECT
  USING (
    branch_id = (SELECT branch_id FROM users WHERE id = auth.uid())
    OR
    auth.uid() IN (SELECT id FROM users WHERE role = 'super_admin')
  );

-- ============================================================================
-- 4. MODIFY EXISTING TABLES
-- ============================================================================

-- Add assigned_driver_id to bookings table
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS assigned_driver_id UUID REFERENCES drivers(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_bookings_assigned_driver_id ON bookings(assigned_driver_id);

-- Add photo_url to staff table if not exists
ALTER TABLE staff ADD COLUMN IF NOT EXISTS photo_url TEXT;

-- ============================================================================
-- 5. UPDATE ROW LEVEL SECURITY POLICIES
-- ============================================================================

-- Branch Admins can see bookings assigned to their branch
CREATE POLICY booking_branch_admin_access ON bookings
  FOR SELECT
  USING (
    branch_id = (SELECT branch_id FROM users WHERE id = auth.uid())
    OR
    auth.uid() IN (SELECT id FROM users WHERE role = 'super_admin')
  );

-- Branch Admins can update bookings in their branch
CREATE POLICY booking_branch_admin_update ON bookings
  FOR UPDATE
  USING (
    branch_id = (SELECT branch_id FROM users WHERE id = auth.uid())
    OR
    auth.uid() IN (SELECT id FROM users WHERE role = 'super_admin')
  );

-- Staff can see their branch's staff list
CREATE POLICY staff_branch_access ON staff
  FOR SELECT
  USING (
    branch_id = (SELECT branch_id FROM users WHERE id = auth.uid())
    OR
    auth.uid() IN (SELECT id FROM users WHERE role = 'super_admin')
  );

-- ============================================================================
-- 6. CREATE VIEWS FOR BRANCH DASHBOARD
-- ============================================================================

-- View: Branch Dashboard Statistics
CREATE OR REPLACE VIEW vw_branch_dashboard_stats AS
SELECT
  b.id as branch_id,
  b.name as branch_name,
  COUNT(DISTINCT bookings.id) as total_bookings,
  COUNT(DISTINCT CASE WHEN bookings.status = 'pending' THEN bookings.id END) as pending_bookings,
  COUNT(DISTINCT CASE WHEN bookings.status = 'in_progress' THEN bookings.id END) as in_progress_bookings,
  COUNT(DISTINCT CASE WHEN bookings.status = 'completed' THEN bookings.id END) as completed_bookings,
  SUM(CASE WHEN bookings.status = 'completed' THEN bookings.total_price ELSE 0 END) as total_revenue,
  COUNT(DISTINCT CASE WHEN s.availability_status = 'available' THEN s.id END) as active_workers,
  COUNT(DISTINCT CASE WHEN d.availability_status = 'available' THEN d.id END) as active_drivers,
  COUNT(DISTINCT CASE WHEN DATE(bookings.scheduled_date) = CURRENT_DATE THEN bookings.id END) as todays_bookings
FROM branches b
LEFT JOIN bookings ON b.id = bookings.branch_id
LEFT JOIN staff s ON b.id = s.branch_id
LEFT JOIN drivers d ON b.id = d.branch_id
WHERE b.is_active = TRUE
GROUP BY b.id, b.name;

-- View: Branch Recent Bookings
CREATE OR REPLACE VIEW vw_branch_recent_bookings AS
SELECT
  b.id,
  b.booking_number,
  b.branch_id,
  b.status,
  b.scheduled_datetime,
  b.service_address,
  b.total_price,
  c.user_id as customer_user_id,
  u.full_name as customer_name,
  u.phone as customer_phone,
  s.name as service_name
FROM bookings b
LEFT JOIN customers c ON b.customer_id = c.id
LEFT JOIN users u ON c.user_id = u.id
LEFT JOIN services s ON b.service_id = s.id
ORDER BY b.created_at DESC
LIMIT 10;

-- ============================================================================
-- 7. STORED PROCEDURES (Future Use)
-- ============================================================================

-- Procedure: Calculate Branch Settlement
CREATE OR REPLACE FUNCTION calculate_branch_settlement(
  p_branch_id UUID,
  p_period_start DATE,
  p_period_end DATE
)
RETURNS TABLE (
  total_revenue DECIMAL,
  commission_percentage DECIMAL,
  commission_amount DECIMAL,
  net_settlement DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COALESCE(SUM(b.total_price), 0)::DECIMAL as total_revenue,
    COALESCE(s.commission_percentage, 10)::DECIMAL,
    COALESCE(SUM(b.total_price) * s.commission_percentage / 100, 0)::DECIMAL as commission_amount,
    COALESCE(SUM(b.total_price) - (SUM(b.total_price) * s.commission_percentage / 100), 0)::DECIMAL as net_settlement
  FROM bookings b
  LEFT JOIN settings s ON s.branch_id = p_branch_id
  WHERE b.branch_id = p_branch_id
    AND b.status = 'completed'
    AND DATE(b.completed_at) >= p_period_start
    AND DATE(b.completed_at) <= p_period_end;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- 8. TRIGGERS FOR AUTOMATIC TIMESTAMPS
-- ============================================================================

CREATE OR REPLACE FUNCTION update_drivers_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_drivers_timestamp_trigger
BEFORE UPDATE ON drivers
FOR EACH ROW
EXECUTE FUNCTION update_drivers_timestamp();

CREATE OR REPLACE FUNCTION update_branch_services_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_branch_services_timestamp_trigger
BEFORE UPDATE ON branch_services
FOR EACH ROW
EXECUTE FUNCTION update_branch_services_timestamp();

CREATE OR REPLACE FUNCTION update_branch_settlements_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_branch_settlements_timestamp_trigger
BEFORE UPDATE ON branch_settlements
FOR EACH ROW
EXECUTE FUNCTION update_branch_settlements_timestamp();

-- ============================================================================
-- 9. SAMPLE DATA (Optional - for testing)
-- ============================================================================

-- Note: Only uncomment if you want to populate test data
-- This assumes a branch and service already exist

/*
-- Insert sample services if needed
INSERT INTO branch_services (branch_id, service_id, is_available)
SELECT b.id, s.id, true
FROM branches b
CROSS JOIN services s
WHERE b.is_active = TRUE
LIMIT 5
ON CONFLICT (branch_id, service_id) DO NOTHING;
*/

-- ============================================================================
-- 10. VERIFICATION QUERIES (Run after migration)
-- ============================================================================

-- Verify tables exist
-- SELECT tablename FROM pg_tables WHERE tablename IN ('drivers', 'branch_services', 'branch_settlements');

-- Verify columns added
-- SELECT column_name FROM information_schema.columns WHERE table_name = 'bookings' AND column_name = 'assigned_driver_id';
-- SELECT column_name FROM information_schema.columns WHERE table_name = 'staff' AND column_name = 'photo_url';

-- Verify RLS is enabled
-- SELECT tablename FROM pg_tables WHERE tablename IN ('drivers', 'branch_services', 'branch_settlements') AND schemaname = 'public';

-- ============================================================================
-- END OF MIGRATION
-- ============================================================================

