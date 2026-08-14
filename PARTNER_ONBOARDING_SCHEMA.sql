-- Partner Onboarding Schema
-- This adds the partner_applications table to track onboarding requests
-- Status: pending, approved, rejected

CREATE TABLE IF NOT EXISTS partner_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Business Information
  business_name VARCHAR(255) NOT NULL,
  manager_name VARCHAR(255), -- Branch manager name
  service_type VARCHAR(100) NOT NULL, -- 'laundry', 'home_cleaning', 'car_wash', 'spa_services', 'barber_services'
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  city VARCHAR(100) NOT NULL,
  business_address TEXT,
  website VARCHAR(255),
  
  -- Experience
  years_in_business INTEGER,
  
  -- Additional Information
  additional_info TEXT,
  
  -- Application Status
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  rejection_reason TEXT, -- If rejected, reason for rejection
  
  -- Branch Creation
  created_branch_id UUID REFERENCES branches(id) ON DELETE SET NULL,
  
  -- User Account Creation (upon approval)
  created_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  auto_generated_password VARCHAR(255), -- Temporary password sent to partner
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  approved_at TIMESTAMP,
  approved_by UUID REFERENCES users(id), -- Admin who approved
  
  -- Metadata
  ip_address VARCHAR(45),
  user_agent TEXT
);

-- Indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_partner_applications_status ON partner_applications(status);
CREATE INDEX IF NOT EXISTS idx_partner_applications_email ON partner_applications(email);
CREATE INDEX IF NOT EXISTS idx_partner_applications_created_at ON partner_applications(created_at);
CREATE INDEX IF NOT EXISTS idx_partner_applications_service_type ON partner_applications(service_type);
CREATE INDEX IF NOT EXISTS idx_partner_applications_manager_name ON partner_applications(manager_name);

-- Enable RLS (Row Level Security)
ALTER TABLE partner_applications ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Allow anyone to create (insert) applications
CREATE POLICY "allow_create_application" ON partner_applications
  FOR INSERT
  WITH CHECK (true);

-- Allow all authenticated users to read applications
CREATE POLICY "allow_read_applications" ON partner_applications
  FOR SELECT
  USING (true);

-- Allow all authenticated users to update applications
CREATE POLICY "allow_update_applications" ON partner_applications
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Create index for auto_generated_password lookup (for temporary login)
CREATE INDEX IF NOT EXISTS idx_partner_applications_password ON partner_applications(auto_generated_password);

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_partner_applications_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_partner_applications_timestamp_trigger
BEFORE UPDATE ON partner_applications
FOR EACH ROW
EXECUTE FUNCTION update_partner_applications_timestamp();
