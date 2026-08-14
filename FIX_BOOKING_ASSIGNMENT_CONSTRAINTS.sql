-- ============================================================================
-- FIX BOOKING ASSIGNMENT CONSTRAINTS
-- Add 'assigned' and 'accepted' statuses to bookings table
-- Add 'booking_assignment' type to notifications table
-- ============================================================================

-- Step 1: Drop the old CHECK constraint on notifications.type FIRST
ALTER TABLE notifications
DROP CONSTRAINT notifications_type_check;

-- Step 2: Fix invalid notification types
-- Convert any invalid types to 'system' (safe default)
UPDATE notifications
SET type = 'system'
WHERE type NOT IN ('booking', 'payment', 'review', 'system', 'promotion', 'booking_assignment');

-- Step 3: Add new CHECK constraint with booking_assignment type
ALTER TABLE notifications
ADD CONSTRAINT notifications_type_check CHECK (
  type IN ('booking', 'payment', 'review', 'system', 'promotion', 'booking_assignment')
);

-- Step 4: Drop the old CHECK constraint on bookings.status
ALTER TABLE bookings
DROP CONSTRAINT bookings_status_check;

-- Step 5: Add new CHECK constraint with additional statuses
ALTER TABLE bookings
ADD CONSTRAINT bookings_status_check CHECK (
  status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'postponed', 'assigned', 'accepted')
);

-- ============================================================================
-- VERIFICATION
-- ============================================================================
-- To verify, run these queries:
-- SELECT constraint_name FROM information_schema.table_constraints WHERE table_name = 'bookings' AND constraint_type = 'CHECK';
-- SELECT constraint_name FROM information_schema.table_constraints WHERE table_name = 'notifications' AND constraint_type = 'CHECK';
