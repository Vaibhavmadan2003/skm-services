import { NextRequest, NextResponse } from 'next/server';
import { selectFrom } from '@/lib/supabase-helpers';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const branchId = request.nextUrl.searchParams.get('branch_id');
    const status = request.nextUrl.searchParams.get('status');
    const search = request.nextUrl.searchParams.get('search');
    const page = parseInt(request.nextUrl.searchParams.get('page') || '1');
    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '10');

    if (!branchId) {
      return NextResponse.json(
        { error: 'branch_id is required' },
        { status: 400 }
      );
    }

    // Fetch all bookings using helper
    const result = await selectFrom('bookings', 'id, booking_number, customer_id, status, scheduled_date, scheduled_time, service_address, service_name, service_category, total_price, branch_id, created_at');
    let bookingsData = (result.data as any) || [];

    // Filter by branch_id
    bookingsData = bookingsData.filter((b: any) => b.branch_id === branchId);

    // Apply status filter if provided
    if (status) {
      bookingsData = bookingsData.filter((b: any) => b.status === status);
    }

    // Apply search filter if provided
    if (search) {
      const searchLower = search.toLowerCase();
      bookingsData = bookingsData.filter((b: any) => 
        (b.booking_number && b.booking_number.toLowerCase().includes(searchLower)) ||
        (b.service_address && b.service_address.toLowerCase().includes(searchLower))
      );
    }

    const total = bookingsData.length;

    // Sort by created_at descending and apply pagination
    const sorted = bookingsData.sort((a: any, b: any) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    const from = (page - 1) * limit;
    const data = sorted.slice(from, from + limit);

    // Fetch customer names for all bookings
    const customerIds = new Set<string>();
    data.forEach((booking: any) => {
      if (booking.customer_id) {
        customerIds.add(booking.customer_id);
      }
    });

    // Step 1: Fetch customer records to get user_id mapping
    const customersMap: Record<string, any> = {};
    const userIds = new Set<string>();
    
    if (customerIds.size > 0) {
      const customersResult = await selectFrom('customers', 'id, user_id');
      const customersData = (customersResult.data as any) || [];
      
      customersData.forEach((customer: any) => {
        if (customerIds.has(customer.id)) {
          customersMap[customer.id] = customer;
          if (customer.user_id) {
            userIds.add(customer.user_id);
          }
        }
      });
    }

    // Step 2: Fetch auth user data using the user_ids
    const customerNameMap: Record<string, string> = {};
    
    if (userIds.size > 0) {
      try {
        const { data: usersData } = await supabaseAdmin.auth.admin.listUsers();
        
        if (usersData?.users) {
          usersData.users.forEach((user: any) => {
            if (userIds.has(user.id)) {
              customerNameMap[user.id] = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
            }
          });
        }
      } catch (err) {
        console.error('Error fetching user names:', err);
      }
    }

    // Step 3: Map customer names to bookings
    const bookingsWithCustomerNames = data.map((booking: any) => {
      const customer = customersMap[booking.customer_id];
      let customerName = 'N/A';
      
      if (customer && customer.user_id) {
        customerName = customerNameMap[customer.user_id] || 'N/A';
      }
      
      return {
        ...booking,
        customer_name: customerName
      };
    });

    return NextResponse.json({
      success: true,
      bookings: bookingsWithCustomerNames || [],
      pagination: {
        page,
        limit,
        total: total || 0,
        pages: Math.ceil((total || 0) / limit),
      },
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
