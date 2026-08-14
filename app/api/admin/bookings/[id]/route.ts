import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Create a service role client for server-side queries
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

const supabase = supabaseAdmin;

/**
 * GET /api/admin/bookings/[id]
 * Fetch a single booking by ID with all related data
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: bookingId } = await params;

    const { data, error } = await supabaseAdmin
      .from('bookings')
      .select(
        `
        *,
        customers(id, user_id)
      `
      )
      .eq('id', bookingId)
      .single();

    if (error) {
      console.error('Error fetching booking:', error);
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Fetch auth user data for customer
    let customerName = 'User';
    let customerPhone = '';
    let customerEmail = '';

    if (data.customers?.user_id) {
      try {
        const { data: usersData } = await supabaseAdmin
          .auth.admin.listUsers();

        const authUser = usersData?.users?.find((u: any) => u.id === data.customers.user_id);
        if (authUser) {
          customerName = authUser.user_metadata?.full_name || 'User';
          customerPhone = authUser.user_metadata?.phone || '';
          customerEmail = authUser.email || '';
        }
      } catch (err) {
        console.warn('Could not fetch auth user:', err);
      }
    }

    // Transform data to match admin mock booking structure
    const booking = {
      id: data.id,
      bookingNumber: data.booking_number,
      customerId: data.customer_id,
      customerName: customerName,
      customerPhone: customerPhone,
      customerEmail: customerEmail,
      customerAddress: data.service_address || '',
      customerCity: data.service_city || '',
      serviceType: data.service_name || data.service_category || '',
      serviceDuration: (data.number_of_hours || 3) * 60,
      bookingDate: data.scheduled_date,
      bookingTime: data.scheduled_time,
      assignedBranchId: data.branch_id || '',
      assignedBranchName: 'Unassigned',
      branchManager: '',
      branchStatus: 'active',
      assignedWorkerId: '',
      assignedWorkerName: 'Unassigned',
      assignedWorkerPhone: '',
      workerAvailability: 'available',
      assignedDriverId: '',
      assignedDriverName: 'Unassigned',
      assignedDriverPhone: '',
      vehicleNumber: '',
      driverStatus: 'available',
      amount: data.total_price || 0,
      paymentMethod: data.payment_method || 'card',
      bookingStatus: data.status,
      paymentStatus: 'pending',
      transactionId: '',
      invoiceNumber: '',
      companyCommission: 0,
      branchShare: 0,
      settlementStatus: 'pending',
      notes: data.customer_notes || '',
      createdAt: data.created_at,
      assignedAt: null,
      acceptedAt: null,
      startedAt: null,
      completedAt: null,
      cancelledAt: null,
      latitude: 0,
      longitude: 0,
      invoiceUrl: '',
      numberOfWorkers: data.number_of_workers || 1,
      numberOfHours: data.number_of_hours || 3,
      bringMaterials: data.bring_materials || false,
      packageType: data.package_type,
      promoCodeApplied: data.promo_code_applied || false,
      assignments: [],
      activityLog: [],
    };

    return NextResponse.json({ data: booking });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/admin/bookings/[id]
 * Update a booking
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: bookingId } = await params;
    const updateData = await request.json();

    // Map admin fields to booking table fields
    const dbUpdateData: any = {};
    
    if (updateData.bookingStatus) dbUpdateData.status = updateData.bookingStatus;
    if (updateData.notes !== undefined) dbUpdateData.specialist_notes = updateData.notes;
    if (updateData.bookingDate) dbUpdateData.scheduled_date = updateData.bookingDate;
    if (updateData.bookingTime) dbUpdateData.scheduled_time_start = updateData.bookingTime;

    dbUpdateData.updated_at = new Date().toISOString();

    const { data, error } = await supabase
      .from('bookings')
      .update(dbUpdateData)
      .eq('id', bookingId)
      .select()
      .single();

    if (error) {
      console.error('Error updating booking:', error);
      return NextResponse.json(
        { error: 'Failed to update booking' },
        { status: 500 }
      );
    }

    return NextResponse.json({ data });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
