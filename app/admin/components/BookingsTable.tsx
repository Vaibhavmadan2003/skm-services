'use client';

import React, { useState, useMemo } from 'react';
import { ChevronDown, MoreVertical, Eye, Zap, ArrowRightLeft, X, CheckCircle, Download } from 'lucide-react';
import { Booking } from '../lib/mock-bookings';
import BookingStatusBadge from './BookingStatusBadge';
import PaymentStatusBadge from './PaymentStatusBadge';

interface BookingsTableProps {
  bookings: Booking[];
  onRowClick: (booking: Booking) => void;
  sortBy?: string;
}

export default function BookingsTable({ bookings, onRowClick, sortBy = 'newest' }: BookingsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const itemsPerPage = 10;

  // Sort bookings
  const sortedBookings = useMemo(() => {
    const sorted = [...bookings];
    if (sortBy === 'oldest') {
      return sorted.reverse();
    } else if (sortBy === 'amount_high') {
      return sorted.sort((a, b) => b.amount - a.amount);
    } else if (sortBy === 'amount_low') {
      return sorted.sort((a, b) => a.amount - b.amount);
    }
    return sorted;
  }, [bookings, sortBy]);

  // Paginate
  const paginatedBookings = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedBookings.slice(start, start + itemsPerPage);
  }, [sortedBookings, currentPage]);

  const totalPages = Math.ceil(sortedBookings.length / itemsPerPage);

  const ActionMenu = ({ booking }: { booking: Booking }) => (
    <div style={{ position: 'relative' }}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpenMenuId(openMenuId === booking.id ? null : booking.id);
        }}
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '4px 8px',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = '#f3f4f6')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
      >
        <MoreVertical size={16} color="#6b7280" />
      </button>

      {openMenuId === booking.id && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            minWidth: '180px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            zIndex: 100,
            marginTop: '4px',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => {
              onRowClick(booking);
              setOpenMenuId(null);
            }}
            style={{
              width: '100%',
              padding: '10px 16px',
              background: 'transparent',
              border: 'none',
              textAlign: 'left',
              cursor: 'pointer',
              fontSize: '13px',
              color: '#111827',
              borderBottom: '1px solid #f3f4f6',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#f9fafb')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            <Eye size={14} />
            View Details
          </button>

          {booking.bookingStatus === 'pending' && (
            <button
              onClick={() => {
                alert('Assign branch feature coming soon!');
                setOpenMenuId(null);
              }}
              style={{
                width: '100%',
                padding: '10px 16px',
                background: 'transparent',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '13px',
                color: '#111827',
                borderBottom: '1px solid #f3f4f6',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#f9fafb')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <Zap size={14} />
              Assign Branch
            </button>
          )}

          {booking.bookingStatus === 'assigned' && (
            <button
              onClick={() => {
                alert('Reassign feature coming soon!');
                setOpenMenuId(null);
              }}
              style={{
                width: '100%',
                padding: '10px 16px',
                background: 'transparent',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '13px',
                color: '#111827',
                borderBottom: '1px solid #f3f4f6',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#f9fafb')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <ArrowRightLeft size={14} />
              Reassign
            </button>
          )}

          {['pending', 'assigned', 'accepted'].includes(booking.bookingStatus) && (
            <button
              onClick={async () => {
                const confirmed = window.confirm(
                  `Are you sure you want to cancel booking ${booking.bookingNumber}?`
                );
                if (!confirmed) return;

                try {
                  console.log('[BookingsTable] Sending cancel request:', {
                    bookingId: booking.id,
                    bookingNumber: booking.bookingNumber,
                    branchId: booking.assignedBranchId,
                  });

                  const response = await fetch('/api/admin/bookings/cancel', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      bookingId: booking.id,
                      bookingNumber: booking.bookingNumber,
                      branchId: booking.assignedBranchId,
                      reason: 'Cancelled by super admin',
                    }),
                  });

                  const data = await response.json();
                  console.log('[BookingsTable] Cancel response:', { status: response.status, data });

                  if (response.ok) {
                    console.log('[BookingsTable] ✅ Booking cancelled successfully');
                    alert('Booking cancelled successfully. Branch admin has been notified.');
                    // Reload page to refresh bookings list
                    window.location.reload();
                  } else {
                    console.error('[BookingsTable] ❌ Cancel failed:', data);
                    alert('Error: ' + (data.error || 'Failed to cancel booking'));
                  }
                } catch (error) {
                  console.error('[BookingsTable] ❌ Cancel error:', error);
                  alert('Error cancelling booking: ' + (error instanceof Error ? error.message : String(error)));
                }
                setOpenMenuId(null);
              }}
              style={{
                width: '100%',
                padding: '10px 16px',
                background: 'transparent',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '13px',
                color: '#dc2626',
                borderBottom: '1px solid #f3f4f6',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#fef2f2')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <X size={14} />
              Cancel Booking
            </button>
          )}

          {booking.bookingStatus === 'completed' && (
            <button
              onClick={() => {
                alert('Download invoice feature coming soon!');
                setOpenMenuId(null);
              }}
              style={{
                width: '100%',
                padding: '10px 16px',
                background: 'transparent',
                border: 'none',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '13px',
                color: '#111827',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#f9fafb')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <Download size={14} />
              Download Invoice
            </button>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase' }}>
                Booking ID
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase' }}>
                Customer
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase' }}>
                Phone
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase' }}>
                Service
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase' }}>
                Branch
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase' }}>
                Worker
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase' }}>
                Date & Time
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '12px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase' }}>
                Amount
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '12px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase' }}>
                Payment
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '12px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase' }}>
                Status
              </th>
              <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '12px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase' }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedBookings.map((booking, idx) => (
              <tr
                key={booking.id}
                onClick={() => onRowClick(booking)}
                style={{
                  borderBottom: '1px solid #e5e7eb',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#f9fafb')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '600', color: '#0052cc' }}>{booking.bookingNumber}</td>
                <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '500', color: '#111827' }}>{booking.customerName}</td>
                <td style={{ padding: '12px 16px', fontSize: '13px', color: '#6b7280' }}>{booking.customerPhone}</td>
                <td style={{ padding: '12px 16px', fontSize: '13px', color: '#111827' }}>
                  {booking.serviceType || 'N/A'}
                </td>
                <td style={{ padding: '12px 16px', fontSize: '13px', color: '#111827' }}>
                  {booking.assignedBranchName || <span style={{ color: '#6b7280' }}>Unassigned</span>}
                </td>
                <td style={{ padding: '12px 16px', fontSize: '13px', color: '#111827' }}>
                  {booking.assignedWorkerName || <span style={{ color: '#6b7280' }}>—</span>}
                </td>
                <td style={{ padding: '12px 16px', fontSize: '13px', color: '#6b7280' }}>
                  {booking.bookingDate} {booking.bookingTime}
                </td>
                <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '600', color: '#111827', textAlign: 'right' }}>
                  QAR {booking.amount}
                </td>
                <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                  <PaymentStatusBadge status={booking.paymentStatus} size="sm" />
                </td>
                <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                  <BookingStatusBadge status={booking.bookingStatus} size="sm" />
                </td>
                <td style={{ padding: '12px 16px', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
                  <ActionMenu booking={booking} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={{ padding: '16px 20px', borderTop: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, sortedBookings.length)} of {sortedBookings.length} bookings
        </p>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            style={{
              padding: '8px 12px',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              background: 'white',
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
              opacity: currentPage === 1 ? 0.5 : 1,
              fontSize: '13px',
              fontWeight: '500',
              color: '#6b7280',
            }}
          >
            Previous
          </button>
          {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                style={{
                  padding: '8px 10px',
                  border: page === currentPage ? 'none' : '1px solid #e5e7eb',
                  borderRadius: '6px',
                  background: page === currentPage ? '#0052cc' : 'white',
                  color: page === currentPage ? 'white' : '#6b7280',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: page === currentPage ? '600' : '500',
                }}
              >
                {page}
              </button>
            );
          })}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            style={{
              padding: '8px 12px',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              background: 'white',
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
              opacity: currentPage === totalPages ? 0.5 : 1,
              fontSize: '13px',
              fontWeight: '500',
              color: '#6b7280',
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
