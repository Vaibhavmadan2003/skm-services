'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, ChevronRight } from 'lucide-react';

interface Booking {
  id: string;
  booking_number: string;
  customer_name?: string;
  service?: string;
  service_name?: string;
  service_category?: string;
  status: 'pending' | 'assigned' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  scheduled_date?: string;
  scheduled_datetime?: string;
  total_price?: number;
  service_address?: string;
}

export default function BookingsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      
      // Get branch ID from sessionStorage (set during login)
      const userData = sessionStorage.getItem('userData');
      if (!userData) {
        console.error('User session not found');
        setIsLoading(false);
        return;
      }
      
      const user = JSON.parse(userData);
      const branchId = user.branchId;
      
      if (!branchId) {
        console.error('Branch ID not found in session');
        setIsLoading(false);
        return;
      }
      
      console.log('[Partner Bookings] Fetching for branch:', branchId);
      
      // Fetch ALL bookings assigned to this branch from DATABASE
      // sessionStorage only provides branchId context, actual data comes from API/Database
      const response = await fetch(`/api/partner/bookings?branch_id=${branchId}`);
      if (response.ok) {
        const data = await response.json();
        console.log('[Partner Bookings] Fetched:', data.bookings?.length || 0, 'bookings');
        setBookings(data.bookings || []);
      } else {
        console.error('Failed to fetch bookings:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const statusColors = {
    'pending': { bg: '#fef3c7', text: '#92400e', label: 'Pending' },
    'assigned': { bg: '#dbeafe', text: '#1e40af', label: 'Assigned' },
    'accepted': { bg: '#dbeafe', text: '#1e40af', label: 'Accepted' },
    'in_progress': { bg: '#fecdd3', text: '#991b1b', label: 'In Progress' },
    'completed': { bg: '#d1fae5', text: '#065f46', label: 'Completed' },
    'cancelled': { bg: '#fee2e2', text: '#991b1b', label: 'Cancelled' }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = (booking.customer_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                          (booking.booking_number?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                          (booking.service?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (isLoading) {
    return (
      <div style={{ padding: '32px' }}>
        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '60px 40px', textAlign: 'center' }}>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Loading bookings...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '32px' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#111827', margin: 0 }}>
          Bookings
        </h1>
        <p style={{ fontSize: '14px', color: '#6b7280', margin: '8px 0 0 0' }}>
          Manage all your service bookings and assignments
        </p>
      </div>

      {/* Toolbar */}
      <div style={{
        display: 'flex',
        gap: '16px',
        marginBottom: '24px',
        flexWrap: 'wrap',
        alignItems: 'center'
      }}>
        {/* Search Box */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flex: '1 1 auto',
          minWidth: '200px',
          padding: '0 12px',
          borderRadius: '8px',
          border: '1px solid #e5e7eb',
          background: 'white'
        }}>
          <Search size={18} style={{ color: '#9ca3af' }} />
          <input
            type="text"
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              padding: '10px 0',
              fontSize: '14px',
              fontFamily: 'inherit'
            }}
          />
        </div>

        {/* Filter Dropdown */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{
            padding: '8px 12px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            background: 'white',
            fontSize: '14px',
            cursor: 'pointer',
            fontWeight: '500',
            color: '#6b7280'
          }}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="assigned">Assigned</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        {/* Add Booking Button */}
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            background: 'linear-gradient(135deg, #0052CC 0%, #003D99 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 82, 204, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <Plus size={18} />
          <span>New Booking</span>
        </button>
      </div>

      {/* Bookings Table */}
      <div style={{
        background: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        overflow: 'hidden'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ textAlign: 'left', padding: '16px', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                  Booking ID
                </th>
                <th style={{ textAlign: 'left', padding: '16px', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                  Customer
                </th>
                <th style={{ textAlign: 'left', padding: '16px', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                  Service
                </th>
                <th style={{ textAlign: 'left', padding: '16px', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                  Status
                </th>
                <th style={{ textAlign: 'left', padding: '16px', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                  Date
                </th>
                <th style={{ textAlign: 'left', padding: '16px', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                  Amount
                </th>
                <th style={{ textAlign: 'center', padding: '16px', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', width: '50px' }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking) => {
                  const statusInfo = statusColors[booking.status];
                  return (
                    <tr key={booking.id} style={{ borderBottom: '1px solid #f3f4f6', transition: 'background-color 0.2s ease' }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <td style={{ padding: '16px', fontSize: '13px', fontWeight: '600', color: '#0052CC' }}>
                        {booking.booking_number}
                      </td>
                      <td style={{ padding: '16px', fontSize: '13px', fontWeight: '500', color: '#111827' }}>
                        {booking.customer_name || 'N/A'}
                      </td>
                      <td style={{ padding: '16px', fontSize: '13px', color: '#6b7280' }}>
                        {booking.service_name || booking.service || 'N/A'}
                      </td>
                      <td style={{ padding: '16px', fontSize: '13px' }}>
                        <span style={{
                          display: 'inline-block',
                          padding: '4px 12px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '600',
                          background: statusColors[booking.status]?.bg || '#f3f4f6',
                          color: statusColors[booking.status]?.text || '#6b7280'
                        }}>
                          {statusColors[booking.status]?.label || booking.status}
                        </span>
                      </td>
                      <td style={{ padding: '16px', fontSize: '13px', color: '#6b7280' }}>
                        {booking.scheduled_date ? new Date(booking.scheduled_date).toLocaleDateString() : booking.scheduled_datetime ? new Date(booking.scheduled_datetime).toLocaleDateString() : 'N/A'}
                      </td>
                      <td style={{ padding: '16px', fontSize: '13px', fontWeight: '600', color: '#111827' }}>
                        {booking.total_price ? `QAR ${booking.total_price}` : 'N/A'}
                      </td>
                      <td style={{ padding: '16px', textAlign: 'center' }}>
                        <button style={{
                          padding: '4px',
                          border: 'none',
                          background: 'transparent',
                          cursor: 'pointer',
                          color: '#6b7280',
                          transition: 'color 0.2s ease'
                        }}
                          onMouseEnter={(e) => e.currentTarget.style.color = '#0052CC'}
                          onMouseLeave={(e) => e.currentTarget.style.color = '#6b7280'}
                        >
                          <ChevronRight size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} style={{ padding: '32px', textAlign: 'center', color: '#6b7280', fontSize: '14px' }}>
                    No bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
