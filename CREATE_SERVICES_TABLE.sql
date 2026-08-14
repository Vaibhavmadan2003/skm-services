-- ============================================================================
-- SERVICES TABLES MIGRATION
-- ============================================================================

-- 1. CREATE SERVICES TABLE (Global services catalog)
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  default_price DECIMAL(10, 2) NOT NULL,
  default_duration VARCHAR(50),
  icon_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_services_category ON services(category);
CREATE INDEX idx_services_is_active ON services(is_active);
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- 2. INSERT DEFAULT SERVICES
INSERT INTO services (name, category, default_price, default_duration) VALUES
  ('Home Cleaning', 'Cleaning', 69, '2-3 hours'),
  ('Deep Cleaning', 'Cleaning', 120, '4-5 hours'),
  ('Laundry', 'Laundry', 30, '1-2 hours'),
  ('Ironing', 'Laundry', 45, '1-2 hours'),
  ('Plumbing Repair', 'Maintenance', 85, '1-2 hours'),
  ('Electrical Work', 'Maintenance', 120, '2-3 hours')
ON CONFLICT DO NOTHING;

-- 3. CREATE BRANCH_SERVICES TABLE (Branch-specific service offerings)
CREATE TABLE IF NOT EXISTS branch_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id UUID NOT NULL,
  service_id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  duration VARCHAR(50) NOT NULL,
  availability VARCHAR(50) DEFAULT 'available' 
    CHECK (availability IN ('available', 'unavailable')),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE CASCADE,
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE,
  UNIQUE(branch_id, service_id)
);

CREATE INDEX idx_branch_services_branch_id ON branch_services(branch_id);
CREATE INDEX idx_branch_services_service_id ON branch_services(service_id);
CREATE INDEX idx_branch_services_availability ON branch_services(availability);
ALTER TABLE branch_services ENABLE ROW LEVEL SECURITY;

-- 4. CREATE TRIGGERS FOR TIMESTAMPS
CREATE OR REPLACE FUNCTION update_services_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_services_timestamp_trigger ON services;
CREATE TRIGGER update_services_timestamp_trigger
BEFORE UPDATE ON services
FOR EACH ROW
EXECUTE FUNCTION update_services_timestamp();

CREATE OR REPLACE FUNCTION update_branch_services_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_branch_services_timestamp_trigger ON branch_services;
CREATE TRIGGER update_branch_services_timestamp_trigger
BEFORE UPDATE ON branch_services
FOR EACH ROW
EXECUTE FUNCTION update_branch_services_timestamp();

-- Done! ✅
