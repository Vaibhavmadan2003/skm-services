import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { updateTable } from '@/lib/supabase-helpers';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const branchId = formData.get('branch_id') as string;

    if (!file || !branchId) {
      return NextResponse.json(
        { error: 'File and branch_id are required' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Only JPG, PNG, WebP, and SVG images are allowed' },
        { status: 400 }
      );
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size must be less than 5MB' },
        { status: 400 }
      );
    }

    const fileName = `${branchId}/logo_${Date.now()}${file.name.substring(file.name.lastIndexOf('.'))}`;
    const publicUrl = `/storage/v1/object/public/branches/${fileName}`;

    // Update branch logo_url using helper
    await updateTable('branches', { logo_url: publicUrl }, 'id', branchId);

    return NextResponse.json({
      success: true,
      url: publicUrl,
      path: fileName,
    });
  } catch (error) {
    console.error('Logo upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
