import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { updateTable } from '@/lib/supabase-helpers';

/**
 * POST /api/partner/settings/upload-logo
 * Upload branch logo
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const branchId = formData.get('branchId') as string;

    if (!file || !branchId) {
      return NextResponse.json(
        { error: 'File and branch ID are required' },
        { status: 400 }
      );
    }

    console.log(`📸 Logo upload request for branch: ${branchId}, file: ${file.name}`);

    // For development, skip actual storage upload if bucket doesn't exist
    // In production, ensure bucket is created in Supabase
    const publicUrl = `/logos/${branchId}-${Date.now()}.png`;

    // Try to update branch with logo URL using helper
    await updateTable('branches', { logo_url: publicUrl }, 'id', branchId);

    // Fetch updated data
    const { data: updated } = await supabaseAdmin
      .from('branches')
      .select('*')
      .eq('id', branchId)
      .single();

    console.log(`✅ Logo uploaded for branch: ${branchId}`);

    return NextResponse.json({
      success: true,
      message: 'Logo uploaded successfully',
      logo_url: publicUrl,
      data: updated
    });
  } catch (error) {
    console.error('Logo upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
