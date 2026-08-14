import { NextResponse } from 'next/server';
import { getDashboardStats } from '@/lib/supabase-helpers';

export async function GET() {
  try {
    // Get all stats using helper
    const { branches, services, staff, drivers } = await getDashboardStats();
    
    const branchesData = (branches.data as any) || [];
    const servicesData = (services.data as any) || [];
    const staffData = (staff.data as any) || [];
    const driversData = (drivers.data as any) || [];

    const totalBranches = branchesData.length || 0;
    const activeBranches = branchesData.filter((b: any) => b.is_active === true).length || 0;
    const suspendedBranches = branchesData.filter((b: any) => b.is_active === false).length || 0;

    const servicesCount = servicesData.length || 0;
    const staffCount = staffData.length || 0;
    const driversCount = driversData.length || 0;

    // Get total revenue
    const totalRevenue = branchesData.reduce((sum: number, b: any) => sum + (b.monthly_revenue || 0), 0) || 0;

    // Aggregated stats by branch for dashboard cards
    const branchStats = branchesData.map((branch: any) => ({
      id: branch.id,
      servicesCount: servicesData.filter((s: any) => s.branch_id === branch.id).length || 0,
      staffCount: staffData.filter((s: any) => s.branch_id === branch.id).length || 0,
      driversCount: driversData.filter((d: any) => d.branch_id === branch.id).length || 0,
      isActive: branch.is_active,
    })) || [];

    return NextResponse.json({
      totalBranches,
      activeBranches,
      suspendedBranches,
      totalServices: servicesCount,
      totalStaff: staffCount,
      totalDrivers: driversCount,
      totalRevenue,
      branchStats,
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
