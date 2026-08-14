-- ============================================================================
-- SKM SERVICES QATAR - PRODUCTION DATABASE SCHEMA
-- PostgreSQL with Supabase
-- ============================================================================

-- ============================================================================
-- 1. USERS TABLE (Authentication + Authorization)
-- ============================================================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  profile_image_url TEXT,
  role VARCHAR(50) NOT NULL CHECK (role IN ('super_admin', 'branch_admin', 'staff', 'technician', 'customer')),
  branch_id UUID,
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_branch_id ON users(branch_id);
CREATE INDEX idx_users_status ON users(status);

-- ============================================================================
-- 2. BRANCHES TABLE (Multi-branch support)
-- ============================================================================
CREATE TABLE IF NOT EXISTS branches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  logo_url TEXT,
  email VARCHAR(255),
  phone VARCHAR(20),
  address TEXT,
  city VARCHAR(100),
  country VARCHAR(100),
  postal_code VARCHAR(20),
  manager_id UUID,
  manager_name VARCHAR(255),
  timezone VARCHAR(50) DEFAULT 'Asia/Qatar',
  working_hours_start TIME DEFAULT '07:00:00',
  working_hours_end TIME DEFAULT '22:00:00',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (manager_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX idx_branches_name ON branches(name);
CREATE INDEX idx_branches_manager_id ON branches(manager_id);
CREATE INDEX idx_branches_manager_name ON branches(manager_name);
CREATE INDEX idx_branches_is_active ON branches(is_active);

-- ============================================================================
-- 3. STAFF TABLE (Technicians, Service Providers)
-- ============================================================================
CREATE TABLE IF NOT EXISTS staff (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  branch_id UUID NOT NULL,
  specializations TEXT[], -- Array of service specializations
  hourly_rate DECIMAL(10, 2),
  availability_status VARCHAR(50) DEFAULT 'available' CHECK (availability_status IN ('available', 'busy', 'on_leave', 'offline')),
  rating DECIMAL(3, 2) DEFAULT 0,
  total_jobs_completed INTEGER DEFAULT 0,
  bio TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE CASCADE
);

CREATE INDEX idx_staff_branch_id ON staff(branch_id);
CREATE INDEX idx_staff_availability_status ON staff(availability_status);
CREATE INDEX idx_staff_rating ON staff(rating);

-- ============================================================================
-- 4. CUSTOMERS TABLE (Mobile App Users)
-- ============================================================================
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  phone_verified BOOLEAN DEFAULT FALSE,
  email_verified BOOLEAN DEFAULT FALSE,
  address TEXT,
  city VARCHAR(100),
  country VARCHAR(100),
  postal_code VARCHAR(20),
  preferred_branch_id UUID,
  total_bookings INTEGER DEFAULT 0,
  total_spent DECIMAL(12, 2) DEFAULT 0,
  loyalty_points INTEGER DEFAULT 0,
  preferred_language VARCHAR(10) DEFAULT 'en',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (preferred_branch_id) REFERENCES branches(id) ON DELETE SET NULL
);

CREATE INDEX idx_customers_phone_verified ON customers(phone_verified);
CREATE INDEX idx_customers_email_verified ON customers(email_verified);
CREATE INDEX idx_customers_preferred_branch_id ON customers(preferred_branch_id);

-- ============================================================================
-- 5. SERVICES TABLE (Services offered by company)
-- ============================================================================
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT,
  category VARCHAR(100),
  base_price DECIMAL(10, 2) NOT NULL,
  estimated_duration_minutes INTEGER, -- How long service takes
  is_active BOOLEAN DEFAULT TRUE,
  requires_scheduling BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_services_is_active ON services(is_active);

-- ============================================================================
-- 6. BOOKINGS TABLE (Core business table - Customer requests)
-- ============================================================================
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_number VARCHAR(50) UNIQUE NOT NULL, -- Format: SKM-2024-001
  customer_id UUID NOT NULL,
  branch_id UUID NOT NULL,
  service_id UUID NOT NULL,
  assigned_staff_id UUID, -- Assigned technician
  
  -- Booking Details
  scheduled_date DATE NOT NULL,
  scheduled_time TIME NOT NULL,
  scheduled_datetime TIMESTAMP GENERATED ALWAYS AS (scheduled_date::timestamp + scheduled_time::interval) STORED,
  duration_minutes INTEGER,
  
  -- Location
  service_address TEXT NOT NULL,
  service_city VARCHAR(100),
  service_postal_code VARCHAR(20),
  
  -- Status Workflow
  status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (
    status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'postponed')
  ),
  cancellation_reason TEXT,
  
  -- Pricing
  base_price DECIMAL(10, 2),
  service_charge DECIMAL(10, 2) DEFAULT 0,
  tax DECIMAL(10, 2) DEFAULT 0,
  total_price DECIMAL(10, 2),
  discount DECIMAL(10, 2) DEFAULT 0,
  
  -- Notes
  customer_notes TEXT,
  staff_notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,
  
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
  FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE RESTRICT,
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE RESTRICT,
  FOREIGN KEY (assigned_staff_id) REFERENCES staff(id) ON DELETE SET NULL
);

