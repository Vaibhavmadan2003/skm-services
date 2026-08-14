-- Drop the foreign key constraint on bookings.customer_id
-- This allows bookings to be created without requiring a customer record
-- (Admin can create customer records later if needed)

ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_customer_id_fkey;

-- Note: After this, bookings.customer_id becomes a regular UUID column without FK constraint
-- You can add the constraint back later if needed with:
-- ALTER TABLE bookings ADD CONSTRAINT bookings_customer_id_fkey 
--   FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE;
