-- ============================================================================
-- Finalize Services Table - Keep ONLY Customer App Services
-- Remove duplicate/old services and keep unified single source of truth
-- ============================================================================

-- Step 1: Delete all services that were manually added (keep only customer app ones)
DELETE FROM services 
WHERE name IN (
  'Deep Cleaning',
  'Home Cleaning', 
  'Laundry',
  'Ironing',
  'Plumbing Repair'
) 
AND category NOT IN ('Cleaning', 'Laundry', 'Maintenance');

-- Step 2: Verify we have the right services
SELECT COUNT(*) as total_services FROM services WHERE is_active = TRUE;

-- Step 3: Show distribution by category
SELECT category, COUNT(*) as count, STRING_AGG(name, ', ' ORDER BY name) as services
FROM services
WHERE is_active = TRUE
GROUP BY category
ORDER BY category;

-- Step 4: Ensure all customer app services are present
-- These should be the ONLY services in the table
SELECT id, name, category, default_price, is_active
FROM services
WHERE is_active = TRUE
ORDER BY category, name;
