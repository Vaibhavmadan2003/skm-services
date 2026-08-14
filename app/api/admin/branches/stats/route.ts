import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getBranchStats } from '@/lib/supabase-helpers';

export async function GET(request: NextRequest) {
  try {
    const branchId = request.nextUrl.searchParams.get('branch_id');

    if (!branchId) {
      return NextResponse.json({ error: 'branch_id is required' }, { status: 400 });
    }

    // Get all stats using helper
    const stats = await getBranchStats(branchId);

    const { data: branch, error: branchError } = stats.branch;
    if (branchError) {
      return NextResponse.json({ error: 'Branch not found' }, { status: 404 });
    }

    const servicesData = (stats.services.data as any) || [];
    const staffData = (stats.staff.data as any) || [];
    const driversData = (stats.drivers.data as any) || [];
    const avgStaffRatingData = (stats.avgStaffRating.data as any) || [];
    const avgDriverRatingData = (stats.avgDriverRating.data as any) || [];

    // Calculate averages
    const staffRatingAvg =
      avgStaffRatingData && avgStaffRatingData.length > 0
        ? (avgStaffRatingData.reduce((sum: number, s: any) => sum + (s.rating || 0), 0) / avgStaffRatingData.length).toFixed(1)
        : '0';

    const driverRatingAvg =
      avgDriverRatingData && avgDriverRatingData.length > 0
        ? (avgDriverRatingData.reduce((sum: number, d: any) => sum + (d.rating || 0), 0) / avgDriverRatingData.length).toFixed(1)
        : '0';

    return NextResponse.json({
      branchId,
      servicesCount: servicesData?.length || 0,
      staffCount: staffData?.length || 0,
      driversCount: driversData?.length || 0,
      staffRatingAvg: parseFloat(staffRatingAvg as string),
      driverRatingAvg: parseFloat(driverRatingAvg as string),
      branchStatus: branch.is_active ? 'active' : 'suspended',
      branchName: branch.name,
      monthlyRevenue: branch.monthly_revenue || 0,
    });
  } catch (error) {
    console.error('Error fetching branch stats:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
