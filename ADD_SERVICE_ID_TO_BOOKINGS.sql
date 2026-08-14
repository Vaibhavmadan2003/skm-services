-- ============================================================================
-- Phase 1: Add service_id column to bookings table
-- This creates a proper foreign key relationship
-- ============================================================================

-- Step 1: Add service_id column (nullable initially for migration)
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS service_id UUID;

-- Step 2: Create index for performance
CREATE INDEX IF NOT EXISTS idx_bookings_service_id ON bookings(service_id);

-- Step 3: Populate service_id from service_name using string matching
UPDATE bookings b
SET service_id = s.id
FROM services s
WHERE LOWER(b.service_name) = LOWER(s.name)
AND b.service_id IS NULL;

-- Step 4: Verify migration
SELECT 
  COUNT(*) as total_bookings,
  COUNT(service_id) as bookings_with_service_id,
  COUNT(CASE WHEN service_id IS NULL THEN 1 END) as bookings_missing_service_id
FROM bookings;

-- Step 5: Show sample of migrated data
SELECT 
  b.booking_number,
  b.service_name,
  b.service_id,
  s.name as matched_service_name
FROM bookings b
LEFT JOIN services s ON b.service_id = s.id
LIMIT 10;

-- Step 6: Check for any bookings with service_name but no service_id
SELECT DISTINCT service_name
FROM bookings
WHERE service_id IS NULL
AND service_name IS NOT NULL
ORDER BY service_name;
