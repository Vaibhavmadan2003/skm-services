-- Check branches table structure and manager_id
SELECT '=== BRANCHES TABLE STRUCTURE ===' as section;
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'branches'
ORDER BY ordinal_position;

-- Check if manager_id has values
SELECT '=== BRANCHES WITH MANAGER_ID ===' as section;
SELECT id, name, manager_id, city
FROM branches
LIMIT 10;

-- Check auth.users table structure
SELECT '=== AUTH.USERS COLUMNS ===' as section;
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'users' AND table_schema = 'auth'
ORDER BY ordinal_position;

-- Check if there's a users table in public schema
SELECT '=== PUBLIC.USERS TABLE ===' as section;
SELECT id, email, role, created_at
FROM public.users
LIMIT 10;
