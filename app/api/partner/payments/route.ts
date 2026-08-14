import { NextRequest, NextResponse } from 'next/server';
import { selectFrom } from '@/lib/supabase-helpers';

export async function GET(request: NextRequest) {
  try {
    const branchId = request.nextUrl.searchParams.get('branch_id');

    if (!branchId) {
      return NextResponse.json(
        { error: 'branch_id is required' },
        { status: 400 }
      );
    }

    // Get settlements for this branch using helper
    const result = await selectFrom('branch_settlements', '*');
    const allSettlements = (result.data as any) || [];
    const settlements = allSettlements
      .filter((s: any) => s.branch_id === branchId)
      .sort((a: any, b: any) => 
        new Date(b.period_start).getTime() - new Date(a.period_start).getTime()
      );

    // Calculate totals
    const totalEarnings = settlements.reduce((sum: number, s: any) => sum + (s.total_earnings || 0), 0);
    const totalSettled = settlements
      .filter((s: any) => s.status === 'paid')
      .reduce((sum: number, s: any) => sum + (s.net_settlement || 0), 0);
    const pendingSettlement = settlements
      .filter((s: any) => s.status === 'pending' || s.status === 'approved')
      .reduce((sum: number, s: any) => sum + (s.net_settlement || 0), 0);

    return NextResponse.json({
      success: true,
      summary: {
        total_earnings: totalEarnings,
        total_settled: totalSettled,
        pending_settlement: pendingSettlement,
      },
      settlements: settlements || [],
    });
  } catch (error) {
    console.error('Get payments error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
