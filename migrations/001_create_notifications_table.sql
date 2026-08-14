-- Create notifications table for branch setting change notifications
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id TEXT NOT NULL,
  branch_id UUID NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'setting_change',
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT fk_branch FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE CASCADE
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_notifications_admin_id ON notifications(admin_id);
CREATE INDEX IF NOT EXISTS idx_notifications_admin_is_read ON notifications(admin_id, is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);

-- Enable RLS
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Policy to allow super admin to read their own notifications
CREATE POLICY IF NOT EXISTS "notifications_admin_read" ON notifications
  FOR SELECT
  USING (admin_id = current_setting('jwt.claims.email', true));

-- Policy to allow service role to insert notifications
CREATE POLICY IF NOT EXISTS "notifications_insert_service_role" ON notifications
  FOR INSERT
  WITH CHECK (true);

-- Policy to allow super admin to update their own notifications
CREATE POLICY IF NOT EXISTS "notifications_admin_update" ON notifications
  FOR UPDATE
  USING (admin_id = current_setting('jwt.claims.email', true))
  WITH CHECK (admin_id = current_setting('jwt.claims.email', true));

-- Grant permissions
GRANT SELECT, UPDATE ON notifications TO authenticated;
GRANT INSERT, SELECT, UPDATE ON notifications TO service_role;
