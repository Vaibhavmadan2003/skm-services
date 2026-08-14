import { NextRequest, NextResponse } from 'next/server';
import { selectFrom } from '@/lib/supabase-helpers';
import { supabaseAdmin } from '@/lib/supabase';

/**
 * GET /api/admin/bookings
 * Fetch all bookings with customer information
 * 
 * Query parameters:
 * - status: filter by booking status (pending, confirmed, in_progress, completed, cancelled)
 * - branch_id: filter by branch
 * - customer_id: filter by specific customer
 * - search: search by booking number, customer name, or phone
 * - date_from: filter bookings from this date (YYYY-MM-DD)
 * - date_to: filter bookings until this date (YYYY-MM-DD)
 * - limit: number of records to return (default 50)
 * - offset: pagination offset (default 0)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Extract query parameters
    const status = searchParams.get('status');
    const branchId = searchParams.get('branch_id');
    const customerId = searchParams.get('customer_id');
    const search = searchParams.get('search');
    const dateFrom = searchParams.get('date_from');
    const dateTo = searchParams.get('date_to');
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    console.log('[API /admin/bookings] Request received:', {
      status,
      branchId,
      customerId,
      search,
      dateFrom,
      dateTo,
      limit,
      offset,
    });

    // Step 1: Fetch bookings using helper
    const bookingsResult = await selectFrom('bookings', `
      id,
      booking_number,
      customer_id,
      service_id,
      branch_id,
      scheduled_date,
      scheduled_time,
      service_address,
      service_city,
      total_price,
      payment_method,
      status,
      customer_notes,
      created_at,
      service_name,
      service_category,
      number_of_workers,
      number_of_hours,
      bring_materials,
      package_type,
      promo_code_applied
    `);
    
    let bookingsData = (bookingsResult.data as any) || [];

    // Apply filters in memory (since we can't use query builder directly)
    if (status) {
      bookingsData = bookingsData.filter((b: any) => b.status === status);
    }
    if (branchId) {
      bookingsData = bookingsData.filter((b: any) => b.branch_id === branchId);
    }
    if (customerId) {
      bookingsData = bookingsData.filter((b: any) => b.customer_id === customerId);
    }
    if (dateFrom) {
      bookingsData = bookingsData.filter((b: any) => b.scheduled_date >= dateFrom);
    }
    if (dateTo) {
      bookingsData = bookingsData.filter((b: any) => b.scheduled_date <= dateTo);
    }

    // Sort by created_at descending
    bookingsData = bookingsData.sort((a: any, b: any) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    const count = bookingsData.length;

    // Apply pagination
    bookingsData = bookingsData.slice(offset, offset + limit);

    console.log('[API /admin/bookings] Query result:', {
      bookingsCount: bookingsData.length,
      totalCount: count,
      branchIdFilter: branchId,
    });

    // Step 2: Extract unique service IDs and fetch service data
    const serviceIds = new Set<string>();
    bookingsData.forEach((booking: any) => {
      if (booking.service_id) {
        serviceIds.add(booking.service_id);
      }
    });

    // Fetch services data using helper
    const servicesMap: Record<string, any> = {};
    if (serviceIds.size > 0) {
      const servicesResult = await selectFrom('services', 'id, name, category');
      const servicesData = (servicesResult.data as any) || [];
      
      console.log('[API] Services fetched:', {
        requested_count: serviceIds.size,
        found_count: servicesData.length,
      });

      servicesData.forEach((service: any) => {
        if (serviceIds.has(service.id)) {
          servicesMap[service.id] = service;
        }
      });
    }

    // Step 2B: Extract unique branch IDs and fetch branch data
    const branchIds = new Set<string>();
    bookingsData.forEach((booking: any) => {
      if (booking.branch_id) {
        branchIds.add(booking.branch_id);
      }
    });

    // Fetch branches data using helper
    const branchesMap: Record<string, any> = {};
    if (branchIds.size > 0) {
      const branchesResult = await selectFrom('branches', 'id, name, city');
      const branchesData = (branchesResult.data as any) || [];

      console.log('[API] Branches fetched:', {
        requested_count: branchIds.size,
        found_count: branchesData.length,
      });

      branchesData.forEach((branch: any) => {
        if (branchIds.has(branch.id)) {
          branchesMap[branch.id] = branch;
        }
      });
    }

    // Step 3: Extract unique customer IDs and fetch customer data
    const customerIds = new Set<string>();
    const userIds = new Set<string>();
    bookingsData.forEach((booking: any) => {
      if (booking.customer_id) {
        customerIds.add(booking.customer_id);
        userIds.add(booking.customer_id);
      }
    });

    // Fetch customers data using helper
    const customersMap: Record<string, any> = {};
    if (customerIds.size > 0) {
      const customersResult = await selectFrom('customers', 'id, user_id');
      const customersData = (customersResult.data as any) || [];

      console.log('[API] Customers fetched:', {
        requested_count: customerIds.size,
        found_count: customersData.length,
        customer_ids: Array.from(customerIds),
        data: customersData,
      });

      customersData.forEach((customer: any) => {
        if (customerIds.has(customer.id)) {
          customersMap[customer.id] = customer;
        }
      });
    }

    // Step 3: Extract unique user IDs
    Object.values(customersMap).forEach((customer: any) => {
      if (customer.user_id) {
        userIds.add(customer.user_id);
      }
    });

    // Fetch auth user data for all users
    const authUsers: Record<string, any> = {};
    if (userIds.size > 0) {
      try {
        const { data: usersData, error: usersError } = await supabaseAdmin
          .auth.admin.listUsers();

        console.log('[API] Auth users fetched:', {
          requested_count: userIds.size,
          total_users: usersData?.users?.length || 0,
          requested_user_ids: Array.from(userIds),
          error: usersError,
        });

        if (!usersError && usersData?.users) {
          usersData.users.forEach((user: any) => {
            if (userIds.has(user.id)) {
              authUsers[user.id] = user;
              console.log('[API] Auth user matched:', {
                id: user.id,
                full_name: user.user_metadata?.full_name,
                phone: user.user_metadata?.phone,
              });
            }
          });
        }
      } catch (err) {
        console.warn('Could not fetch auth users:', err);
      }
    }

    // If search parameter is provided, filter results in memory
    let filteredData = bookingsData || [];
    if (search) {
      const searchLower = search.toLowerCase();
      filteredData = filteredData.filter((booking: any) => {
        const bookingNumber = booking.booking_number?.toLowerCase() || '';
        const userId = booking.customers?.user_id || '';
        const authUser = authUsers[userId] || {};
        const customerPhone = authUser.user_metadata?.phone?.toLowerCase() || '';
        const customerName = (authUser.user_metadata?.full_name || '').toLowerCase();
        
        return (
          bookingNumber.includes(searchLower) ||
          customerPhone.includes(searchLower) ||
          customerName.includes(searchLower)
        );
      });
    }

    // Transform data to match admin mock booking structure
    const bookings = filteredData.map((booking: any) => {
      // Get service data
      const service = servicesMap[booking.service_id];
      let serviceName = booking.service_name || service?.name || booking.service_category || 'Unknown Service';
      
      // Get customer data
      const customer = customersMap[booking.customer_id];
      let userId = customer?.user_id || '';
      let customerName = 'User';
      let customerPhone = '';
      let customerEmail = '';

      // If customer wasn't found by ID, treat customer_id as a user_id (backward compatibility)
      if (!customer && booking.customer_id) {
        userId = booking.customer_id;
      }

      // Get auth user data
      if (userId && authUsers[userId]) {
        const authUser = authUsers[userId];
        customerName = authUser.user_metadata?.full_name || 'User';
        customerPhone = authUser.user_metadata?.phone || '';
        customerEmail = authUser.email || '';
      }

      // Debug logging
      if (booking.customer_id === booking.customer_id) {
        console.log('[API] Processing booking:', {
          booking_id: booking.id,
          service_id: booking.service_id,
          service_name: serviceName,
          customer_id: booking.customer_id,
          customer_found: !!customer,
          user_id: userId,
          auth_user_found: !!authUsers[userId],
          customer_name: customerName,
          customer_phone: customerPhone,
        });
      }

      return {
        id: booking.id,
        bookingNumber: booking.booking_number,
        customerId: booking.customer_id,
        customerName: customerName,
        customerPhone: customerPhone,
        customerEmail: customerEmail,
        customerAddress: booking.service_address || '',
        customerCity: booking.service_city || '',
        serviceType: serviceName,
        serviceDuration: (booking.number_of_hours || 3) * 60,
        bookingDate: booking.scheduled_date,
        bookingTime: booking.scheduled_time,
        bookingTimeEnd: null,
        assignedBranchId: booking.branch_id || '',
        assignedBranchName: booking.branch_id && branchesMap[booking.branch_id] ? branchesMap[booking.branch_id].name : 'Unassigned',
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
        amount: booking.total_price || 0,
        paymentMethod: booking.payment_method || 'card',
        bookingStatus: booking.status,
        paymentStatus: 'pending',
        transactionId: '',
        invoiceNumber: '',
        companyCommission: 0,
        branchShare: 0,
        settlementStatus: 'pending',
        notes: booking.customer_notes || '',
        createdAt: booking.created_at,
        assignedAt: null,
        acceptedAt: null,
        startedAt: null,
        completedAt: null,
        cancelledAt: null,
        latitude: 0,
        longitude: 0,
        invoiceUrl: '',
        numberOfWorkers: booking.number_of_workers || 1,
        numberOfHours: booking.number_of_hours || 3,
        bringMaterials: booking.bring_materials || false,
        packageType: booking.package_type,
        promoCodeApplied: booking.promo_code_applied || false,
        assignments: [],
        activityLog: [],
      };
    });

    // Return response with pagination info
    console.log('[API /admin/bookings] Returning response:', {
      bookingsCount: bookings.length,
      total: count,
      hasMore: (offset + limit) < count,
    });

    return NextResponse.json({
      data: bookings,
      pagination: {
        offset,
        limit,
        total: count,
        hasMore: (offset + limit) < count,
      },
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
