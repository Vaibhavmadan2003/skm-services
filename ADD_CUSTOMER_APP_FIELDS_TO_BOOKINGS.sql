-- Add missing fields from customer app to bookings table
-- This allows customer app to sync all booking details directly

ALTER TABLE bookings ADD COLUMN IF NOT EXISTS service_name VARCHAR(255);
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS service_category VARCHAR(100);
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS number_of_workers INTEGER DEFAULT 1;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS number_of_hours INTEGER DEFAULT 3;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS bring_materials BOOLEAN DEFAULT FALSE;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS package_type VARCHAR(50); -- one_time, 3_sessions, 6_sessions, etc
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS payment_method VARCHAR(50); -- wallet, card, etc
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS promo_code_applied BOOLEAN DEFAULT FALSE;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS service_city VARCHAR(100);
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS scheduled_time_end TIME;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_bookings_service_name ON bookings(service_name);
CREATE INDEX IF NOT EXISTS idx_bookings_service_category ON bookings(service_category);

-- Verify columns were added
-- SELECT column_name, data_type FROM information_schema.columns 
-- WHERE table_name = 'bookings' 
-- ORDER BY ordinal_position;
