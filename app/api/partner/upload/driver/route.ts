import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const branchId = formData.get('branch_id') as string;

    console.log('Upload driver photo - file:', file?.name, 'size:', file?.size, 'type:', file?.type);
    console.log('Upload driver photo - branchId:', branchId);

    if (!file || !branchId) {
      console.log('Missing file or branchId');
      return NextResponse.json(
        { error: 'File and branch_id are required' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      console.log('Invalid file type:', file.type);
      return NextResponse.json(
        { error: 'Only JPG, PNG, and WebP images are allowed' },
        { status: 400 }
      );
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      console.log('File too large:', file.size);
      return NextResponse.json(
        { error: 'File size must be less than 5MB' },
        { status: 400 }
      );
    }

    const fileName = `${branchId}/${Date.now()}_${file.name}`;
    console.log('Uploading to:', fileName);

    const { data, error } = await supabase.storage
      .from('drivers')
      .upload(fileName, file);

    if (error) {
      console.log('Supabase upload error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    console.log('Upload success:', data);

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('drivers')
      .getPublicUrl(fileName);

    console.log('Public URL:', urlData.publicUrl);

    return NextResponse.json({
      success: true,
      url: urlData.publicUrl,
      path: fileName,
    });
  } catch (error) {
    console.error('Driver upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
