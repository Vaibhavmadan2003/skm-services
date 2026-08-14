'use client';

import React from 'react';
import { Branch } from '../../lib/mock-branches';
import { MOCK_BOOKINGS } from '../../lib/mock-bookings';
import { TrendingUp, AlertCircle } from 'lucide-react';

interface BranchAssignmentTabProps {
  branch: Branch;
}

export default function BranchAssignmentTab({ branch }: BranchAssignmentTabProps) {
  // Mock data for pending bookings
  const pendingBookings = MOCK_BOOKINGS.filter((b) => b.bookingStatus === 'pending').slice(0, 5);
  const assignedBookingsCount = MOCK_BOOKINGS.filter((b) => b.assignedBranchId === branch.id).length;
  const totalBookingsCapacity = 50;
  const utilizationPercentage = Math.round((assignedBookingsCount / totalBookingsCapacity) * 100);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Assignment Overview */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <p style={{ fontSize: '11px', fontWeight: '600', color: '#6b7280', margin: 0, textTransform: 'uppercase' }}>
            Assigned Bookings
          </p>
          <p style={{ fontSize: '24px', fontWeight: '700', color: '#0052cc', margin: '8px 0 0 0' }}>
            {assignedBookingsCount}
          </p>
        </div>
        <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <p style={{ fontSize: '11px', fontWeight: '600', color: '#6b7280', margin: 0, textTransform: 'uppercase' }}>
            Capacity Utilization
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
            <p style={{ fontSize: '24px', fontWeight: '700', color: '#059669', margin: 0 }}>
              {utilizationPercentage}%
            </p>
            <TrendingUp size={16} style={{ color: '#059669' }} />
          </div>
        </div>
      </div>

      {/* Pending Bookings */}
      <div>
        <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: '0 0 12px 0' }}>
          Pending Bookings Available
        </h3>
        {pendingBookings.length === 0 ? (
          <div style={{ background: '#f9fafb', padding: '24px', borderRadius: '8px', border: '1px solid #e5e7eb', textAlign: 'center' }}>
            <AlertCircle size={24} style={{ color: '#d1d5db', marginBottom: '8px' }} />
            <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>No pending bookings available for assignment</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {pendingBookings.map((booking) => (
              <div
                key={booking.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px',
                  background: '#f9fafb',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f3f4f6';
                  e.currentTarget.style.borderColor = '#d1d5db';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f9fafb';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }}
              >
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '12px', fontWeight: '600', color: '#111827', margin: '0 0 2px 0' }}>
                    {booking.bookingNumber}
                  </p>
                  <p style={{ fontSize: '11px', color: '#6b7280', margin: 0 }}>
                    {booking.customerName} • {booking.serviceType} • QAR {booking.amount}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '11px', color: '#6b7280', margin: 0 }}>
                    {new Date(booking.bookingDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Assignment Guidelines */}
      <div style={{ background: '#eff6ff', padding: '16px', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
        <p style={{ fontSize: '12px', fontWeight: '600', color: '#0369a1', margin: '0 0 8px 0' }}>
          Assignment Guidelines
        </p>
        <ul style={{ fontSize: '12px', color: '#075985', margin: 0, paddingLeft: '20px' }}>
          <li>Assign bookings based on branch availability and capacity</li>
          <li>Consider worker and driver skill sets for service type</li>
          <li>Monitor branch utilization to avoid overload</li>
          <li>Use the Assign Bookings button to batch assign multiple bookings</li>
        </ul>
      </div>

      {/* Assignment History */}
      <div>
        <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: '0 0 12px 0' }}>
          Recent Assignments
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { booking: 'BK-2024-001', date: '2024-01-15', status: 'Completed' },
            { booking: 'BK-2024-002', date: '2024-01-14', status: 'In Progress' },
            { booking: 'BK-2024-003', date: '2024-01-13', status: 'Completed' },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px',
                background: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
              }}
            >
              <div>
                <p style={{ fontSize: '12px', fontWeight: '600', color: '#111827', margin: 0 }}>
                  {item.booking}
                </p>
                <p style={{ fontSize: '11px', color: '#6b7280', margin: '2px 0 0 0' }}>
                  {new Date(item.date).toLocaleDateString()}
                </p>
              </div>
              <span
                style={{
                  display: 'inline-block',
                  padding: '4px 8px',
                  background: item.status === 'Completed' ? '#dcfce7' : '#fef3c7',
                  color: item.status === 'Completed' ? '#166534' : '#92400e',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: '600',
                }}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
