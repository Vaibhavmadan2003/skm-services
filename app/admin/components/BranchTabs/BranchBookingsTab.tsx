'use client';

import React from 'react';
import { Branch } from '../../lib/mock-branches';

interface BranchBookingsTabProps {
  branch: Branch;
}

export default function BranchBookingsTab({ branch }: BranchBookingsTabProps) {
  // Mock bookings for this branch - would come from API in real app
  const branchBookings = [
    {
      id: 'BK-001001',
      customer: 'Ahmed Al-Mansouri',
      service: 'Home Cleaning',
      date: '2024-01-15',
      amount: 250,
      status: 'Completed',
      paymentStatus: 'Paid',
    },
    {
      id: 'BK-001002',
      customer: 'Fatima Al-Thani',
      service: 'Laundry',
      date: '2024-01-16',
      amount: 180,
      status: 'In Progress',
      paymentStatus: 'Paid',
    },
    {
      id: 'BK-001003',
      customer: 'Mohammed Al-Kaabi',
      service: 'Car Wash',
      date: '2024-01-17',
      amount: 150,
      status: 'Accepted',
      paymentStatus: 'Pending',
    },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, { bg: string; color: string }> = {
      'Completed': { bg: '#d1fae5', color: '#059669' },
      'In Progress': { bg: '#fce7f3', color: '#be185d' },
      'Accepted': { bg: '#fef3c7', color: '#92400e' },
    };
    return colors[status] || { bg: '#f3f4f6', color: '#6b7280' };
  };

  const getPaymentColor = (status: string) => {
    const colors: Record<string, { bg: string; color: string }> = {
      'Paid': { bg: '#d1fae5', color: '#059669' },
      'Pending': { bg: '#fef3c7', color: '#92400e' },
    };
    return colors[status] || { bg: '#f3f4f6', color: '#6b7280' };
  };

  return (
    <div>
      <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', marginBottom: '16px', margin: '0 0 16px 0' }}>
        Branch Bookings ({branchBookings.length})
      </h3>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#6b7280', fontSize: '11px' }}>BOOKING ID</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#6b7280', fontSize: '11px' }}>CUSTOMER</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#6b7280', fontSize: '11px' }}>SERVICE</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#6b7280', fontSize: '11px' }}>DATE</th>
              <th style={{ padding: '12px', textAlign: 'right', fontWeight: '600', color: '#6b7280', fontSize: '11px' }}>AMOUNT</th>
              <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600', color: '#6b7280', fontSize: '11px' }}>STATUS</th>
              <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600', color: '#6b7280', fontSize: '11px' }}>PAYMENT</th>
            </tr>
          </thead>
          <tbody>
            {branchBookings.map((booking) => {
              const statusColor = getStatusColor(booking.status);
              const paymentColor = getPaymentColor(booking.paymentStatus);
              return (
                <tr key={booking.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px', color: '#0052cc', fontWeight: '600' }}>{booking.id}</td>
                  <td style={{ padding: '12px', color: '#111827' }}>{booking.customer}</td>
                  <td style={{ padding: '12px', color: '#6b7280' }}>{booking.service}</td>
                  <td style={{ padding: '12px', color: '#6b7280' }}>{booking.date}</td>
                  <td style={{ padding: '12px', textAlign: 'right', color: '#111827', fontWeight: '600' }}>QAR {booking.amount}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '4px 8px',
                        background: statusColor.bg,
                        color: statusColor.color,
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: '600',
                      }}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '4px 8px',
                        background: paymentColor.bg,
                        color: paymentColor.color,
                        borderRadius: '4px',
                        fontSize: '11px',
                        fontWeight: '600',
                      }}
                    >
                      {booking.paymentStatus}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div style={{ marginTop: '20px', padding: '16px', background: '#f9fafb', borderRadius: '8px', borderLeft: '4px solid #0052cc' }}>
        <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
          Showing <strong>{branchBookings.length}</strong> bookings assigned to this branch. The Super Admin can monitor all bookings, track statuses, and ensure timely payment collection.
        </p>
      </div>
    </div>
  );
}
