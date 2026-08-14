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
    const { id: driverId } = await params;
    const branchId = request.nextUrl.searchParams.get('branch_id');

    if (!branchId) {
      return NextResponse.json(
        { error: 'branch_id is required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('drivers')
      .select(`
        id,
        user_id,
        branch_id,
        vehicle_type,
        vehicle_registration,
        license_number,
        license_expiry_date,
        photo_url,
        availability_status,
        current_booking_id,
        total_deliveries,
        rating,
        created_at,
        users(id, full_name, email, phone, profile_image_url)
      `)
      .eq('id', driverId)
      .eq('branch_id', branchId)
      .single();

    if (error) {
      return NextResponse.json(
        { error: 'Driver not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      driver: data,
    });
  } catch (error) {
    console.error('Get driver detail error:', error);
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
    const { id: driverId } = await params;
    const body = await request.json();
    const {
      branch_id,
      vehicle_type,
      vehicle_registration,
      license_number,
      license_expiry_date,
      photo_url,
      availability_status,
    } = body;

    if (!branch_id) {
      return NextResponse.json(
        { error: 'branch_id is required' },
        { status: 400 }
      );
    }

    // Verify driver belongs to this branch
    const { data: driver, error: driverError } = await supabase
      .from('drivers')
      .select('id')
      .eq('id', driverId)
      .eq('branch_id', branch_id)
      .single();

    if (driverError || !driver) {
      return NextResponse.json(
        { error: 'Driver not found' },
        { status: 404 }
      );
    }

    const updateData: any = {
      updated_at: new Date().toISOString(),
    };

    if (vehicle_type !== undefined) {
      updateData.vehicle_type = vehicle_type;
    }

    if (vehicle_registration !== undefined) {
      updateData.vehicle_registration = vehicle_registration;
    }

    if (license_number !== undefined) {
      updateData.license_number = license_number;
    }

    if (license_expiry_date !== undefined) {
      updateData.license_expiry_date = license_expiry_date;
    }

    if (photo_url !== undefined) {
      updateData.photo_url = photo_url;
    }

    if (availability_status !== undefined) {
      updateData.availability_status = availability_status;
    }

    const { data, error } = await supabase
      .from('drivers')
      .update(updateData)
      .eq('id', driverId)
      .select();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      driver: data?.[0],
    });
  } catch (error) {
    console.error('Update driver error:', error);
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
    const { id: driverId } = await params;
    const branchId = request.nextUrl.searchParams.get('branch_id');

    if (!branchId) {
      return NextResponse.json(
        { error: 'branch_id is required' },
        { status: 400 }
      );
    }

    // Verify driver belongs to this branch
    const { data: driver, error: driverError } = await supabase
      .from('drivers')
      .select('id')
      .eq('id', driverId)
      .eq('branch_id', branchId)
      .single();

    if (driverError || !driver) {
      return NextResponse.json(
        { error: 'Driver not found' },
        { status: 404 }
      );
    }

    const { error } = await supabase
      .from('drivers')
      .delete()
      .eq('id', driverId);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Driver deleted successfully',
    });
  } catch (error) {
    console.error('Delete driver error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
