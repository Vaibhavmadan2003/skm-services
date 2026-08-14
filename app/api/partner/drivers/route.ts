import { NextRequest, NextResponse } from 'next/server';
import { selectFrom, getDrivers, insertInto } from '@/lib/supabase-helpers';
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

    // Fetch drivers using helper
    const result = await getDrivers('branch_id', branchId);
    const allDrivers = (result.data as any) || [];
    const driversData = allDrivers.map((driver: any) => {
      // Simplify structure to avoid type issues - just return basic driver info
      return {
        id: driver.id,
        user_id: driver.user_id,
        branch_id: driver.branch_id,
        vehicle_type: driver.vehicle_type,
        vehicle_registration: driver.vehicle_registration,
        license_number: driver.license_number,
        license_expiry_date: driver.license_expiry_date,
        photo_url: driver.photo_url,
        status: driver.status,
        availability_status: driver.availability_status,
        current_booking_id: driver.current_booking_id,
        total_deliveries: driver.total_deliveries,
        rating: driver.rating,
        created_at: driver.created_at,
      };
    });

    // Sort by created_at descending
    const sorted = driversData.sort((a: any, b: any) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return NextResponse.json({
      success: true,
      drivers: sorted,
    });
  } catch (error) {
    console.error('Get drivers error:', error);
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
      vehicle_type,
      vehicle_registration,
      license_number,
      license_expiry_date,
      photo_url,
      availability_status,
    } = body;

    if (!branch_id || !user_id) {
      return NextResponse.json(
        { error: 'branch_id and user_id are required' },
        { status: 400 }
      );
    }

    // Check if driver already exists - fetch all and filter
    const checkResult = await selectFrom('branch_drivers', 'id, user_id');
    const allDrivers = (checkResult.data as any) || [];
    const existing = allDrivers.find((d: any) => d.user_id === user_id);

    if (existing) {
      return NextResponse.json(
        { error: 'Driver already exists' },
        { status: 400 }
      );
    }

    // Insert new driver using helper
    const insertResult = await insertInto('branch_drivers', [
      {
        user_id,
        branch_id,
        vehicle_type: vehicle_type || null,
        vehicle_registration: vehicle_registration || null,
        license_number: license_number || null,
        license_expiry_date: license_expiry_date || null,
        photo_url: photo_url || null,
        availability_status: availability_status || 'available',
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
        driver: (data as any)?.[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create driver error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
