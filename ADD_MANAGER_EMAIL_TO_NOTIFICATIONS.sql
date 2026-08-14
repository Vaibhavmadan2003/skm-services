-- Add manager_email column to notifications table
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS manager_email TEXT;

-- Create index for faster queries by manager_email
CREATE INDEX IF NOT EXISTS idx_notifications_manager_email ON notifications(manager_email);
CREATE INDEX IF NOT EXISTS idx_notifications_manager_email_type ON notifications(manager_email, type);

-- Grant permissions
GRANT SELECT, UPDATE ON notifications TO authenticated;
GRANT INSERT, SELECT, UPDATE ON notifications TO service_role;
