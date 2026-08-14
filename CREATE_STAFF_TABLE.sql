-- ============================================================================
-- STAFF TABLE MIGRATION
-- ============================================================================

-- 1. CREATE BRANCH_STAFF TABLE
CREATE TABLE IF NOT EXISTS branch_staff (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  branch_id UUID NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(255),
  specialization VARCHAR(255),
  status VARCHAR(50) DEFAULT 'active' 
    CHECK (status IN ('active', 'inactive')),
  photo_url TEXT,
  rating DECIMAL(3, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE CASCADE
);

CREATE INDEX idx_branch_staff_branch_id ON branch_staff(branch_id);
CREATE INDEX idx_branch_staff_status ON branch_staff(status);
ALTER TABLE branch_staff ENABLE ROW LEVEL SECURITY;

-- 2. INSERT DEFAULT STAFF MEMBERS (optional, can be removed)
INSERT INTO branch_staff (branch_id, name, role, phone, email, specialization, status, rating) 
SELECT 
  id,
  'Ahmed Hassan',
  'Cleaner',
  '+974-1234-5678',
  'ahmed@email.com',
  'Home Cleaning',
  'active',
  4.8
FROM branches
WHERE name ILIKE '%vaibhav%'
LIMIT 1
ON CONFLICT DO NOTHING;

-- 3. CREATE TRIGGERS FOR TIMESTAMPS
CREATE OR REPLACE FUNCTION update_branch_staff_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_branch_staff_timestamp_trigger ON branch_staff;
CREATE TRIGGER update_branch_staff_timestamp_trigger
BEFORE UPDATE ON branch_staff
FOR EACH ROW
EXECUTE FUNCTION update_branch_staff_timestamp();

-- 4. ADD RLS POLICIES
CREATE POLICY "allow_read_branch_staff" ON branch_staff
  FOR SELECT
  USING (true);

CREATE POLICY "allow_insert_branch_staff" ON branch_staff
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "allow_update_branch_staff" ON branch_staff
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "allow_delete_branch_staff" ON branch_staff
  FOR DELETE
  USING (true);

-- Done! ✅
