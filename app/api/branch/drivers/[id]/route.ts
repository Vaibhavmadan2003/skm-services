import { NextRequest, NextResponse } from 'next/server';
import { updateTable } from '@/lib/supabase-helpers';
import { supabase, supabaseAdmin } from '@/lib/supabase';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const { name, phone, vehicle_type, vehicle_registration, license_number, status, photo_url, rating } = body;
    const driverId = id;

    if (!driverId) {
      return NextResponse.json(
        { error: 'Driver ID is required' },
        { status: 400 }
      );
    }

    // Use helper to update driver
    const updateData = {
      name,
      phone,
      vehicle_type,
      vehicle_registration,
      license_number,
      status,
      photo_url,
      rating
    };
    
    const result = await updateTable('branch_drivers', updateData, 'id', driverId);
    const data = (result.data as any);

    if (!data) {
      return NextResponse.json(
        { error: 'Driver not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ driver: data });
  } catch (error) {
    console.error('API error:', error);
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
    const { id } = await params;
    const driverId = id;

    if (!driverId) {
      return NextResponse.json(
        { error: 'Driver ID is required' },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from('branch_drivers')
      .delete()
      .eq('id', driverId);

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to delete driver' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
