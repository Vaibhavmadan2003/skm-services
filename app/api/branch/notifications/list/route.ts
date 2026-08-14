import { NextRequest, NextResponse } from 'next/server';
import { selectFrom } from '@/lib/supabase-helpers';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const branchId = searchParams.get('branch_id');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');
    const unreadOnly = searchParams.get('unreadOnly') !== 'false';

    if (!branchId) {
      return NextResponse.json(
        { error: 'branch_id is required' },
        { status: 400 }
      );
    }

    // Get branch details using helper
    const branchResult = await selectFrom('branches', 'email');
    const branches = (branchResult.data as any) || [];
    const branchData = branches.find((b: any) => b.id === branchId);

    if (!branchData?.email) {
      console.error('Error fetching branch email');
      return NextResponse.json(
        { error: 'Branch not found or no email assigned' },
        { status: 404 }
      );
    }

    // Get notifications using helper
    const result = await selectFrom('notifications', '*');
    let data = (result.data as any) || [];

    // Filter by branch_id and notification types
    data = data.filter((n: any) => 
      n.branch_id === branchId && 
      ['work_assignment', 'booking_assignment', 'booking_cancelled'].includes(n.type)
    );

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

    console.log(`Branch ${branchId} notifications: ${data.length || 0} loaded (types: work_assignment, booking_assignment, booking_cancelled)`);

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
    console.error('Branch notifications list error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
