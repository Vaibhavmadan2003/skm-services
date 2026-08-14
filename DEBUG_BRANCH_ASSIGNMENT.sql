-- ============================================================================
-- Debug Script - Check Branch Assignment in Bookings
-- ============================================================================

-- 1. Check bookings with their branch_id values
SELECT '=== BOOKINGS WITH BRANCH_ID ===' as section;
SELECT 
  id,
  booking_number,
  status,
  branch_id,
  CASE WHEN branch_id IS NULL THEN 'NULL' ELSE 'HAS_VALUE' END as branch_status
FROM bookings
LIMIT 10;

-- 2. Check if branch_id column exists and its properties
SELECT '=== BRANCH_ID COLUMN INFO ===' as section;
SELECT 
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'bookings' 
AND column_name = 'branch_id';

-- 3. Count bookings by branch_id status
SELECT '=== BRANCH_ID STATISTICS ===' as section;
SELECT 
  COUNT(*) as total_bookings,
  COUNT(CASE WHEN branch_id IS NOT NULL THEN 1 END) as with_branch_id,
  COUNT(CASE WHEN branch_id IS NULL THEN 1 END) as without_branch_id
FROM bookings;

-- 4. Show bookings with accepted status and their branch info
SELECT '=== ACCEPTED BOOKINGS WITH BRANCH INFO ===' as section;
SELECT 
  b.booking_number,
  b.status,
  b.branch_id,
  br.name as branch_name,
  br.city
FROM bookings b
LEFT JOIN branches br ON b.branch_id = br.id
WHERE b.status = 'accepted'
LIMIT 10;

-- 5. Show branches table
SELECT '=== ALL BRANCHES ===' as section;
SELECT id, name, city, is_active
FROM branches
ORDER BY name;
