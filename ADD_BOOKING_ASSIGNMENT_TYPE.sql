-- ============================================================================
-- ADD BOOKING_ASSIGNMENT TYPE TO NOTIFICATIONS TABLE
-- ============================================================================
-- The notifications table has a CHECK constraint on the 'type' column
-- that only allows specific values. There are rows with invalid types that
-- need to be deleted first, then we can add the new constraint.

-- First, delete any rows with invalid type values (not in the allowed list)
DELETE FROM notifications 
WHERE type NOT IN ('setting_change', 'become_partner', 'booking_cancelled', 'work_assignment', 'booking_assignment');

-- Drop the old constraint
ALTER TABLE notifications DROP CONSTRAINT notifications_type_check;

-- Add new constraint with booking_assignment type
ALTER TABLE notifications 
ADD CONSTRAINT notifications_type_check 
CHECK (type IN ('setting_change', 'become_partner', 'booking_cancelled', 'work_assignment', 'booking_assignment'));

-- Done! Now booking_assignment notifications can be created
