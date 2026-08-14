/**
 * POST /api/seed
 * Seed default settings into the database
 * 
 * This is a utility endpoint for development only
 * Use: curl -X POST http://localhost:3000/api/seed
 */

import { NextRequest, NextResponse } from 'next/server';
import { selectFrom, insertInto } from '@/lib/supabase-helpers';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    // First, check how many global settings exist using helper
    const result = await selectFrom('settings', 'id');
    const existing = (result.data as any) || [];
    const globalSettings = existing.filter((s: any) => s.setting_type === 'global');

    console.log(`Found ${globalSettings.length} existing global settings`);

    if (globalSettings.length > 1) {
      return NextResponse.json(
        {
          error: 'Multiple global settings found',
          details: `There are ${globalSettings.length} global settings. Please clean up duplicates first.`,
          ids: globalSettings.map((e: any) => e.id),
        },
        { status: 400 }
      );
    }

    if (globalSettings.length === 1) {
      return NextResponse.json(
        {
          message: 'Global settings already exist',
          id: globalSettings[0].id,
          action: 'No action needed',
        },
        { status: 200 }
      );
    }

    // Insert default settings using helper
    const insertResult = await insertInto('settings', [
      {
        setting_type: 'global',
        business_name: 'SKM Services Qatar',
        business_email: 'info@skm-services.qa',
        support_phone: '+974-4100-2200',
        business_address: '123 Pearl Street, West Bay, Doha, Qatar',
        theme: 'light',
        primary_color: '#0052cc',
        font_size: 'medium',
        border_radius: 'medium',
        currency: 'QAR',
        timezone: 'Asia/Qatar',
        language: 'en',
        booking_buffer_minutes: 30,
        tax_percentage: 5,
        invoice_prefix: 'INV',
        wallet_enabled: true,
        online_payments_enabled: true,
        cash_payments_enabled: true,
        email_notifications_enabled: true,
        sms_notifications_enabled: true,
        push_notifications_enabled: true,
        booking_alerts_enabled: true,
        payment_alerts_enabled: true,
        review_alerts_enabled: true,
      },
    ]);

    const data = (insertResult.data as any);

    if (!data) {
      console.error('Error inserting settings: no data returned');
      return NextResponse.json(
        { error: 'Failed to insert settings' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Default settings inserted successfully',
      data: Array.isArray(data) ? data[0] : data,
    });
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/seed
 * Check current settings status
 */
export async function GET() {
  try {
    const result = await selectFrom('settings', '*');
    const data = (result.data as any) || [];
    const globalSettings = data.filter((s: any) => s.setting_type === 'global');

    return NextResponse.json({
      status: 'ok',
      totalRecords: globalSettings.length,
      records: globalSettings,
      message:
        globalSettings.length === 0
          ? 'No settings. Run POST to seed defaults.'
          : globalSettings.length === 1
            ? 'Settings already exist.'
            : `Warning: ${globalSettings.length} global settings found (should be 1).`,
    });
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/seed
 * Delete all but the most recent global settings (cleanup duplicates)
 * Usage: curl -X DELETE http://localhost:3000/api/seed
 */
export async function DELETE() {
  try {
    // Get all global settings using helper
    const result = await selectFrom('settings', 'id, created_at');
    const allSettings = ((result.data as any) || []).filter((s: any) => s.setting_type === 'global');
    
    // Sort by created_at descending
    const sorted = allSettings.sort((a: any, b: any) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    if (!sorted || sorted.length <= 1) {
      return NextResponse.json({
        message: 'No duplicates to clean up',
        count: sorted?.length || 0,
      });
    }

    // Keep the newest, delete the rest using supabaseAdmin
    const idsToDelete = sorted.slice(1).map((s: any) => s.id);

    const { data, error } = await supabaseAdmin
      .from('settings')
      .delete()
      .in('id', idsToDelete)
      .select();

    if (error) {
      return NextResponse.json(
        { error: 'Failed to delete duplicates', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Duplicate settings cleaned up',
      deletedCount: (data as any)?.length || 0,
      keptId: sorted[0].id,
    });
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
