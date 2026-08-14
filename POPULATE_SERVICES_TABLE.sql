-- ============================================================================
-- Populate services table with real data
-- ============================================================================

INSERT INTO services (name, description, category, base_price, estimated_duration_minutes, is_active)
VALUES
  (
    'Home Cleaning',
    'Professional home cleaning service including dusting, vacuuming, mopping, and sanitization',
    'Cleaning',
    150.00,
    120,
    TRUE
  ),
  (
    'Deep Cleaning',
    'Comprehensive deep cleaning including baseboards, behind furniture, and hard-to-reach areas',
    'Cleaning',
    250.00,
    240,
    TRUE
  ),
  (
    'Kitchen Cleaning',
    'Professional kitchen cleaning including appliances, cabinets, and sink areas',
    'Cleaning',
    100.00,
    60,
    TRUE
  ),
  (
    'Bathroom Cleaning',
    'Thorough bathroom cleaning including tiles, fixtures, and grouting',
    'Cleaning',
    80.00,
    45,
    TRUE
  ),
  (
    'Carpet Cleaning',
    'Professional carpet and rug cleaning using advanced steam cleaning technology',
    'Cleaning',
    200.00,
    120,
    TRUE
  ),
  (
    'Laundry Service',
    'Complete laundry service including washing, drying, and ironing',
    'Laundry',
    120.00,
    180,
    TRUE
  ),
  (
    'Ironing Service',
    'Professional ironing and garment care service',
    'Laundry',
    60.00,
    90,
    TRUE
  ),
  (
    'Plumbing Repair',
    'Expert plumbing services including pipe repair, leak fixing, and fixture installation',
    'Maintenance',
    120.00,
    60,
    TRUE
  ),
  (
    'Electrical Work',
    'Professional electrical services including wiring, repairs, and installations',
    'Maintenance',
    130.00,
    60,
    TRUE
  ),
  (
    'Car Wash',
    'Professional car washing and detailing service',
    'Auto',
    150.00,
    60,
    TRUE
  ),
  (
    'AC Maintenance',
    'Air conditioning unit servicing and maintenance',
    'Maintenance',
    110.00,
    45,
    TRUE
  ),
  (
    'Appliance Repair',
    'Repair services for home appliances including washing machines, refrigerators, and ovens',
    'Maintenance',
    140.00,
    60,
    TRUE
  ),
  (
    'Window Cleaning',
    'Professional window and glass cleaning service',
    'Cleaning',
    90.00,
    45,
    TRUE
  ),
  (
    'Garden Maintenance',
    'Garden landscaping, pruning, and maintenance services',
    'Outdoor',
    180.00,
    120,
    TRUE
  ),
  (
    'Pest Control',
    'Professional pest control and fumigation services',
    'Maintenance',
    160.00,
    90,
    TRUE
  ),
  (
    'Painting',
    'Interior and exterior painting services',
    'Maintenance',
    200.00,
    240,
    TRUE
  ),
  (
    'Wood Polishing',
    'Professional wood furniture polishing and refinishing',
    'Maintenance',
    100.00,
    90,
    TRUE
  ),
  (
    'Sofa Cleaning',
    'Professional sofa and upholstery cleaning service',
    'Cleaning',
    150.00,
    120,
    TRUE
  ),
  (
    'Mattress Cleaning',
    'Professional mattress cleaning and sanitization',
    'Cleaning',
    120.00,
    90,
    TRUE
  ),
  (
    'Tile Grouting',
    'Tile and grout cleaning and restoration service',
    'Cleaning',
    130.00,
    120,
    TRUE
  )
ON CONFLICT DO NOTHING;

-- Verify insertion
SELECT COUNT(*) as total_services, category, COUNT(*) as count_by_category
FROM services
WHERE is_active = TRUE
GROUP BY category
ORDER BY category;
