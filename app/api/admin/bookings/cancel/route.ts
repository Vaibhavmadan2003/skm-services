import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

/**
 * POST /api/admin/bookings/cancel
 * Cancel a booking and send notification to branch admin
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookingId, bookingNumber, branchId, reason } = body;

    console.log('=== CANCEL BOOKING START ===');
    console.log('[CANCEL] Input:', { bookingId, bookingNumber, branchId, reason });

    if (!bookingId || !branchId) {
      console.error('[CANCEL] Missing required fields:', { bookingId, branchId });
      return NextResponse.json(
        { error: 'bookingId and branchId are required' },
        { status: 400 }
      );
    }

    // Step 1: Update booking status to cancelled
    console.log('[CANCEL] Step 1: Updating booking status...');
    const { data: updatedBooking, error: updateError } = await supabaseAdmin
      .from('bookings')
      .update({
        status: 'cancelled',
        cancellation_reason: reason || 'Cancelled by super admin',
        updated_at: new Date().toISOString(),
      })
      .eq('id', bookingId)
      .select()
      .single();

    if (updateError) {
      console.error('[CANCEL] ❌ Step 1 FAILED - Error updating booking:', {
        error: updateError.message,
        code: updateError.code,
        hint: updateError.hint,
      });
      return NextResponse.json(
        { error: 'Failed to cancel booking', details: updateError.message },
        { status: 500 }
      );
    }

    console.log('[CANCEL] ✅ Step 1 SUCCESS - Booking updated:', { bookingId, status: updatedBooking?.status });

    // Step 2: Get branch data including manager/admin info
    console.log('[CANCEL] Step 2: Getting branch data for branch_id:', branchId);
    const { data: branchData, error: branchError } = await supabaseAdmin
      .from('branches')
      .select('id, name, email, user_id')
      .eq('id', branchId)
      .single();

    console.log('[CANCEL] Step 2 Result:', { branchData, branchError });

    if (branchError || !branchData) {
      console.error('[CANCEL] ❌ Step 2 FAILED - Could not find branch:', {
        branchId,
        error: branchError?.message,
      });
      return NextResponse.json({
        success: true,
        message: 'Booking cancelled but notification failed (branch not found)',
      });
    }

    const branchAdminUserId = branchData.user_id;
    const branchEmail = branchData.email;
    console.log('[CANCEL] ✅ Step 2 SUCCESS - Found branch:', { 
      branchId, 
      branchName: branchData.name,
      branchEmail,
      branchAdminUserId
    });

    // Step 3: Create notification for the branch admin
    console.log('[CANCEL] Step 3: Creating notification for branch...');
    const notificationMessage = `Your booking ${bookingNumber} has been cancelled. We apologize for any inconvenience. If you have any questions, please contact support.`;

    console.log('[CANCEL] Notification payload:', {
      user_id: branchAdminUserId,
      branch_id: branchId,
      branch_email: branchEmail,
      type: 'booking_cancelled',
      title: 'Booking Cancelled',
      message: notificationMessage,
      booking_id: bookingId,
      booking_number: bookingNumber,
      is_read: false,
      created_at: new Date().toISOString(),
    });

    const { data: notificationData, error: notificationError } = await supabaseAdmin
      .from('notifications')
      .insert({
        user_id: branchAdminUserId,
        branch_id: branchId,
        branch_email: branchEmail,
        type: 'booking_cancelled',
        title: 'Booking Cancelled',
        message: notificationMessage,
        booking_id: bookingId,
        booking_number: bookingNumber,
        is_read: false,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (notificationError) {
      console.error('[CANCEL] ❌ Step 3 FAILED - Error creating notification:', {
        error: notificationError.message,
        code: notificationError.code,
        hint: notificationError.hint,
        details: notificationError,
      });
      return NextResponse.json({
        success: true,
        message: 'Booking cancelled but notification creation failed',
        error: notificationError.message,
      });
    }

    if (!notificationError) {
      console.log('[CANCEL] ✅ Step 3 SUCCESS - Notification created:', {
        notificationId: notificationData?.id,
        adminId: notificationData?.admin_id,
        branchId: notificationData?.branch_id,
        branchEmail: notificationData?.branch_email,
        type: notificationData?.type,
        bookingNumber: notificationData?.booking_number,
      });
    }

    console.log('=== CANCEL BOOKING COMPLETE ===');
    return NextResponse.json({
      success: true,
      message: 'Booking cancelled successfully',
      booking: updatedBooking,
      notification: notificationData,
    });
  } catch (error) {
    console.error('[CANCEL] ❌ UNEXPECTED ERROR:', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
