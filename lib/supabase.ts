// Supabase Client Configuration
// This file initializes the Supabase client for database operations

import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn(
    'Missing Supabase credentials. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.'
  );
}

/**
 * Create a Supabase client for server-side operations
 * Use this in server components and API routes
 */
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Create a Supabase admin client for privileged operations
 * Use this in API routes for admin operations (user creation, etc)
 */
export const supabaseAdmin = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

/**
 * Create a browser client for client-side operations
 * Use this in client components
 */
export const createBrowserClient = () => {
  return createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
};

/**
 * Database helper functions for common operations
 */
export const db = {
  /**
   * Get global settings from database
   */
  async getGlobalSettings() {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('setting_type', 'global')
      .single();

    if (error) {
      console.error('Error fetching global settings:', error);
      return null;
    }
    return data;
  },

  /**
   * Update global settings in database
   */
  async updateGlobalSettings(settings: any) {
    const client = supabase as any;
    const { data, error } = await client
      .from('settings')
      .update(settings)
      .eq('setting_type', 'global')
      .select()
      .single();

    if (error) {
      console.error('Error updating global settings:', error);
      throw error;
    }
    return data;
  },

  /**
   * Get branch settings
   */
  async getBranchSettings(branchId: string) {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('setting_type', 'branch')
      .eq('branch_id', branchId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
      console.error('Error fetching branch settings:', error);
      return null;
    }
    return data || null;
  },

  /**
   * Update branch settings
   */
  async updateBranchSettings(branchId: string, settings: any) {
    const client = supabase as any;
    const { data, error } = await client
      .from('settings')
      .update(settings)
      .eq('setting_type', 'branch')
      .eq('branch_id', branchId)
      .select()
      .single();

    if (error) {
      console.error('Error updating branch settings:', error);
      throw error;
    }
    return data;
  },

  /**
   * Get all branches
   */
  async getAllBranches() {
    const { data, error } = await supabase
      .from('branches')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (error) {
      console.error('Error fetching branches:', error);
      return [];
    }
    return data || [];
  },

  /**
   * Get all services
   */
  async getAllServices() {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('name');

    if (error) {
      console.error('Error fetching services:', error);
      return [];
    }
    return data || [];
  },

  /**
   * Create a new booking
   */
  async createBooking(booking: any) {
    const client = supabase as any;
    const { data, error } = await client
      .from('bookings')
      .insert([booking])
      .select()
      .single();

    if (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
    return data;
  },

  /**
   * Get bookings for a customer
   */
  async getCustomerBookings(customerId: string) {
    const { data, error } = await supabase
      .from('bookings')
      .select(
        `
        *,
        branch:branches(id, name, logo_url),
        service:services(id, name, category, base_price),
        staff:staff(id, user:users(full_name)),
        payment:payments(id, status, amount)
      `
      )
      .eq('customer_id', customerId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching customer bookings:', error);
      return [];
    }
    return data || [];
  },

  /**
   * Get bookings for a branch
   */
  async getBranchBookings(branchId: string) {
    const { data, error } = await supabase
      .from('bookings')
      .select(
        `
        *,
        customer:customers(id, user:users(full_name, phone)),
        service:services(id, name, category),
        staff:staff(id, user:users(full_name))
      `
      )
      .eq('branch_id', branchId)
      .order('scheduled_datetime', { ascending: true });

    if (error) {
      console.error('Error fetching branch bookings:', error);
      return [];
    }
    return data || [];
  },

  /**
   * Update booking status
   */
  async updateBookingStatus(bookingId: string, status: string) {
    const client = supabase as any;
    const { data, error } = await client
      .from('bookings')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', bookingId)
      .select()
      .single();

    if (error) {
      console.error('Error updating booking status:', error);
      throw error;
    }
    return data;
  },

  /**
   * Create a payment record
   */
  async createPayment(payment: any) {
    const client = supabase as any;
    const { data, error } = await client
      .from('payments')
      .insert([payment])
      .select()
      .single();

    if (error) {
      console.error('Error creating payment:', error);
      throw error;
    }
    return data;
  },

  /**
   * Create a review
   */
  async createReview(review: any) {
    const client = supabase as any;
    const { data, error } = await client
      .from('reviews')
      .insert([review])
      .select()
      .single();

    if (error) {
      console.error('Error creating review:', error);
      throw error;
    }
    return data;
  },

  /**
   * Get booking stats for dashboard
   */
  async getBookingStats() {
    const { data, error } = await supabase
      .from('vw_booking_stats')
      .select('*');

    if (error) {
      console.error('Error fetching booking stats:', error);
      return [];
    }
    return data || [];
  },

  /**
   * Get staff performance
   */
  async getStaffPerformance() {
    const { data, error } = await supabase
      .from('vw_staff_performance')
      .select('*');

    if (error) {
      console.error('Error fetching staff performance:', error);
      return [];
    }
    return data || [];
  },
};
