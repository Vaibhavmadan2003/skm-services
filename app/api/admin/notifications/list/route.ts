import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');
    const unreadOnly = searchParams.get('unreadOnly') !== 'false';

    const adminId = 'admin@skm.com';

    // Use service role to bypass RLS and fetch all admin notifications
    const client = supabaseAdmin as any;
    const result = await client
      .from('notifications')
      .select('*')
      .eq('admin_id', adminId)
      .order('created_at', { ascending: false });

    if (result.error) {
      console.error('Supabase error:', result.error);
      throw result.error;
    }

    let data = (result.data as any) || [];

    // Filter by unread if needed
    if (unreadOnly) {
      data = data.filter((n: any) => n.is_read === false);
    }

    const count = data.length;

    // Apply pagination
    data = data.slice(offset, offset + limit);

    console.log(`✅ Admin notifications: ${data.length} of ${count} total loaded`);

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
    console.error('❌ Admin notifications list error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: (error as any)?.message },
      { status: 500 }
    );
  }
}
