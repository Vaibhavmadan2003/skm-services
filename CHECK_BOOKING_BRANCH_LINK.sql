-- Check how bookings link to branch admins

-- 1. Check if there's a user_id or assigned_user_id in bookings table
SELECT '=== BOOKINGS TABLE COLUMNS ===' as section;
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'bookings'
ORDER BY ordinal_position;

-- 2. Check a sample booking with branch_id
SELECT '=== SAMPLE BOOKING WITH BRANCH ===' as section;
SELECT id, booking_number, branch_id, status
FROM bookings
WHERE branch_id IS NOT NULL
LIMIT 5;

-- 3. Check if branches have a user_id or manager_id that links to public.users
SELECT '=== BRANCHES COLUMNS ===' as section;
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'branches'
ORDER BY ordinal_position;

-- 4. Check branches and their user links
SELECT '=== BRANCHES WITH POTENTIAL USER LINKS ===' as section;
SELECT id, name, manager_id
FROM branches
LIMIT 10;

-- 5. Check public.users table structure
SELECT '=== PUBLIC.USERS COLUMNS ===' as section;
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'users' AND table_schema = 'public'
ORDER BY ordinal_position;

-- 6. Check if users table has branch_id
SELECT '=== SAMPLE USERS ===' as section;
SELECT id, email, role, branch_id
FROM public.users
WHERE role = 'branch_admin'
LIMIT 10;
