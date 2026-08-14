import { NextRequest, NextResponse } from 'next/server';
import { selectFrom, createDriver, getDrivers } from '@/lib/supabase-helpers';

export async function GET(request: NextRequest) {
  try {
    const branchId = request.nextUrl.searchParams.get('branch_id');

    if (!branchId) {
      return NextResponse.json(
        { error: 'branch_id is required' },
        { status: 400 }
      );
    }

    const result = await getDrivers('branch_id', branchId);
    const data = (result.data as any) || [];
    
    // Sort by created_at descending
    const sorted = data.sort((a: any, b: any) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return NextResponse.json({ drivers: sorted });
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
    
    const { branch_id, name, phone, vehicle_type, vehicle_registration, license_number, status, photo_url, rating } = body;

    if (!branch_id || !name || !phone || !vehicle_type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await createDriver({
      branch_id,
      name,
      phone,
      vehicle_type,
      vehicle_registration: vehicle_registration || null,
      license_number: license_number || null,
      status: status || 'available',
      photo_url: photo_url || null,
      rating: rating || 0
    });

    const driver = (result.data as any);

    return NextResponse.json({ driver }, { status: 201 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
