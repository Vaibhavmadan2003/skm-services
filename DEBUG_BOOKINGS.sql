-- Debug: Check bookings with 'assigned' or 'accepted' status
SELECT 
  id,
  booking_number,
  branch_id,
  status,
  created_at,
  updated_at
FROM bookings
WHERE status IN ('assigned', 'accepted')
ORDER BY updated_at DESC
LIMIT 20;

-- Debug: Check if any bookings have branch_id set
SELECT 
  id,
  booking_number,
  branch_id,
  status,
  created_at
FROM bookings
WHERE branch_id IS NOT NULL
ORDER BY updated_at DESC
LIMIT 20;

-- Debug: Check branch table to see which branches exist
SELECT id, name FROM branches LIMIT 10;

-- Debug: Check notifications table
SELECT 
  id,
  type,
  booking_id,
  booking_number,
  created_at
FROM notifications
WHERE type = 'booking_assignment'
ORDER BY created_at DESC
LIMIT 10;
