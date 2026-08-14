import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: staffId } = await params;
    const branchId = request.nextUrl.searchParams.get('branch_id');

    if (!branchId) {
      return NextResponse.json(
        { error: 'branch_id is required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('staff')
      .select(`
        id,
        user_id,
        branch_id,
        photo_url,
        specializations,
        hourly_rate,
        availability_status,
        rating,
        total_jobs_completed,
        bio,
        created_at,
        users(id, full_name, email, phone, profile_image_url)
      `)
      .eq('id', staffId)
      .eq('branch_id', branchId)
      .single();

    if (error) {
      return NextResponse.json(
        { error: 'Staff member not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      staff: data,
    });
  } catch (error) {
    console.error('Get staff detail error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: staffId } = await params;
    const body = await request.json();
    const {
      branch_id,
      photo_url,
      specializations,
      hourly_rate,
      availability_status,
      bio,
    } = body;

    if (!branch_id) {
      return NextResponse.json(
        { error: 'branch_id is required' },
        { status: 400 }
      );
    }

    // Verify staff belongs to this branch
    const { data: staff, error: staffError } = await supabase
      .from('staff')
      .select('id')
      .eq('id', staffId)
      .eq('branch_id', branch_id)
      .single();

    if (staffError || !staff) {
      return NextResponse.json(
        { error: 'Staff member not found' },
        { status: 404 }
      );
    }

    const updateData: any = {
      updated_at: new Date().toISOString(),
    };

    if (photo_url !== undefined) {
      updateData.photo_url = photo_url;
    }

    if (specializations !== undefined) {
      updateData.specializations = specializations;
    }

    if (hourly_rate !== undefined) {
      updateData.hourly_rate = hourly_rate;
    }

    if (availability_status !== undefined) {
      updateData.availability_status = availability_status;
    }

    if (bio !== undefined) {
      updateData.bio = bio;
    }

    const { data, error } = await supabase
      .from('staff')
      .update(updateData)
      .eq('id', staffId)
      .select();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      staff: data?.[0],
    });
  } catch (error) {
    console.error('Update staff error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: staffId } = await params;
    const branchId = request.nextUrl.searchParams.get('branch_id');

    if (!branchId) {
      return NextResponse.json(
        { error: 'branch_id is required' },
        { status: 400 }
      );
    }

    // Verify staff belongs to this branch
    const { data: staff, error: staffError } = await supabase
      .from('staff')
      .select('id')
      .eq('id', staffId)
      .eq('branch_id', branchId)
      .single();

    if (staffError || !staff) {
      return NextResponse.json(
        { error: 'Staff member not found' },
        { status: 404 }
      );
    }

    const { error } = await supabase
      .from('staff')
      .delete()
      .eq('id', staffId);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Staff member deleted successfully',
    });
  } catch (error) {
    console.error('Delete staff error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
