-- ============================================================================
-- DRIVERS TABLE MIGRATION
-- ============================================================================

-- 1. CREATE BRANCH_DRIVERS TABLE
CREATE TABLE IF NOT EXISTS branch_drivers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  vehicle_type VARCHAR(100) NOT NULL,
  vehicle_registration VARCHAR(50),
  license_number VARCHAR(100),
  status VARCHAR(50) DEFAULT 'available' 
    CHECK (status IN ('available', 'on_duty', 'off_duty')),
  photo_url TEXT,
  rating DECIMAL(3, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE CASCADE
);

CREATE INDEX idx_branch_drivers_branch_id ON branch_drivers(branch_id);
CREATE INDEX idx_branch_drivers_status ON branch_drivers(status);
ALTER TABLE branch_drivers ENABLE ROW LEVEL SECURITY;

-- 2. CREATE TRIGGERS FOR TIMESTAMPS
CREATE OR REPLACE FUNCTION update_branch_drivers_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_branch_drivers_timestamp_trigger ON branch_drivers;
CREATE TRIGGER update_branch_drivers_timestamp_trigger
BEFORE UPDATE ON branch_drivers
FOR EACH ROW
EXECUTE FUNCTION update_branch_drivers_timestamp();

-- 3. ADD RLS POLICIES
CREATE POLICY "allow_read_branch_drivers" ON branch_drivers
  FOR SELECT
  USING (true);

CREATE POLICY "allow_insert_branch_drivers" ON branch_drivers
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "allow_update_branch_drivers" ON branch_drivers
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "allow_delete_branch_drivers" ON branch_drivers
  FOR DELETE
  USING (true);

-- Done! ✅
