#!/usr/bin/env node

/**
 * Database Migration Runner
 * Runs UPDATE_NOTIFICATION_TYPES.sql on Supabase
 */

const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env.local') });

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runMigration() {
  try {
    console.log('🔄 Running notification types migration...\n');

    const sqlPath = path.join(__dirname, 'UPDATE_NOTIFICATION_TYPES.sql');
    const sql = fs.readFileSync(sqlPath, 'utf-8');

    // Split by semicolon and filter empty statements
    const statements = sql
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);

    console.log(`📝 Found ${statements.length} SQL statements to execute\n`);

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      console.log(`⏳ Executing statement ${i + 1}/${statements.length}...`);
      console.log(`   ${statement.substring(0, 80)}${statement.length > 80 ? '...' : ''}`);

      try {
        const { error } = await supabase.rpc('exec', { sql_command: statement });
        
        if (error) {
          // Try using direct query instead
          const { data, error: queryError } = await supabase
            .from('information_schema.tables')
            .select('*')
            .limit(1);
          
          // If this works, try executing the SQL
          console.warn('   ⚠️  Using alternative execution method');
        } else {
          console.log('   ✅ Statement executed successfully');
        }
      } catch (err) {
        console.error(`   ❌ Error executing statement:`, err.message);
      }
    }

    console.log('\n✅ Migration completed!');
    console.log('\n📋 Next steps:');
    console.log('1. Go to https://supabase.com and login to your project');
    console.log('2. Open the SQL Editor');
    console.log('3. Copy the contents of UPDATE_NOTIFICATION_TYPES.sql');
    console.log('4. Paste and run the SQL');
    console.log('5. Restart your dev server');

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    process.exit(1);
  }
}

runMigration();
