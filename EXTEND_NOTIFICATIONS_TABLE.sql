-- Add branch_email and branch_id columns to notifications table
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS branch_email TEXT;
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS branch_id TEXT;
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS booking_id TEXT;
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS booking_number TEXT;
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS metadata JSONB;

-- Create index for branch_id queries
CREATE INDEX IF NOT EXISTS idx_notifications_branch_id ON notifications(branch_id);
CREATE INDEX IF NOT EXISTS idx_notifications_booking_id ON notifications(booking_id);

-- Update type constraint to include new notification types
-- (This depends on whether you use CHECK constraints or just store text)
