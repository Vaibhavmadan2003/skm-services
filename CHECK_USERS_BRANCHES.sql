-- Check users table structure and data
SELECT id, email, role, branch_id FROM users LIMIT 20;

-- Check if branch_id is null for branch_admin users
SELECT id, email, role, branch_id FROM users WHERE role = 'branch_admin';

-- Check branches and their manager_id
SELECT id, name, manager_id FROM branches LIMIT 20;

-- Check which branch is managed by which user
SELECT 
  u.id, u.email, u.role, 
  b.id as branch_id, b.name as branch_name
FROM users u
LEFT JOIN branches b ON b.manager_id = u.id
WHERE u.role = 'branch_admin'
LIMIT 20;
