'use client';

import React, { useState } from 'react';
import { X, Zap, CheckCircle2 } from 'lucide-react';
import { MOCK_BOOKINGS } from '../lib/mock-bookings';

interface AssignBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssign: (selectedBookingIds: string[], reason?: string) => void;
  branchId: string;
  branchName: string;
}

export default function AssignBookingsModal({
  isOpen,
  onClose,
  onAssign,
  branchId,
  branchName,
}: AssignBookingsModalProps) {
  const [selectedBookings, setSelectedBookings] = useState<Set<string>>(new Set());
  const [reason, setReason] = useState<string>('');
  const [filterService, setFilterService] = useState<string>('');

  if (!isOpen) return null;

  // Get pending bookings
  const pendingBookings = MOCK_BOOKINGS.filter((b) => b.bookingStatus === 'pending');
  const filteredBookings = filterService
    ? pendingBookings.filter((b) => b.serviceType === filterService)
    : pendingBookings;

  const handleSelectAll = () => {
    if (selectedBookings.size === filteredBookings.length) {
      setSelectedBookings(new Set());
    } else {
      setSelectedBookings(new Set(filteredBookings.map((b) => b.id)));
    }
  };

  const handleSelectBooking = (bookingId: string) => {
    const newSelection = new Set(selectedBookings);
    if (newSelection.has(bookingId)) {
      newSelection.delete(bookingId);
    } else {
      newSelection.add(bookingId);
    }
    setSelectedBookings(newSelection);
  };

  const handleAssign = () => {
    if (selectedBookings.size === 0) {
      alert('Please select at least one booking');
      return;
    }
    onAssign(Array.from(selectedBookings), reason);
    setSelectedBookings(new Set());
    setReason('');
    setFilterService('');
  };

  const uniqueServices = Array.from(new Set(pendingBookings.map((b) => b.serviceType)));
  const totalAmount = Array.from(selectedBookings).reduce((sum, id) => {
    const booking = pendingBookings.find((b) => b.id === id);
    return sum + (booking?.amount || 0);
  }, 0);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 20px 25px rgba(0, 0, 0, 0.15)',
          width: '90%',
          maxWidth: '600px',
          maxHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ padding: '24px', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: 0 }}>
              Assign Bookings
            </h2>
            <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 0 0' }}>
              to {branchName}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#6b7280',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Filter */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '8px' }}>
              Filter by Service (Optional)
            </label>
            <select
              value={filterService}
              onChange={(e) => setFilterService(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '13px',
                outline: 'none',
                background: 'white',
                cursor: 'pointer',
              }}
            >
              <option value="">All Services</option>
              {uniqueServices.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          {/* Bookings List */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <p style={{ fontSize: '13px', fontWeight: '600', color: '#111827', margin: 0 }}>
                Available Bookings ({filteredBookings.length})
              </p>
              <button
                onClick={handleSelectAll}
                style={{
                  fontSize: '12px',
                  color: '#0052cc',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '600',
                }}
              >
                {selectedBookings.size === filteredBookings.length && filteredBookings.length > 0
                  ? 'Deselect All'
                  : 'Select All'}
              </button>
            </div>

            {filteredBookings.length === 0 ? (
              <div
                style={{
                  background: '#f9fafb',
                  padding: '24px',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  textAlign: 'center',
                }}
              >
                <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>
                  No pending bookings available
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '300px', overflow: 'auto' }}>
                {filteredBookings.map((booking) => (
                  <label
                    key={booking.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px',
                      background: '#f9fafb',
                      border: selectedBookings.has(booking.id)
                        ? '1px solid #0052cc'
                        : '1px solid #e5e7eb',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      if (!selectedBookings.has(booking.id)) {
                        e.currentTarget.style.background = '#f3f4f6';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!selectedBookings.has(booking.id)) {
                        e.currentTarget.style.background = '#f9fafb';
                      }
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedBookings.has(booking.id)}
                      onChange={() => handleSelectBooking(booking.id)}
                      style={{
                        width: '16px',
                        height: '16px',
                        cursor: 'pointer',
                        accentColor: '#0052cc',
                      }}
                    />
                    <div style={{ flex: 1, marginLeft: '12px' }}>
                      <p style={{ fontSize: '12px', fontWeight: '600', color: '#111827', margin: 0 }}>
                        {booking.bookingNumber}
                      </p>
                      <p style={{ fontSize: '11px', color: '#6b7280', margin: '2px 0 0 0' }}>
                        {booking.customerName} • {booking.serviceType}
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '12px', fontWeight: '600', color: '#059669', margin: 0 }}>
                        QAR {booking.amount}
                      </p>
                      <p style={{ fontSize: '11px', color: '#6b7280', margin: '2px 0 0 0' }}>
                        {new Date(booking.bookingDate).toLocaleDateString()}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Reason */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '8px' }}>
              Reason (Optional)
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Add notes about this assignment..."
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '13px',
                outline: 'none',
                fontFamily: 'inherit',
                resize: 'vertical',
                minHeight: '60px',
              }}
            />
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '24px', borderTop: '1px solid #e5e7eb', background: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontSize: '11px', fontWeight: '600', color: '#6b7280', margin: 0, textTransform: 'uppercase' }}>
              Selected / Total Amount
            </p>
            <p style={{ fontSize: '16px', fontWeight: '700', color: '#0052cc', margin: '4px 0 0 0' }}>
              QAR {totalAmount} / {pendingBookings.reduce((sum, b) => sum + b.amount, 0)}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={onClose}
              style={{
                padding: '10px 16px',
                background: '#f3f4f6',
                color: '#6b7280',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#e5e7eb')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#f3f4f6')}
            >
              Cancel
            </button>
            <button
              onClick={handleAssign}
              style={{
                padding: '10px 16px',
                background: '#0052cc',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#0047b2')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#0052cc')}
            >
              <Zap size={14} />
              Assign {selectedBookings.size} {selectedBookings.size === 1 ? 'Booking' : 'Bookings'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
