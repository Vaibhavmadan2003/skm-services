-- ============================================================================
-- Diagnostic Script - See All Services vs Bookings
-- ============================================================================

-- 1. Show all services in services table
SELECT '=== SERVICES TABLE ===' as section;
SELECT id, name, category, default_price, is_active
FROM services
WHERE is_active = TRUE
ORDER BY name;

-- 2. Show all unique service_names in bookings
SELECT '=== SERVICE NAMES IN BOOKINGS ===' as section;
SELECT DISTINCT service_name, COUNT(*) as booking_count
FROM bookings
WHERE service_name IS NOT NULL
GROUP BY service_name
ORDER BY service_name;

-- 3. Compare - which booking service_names DON'T exist in services table
SELECT '=== MISMATCHED SERVICES (in bookings but NOT in services table) ===' as section;
SELECT DISTINCT b.service_name, COUNT(b.id) as booking_count
FROM bookings b
WHERE b.service_name IS NOT NULL
AND NOT EXISTS (
  SELECT 1 FROM services s 
  WHERE LOWER(TRIM(s.name)) = LOWER(TRIM(b.service_name))
)
GROUP BY b.service_name
ORDER BY b.service_name;

-- 4. Show total counts
SELECT '=== SUMMARY ===' as section;
SELECT 
  (SELECT COUNT(DISTINCT service_name) FROM bookings WHERE service_name IS NOT NULL) as unique_service_names_in_bookings,
  (SELECT COUNT(*) FROM services WHERE is_active = TRUE) as total_services_in_table;

-- 5. Check if service_id column exists
SELECT '=== SERVICE_ID COLUMN STATUS ===' as section;
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'bookings'
AND column_name = 'service_id';
