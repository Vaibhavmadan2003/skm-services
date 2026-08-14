import { NextRequest, NextResponse } from 'next/server';
import { getStaff, createStaff } from '@/lib/supabase-helpers';

export async function GET(request: NextRequest) {
  try {
    const branchId = request.nextUrl.searchParams.get('branch_id');

    if (!branchId) {
      return NextResponse.json(
        { error: 'branch_id is required' },
        { status: 400 }
      );
    }

    const result = await getStaff('branch_id', branchId);
    const data = (result.data as any) || [];
    
    // Sort by created_at descending
    const sorted = data.sort((a: any, b: any) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return NextResponse.json({ staff: sorted });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { branch_id, name, role, phone, email, specialization, status, photo_url, rating } = body;

    if (!branch_id || !name || !role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await createStaff({
      branch_id,
      name,
      role,
      phone: phone || null,
      email: email || null,
      specialization: specialization || null,
      status: status || 'active',
      photo_url: photo_url || null,
      rating: rating || 0
    });

    const staff = (result.data as any);

    return NextResponse.json({ staff }, { status: 201 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
