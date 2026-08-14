-- Make certain fields nullable for customer app integration
-- Customer app doesn't fill these initially - admin fills them later

ALTER TABLE bookings ALTER COLUMN branch_id DROP NOT NULL;
ALTER TABLE bookings ALTER COLUMN service_id DROP NOT NULL;
ALTER TABLE bookings ALTER COLUMN scheduled_date DROP NOT NULL;
ALTER TABLE bookings ALTER COLUMN scheduled_time DROP NOT NULL;
ALTER TABLE bookings ALTER COLUMN service_address DROP NOT NULL;

-- These can be filled by admin later
ALTER TABLE bookings ALTER COLUMN base_price DROP NOT NULL;
ALTER TABLE bookings ALTER COLUMN total_price DROP NOT NULL;

-- Verify changes
-- SELECT column_name, is_nullable FROM information_schema.columns 
-- WHERE table_name = 'bookings' AND column_name IN ('branch_id', 'service_id', 'scheduled_date', 'scheduled_time', 'service_address', 'base_price', 'total_price')
-- ORDER BY ordinal_position;
