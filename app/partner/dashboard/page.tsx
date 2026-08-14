'use client';

import React, { useState, useEffect } from 'react';
import { Loader, AlertCircle } from 'lucide-react';

interface DashboardStats {
  total_bookings: number;
  pending_bookings: number;
  in_progress_bookings: number;
  completed_bookings: number;
  total_revenue: number;
  active_workers: number;
  active_drivers: number;
  todays_bookings: number;
}

interface RecentBooking {
  id: string;
  booking_number: string;
  status: string;
  scheduled_datetime: string;
  total_price: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentBookings, setRecentBookings] = useState<RecentBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const userData = sessionStorage.getItem('userData');
        if (!userData) {
          setError('User session not found');
          setLoading(false);
          return;
        }

        const user = JSON.parse(userData);
        const response = await fetch(`/api/partner/dashboard/stats?branch_id=${user.branchId}`);
        const data = await response.json();

        if (data.success) {
          setStats(data.stats);
          setRecentBookings(data.recent_bookings || []);
        } else {
          setError(data.error || 'Failed to load dashboard data');
        }
      } catch (err) {
        setError('An error occurred');
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div style={{ textAlign: 'center' }}>
          <Loader style={{ width: '32px', height: '32px', animation: 'spin 1s linear infinite', color: '#0052CC', marginBottom: '16px' }} />
          <p style={{ fontSize: '14px', color: '#6b7280' }}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        background: '#fef2f2',
        border: '1px solid #fecaca',
        borderRadius: '8px',
        padding: '16px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px'
      }}>
        <AlertCircle style={{ width: '20px', height: '20px', color: '#dc2626', flexShrink: 0, marginTop: '2px' }} />
        <div>
          <h3 style={{ fontSize: '13px', fontWeight: '600', color: '#991b1b', margin: 0 }}>Error</h3>
          <p style={{ fontSize: '13px', color: '#b91c1c', margin: '4px 0 0 0' }}>{error}</p>
        </div>
      </div>
    );
  }

  const stats_data = stats || {
    total_bookings: 0,
    pending_bookings: 0,
    in_progress_bookings: 0,
    completed_bookings: 0,
    total_revenue: 0,
    active_workers: 0,
    active_drivers: 0,
    todays_bookings: 0,
  };

  const statusColors = {
    'pending': { bg: '#fef3c7', text: '#92400e' },
    'in_progress': { bg: '#fef3c7', text: '#92400e' },
    'completed': { bg: '#d1fae5', text: '#065f46' },
    'assigned': { bg: '#dbeafe', text: '#1e40af' },
    'rejected': { bg: '#fee2e2', text: '#991b1b' }
  };

  return (
    <div style={{ padding: '32px' }}>
      {/* Page Title */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#111827', margin: 0 }}>
          Dashboard
        </h1>
        <p style={{ fontSize: '14px', color: '#6b7280', margin: '8px 0 0 0' }}>
          Welcome back! Here's your branch overview.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        {/* Total Bookings */}
        <div style={{
          background: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <p style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Total Bookings
            </p>
            <span style={{ fontSize: '24px' }}>📊</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>
            {stats_data.total_bookings}
          </div>
          <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>
            All-time bookings
          </p>
        </div>

        {/* Pending Bookings */}
        <div style={{
          background: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <p style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Pending
            </p>
            <span style={{ fontSize: '24px' }}>⏳</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>
            {stats_data.pending_bookings}
          </div>
          <p style={{ fontSize: '13px', color: stats_data.pending_bookings > 0 ? '#ef4444' : '#6b7280', margin: 0 }}>
            {stats_data.pending_bookings > 0 ? '⚠️ Awaiting assignment' : 'No pending bookings'}
          </p>
        </div>

        {/* In Progress */}
        <div style={{
          background: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <p style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              In Progress
            </p>
            <span style={{ fontSize: '24px' }}>▶️</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>
            {stats_data.in_progress_bookings}
          </div>
          <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>
            Currently being worked on
          </p>
        </div>

        {/* Completed */}
        <div style={{
          background: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <p style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Completed
            </p>
            <span style={{ fontSize: '24px' }}>✅</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>
            {stats_data.completed_bookings}
          </div>
          <p style={{ fontSize: '13px', color: '#10b981', margin: 0 }}>
            ✓ Successfully finished
          </p>
        </div>

        {/* Total Revenue */}
        <div style={{
          background: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <p style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Total Revenue
            </p>
            <span style={{ fontSize: '24px' }}>💰</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>
            QAR {stats_data.total_revenue.toFixed(0)}
          </div>
          <p style={{ fontSize: '13px', color: '#10b981', margin: 0 }}>
            Lifetime earnings
          </p>
        </div>

        {/* Active Workers */}
        <div style={{
          background: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <p style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Active Workers
            </p>
            <span style={{ fontSize: '24px' }}>👥</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>
            {stats_data.active_workers}
          </div>
          <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>
            Available for assignments
          </p>
        </div>

        {/* Today's Bookings */}
        <div style={{
          background: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <p style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Today's Bookings
            </p>
            <span style={{ fontSize: '24px' }}>📅</span>
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>
            {stats_data.todays_bookings}
          </div>
          <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>
            Scheduled for today
          </p>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div style={{
        background: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: '0 0 20px 0' }}>
          Recent Bookings
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ textAlign: 'left', padding: '12px 0', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                  Booking #
                </th>
                <th style={{ textAlign: 'left', padding: '12px 0', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                  Status
                </th>
                <th style={{ textAlign: 'left', padding: '12px 0', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                  Date & Time
                </th>
                <th style={{ textAlign: 'left', padding: '12px 0', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.length > 0 ? (
                recentBookings.map((booking, idx) => {
                  const statusColor = statusColors[booking.status as keyof typeof statusColors] || statusColors.pending;
                  return (
                    <tr key={booking.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '12px 0', fontSize: '13px', fontWeight: '600', color: '#0052CC' }}>
                        {booking.booking_number}
                      </td>
                      <td style={{ padding: '12px 0', fontSize: '13px' }}>
                        <span style={{
                          display: 'inline-block',
                          padding: '4px 12px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '600',
                          background: statusColor.bg,
                          color: statusColor.text,
                          textTransform: 'capitalize'
                        }}>
                          {booking.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px 0', fontSize: '13px', color: '#6b7280' }}>
                        {new Date(booking.scheduled_datetime).toLocaleString()}
                      </td>
                      <td style={{ padding: '12px 0', fontSize: '13px', fontWeight: '600', color: '#111827' }}>
                        QAR {booking.total_price.toFixed(2)}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} style={{ padding: '24px', textAlign: 'center', color: '#6b7280', fontSize: '13px' }}>
                    No recent bookings
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
