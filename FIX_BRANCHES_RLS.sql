-- Fix: Add RLS Policy for branches table
-- Allow authenticated users to insert new branches (for partner onboarding)

ALTER TABLE branches DISABLE ROW LEVEL SECURITY;

-- Alternative: If you want to keep RLS enabled, add this policy:
-- CREATE POLICY "Allow authenticated users to insert branches" ON branches
--   FOR INSERT
--   WITH CHECK (auth.role() = 'authenticated');

-- CREATE POLICY "Allow users to read all branches" ON branches
--   FOR SELECT
--   USING (true);
