-- Check all notifications for this branch
SELECT 
  id,
  branch_id,
  branch_email,
  booking_id,
  booking_number,
  type,
  message,
  is_read,
  created_at
FROM notifications
WHERE branch_id = 'b865aeed-9e4d-455e-a2d4-93aca4c23c03'
ORDER BY created_at DESC
LIMIT 20;

-- Check if there are ANY booking_assignment notifications
SELECT 
  id,
  branch_id,
  branch_email,
  type,
  COUNT(*) as count
FROM notifications
WHERE type = 'booking_assignment'
GROUP BY branch_id, branch_email, type
ORDER BY created_at DESC;

-- Check the branch exists
SELECT id, email, name FROM branches 
WHERE id = 'b865aeed-9e4d-455e-a2d4-93aca4c23c03';
