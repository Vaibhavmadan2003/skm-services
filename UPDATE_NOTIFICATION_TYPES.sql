-- Update notifications table to support new notification types
-- This migration adds support for 'suspended', 'deleted', and 'work_assignment' types

-- Drop existing constraint if it exists
ALTER TABLE notifications DROP CONSTRAINT IF EXISTS notifications_type_check;

-- Add new constraint with all supported types including application_received
ALTER TABLE notifications DROP CONSTRAINT IF EXISTS notifications_type_check;
ALTER TABLE notifications ADD CONSTRAINT notifications_type_check 
  CHECK (type IN ('setting_change', 'suspended', 'deleted', 'work_assignment', 'application_received'));

-- Ensure branch_id column allows NULL (for super admin notifications)
ALTER TABLE notifications ALTER COLUMN branch_id DROP NOT NULL;

-- Done! ✅
ALTER TABLE notifications ALTER COLUMN branch_id DROP NOT NULL;

-- Add missing columns if they don't exist
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS branch_email TEXT;
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS booking_id TEXT;
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS booking_number TEXT;
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS metadata JSONB;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_notifications_branch_id ON notifications(branch_id);
CREATE INDEX IF NOT EXISTS idx_notifications_booking_id ON notifications(booking_id);
CREATE INDEX IF NOT EXISTS idx_notifications_type ON notifications(type);

-- Update RLS policies to support branch_id filtering
DROP POLICY IF EXISTS "branch_notifications_read" ON notifications;

CREATE POLICY "branch_notifications_read" ON notifications
  FOR SELECT
  USING (branch_id = current_setting('jwt.claims.sub', true)::uuid OR admin_id = current_setting('jwt.claims.email', true));
