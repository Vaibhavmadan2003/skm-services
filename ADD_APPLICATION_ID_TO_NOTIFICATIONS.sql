-- Add application_id column to notifications table to track partner applications
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS application_id UUID;

-- Make branch_id nullable since applications don't have branches initially
ALTER TABLE notifications ALTER COLUMN branch_id DROP NOT NULL;

-- Create index for faster application notification lookups
CREATE INDEX IF NOT EXISTS idx_notifications_application_id ON notifications(application_id);
CREATE INDEX IF NOT EXISTS idx_notifications_admin_application ON notifications(admin_id, application_id);

-- Done! ✅
