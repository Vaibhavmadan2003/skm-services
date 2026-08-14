import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';
import { 
  testBookingUpdate,
  getAndMarkNotificationAsRead
} from '@/lib/supabase-helpers';

/**
 * POST /api/admin/bookings/[id]/reject-assignment
 * Reject a booking assignment (returns to pending)
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

    // Update booking status back to 'pending' using helper
    const result = await testBookingUpdate(bookingId, branchId, 'pending');
    const { data: updatedBooking, error: updateError } = result;

    if (updateError) {
      console.error('Error updating booking status:', updateError);
      return NextResponse.json(
        { error: 'Failed to reject assignment' },
        { status: 500 }
      );
    }

    // Find and mark the notification as read
    await getAndMarkNotificationAsRead(bookingId, branchId, 'booking_assignment');

    return NextResponse.json({
      success: true,
      message: 'Booking assignment rejected',
      data: updatedBooking && updatedBooking.length > 0 ? updatedBooking[0] : { bookingId, status: 'pending' },
    });
  } catch (error) {
    console.error('Error in POST /api/admin/bookings/[id]/reject-assignment:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
