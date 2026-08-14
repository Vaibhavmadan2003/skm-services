import { NextRequest, NextResponse } from 'next/server';
import { selectFrom, insertInto } from '@/lib/supabase-helpers';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const branchId = request.nextUrl.searchParams.get('branch_id');

    if (!branchId) {
      return NextResponse.json(
        { error: 'branch_id is required' },
        { status: 400 }
      );
    }

    // Fetch staff using helper
    const result = await selectFrom('branch_staff', '*');
    const allStaff = (result.data as any) || [];
    const staff = allStaff
      .filter((s: any) => s.branch_id === branchId)
      .sort((a: any, b: any) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

    return NextResponse.json({
      success: true,
      staff: staff || [],
    });
  } catch (error) {
    console.error('Get staff error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      branch_id,
      user_id,
      photo_url,
      specializations,
      hourly_rate,
      availability_status,
      bio,
    } = body;

    if (!branch_id || !user_id) {
      return NextResponse.json(
        { error: 'branch_id and user_id are required' },
        { status: 400 }
      );
    }

    // Check if staff already exists - fetch and filter
    const checkResult = await selectFrom('branch_staff', 'id, user_id');
    const allStaff = (checkResult.data as any) || [];
    const existing = allStaff.find((s: any) => s.user_id === user_id);

    if (existing) {
      return NextResponse.json(
        { error: 'Staff member already exists' },
        { status: 400 }
      );
    }

    // Insert using helper
    const insertResult = await insertInto('branch_staff', [
      {
        user_id,
        branch_id,
        photo_url: photo_url || null,
        specializations: specializations || [],
        hourly_rate: hourly_rate || null,
        availability_status: availability_status || 'available',
        bio: bio || null,
      },
    ]);

    const data = insertResult.data;
    const error = insertResult.error;

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        staff: (data as any)?.[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create staff error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
