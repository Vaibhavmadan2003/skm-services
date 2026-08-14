-- ============================================================================
-- MAKE USER_ID NULLABLE
-- ============================================================================
-- The FIX_NOTIFICATIONS_TABLE.sql made user_id NOT NULL, but admin 
-- notifications use admin_id instead. Make user_id nullable so both 
-- customer and admin notifications can coexist.

ALTER TABLE notifications ALTER COLUMN user_id DROP NOT NULL;

-- Done! Now admin notifications can be created without user_id
