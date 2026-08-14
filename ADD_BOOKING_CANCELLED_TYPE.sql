-- Add 'booking_cancelled' and 'booking_assignment' to notifications type constraint

ALTER TABLE notifications DROP CONSTRAINT IF EXISTS notifications_type_check;

ALTER TABLE notifications ADD CONSTRAINT notifications_type_check 
  CHECK (type IN ('setting_change', 'suspended', 'deleted', 'work_assignment', 'application_received', 'booking_assignment', 'booking_cancelled'));

-- Create index for booking_cancelled queries if not exists
CREATE INDEX IF NOT EXISTS idx_notifications_type_booking_cancelled ON notifications(type) WHERE type = 'booking_cancelled';
