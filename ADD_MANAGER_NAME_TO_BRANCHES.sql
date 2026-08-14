-- Migration: Add manager_name column to branches table
-- This migration adds the manager name field to track branch manager

ALTER TABLE branches
ADD COLUMN manager_name VARCHAR(255);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_branches_manager_name ON branches(manager_name);

-- Comment for documentation
COMMENT ON COLUMN branches.manager_name IS 'Name of the branch manager';
