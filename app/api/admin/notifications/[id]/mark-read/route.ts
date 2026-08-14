import { NextRequest, NextResponse } from 'next/server';
import { updateNotification } from '@/lib/supabase-helpers';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Use helper to update notification
    await updateNotification(id, { is_read: true, read_at: new Date().toISOString() });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Mark as read error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
