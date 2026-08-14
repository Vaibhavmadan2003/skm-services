import { NextRequest, NextResponse } from 'next/server';
import { selectFrom, updateTable } from '@/lib/supabase-helpers';

/**
 * GET /api/settings
 * Fetch global settings from database
 */
export async function GET() {
  try {
    const result = await selectFrom('settings', '*');
    const data = (result.data as any) || [];
    const globalSettings = data.filter((s: any) => s.setting_type === 'global');

    // Handle case where no settings exist yet
    if (!globalSettings || globalSettings.length === 0) {
      console.warn('No global settings found in database');
      return NextResponse.json(
        { error: 'No settings found', details: 'Please insert default settings first' },
        { status: 404 }
      );
    }

    // Return first global settings record
    return NextResponse.json({
      success: true,
      data: globalSettings[0],
    });
  } catch (err) {
    console.error('Unexpected error in GET /api/settings:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/settings
 * Update global settings in database
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    // Ensure we're only updating global settings
    const settingsData = {
      ...body,
      setting_type: 'global',
      updated_at: new Date().toISOString(),
    };

    // First, get the global settings record using helper
    const result = await selectFrom('settings', 'id');
    const allSettings = (result.data as any) || [];
    const globalSettings = allSettings.filter((s: any) => s.setting_type === 'global');

    if (!globalSettings || globalSettings.length === 0) {
      return NextResponse.json(
        { error: 'No global settings found', details: 'Please insert default settings first' },
        { status: 404 }
      );
    }

    // Update the first (and should be only) global settings record
    await updateTable('settings', settingsData, 'id', globalSettings[0].id);

    // Fetch updated data
    const updatedResult = await selectFrom('settings', '*');
    const updatedData = ((updatedResult.data as any) || []).find((s: any) => s.id === globalSettings[0].id);

    return NextResponse.json({
      success: true,
      message: 'Settings updated successfully',
      data: updatedData || null,
    });
  } catch (err) {
    console.error('Unexpected error in POST /api/settings:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/settings
 * Same as POST but explicit PUT method
 */
export async function PUT(request: NextRequest) {
  return POST(request);
}
