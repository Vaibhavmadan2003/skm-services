'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Download, Plus } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import BookingSummaryCards from '../components/BookingSummaryCards';
import BookingFilters, { FilterState } from '../components/BookingFilters';
import BookingsTable from '../components/BookingsTable';
import BookingDetailsDrawerEnhanced from '../components/BookingDetailsDrawerEnhanced';
import { Booking } from '../lib/mock-bookings';
import { createClient } from '@supabase/supabase-js';

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string | null>(null);
  const [userBranchId, setUserBranchId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    bookingId: '',
    customerName: '',
    phoneNumber: '',
    branch: '',
    service: '',
    bookingStatus: '',
    paymentStatus: '',
    city: '',
    dateFrom: '',
    dateTo: '',
    sortBy: '',
  });

  // Get current user and their branch on mount
  useEffect(() => {
    const getCurrentUserBranch = async () => {
      try {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL || '',
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
        );

        const { data: { user } } = await supabase.auth.getUser();
        console.log('[Bookings] Current user:', user?.email);
        
        if (user) {
          const { data: userData } = await supabase
            .from('users')
            .select('branch_id, role')
            .eq('id', user.id)
            .single();

          console.log('[Bookings] User:', userData);

          if (userData) {
            setUserRole(userData.role);
            setUserBranchId(userData.branch_id); // Set directly - it's already there!
          }
        }
      } catch (err) {
        console.error('[Bookings] Error:', err);
      }
    };

    getCurrentUserBranch();
  }, []);

  // Fetch bookings from API on component mount and when filters change
  useEffect(() => {
    fetchBookings();
    
    // For branch_admin users, poll every 10 seconds to see accepted bookings
    let pollInterval: NodeJS.Timeout | null = null;
    if (userRole === 'branch_admin') {
      pollInterval = setInterval(() => {
        fetchBookings();
      }, 10000);
    }
    
    return () => {
      if (pollInterval) clearInterval(pollInterval);
    };
  }, [userBranchId, userRole]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      
      // Filter by branch if user is branch_admin
      if (userRole === 'branch_admin' && userBranchId) {
        console.log('[Bookings] Fetching for branch:', userBranchId);
        params.append('branch_id', userBranchId);
      }
      
      if (filters.bookingStatus) {
        params.append('status', filters.bookingStatus);
      }
      if (filters.dateFrom) {
        params.append('date_from', filters.dateFrom);
      }
      if (filters.dateTo) {
        params.append('date_to', filters.dateTo);
      }
      if (filters.search) {
        params.append('search', filters.search);
      }

      const response = await fetch(`/api/admin/bookings?${params.toString()}`);
      
      if (!response.ok) throw new Error('Failed to fetch bookings');

      const result = await response.json();
      console.log('[Bookings] Got', result.data?.length, 'bookings');
      setBookings(result.data || []);
    } catch (err) {
      console.error('[Bookings] Error:', err);
      setError('Failed to load bookings');
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter bookings based on all filters (client-side for common fields)
  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      // Booking ID filter
      if (filters.bookingId && !booking.bookingNumber.includes(filters.bookingId)) {
        return false;
      }

      // Customer Name filter
      if (filters.customerName && !booking.customerName.toLowerCase().includes(filters.customerName.toLowerCase())) {
        return false;
      }

      // Phone Number filter
      if (filters.phoneNumber && !booking.customerPhone.includes(filters.phoneNumber)) {
        return false;
      }

      // Service filter
      if (filters.service && !booking.serviceType.toLowerCase().includes(filters.service.toLowerCase())) {
        return false;
      }

      // City filter
      if (filters.city && booking.customerCity !== filters.city) {
        return false;
      }

      // Booking Status (from filters or summary card)
      if (selectedStatusFilter && booking.bookingStatus !== selectedStatusFilter) {
        return false;
      }

      return true;
    });
  }, [bookings, filters, selectedStatusFilter]);

  const handleResetFilters = () => {
    setFilters({
      search: '',
      bookingId: '',
      customerName: '',
      phoneNumber: '',
      branch: '',
      service: '',
      bookingStatus: '',
      paymentStatus: '',
      city: '',
      dateFrom: '',
      dateTo: '',
      sortBy: '',
    });
    setSelectedStatusFilter(null);
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    // Refetch bookings with new filters
    setTimeout(() => {
      const params = new URLSearchParams();
      
      // If user is branch manager, only show bookings for their branch
      if (userRole === 'branch_admin' && userBranchId) {
        params.append('branch_id', userBranchId);
      }
      
      if (newFilters.bookingStatus) {
        params.append('status', newFilters.bookingStatus);
      }
      if (newFilters.dateFrom) {
        params.append('date_from', newFilters.dateFrom);
      }
      if (newFilters.dateTo) {
        params.append('date_to', newFilters.dateTo);
      }
      if (newFilters.search) {
        params.append('search', newFilters.search);
      }

      fetch(`/api/admin/bookings?${params.toString()}`)
        .then(res => res.json())
        .then(result => setBookings(result.data || []))
        .catch(err => console.error('Error fetching bookings:', err));
    }, 0);
  };

  const handleSummaryCardClick = (filter: string | null) => {
    setSelectedStatusFilter(filter);
  };

  return (
    <AdminLayout>
      <div style={{ padding: '32px', background: '#f9fafb', minHeight: '100vh' }}>
        {/* Page Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', margin: 0 }}>Bookings</h1>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: '8px 0 0 0' }}>
                {userRole === 'branch_admin' ? 'Manage bookings assigned to your branch' : 'Manage and assign all customer bookings across branches'}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  background: '#f3f4f6',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#374151',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#e5e7eb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f3f4f6';
                }}
              >
                <Download size={16} />
                Export
              </button>
              {userRole === 'super_admin' && (
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 16px',
                    background: '#0052cc',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '600',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#0047b2';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#0052cc';
                  }}
                >
                  <Plus size={16} />
                  New Booking
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            padding: '12px 16px',
            background: '#fee2e2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            marginBottom: '16px',
            fontSize: '14px',
            color: '#991b1b',
          }}>
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div style={{
            padding: '40px',
            textAlign: 'center',
            background: 'white',
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
          }}>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>Loading bookings...</p>
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <BookingSummaryCards bookings={bookings} selectedFilter={selectedStatusFilter} onFilterChange={handleSummaryCardClick} />

            {/* Filters */}
            <BookingFilters filters={filters} onFilterChange={handleFilterChange} onReset={handleResetFilters} />

            {/* Bookings Table */}
            <BookingsTable bookings={filteredBookings} onRowClick={setSelectedBooking} sortBy={filters.sortBy} />
          </>
        )}
      </div>

      {/* Booking Details Drawer */}
      {selectedBooking && <BookingDetailsDrawerEnhanced booking={selectedBooking} onClose={() => setSelectedBooking(null)} />}

      {/* Overlay */}
      {selectedBooking && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
          }}
          onClick={() => setSelectedBooking(null)}
        />
      )}
    </AdminLayout>
  );
}
