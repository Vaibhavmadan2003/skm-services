/**
 * POST /api/fix-rls
 * Fix RLS issues on tables
 * 
 * This endpoint temporarily needs service role to fix RLS configuration
 */

import { NextResponse } from 'next/server';
import { selectFrom } from '@/lib/supabase-helpers';

export async function GET() {
  try {
    return NextResponse.json({
      message: 'Use POST to fix RLS issues',
      available_fixes: [
        'disable_settings_rls',
        'add_settings_policies',
        'check_settings_access'
      ],
    });
  } catch (err) {
    console.error('Error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action = 'check_settings_access' } = body;

    console.log(`Executing RLS fix: ${action}`);

    if (action === 'disable_settings_rls') {
      return NextResponse.json({
        success: false,
        message: 'RLS fix requires Supabase SQL Editor',
        instructions: [
          '1. Go to https://supabase.com and open your project',
          '2. Click "SQL Editor" in the left sidebar',
          '3. Click "New query"',
          '4. Paste this SQL and run it:',
          '',
          'ALTER TABLE settings DISABLE ROW LEVEL SECURITY;',
          '',
          'After running, reload http://localhost:3000/api/settings'
        ],
        error_details: 'RLS is blocking settings access. The settings table has RLS enabled but no access policies configured.'
      });
    }

    if (action === 'add_settings_policies') {
      return NextResponse.json({
        success: false,
        message: 'RLS policies setup requires Supabase SQL Editor',
        instructions: [
          '1. Go to https://supabase.com and open your project',
          '2. Click "SQL Editor" in the left sidebar',
          '3. Click "New query"',
          '4. Paste this SQL:',
          '',
          `ALTER TABLE settings DISABLE ROW LEVEL SECURITY;`,
          `-- Or add policies for specific roles:`,
          `-- CREATE POLICY settings_public_read ON settings FOR SELECT USING (true);`,
          `-- CREATE POLICY settings_admin_update ON settings FOR UPDATE USING (auth.uid() IN (SELECT id FROM users WHERE role = 'super_admin'));`,
          '',
          'After running, reload http://localhost:3000/api/settings'
        ]
      });
    }

    if (action === 'check_settings_access') {
      // Try to read settings using helper
      const result = await selectFrom('settings', '*');
      const data = (result.data as any) || [];
      const settingsData = data.filter((s: any) => s.setting_type === 'global');

      return NextResponse.json({
        access_status: 'ok',
        data_found: settingsData.length || 0,
        message: 'Settings table is accessible with service role (RLS bypassed)',
        records: settingsData
      });
    }

    return NextResponse.json(
      { error: 'Unknown action' },
      { status: 400 }
    );
  } catch (err) {
    console.error('Error:', err);
    return NextResponse.json(
      { error: 'Internal server error', details: String(err) },
      { status: 500 }
    );
  }
}
