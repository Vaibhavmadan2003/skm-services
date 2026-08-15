-- ============================================================================
-- DIAGNOSTIC QUERY: Branch Notification Investigation
-- ============================================================================
-- Use this query to check what notifications exist for branches and their status

-- 1. Check all notifications for branches (last 50)
-- Shows: All notifications where a branch is involved (by ID or email)
SELECT 
  id,
  branch_id,
  branch_email,
  type,
  booking_number,
  is_read,
  message,
  created_at,
  metadata
FROM notifications
WHERE branch_id IS NOT NULL 
   OR branch_email IS NOT NULL
ORDER BY created_at DESC 
LIMIT 50;

-- 2. Check notification count by branch
-- Shows: How many notifications each branch has received
SELECT 
  branch_id,
  COUNT(*) as total_notifications,
  COUNT(CASE WHEN is_read = false THEN 1 END) as unread_count,
  MAX(created_at) as latest_notification
FROM notifications
WHERE branch_id IS NOT NULL
GROUP BY branch_id
ORDER BY MAX(created_at) DESC;

-- 3. Check notification count by type
-- Shows: How many of each notification type exist
SELECT 
  type,
  COUNT(*) as count,
  COUNT(CASE WHEN is_read = false THEN 1 END) as unread_count
FROM notifications
WHERE branch_id IS NOT NULL 
   OR branch_email IS NOT NULL
GROUP BY type
ORDER BY count DESC;

-- 4. Check for notifications with missing branch_id
-- Shows: Any notifications that have branch_email but not branch_id (potential issue)
SELECT 
  id,
  branch_id,
  branch_email,
  type,
  booking_number,
  created_at
FROM notifications
WHERE branch_id IS NULL 
  AND branch_email IS NOT NULL
ORDER BY created_at DESC
LIMIT 20;

-- 5. Check branch-to-email mapping
-- Shows: All branches and their email associations (verify emails are correct)
SELECT 
  id,
  name,
  email,
  is_active,
  created_at
FROM branches
ORDER BY created_at DESC;

-- 6. Cross-check: notifications without valid branch email
-- Shows: Any notifications that reference non-existent branch emails
SELECT DISTINCT
  n.branch_email,
  COUNT(*) as notification_count
FROM notifications n
LEFT JOIN branches b ON n.branch_email = b.email
WHERE n.branch_email IS NOT NULL
  AND b.id IS NULL
GROUP BY n.branch_email
ORDER BY notification_count DESC;

-- 7. Get latest 5 booking assignments per branch
-- Shows: Most recent booking assignments for verification
SELECT 
  branch_id,
  branch_email,
  booking_number,
  type,
  is_read,
  created_at,
  message
FROM notifications
WHERE type = 'booking_assignment'
  AND branch_id IS NOT NULL
ORDER BY created_at DESC
LIMIT 20;

-- 8. Check for duplicate notifications
-- Shows: Multiple notifications for same booking/branch (potential issue)
SELECT 
  branch_id,
  booking_id,
  type,
  COUNT(*) as duplicate_count,
  STRING_AGG(id::text, ', ') as notification_ids
FROM notifications
WHERE branch_id IS NOT NULL
GROUP BY branch_id, booking_id, type
HAVING COUNT(*) > 1
ORDER BY duplicate_count DESC;

-- ============================================================================
-- RECOMMENDATIONS:
-- ============================================================================
-- 1. Run query #1 to see all branch notifications
-- 2. Run query #2 to see which branches have received notifications
-- 3. Run query #4 to check for branch_id/branch_email mismatches
-- 4. Run query #6 to find invalid branch email references
-- 5. Run query #8 to find duplicate notifications
-- 
-- If no notifications appear in query #1, notifications are not being created.
-- If notifications exist but branch_id is NULL, check if branch_email is valid.
-- ============================================================================
