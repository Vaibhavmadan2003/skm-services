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
    const { id: bookingId } = await params;
    const branchId = request.nextUrl.searchParams.get('branch_id');

    if (!branchId) {
      return NextResponse.json(
        { error: 'branch_id is required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('bookings')
      .select('id, booking_number, status, scheduled_date, scheduled_time, scheduled_datetime, duration_minutes, service_address, service_city, total_price, base_price, service_charge, tax, discount, customer_notes, staff_notes, created_at, completed_at, assigned_staff_id')
      .eq('id', bookingId)
      .eq('branch_id', branchId)
      .single();

    if (error) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      booking: data,
    });
  } catch (error) {
    console.error('Get booking detail error:', error);
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
    const { id: bookingId } = await params;
    const body = await request.json();
    const { branch_id, status, assigned_staff_id, assigned_driver_id, staff_notes } = body;

    if (!branch_id) {
      return NextResponse.json(
        { error: 'branch_id is required' },
        { status: 400 }
      );
    }

    // Verify booking belongs to this branch
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .select('id, status')
      .eq('id', bookingId)
      .eq('branch_id', branch_id)
      .single();

    if (bookingError || !booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData: any = {
      updated_at: new Date().toISOString(),
    };

    if (status) {
      updateData.status = status;
      if (status === 'completed') {
        updateData.completed_at = new Date().toISOString();
      }
    }

    if (assigned_staff_id) {
      updateData.assigned_staff_id = assigned_staff_id;
    }

    if (assigned_driver_id !== undefined) {
      updateData.assigned_driver_id = assigned_driver_id;
    }

    if (staff_notes !== undefined) {
      updateData.staff_notes = staff_notes;
    }

    const { data, error } = await supabase
      .from('bookings')
      .update(updateData)
      .eq('id', bookingId)
      .select();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      booking: data?.[0],
    });
  } catch (error) {
    console.error('Update booking error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
