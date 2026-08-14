/**
 * Verify database connectivity and check settings table
 * Run with: npx ts-node scripts/verify-db.ts
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function verify() {
  console.log('🔍 Checking database...\n');

  // Test 1: Get all settings
  console.log('Test 1: Fetching all settings records...');
  const { data: allSettings, error: allError } = await supabase
    .from('settings')
    .select('*');

  if (allError) {
    console.error('❌ Error:', allError);
    return;
  }

  console.log(`✅ Total records: ${allSettings?.length || 0}`);
  if (allSettings && allSettings.length > 0) {
    allSettings.forEach((row: any, idx: number) => {
      console.log(
        `  [${idx + 1}] Type: ${row.setting_type}, Business: ${row.business_name}, Created: ${row.created_at}`
      );
    });
  } else {
    console.log('  (No records found)');
  }

  // Test 2: Get global settings specifically
  console.log('\nTest 2: Fetching global settings...');
  const { data: globalSettings, error: globalError } = await supabase
    .from('settings')
    .select('*')
    .eq('setting_type', 'global');

  if (globalError) {
    console.error('❌ Error:', globalError);
    return;
  }

  console.log(`✅ Global records: ${globalSettings?.length || 0}`);
  if (globalSettings && globalSettings.length > 0) {
    globalSettings.forEach((row: any, idx: number) => {
      console.log(
        `  [${idx + 1}] ID: ${row.id}, Business: ${row.business_name}`
      );
    });
  }

  // Test 3: Try the exact same query the API uses
  console.log('\nTest 3: Testing API query...');
  const { data: apiQuery, error: apiError, count } = await supabase
    .from('settings')
    .select('*', { count: 'exact' })
    .eq('setting_type', 'global');

  if (apiError) {
    console.error('❌ Error:', apiError);
    return;
  }

  console.log(`✅ Query returned: ${apiQuery?.length || 0} records (count: ${count})`);

  console.log('\n' + '='.repeat(60));
  console.log('Summary:');
  console.log('='.repeat(60));

  if ((globalSettings?.length || 0) === 0) {
    console.log('⚠️  No settings data found. You need to run INSERT_DEFAULT_SETTINGS.sql');
  } else if ((globalSettings?.length || 0) === 1) {
    console.log('✅ Perfect! Exactly 1 global settings record exists.');
    console.log('   Theme:', globalSettings?.[0]?.theme);
    console.log('   Business:', globalSettings?.[0]?.business_name);
  } else {
    console.log(`⚠️  Found ${globalSettings?.length} global settings (should be 1)`);
    console.log('   You may need to delete duplicates.');
  }
}

verify().catch(console.error);
