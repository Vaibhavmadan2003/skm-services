-- Add admin_id column if it doesn't exist
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS admin_id TEXT NOT NULL DEFAULT 'admin@skm.com';

-- Add other missing columns if they don't exist
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'setting_change';
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS is_read BOOLEAN DEFAULT FALSE;
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_notifications_admin_id ON notifications(admin_id);
CREATE INDEX IF NOT EXISTS idx_notifications_admin_is_read ON notifications(admin_id, is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);

-- Enable RLS if not already enabled
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist and recreate them
DROP POLICY IF EXISTS "notifications_admin_read" ON notifications;
DROP POLICY IF EXISTS "notifications_insert_service_role" ON notifications;
DROP POLICY IF EXISTS "notifications_admin_update" ON notifications;

-- Policy to allow super admin to read their own notifications
CREATE POLICY "notifications_admin_read" ON notifications
  FOR SELECT
  USING (admin_id = current_setting('jwt.claims.email', true));

-- Policy to allow service role to insert notifications
CREATE POLICY "notifications_insert_service_role" ON notifications
  FOR INSERT
  WITH CHECK (true);

-- Policy to allow super admin to update their own notifications
CREATE POLICY "notifications_admin_update" ON notifications
  FOR UPDATE
  USING (admin_id = current_setting('jwt.claims.email', true))
  WITH CHECK (admin_id = current_setting('jwt.claims.email', true));

-- Grant permissions
GRANT SELECT, UPDATE ON notifications TO authenticated;
GRANT INSERT, SELECT, UPDATE ON notifications TO service_role;
