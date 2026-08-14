import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';
import { 
  testBookingUpdate,
  getAndMarkNotificationAsRead
} from '@/lib/supabase-helpers';

/**
 * POST /api/admin/bookings/[id]/accept-assignment
 * Accept a booking assignment
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: bookingId } = await params;
    const body = await request.json() as { branchId: string };
    const { branchId } = body;

    if (!bookingId || !branchId) {
      return NextResponse.json(
        { error: 'Missing bookingId or branchId' },
        { status: 400 }
      );
    }

    // TEST 2: Call the helper function instead of direct update
    const result = await testBookingUpdate(bookingId, branchId);
    const { data: updatedBooking, error: updateError } = result;

    if (updateError) {
      console.error('Error updating booking status:', updateError);
      return NextResponse.json(
        { error: 'Failed to accept assignment' },
        { status: 500 }
      );
    }

    // Find and mark the notification as read
    await getAndMarkNotificationAsRead(bookingId, branchId, 'booking_assignment');

    return NextResponse.json({
      success: true,
      message: 'Booking assignment accepted',
      data: updatedBooking && updatedBooking.length > 0 ? updatedBooking[0] : { bookingId, status: 'confirmed' },
    });
  } catch (error) {
    console.error('Error in POST /api/admin/bookings/[id]/accept-assignment:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
