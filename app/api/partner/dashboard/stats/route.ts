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

    // Fetch all bookings for this branch using helper
    const result = await selectFrom('bookings', 'id, status, branch_id, total_price, scheduled_date');
    const allBookings = (result.data as any) || [];
    const bookings = allBookings.filter((b: any) => b.branch_id === branchId);

    const totalBookings = bookings.length;
    const pendingBookings = bookings.filter((b: any) => b.status === 'pending').length;
    const inProgressBookings = bookings.filter((b: any) => b.status === 'in_progress').length;
    const completedBookings = bookings.filter((b: any) => b.status === 'completed').length;

    const totalRevenue = bookings
      .filter((b: any) => b.status === 'completed')
      .reduce((sum: number, b: any) => sum + (b.total_price || 0), 0);

    // Fetch staff using helper
    const staffResult = await selectFrom('branch_staff', 'id, branch_id, status');
    const allStaff = (staffResult.data as any) || [];
    const activeWorkers = allStaff.filter((s: any) => s.branch_id === branchId && s.status === 'available').length;

    // Fetch drivers using helper
    const driversResult = await selectFrom('branch_drivers', 'id, branch_id, status');
    const allDrivers = (driversResult.data as any) || [];
    const activeDrivers = allDrivers.filter((d: any) => d.branch_id === branchId && d.status === 'available').length;

    // Get today's bookings
    const today = new Date().toISOString().split('T')[0];
    const todaysBookings = bookings.filter((b: any) => 
      b.scheduled_date && b.scheduled_date.startsWith(today)
    ).length;

    // Get recent bookings (last 5)
    const recentBookings = bookings
      .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5)
      .map((b: any) => ({
        id: b.id,
        booking_number: b.booking_number,
        status: b.status,
        scheduled_date: b.scheduled_date,
        total_price: b.total_price,
      }));

    return NextResponse.json({
      success: true,
      stats: {
        total_bookings: totalBookings,
        pending_bookings: pendingBookings,
        in_progress_bookings: inProgressBookings,
        completed_bookings: completedBookings,
        total_revenue: totalRevenue,
        active_workers: activeWorkers,
        active_drivers: activeDrivers,
        todays_bookings: todaysBookings,
      },
      recent_bookings: recentBookings,
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
