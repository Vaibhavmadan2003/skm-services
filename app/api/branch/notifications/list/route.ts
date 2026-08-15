import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const branchId = searchParams.get('branch_id');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');
    const unreadOnly = searchParams.get('unreadOnly') !== 'false';

    console.log('🔔 API /api/branch/notifications/list called:', {
      branchId,
      limit,
      offset,
      unreadOnly,
      timestamp: new Date().toISOString(),
    });

    if (!branchId) {
      console.error('🔔 Missing branch_id parameter in branch notifications request');
      return NextResponse.json(
        { error: 'branch_id is required' },
        { status: 400 }
      );
    }

    // Verify branch exists
    const branchClient = supabaseAdmin as any;
    const branchResult = await branchClient
      .from('branches')
      .select('id, email')
      .eq('id', branchId)
      .single();

    console.log('🔔 Branch lookup result:', {
      branchId,
      found: !branchResult.error,
      email: branchResult.data?.email,
      error: branchResult.error?.message,
    });

    if (branchResult.error || !branchResult.data?.email) {
      console.error('🔔 Branch not found:', branchId);
      return NextResponse.json(
        { error: 'Branch not found or no email assigned' },
        { status: 404 }
      );
    }

    // Fetch notifications
    const notifClient = supabaseAdmin as any;
    let query = notifClient
      .from('notifications')
      .select('*')
      .eq('branch_id', branchId)
      .in('type', ['work_assignment', 'booking_assignment', 'booking_cancelled']);

    if (unreadOnly) {
      query = query.eq('is_read', false);
    }

    const notifResult = await query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    console.log('🔔 Notifications query result:', {
      branchId,
      foundCount: notifResult.data?.length || 0,
      error: notifResult.error?.message,
      unreadOnly,
    });

    if (notifResult.error) {
      console.error('🔔 Error fetching notifications:', notifResult.error);
      return NextResponse.json(
        { error: 'Failed to fetch notifications' },
        { status: 500 }
      );
    }

    const data = (notifResult.data as any) || [];

    // Get total count
    const countResult = await notifClient
      .from('notifications')
      .select('id', { count: 'exact' })
      .eq('branch_id', branchId)
      .in('type', ['work_assignment', 'booking_assignment', 'booking_cancelled']);

    const count = countResult.count || 0;

    console.log('🔔 API Response:', {
      branchId,
      dataCount: data.length,
      totalCount: count,
      hasMore: (offset + limit) < (count || 0),
    });

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
    console.error('🔔 Branch notifications list error:', (error as any)?.message);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
