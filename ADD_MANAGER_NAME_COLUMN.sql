-- Migration: Add manager_name column to partner_applications table
-- This migration adds the manager name field to track branch manager during application

ALTER TABLE partner_applications
ADD COLUMN manager_name VARCHAR(255);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_partner_applications_manager_name ON partner_applications(manager_name);

-- Comment for documentation
COMMENT ON COLUMN partner_applications.manager_name IS 'Name of the branch manager/partner representative';
