-- ============================================================================
-- Sync Customer App Services into Services Table
-- This script adds all services from customer app to the services table
-- ============================================================================

INSERT INTO services (name, category, default_price, is_active)
VALUES
  -- Existing ones (may have duplicates, will ignore)
  ('Electrical Work', 'Maintenance', 130.00, TRUE),
  ('Electronic Devices', 'Maintenance', 120.00, TRUE),
  ('Cleaning Services', 'Cleaning', 100.00, TRUE),
  ('Handyman', 'Maintenance', 110.00, TRUE),
  ('Carpentry Work', 'Maintenance', 150.00, TRUE),
  ('Aluminum Work', 'Maintenance', 140.00, TRUE),
  ('Satellite Technician', 'Maintenance', 160.00, TRUE),
  ('Agriculture Work', 'Other', 180.00, TRUE),
  ('Furniture Transfer', 'Moving', 200.00, TRUE),
  ('Furniture & Curtains', 'Maintenance', 130.00, TRUE),
  ('Pest Control', 'Maintenance', 160.00, TRUE),
  ('Blacksmith Work', 'Maintenance', 150.00, TRUE),
  ('Car Services', 'Auto', 170.00, TRUE),
  ('Surveillance Cameras', 'Maintenance', 180.00, TRUE),
  ('Water Tank Services', 'Maintenance', 140.00, TRUE),
  ('Internet Networks', 'Maintenance', 150.00, TRUE),
  ('Insulation', 'Maintenance', 170.00, TRUE),
  ('Computer Maintenance', 'Maintenance', 120.00, TRUE),
  ('Sterilization', 'Cleaning', 150.00, TRUE),
  ('Tents', 'Event', 300.00, TRUE),
  ('Swimming Pools', 'Maintenance', 200.00, TRUE),
  ('Elevators', 'Maintenance', 250.00, TRUE),
  ('Electronic Gates', 'Maintenance', 180.00, TRUE),
  ('Car Wash', 'Auto', 150.00, TRUE),
  ('Electrical Car Charger', 'Maintenance', 300.00, TRUE),
  ('Solar Energy', 'Maintenance', 400.00, TRUE),
  ('Construction', 'Maintenance', 250.00, TRUE),
  ('Marine & Leisure Services', 'Other', 200.00, TRUE),
  ('Floors & Walls', 'Maintenance', 180.00, TRUE),
  ('Gypsum Work', 'Maintenance', 140.00, TRUE),
  ('Professional Home Cleaning', 'Cleaning', 160.00, TRUE),
  ('Expert Plumbing Repair', 'Maintenance', 140.00, TRUE),
  ('Carpet Deep Cleaning', 'Cleaning', 180.00, TRUE),
  ('Window Washing', 'Cleaning', 100.00, TRUE),
  ('Kitchen Deep Clean', 'Cleaning', 130.00, TRUE)
ON CONFLICT DO NOTHING;

-- Verify insertion
SELECT COUNT(*) as total_services, COUNT(DISTINCT category) as total_categories
FROM services
WHERE is_active = TRUE;

-- Show all services by category
SELECT category, COUNT(*) as count, STRING_AGG(name, ', ') as services
FROM services
WHERE is_active = TRUE
GROUP BY category
ORDER BY category;

-- Verify insertion
SELECT COUNT(*) as total_services, COUNT(DISTINCT category) as total_categories
FROM services
WHERE is_active = TRUE;

-- Show all services by category
SELECT category, COUNT(*) as count, STRING_AGG(name, ', ') as services
FROM services
WHERE is_active = TRUE
GROUP BY category
ORDER BY category;
