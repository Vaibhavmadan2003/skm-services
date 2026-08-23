-- ============================================================================
-- SUPPORT TICKETS INDEX VERIFICATION SCRIPT
-- ============================================================================
-- Purpose: Verify that all 5 required indexes exist on the support_tickets table
-- This script provides comprehensive diagnostics and performance information
-- ============================================================================

-- ============================================================================
-- 1. VERIFY ALL 5 INDEXES EXIST
-- ============================================================================

SELECT 
  'INDEX VERIFICATION' AS check_name,
  COUNT(*) as total_indexes_found,
  CASE 
    WHEN COUNT(*) = 5 THEN '✅ PASS - All 5 indexes present'
    WHEN COUNT(*) = 4 THEN '⚠️  WARNING - 4 indexes found (1 missing)'
    WHEN COUNT(*) < 4 THEN '❌ FAIL - Less than 4 indexes found'
    ELSE '❓ UNKNOWN'
  END as status
FROM pg_indexes
WHERE tablename = 'support_tickets'
  AND schemaname = 'public';

-- ============================================================================
-- 2. DETAILED INDEX LIST WITH DEFINITIONS
-- ============================================================================

SELECT 
  indexname,
  indexdef,
  CASE 
    WHEN indexname = 'idx_support_tickets_source_status' THEN 'Dashboard filtering (source, status)'
    WHEN indexname = 'idx_support_tickets_user_created' THEN 'User tickets by date (user_id, created_at DESC)'
    WHEN indexname = 'idx_support_tickets_ticket_number' THEN 'Direct ticket lookup (ticket_number)'
    WHEN indexname = 'idx_support_tickets_branch' THEN 'Branch filtering (branch_id)'
    WHEN indexname = 'idx_support_tickets_status' THEN 'Status filtering (status)'
    ELSE 'Other index'
  END as purpose,
  CASE 
    WHEN indexname IN ('idx_support_tickets_source_status', 'idx_support_tickets_user_created', 
                       'idx_support_tickets_ticket_number', 'idx_support_tickets_branch', 
                       'idx_support_tickets_status') THEN '✅ REQUIRED'
    ELSE 'ℹ️  ADDITIONAL'
  END as requirement_status
FROM pg_indexes
WHERE tablename = 'support_tickets'
  AND schemaname = 'public'
ORDER BY indexname;

-- ============================================================================
-- 3. VERIFY INDEX COLUMN STRUCTURE
-- ============================================================================

SELECT 
  t.tablename,
  i.indexname,
  a.attname as column_name,
  a.attnum as column_position,
  CASE 
    WHEN ix.indoption & 1 = 1 THEN 'DESC'
    ELSE 'ASC'
  END as sort_order
FROM pg_indexes i
JOIN pg_class c ON c.relname = i.indexname
JOIN pg_index ix ON ix.indexrelid = c.oid
JOIN pg_attribute a ON a.attrelid = ix.indrelid
JOIN pg_tables t ON t.tablename = i.tablename
WHERE t.tablename = 'support_tickets'
  AND i.schemaname = 'public'
ORDER BY i.indexname, a.attnum;

-- ============================================================================
-- 4. INDEX USAGE STATISTICS (if table has data)
-- ============================================================================

SELECT 
  indexrelname as index_name,
  idx_scan as scans_performed,
  idx_tup_read as tuples_read,
  idx_tup_fetch as tuples_fetched,
  CASE 
    WHEN idx_scan = 0 THEN 'Not yet used'
    WHEN idx_scan < 10 THEN 'Rarely used'
    WHEN idx_scan < 100 THEN 'Moderately used'
    ELSE 'Frequently used'
  END as usage_frequency
FROM pg_stat_user_indexes
WHERE relname = 'support_tickets'
  AND schemaname = 'public'
ORDER BY indexrelname;

-- ============================================================================
-- 5. TABLE SIZE AND INDEX SIZE ESTIMATION
-- ============================================================================

SELECT 
  'support_tickets' as table_name,
  pg_size_pretty(pg_total_relation_size('support_tickets')) as total_size,
  pg_size_pretty(pg_relation_size('support_tickets')) as table_size,
  pg_size_pretty(pg_total_relation_size('support_tickets') - pg_relation_size('support_tickets')) as indexes_size,
  round(100.0 * (pg_total_relation_size('support_tickets') - pg_relation_size('support_tickets')) / 
        pg_total_relation_size('support_tickets')::numeric, 2) as indexes_percent_of_total
FROM pg_class
WHERE relname = 'support_tickets';

-- ============================================================================
-- 6. TABLE STATISTICS
-- ============================================================================

SELECT 
  schemaname,
  tablename,
  n_live_tup as row_count,
  n_dead_tup as dead_rows,
  last_vacuum,
  last_autovacuum
FROM pg_stat_user_tables
WHERE tablename = 'support_tickets'
  AND schemaname = 'public';

-- ============================================================================
-- 7. REQUIRED INDEX CHECKLIST
-- ============================================================================

WITH required_indexes AS (
  SELECT 'idx_support_tickets_source_status' as index_name
  UNION ALL
  SELECT 'idx_support_tickets_user_created'
  UNION ALL
  SELECT 'idx_support_tickets_ticket_number'
  UNION ALL
  SELECT 'idx_support_tickets_branch'
  UNION ALL
  SELECT 'idx_support_tickets_status'
)
SELECT 
  r.index_name,
  CASE WHEN i.indexname IS NOT NULL THEN '✅ EXISTS' ELSE '❌ MISSING' END as status,
  COALESCE(i.indexdef, 'Not found') as definition
FROM required_indexes r
LEFT JOIN pg_indexes i ON i.indexname = r.index_name 
  AND i.tablename = 'support_tickets'
  AND i.schemaname = 'public'
ORDER BY r.index_name;

-- ============================================================================
-- 8. FINAL VERIFICATION SUMMARY
-- ============================================================================

WITH index_check AS (
  SELECT COUNT(*) as found_count FROM pg_indexes
  WHERE tablename = 'support_tickets'
    AND schemaname = 'public'
    AND indexname IN ('idx_support_tickets_source_status', 'idx_support_tickets_user_created',
                      'idx_support_tickets_ticket_number', 'idx_support_tickets_branch',
                      'idx_support_tickets_status')
)
SELECT 
  'FINAL VERIFICATION SUMMARY' as report_section,
  CASE 
    WHEN found_count = 5 THEN '✅ PASS: All 5 required indexes are present'
    WHEN found_count = 4 THEN '⚠️  WARNING: 4 out of 5 indexes found'
    WHEN found_count < 4 THEN '❌ FAIL: Less than 4 indexes found'
    ELSE '❓ UNKNOWN: Unexpected state'
  END as verification_result,
  found_count as indexes_found,
  5 as indexes_required,
  'Migration is ready for testing' as next_steps
FROM index_check;

-- ============================================================================
-- END OF VERIFICATION SCRIPT
-- ============================================================================
-- Usage: Copy and paste this entire script into Supabase SQL Editor and run
-- Expected Result: All queries should show 5 indexes with ✅ PASS status
-- ============================================================================
