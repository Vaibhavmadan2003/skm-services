'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/app/admin/components/AdminLayout';

interface DashboardStats {
  totalBranches: number;
  activeBranches: number;
  suspendedBranches: number;
  totalServices: number;
  totalStaff: number;
  totalDrivers: number;
  totalRevenue: number;
}

interface RecentBooking {
  id: string;
  bookingNumber: string;
  serviceType: string;
  assignedBranchName: string;
  bookingStatus: string;
  amount: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentBookings, setRecentBookings] = useState<RecentBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookingsLoading, setBookingsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  useEffect(() => {
    if (isAuthorized) {
      const fetchDashboardStats = async () => {
        try {
          const response = await fetch('/api/admin/dashboard/stats');
          if (!response.ok) throw new Error('Failed to fetch stats');
          const data = await response.json();
          setStats(data);
        } catch (error) {
          console.error('Error fetching dashboard stats:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchDashboardStats();

      // Fetch recent bookings
      const fetchRecentBookings = async () => {
        try {
          const response = await fetch('/api/admin/bookings?limit=5&offset=0');
          if (!response.ok) throw new Error('Failed to fetch recent bookings');
          const result = await response.json();
          console.log('[Dashboard] Recent bookings:', result.data);
          setRecentBookings(result.data || []);
        } catch (error) {
          console.error('Error fetching recent bookings:', error);
          setRecentBookings([]);
        } finally {
          setBookingsLoading(false);
        }
      };

      fetchRecentBookings();
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>Loading...</div>;
  }

  return (
    <AdminLayout>
      <div style={{ padding: '32px' }}>
        {/* Page Title */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#111827', margin: 0 }}>
            Dashboard
          </h1>
          <p style={{ fontSize: '14px', color: '#6b7280', margin: '8px 0 0 0' }}>
            Welcome back! Here's your business overview.
          </p>
        </div>

        {/* KPI Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}>
          {/* Total Branches */}
          <div style={{
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <p style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Total Branches
                </p>
              </div>
              <div style={{ fontSize: '24px' }}>🏢</div>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>
              {loading ? '-' : stats?.totalBranches || 0}
            </div>
            <p style={{ fontSize: '13px', color: stats?.activeBranches ? '#10b981' : '#6b7280', margin: 0 }}>
              {loading ? 'Loading...' : `${stats?.activeBranches || 0} active, ${stats?.suspendedBranches || 0} suspended`}
            </p>
          </div>

          {/* Active Branches */}
          <div style={{
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <p style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Services Added
                </p>
              </div>
              <div style={{ fontSize: '24px' }}>🛎️</div>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>
              {loading ? '-' : stats?.totalServices || 0}
            </div>
            <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>
              Across all branches
            </p>
          </div>

          {/* Total Staff */}
          <div style={{
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <p style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Total Staff
                </p>
              </div>
              <div style={{ fontSize: '24px' }}>👥</div>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>
              {loading ? '-' : stats?.totalStaff || 0}
            </div>
            <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>
              Across all branches
            </p>
          </div>

          {/* Total Drivers */}
          <div style={{
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <p style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Total Drivers
                </p>
              </div>
              <div style={{ fontSize: '24px' }}>🚗</div>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>
              {loading ? '-' : stats?.totalDrivers || 0}
            </div>
            <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>
              Across all branches
            </p>
          </div>

          {/* Monthly Revenue */}
          <div style={{
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <p style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Total Revenue
                </p>
              </div>
              <div style={{ fontSize: '24px' }}>💰</div>
            </div>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>
              {loading ? '-' : `QR ${(stats?.totalRevenue || 0).toLocaleString()}`}
            </div>
            <p style={{ fontSize: '13px', color: '#10b981', margin: 0 }}>
              {loading ? 'Loading...' : 'From all branches'}
            </p>
          </div>

          {/* Branch Details Link */}
          <div style={{
            background: '#f0f4ff',
            border: '1px solid #dbeafe',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <p style={{ fontSize: '12px', color: '#1e40af', fontWeight: '500', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  View Details
                </p>
              </div>
              <div style={{ fontSize: '24px' }}>📊</div>
            </div>
            <p style={{ fontSize: '13px', color: '#1e40af', margin: '0 0 12px 0', fontWeight: '600' }}>
              Click on any branch to see detailed module statistics
            </p>
            <p style={{ fontSize: '12px', color: '#3b82f6', margin: 0 }}>
              Services, Staff, Drivers counts available per branch
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}>
          {/* Revenue Chart */}
          <div style={{
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: '0 0 20px 0' }}>
              Revenue Trend (Last 12 Months)
            </h3>
            <div style={{
              height: '300px',
              background: '#f9fafb',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-around',
              padding: '20px',
              gap: '8px'
            }}>
              {[40, 65, 50, 75, 90, 70, 85, 95, 110, 100, 120, 140].map((value, idx) => (
                <div key={idx} style={{
                  flex: 1,
                  height: `${(value / 140) * 100}%`,
                  background: `linear-gradient(180deg, #0052CC 0%, #003D99 100%)`,
                  borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  minHeight: '20px'
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.8';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}
                />
              ))}
            </div>
          </div>

          {/* Bookings Status */}
          <div style={{
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: '0 0 20px 0' }}>
              Booking Status Distribution
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              {[
                { label: 'Completed', value: 287, color: '#10b981', percentage: 45 },
                { label: 'In Progress', value: 156, color: '#f59e0b', percentage: 25 },
                { label: 'Assigned', value: 124, color: '#3b82f6', percentage: 20 },
                { label: 'Pending', value: 53, color: '#ef4444', percentage: 10 }
              ].map((item, idx) => (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '500', color: '#6b7280' }}>
                      {item.label}
                    </span>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#111827' }}>
                      {item.value}
                    </span>
                  </div>
                  <div style={{ height: '8px', background: '#f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${item.percentage}%`,
                      background: item.color,
                      borderRadius: '4px',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
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
          {bookingsLoading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
              Loading bookings...
            </div>
          ) : recentBookings.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
              No bookings found
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <th style={{ textAlign: 'left', padding: '12px 0', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                    Booking ID
                  </th>
                  <th style={{ textAlign: 'left', padding: '12px 0', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                    Service
                  </th>
                  <th style={{ textAlign: 'left', padding: '12px 0', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                    Branch
                  </th>
                  <th style={{ textAlign: 'left', padding: '12px 0', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                    Status
                  </th>
                  <th style={{ textAlign: 'left', padding: '12px 0', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking, idx) => {
                  const statusColors: Record<string, { bg: string; text: string }> = {
                    'completed': { bg: '#d1fae5', text: '#065f46' },
                    'in_progress': { bg: '#fef3c7', text: '#92400e' },
                    'confirmed': { bg: '#dbeafe', text: '#1e40af' },
                    'assigned': { bg: '#dbeafe', text: '#1e40af' },
                    'pending': { bg: '#fee2e2', text: '#991b1b' },
                    'cancelled': { bg: '#fecaca', text: '#7c2d12' }
                  };

                  const statusColor = statusColors[booking.bookingStatus] || { bg: '#f3f4f6', text: '#111827' };
                  const displayStatus = booking.bookingStatus.charAt(0).toUpperCase() + booking.bookingStatus.slice(1).replace('_', ' ');

                  return (
                    <tr key={idx} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '12px 0', fontSize: '13px', fontWeight: '600', color: '#0052CC' }}>
                        {booking.bookingNumber}
                      </td>
                      <td style={{ padding: '12px 0', fontSize: '13px', color: '#111827' }}>
                        {booking.serviceType}
                      </td>
                      <td style={{ padding: '12px 0', fontSize: '13px', color: '#6b7280' }}>
                        {booking.assignedBranchName || 'Unassigned'}
                      </td>
                      <td style={{ padding: '12px 0', fontSize: '13px' }}>
                        <span style={{
                          display: 'inline-block',
                          padding: '4px 12px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '600',
                          background: statusColor.bg,
                          color: statusColor.text
                        }}>
                          {displayStatus}
                        </span>
                      </td>
                      <td style={{ padding: '12px 0', fontSize: '13px', fontWeight: '600', color: '#111827' }}>
                        QR {booking.amount.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
