import { NextRequest, NextResponse } from 'next/server';
import { selectFrom } from '@/lib/supabase-helpers';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');
    const unreadOnly = searchParams.get('unreadOnly') !== 'false';

    const adminId = 'admin@skm.com';

    // Fetch all notifications using helper
    const result = await selectFrom('notifications', '*');
    let data = (result.data as any) || [];

    // Filter by admin_id
    data = data.filter((n: any) => n.admin_id === adminId);

    // Filter by unread if needed
    if (unreadOnly) {
      data = data.filter((n: any) => n.is_read === false);
    }

    // Sort by created_at descending
    data = data.sort((a: any, b: any) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    const count = data.length;

    // Apply pagination
    data = data.slice(offset, offset + limit);

    console.log(`Admin notifications: ${data.length || 0} loaded`);

    return NextResponse.json({
      success: true,
      data: data || [],
      pagination: {
        total: count || 0,
        limit,
        offset,
        hasMore: (offset + limit) < (count || 0)
      }
    });
  } catch (error) {
    console.error('Admin notifications list error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
