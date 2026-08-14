import { supabase, supabaseAdmin } from '@/lib/supabase';

export async function testBookingUpdate(
  bookingId: string,
  branchId: string,
  status: 'confirmed' | 'pending' | 'assigned' = 'confirmed'
) {
  return await updateTable('bookings', {
    status,
    branch_id: branchId,
    updated_at: new Date().toISOString(),
  }, 'id', bookingId);
}

export async function getBranchDetails(branchId: string) {
  return await supabase
    .from('branches')
    .select('*')
    .eq('id', branchId)
    .single();
}

export async function getBookingDetails(bookingId: string) {
  return await supabase
    .from('bookings')
    .select('*')
    .eq('id', bookingId)
    .single();
}

export async function getAndMarkNotificationAsRead(
  bookingId: string,
  branchId: string,
  type: string = 'booking_assignment'
) {
  // Get the notification
  const result = await supabase
    .from('notifications')
    .select('id')
    .eq('booking_id', bookingId)
    .eq('branch_id', branchId)
    .eq('type', type)
    .single();

  const { data, error } = result;

  // If found, mark as read using helper
  if (!error && data) {
    const notifId = (data as any).id;
    await updateTable('notifications', { is_read: true }, 'id', notifId);
  }

  return result;
}

export async function createBookingAssignmentNotification(
  branchEmail: string,
  branchId: string,
  bookingId: string,
  bookingNumber: string,
  message: string,
  metadata: Record<string, any>
) {
  return await insertInto('notifications', [
    {
      branch_email: branchEmail,
      branch_id: branchId,
      message,
      title: 'New Booking Assignment',
      type: 'booking_assignment',
      booking_id: bookingId,
      booking_number: bookingNumber,
      is_read: false,
      created_at: new Date().toISOString(),
      metadata: JSON.stringify(metadata),
    },
  ]);
}

export async function getBranchStats(branchId: string) {
  const results: Record<string, any> = {};

  // Get all data in helpers to avoid type inference issues in route files
  const branch = await supabase
    .from('branches')
    .select('*')
    .eq('id', branchId)
    .single();
  results.branch = branch;

  const services = await supabase
    .from('branch_services')
    .select('id')
    .eq('branch_id', branchId);
  results.services = services;

  const staff = await supabase
    .from('branch_staff')
    .select('id')
    .eq('branch_id', branchId);
  results.staff = staff;

  const drivers = await supabase
    .from('branch_drivers')
    .select('id')
    .eq('branch_id', branchId);
  results.drivers = drivers;

  const avgStaffRating = await supabase
    .from('branch_staff')
    .select('rating')
    .eq('branch_id', branchId);
  results.avgStaffRating = avgStaffRating;

  const avgDriverRating = await supabase
    .from('branch_drivers')
    .select('rating')
    .eq('branch_id', branchId);
  results.avgDriverRating = avgDriverRating;

  return results;
}

export function safeBranchData(data: any) {
  return {
    id: data?.id ?? '',
    name: data?.name ?? '',
    email: data?.email ?? '',
    phone: data?.phone ?? '',
    address: data?.address ?? '',
    city: data?.city ?? '',
    country: data?.country ?? '',
    postal_code: data?.postal_code ?? '',
    manager_id: data?.manager_id ?? null,
    timezone: data?.timezone ?? '',
    working_hours_start: data?.working_hours_start ?? '',
    working_hours_end: data?.working_hours_end ?? '',
    is_active: data?.is_active ?? true,
    created_at: data?.created_at ?? '',
    updated_at: data?.updated_at ?? '',
    logo_url: data?.logo_url ?? null,
  };
}

// Dashboard Stats Helpers
export async function getDashboardStats() {
  const branches = await supabase.from('branches').select('id, is_active, monthly_revenue');
  const services = await supabase.from('branch_services').select('id, branch_id');
  const staff = await supabase.from('branch_staff').select('id, branch_id');
  const drivers = await supabase.from('branch_drivers').select('id, branch_id');

  return { branches, services, staff, drivers };
}

// Generic select helper
export async function selectFrom(table: string, columns: string = '*') {
  return await supabase.from(table).select(columns);
}

// Generic insert helper - wrapped to avoid type inference issues
export async function insertInto(table: string, data: any[]) {
  const client = supabaseAdmin as any;
  return await client.from(table).insert(data).select();
}

