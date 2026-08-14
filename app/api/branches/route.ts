import { NextRequest, NextResponse } from 'next/server';
import { selectFrom, insertInto } from '@/lib/supabase-helpers';

/**
 * GET /api/branches
 * Fetch all branches with calculations
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const city = searchParams.get('city');

    // Fetch all branches using helper
    const result = await selectFrom('branches', '*');
    let data = (result.data as any) || [];

    // Apply filters in memory
    if (status) {
      const isActive = status === 'active';
      data = data.filter((b: any) => b.is_active === isActive);
    }

    if (city) {
      data = data.filter((b: any) => b.city === city);
    }

    // Sort by name ascending
    data = data.sort((a: any, b: any) => a.name.localeCompare(b.name));

    // Format branches to match frontend interface
    const branches = data.map((branch: any) => ({
      id: branch.id,
      name: branch.name,
      managerId: branch.manager_id || '',
      managerName: branch.manager_name || '',
      email: branch.email,
      phone: branch.phone,
      city: branch.city,
      address: branch.address,
      workingHoursStart: branch.working_hours_start || '07:00',
      workingHoursEnd: branch.working_hours_end || '22:00',
      status: branch.is_active ? 'active' : 'suspended',
      todaysBookings: 0, // Will be calculated from bookings table
      monthlyBookings: 0, // Will be calculated from bookings table
      monthlyRevenue: 0, // Will be calculated from bookings table
      settlementStatus: 'pending' as const,
      customerRating: 4.5,
      createdAt: branch.created_at,
      logoUrl: branch.logo_url,
    }));

    return NextResponse.json({
      success: true,
      data: branches,
    });
  } catch (err) {
    console.error('Unexpected error in GET /api/branches:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/branches
 * Create a new branch (used by partner approval)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, city, address, manager_name, manager_id } = body;

    // Validate required fields
    if (!name || !email || !phone || !city) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await insertInto('branches', [
      {
        name,
        email,
        phone,
        city,
        address: address || city,
        manager_name,
        manager_id,
        is_active: true,
        working_hours_start: '07:00',
        working_hours_end: '22:00',
      },
    ]);

    const data = (result.data as any)?.[0];

    if (!data) {
      console.error('Error creating branch: no data returned');
      return NextResponse.json(
        { error: 'Failed to create branch' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (err) {
    console.error('Unexpected error in POST /api/branches:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