CREATE INDEX idx_bookings_customer_id ON bookings(customer_id);
CREATE INDEX idx_bookings_branch_id ON bookings(branch_id);
CREATE INDEX idx_bookings_service_id ON bookings(service_id);
CREATE INDEX idx_bookings_assigned_staff_id ON bookings(assigned_staff_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_scheduled_datetime ON bookings(scheduled_datetime);
CREATE INDEX idx_bookings_booking_number ON bookings(booking_number);

-- ============================================================================
-- 7. PAYMENTS TABLE (Payment tracking)
-- ============================================================================
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL,
  customer_id UUID NOT NULL,
  
  -- Amount
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'QAR',
  
  -- Payment Method
  payment_method VARCHAR(50) CHECK (
    payment_method IN ('card', 'wallet', 'bank_transfer', 'cash', 'upi')
  ),
  
  -- Payment Status
  status VARCHAR(50) DEFAULT 'pending' CHECK (
    status IN ('pending', 'completed', 'failed', 'refunded', 'partial_refund')
  ),
  
  -- Gateway Info (if using payment gateway)
  transaction_id VARCHAR(255),
  payment_gateway VARCHAR(50), -- 'stripe', 'paypal', etc
  gateway_response JSON,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  paid_at TIMESTAMP,
  
  FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

CREATE INDEX idx_payments_booking_id ON payments(booking_id);
CREATE INDEX idx_payments_customer_id ON payments(customer_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_payment_method ON payments(payment_method);

-- ============================================================================
-- 8. REVIEWS TABLE (Customer feedback)
-- ============================================================================
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL UNIQUE,
  customer_id UUID NOT NULL,
  staff_id UUID,
  
  -- Rating
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  service_quality_rating INTEGER CHECK (service_quality_rating >= 1 AND service_quality_rating <= 5),
  punctuality_rating INTEGER CHECK (punctuality_rating >= 1 AND punctuality_rating <= 5),
  professionalism_rating INTEGER CHECK (professionalism_rating >= 1 AND professionalism_rating <= 5),
  
  -- Review Content
  title VARCHAR(255),
  comment TEXT,
  
  -- Admin Response
  admin_response TEXT,
  admin_response_at TIMESTAMP,
  
  -- Status
  status VARCHAR(50) DEFAULT 'published' CHECK (status IN ('pending', 'published', 'hidden')),
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
  FOREIGN KEY (staff_id) REFERENCES staff(id) ON DELETE SET NULL
);

CREATE INDEX idx_reviews_booking_id ON reviews(booking_id);
CREATE INDEX idx_reviews_customer_id ON reviews(customer_id);
CREATE INDEX idx_reviews_staff_id ON reviews(staff_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_reviews_status ON reviews(status);

-- ============================================================================
-- 9. SETTINGS TABLE (Global + Branch-level settings)
-- ============================================================================
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_type VARCHAR(50) NOT NULL CHECK (setting_type IN ('global', 'branch')),
  branch_id UUID, -- NULL for global settings
  
  -- General Settings
  business_name VARCHAR(255),
  business_email VARCHAR(255),
  support_phone VARCHAR(20),
  business_address TEXT,
  
  -- Appearance Settings
  theme VARCHAR(50) DEFAULT 'light',
  primary_color VARCHAR(7) DEFAULT '#0052cc',
  font_size VARCHAR(50) DEFAULT 'medium',
  border_radius VARCHAR(50) DEFAULT 'medium',
  logo_url TEXT,
  favicon_url TEXT,
  
  -- Booking Settings
  working_hours_start TIME,
  working_hours_end TIME,
  booking_buffer_minutes INTEGER DEFAULT 30,
  auto_assign_booking BOOLEAN DEFAULT FALSE,
  default_booking_status VARCHAR(50) DEFAULT 'pending',
  
  -- Payment Settings
  currency VARCHAR(10) DEFAULT 'QAR',
  tax_percentage DECIMAL(5, 2) DEFAULT 0,
  invoice_prefix VARCHAR(20) DEFAULT 'INV',
  wallet_enabled BOOLEAN DEFAULT TRUE,
  online_payments_enabled BOOLEAN DEFAULT TRUE,
  cash_payments_enabled BOOLEAN DEFAULT TRUE,
  
  -- Notification Settings
  email_notifications_enabled BOOLEAN DEFAULT TRUE,
  sms_notifications_enabled BOOLEAN DEFAULT TRUE,
  push_notifications_enabled BOOLEAN DEFAULT TRUE,
  booking_alerts_enabled BOOLEAN DEFAULT TRUE,
  payment_alerts_enabled BOOLEAN DEFAULT TRUE,
  review_alerts_enabled BOOLEAN DEFAULT TRUE,
  
  -- Other Settings
  timezone VARCHAR(50) DEFAULT 'Asia/Qatar',
  language VARCHAR(10) DEFAULT 'en',
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE CASCADE,
  UNIQUE(setting_type, branch_id)
);

CREATE INDEX idx_settings_setting_type ON settings(setting_type);
CREATE INDEX idx_settings_branch_id ON settings(branch_id);

-- ============================================================================
-- 10. NOTIFICATIONS TABLE (Future: User notifications)
-- ============================================================================
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  
  -- Notification Details
  title VARCHAR(255) NOT NULL,
  message TEXT,
  type VARCHAR(50) CHECK (type IN ('booking', 'payment', 'review', 'system', 'promotion')),
  
  -- Reference
  related_booking_id UUID,
  related_payment_id UUID,
  
  -- Status
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP,
  
  -- Delivery
  sent_via VARCHAR(50) CHECK (sent_via IN ('email', 'sms', 'push', 'in_app')),
  
  created_at TIMESTAMP DEFAULT NOW(),
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (related_booking_id) REFERENCES bookings(id) ON DELETE SET NULL,
  FOREIGN KEY (related_payment_id) REFERENCES payments(id) ON DELETE SET NULL
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_type ON notifications(type);

-- ============================================================================
-- 11. AUDIT LOG TABLE (Track all changes for security)
-- ============================================================================
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  action VARCHAR(100) NOT NULL, -- 'create', 'update', 'delete', 'login', etc
  table_name VARCHAR(100),
  record_id UUID,
  old_values JSON,
  new_values JSON,
  ip_address VARCHAR(50),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- ============================================================================
-- 12. ROW LEVEL SECURITY (Enforce access control)
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Booking Access: Customer can only see their own bookings
CREATE POLICY booking_customer_access ON bookings
  FOR SELECT
  USING (
    customer_id = (SELECT id FROM customers WHERE user_id = auth.uid())
    OR
    auth.uid() IN (SELECT id FROM users WHERE role = 'super_admin')
    OR
    (
      assigned_staff_id = (SELECT id FROM staff WHERE user_id = auth.uid())
    )
  );

-- Staff can see bookings assigned to them or their branch
CREATE POLICY booking_staff_access ON bookings
  FOR SELECT
  USING (
    assigned_staff_id = (SELECT id FROM staff WHERE user_id = auth.uid())
    OR
    branch_id = (SELECT branch_id FROM staff WHERE user_id = auth.uid())
    OR
    auth.uid() IN (SELECT id FROM users WHERE role = 'super_admin')
  );

-- ============================================================================
-- DATA: Insert default global settings
-- ============================================================================
INSERT INTO settings (setting_type, business_name, business_email, support_phone, theme, primary_color)
VALUES (
  'global',
  'SKM Services Qatar',
  'info@skm-services.qa',
  '+974-4100-2200',
  'light',
  '#0052cc'
)
ON CONFLICT DO NOTHING;

-- ============================================================================
-- VIEWS: Useful queries for analytics
-- ============================================================================

-- View: Booking Statistics
CREATE OR REPLACE VIEW vw_booking_stats AS
SELECT
  b.branch_id,
  br.name as branch_name,
  COUNT(*) as total_bookings,
  SUM(CASE WHEN b.status = 'completed' THEN 1 ELSE 0 END) as completed_bookings,
  SUM(CASE WHEN b.status = 'cancelled' THEN 1 ELSE 0 END) as cancelled_bookings,
  SUM(b.total_price) as total_revenue,
  AVG(r.rating) as avg_rating
FROM bookings b
LEFT JOIN branches br ON b.branch_id = br.id
LEFT JOIN reviews r ON b.id = r.booking_id
GROUP BY b.branch_id, br.name;

-- View: Staff Performance
CREATE OR REPLACE VIEW vw_staff_performance AS
SELECT
  s.id,
  u.full_name,
  s.branch_id,
  br.name as branch_name,
  s.total_jobs_completed,
  s.rating,
  COUNT(b.id) as completed_jobs_this_month,
  AVG(r.rating) as avg_rating_this_month
FROM staff s
LEFT JOIN users u ON s.user_id = u.id
LEFT JOIN branches br ON s.branch_id = br.id
LEFT JOIN bookings b ON s.id = b.assigned_staff_id AND b.status = 'completed' AND DATE_TRUNC('month', b.completed_at) = DATE_TRUNC('month', NOW())
LEFT JOIN reviews r ON b.id = r.booking_id AND DATE_TRUNC('month', r.created_at) = DATE_TRUNC('month', NOW())
GROUP BY s.id, u.full_name, s.branch_id, br.name, s.total_jobs_completed, s.rating;

-- ============================================================================
-- END OF SCHEMA
-- ============================================================================