// Generic update helper - wrapped to avoid type inference issues
export async function updateTable(table: string, data: Record<string, any>, column: string, value: any) {
  const client = supabaseAdmin as any;
  const result = await client.from(table).update(data).eq(column, value).select();
  return result;
}

// Generic delete helper
export async function deleteFrom(table: string, column: string, value: any) {
  const client = supabaseAdmin as any;
  return await client.from(table).delete().eq(column, value);
}

// User authentication helpers
export async function getUserByEmail(email: string) {
  const client = supabase as any;
  return await client.from('users').select('*').eq('email', email).single();
}

export async function createUser(userData: any) {
  const client = supabaseAdmin as any;
  return await client.from('users').insert([userData]).select().single();
}

export async function updateUser(userId: string, updates: any) {
  const client = supabaseAdmin as any;
  return await client.from('users').update(updates).eq('id', userId).select().single();
}

// Booking helpers
export async function getBookings(column: string = 'id', value?: string) {
  const client = supabase as any;
  if (value) {
    return await client.from('bookings').select('*').eq(column, value);
  }
  return await client.from('bookings').select('*');
}

export async function createBooking(bookingData: any) {
  const client = supabaseAdmin as any;
  return await client.from('bookings').insert([bookingData]).select().single();
}

// Notification helpers
export async function getNotifications(column: string = 'id', value?: string) {
  const client = supabase as any;
  if (value) {
    return await client.from('notifications').select('*').eq(column, value);
  }
  return await client.from('notifications').select('*');
}

export async function createNotification(notificationData: any) {
  const client = supabaseAdmin as any;
  return await client.from('notifications').insert([notificationData]).select().single();
}

export async function updateNotification(notificationId: string, updates: any) {
  const client = supabaseAdmin as any;
  return await client.from('notifications').update(updates).eq('id', notificationId).select().single();
}

// Staff helpers
export async function getStaff(column: string = 'id', value?: string) {
  const client = supabase as any;
  if (value) {
    return await client.from('branch_staff').select('*').eq(column, value);
  }
  return await client.from('branch_staff').select('*');
}

export async function createStaff(staffData: any) {
  const client = supabaseAdmin as any;
  return await client.from('branch_staff').insert([staffData]).select().single();
}

// Driver helpers
export async function getDrivers(column: string = 'id', value?: string) {
  const client = supabase as any;
  if (value) {
    return await client.from('branch_drivers').select('*').eq(column, value);
  }
  return await client.from('branch_drivers').select('*');
}

export async function createDriver(driverData: any) {
  const client = supabaseAdmin as any;
  return await client.from('branch_drivers').insert([driverData]).select().single();
}

// Service helpers
export async function getServices(column: string = 'id', value?: string) {
  const client = supabase as any;
  if (value) {
    return await client.from('branch_services').select('*').eq(column, value);
  }
  return await client.from('branch_services').select('*');
}

export async function createService(serviceData: any) {
  const client = supabaseAdmin as any;
  return await client.from('branch_services').insert([serviceData]).select().single();
}

// Payment helpers
export async function getPayments(column: string = 'id', value?: string) {
  const client = supabase as any;
  if (value) {
    return await client.from('payments').select('*').eq(column, value);
  }
  return await client.from('payments').select('*');
}

export async function createPayment(paymentData: any) {
  const client = supabaseAdmin as any;
  return await client.from('payments').insert([paymentData]).select().single();
}

// Generic get single record helper
export async function getSingleRecord(table: string, column: string, value: string) {
  return await supabase.from(table).select('*').eq(column, value).single();
}

export async function updateBranch(branchId: string, updateData: any) {
  return await updateTable('branches', updateData, 'id', branchId);
}

export async function upsertUser(userData: any) {
  const client = supabaseAdmin as any;
  return await client.from('users').upsert([userData], { onConflict: 'id' });
}

export async function updatePayment(paymentId: string, updates: any) {
  const client = supabaseAdmin as any;
  return await client.from('payments').update(updates).eq('id', paymentId).select().single();
}

export async function getBranchById(branchId: string) {
  return await supabase
    .from('branches')
    .select('*')
    .eq('id', branchId)
    .single();
}
