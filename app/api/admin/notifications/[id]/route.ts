import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { updateNotification } from '@/lib/supabase-helpers';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: notificationId } = await params;

    if (!notificationId) {
      console.error('Delete failed: No notification ID provided');
      return NextResponse.json(
        { error: 'Notification ID is required' },
        { status: 400 }
      );
    }

    console.log(`Attempting to delete notification: ${notificationId}`);

    const { data, error } = await supabaseAdmin
      .from('notifications')
      .delete()
      .eq('id', notificationId)
      .select();

    if (error) {
      console.error('Error deleting notification:', error);
      return NextResponse.json(
        { error: 'Failed to delete notification', details: error.message, code: error.code },
        { status: 500 }
      );
    }

    console.log(`✅ Notification deleted successfully: ${notificationId}`);

    return NextResponse.json({
      success: true,
      message: 'Notification deleted successfully',
      deletedId: notificationId
    });
  } catch (error) {
    console.error('Delete notification error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: notificationId } = await params;
    const body = await request.json();

    if (!notificationId) {
      return NextResponse.json(
        { error: 'Notification ID is required' },
        { status: 400 }
      );
    }

    // Use helper to update notification
    await updateNotification(notificationId, { is_read: true });

    return NextResponse.json({
      success: true,
      message: 'Notification marked as read'
    });
  } catch (error) {
    console.error('PATCH notification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
