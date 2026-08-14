'use client';

import React, { useState } from 'react';
import { X, Download, Printer, MapPin, Phone, Mail, Zap } from 'lucide-react';
import { Booking } from '../lib/mock-bookings';
import BookingStatusBadge from './BookingStatusBadge';
import PaymentStatusBadge from './PaymentStatusBadge';

interface BookingDetailsDrawerProps {
  booking: Booking | null;
  onClose: () => void;
  onAssignBranch?: (bookingId: string) => void;
  onReassign?: (bookingId: string) => void;
}

export default function BookingDetailsDrawer({
  booking,
  onClose,
  onAssignBranch,
  onReassign,
}: BookingDetailsDrawerProps) {
  if (!booking) return null;

  const [selectedTab, setSelectedTab] = useState<'overview' | 'timeline' | 'documents'>('overview');

  const getTimelineStages = () => {
    const stages = [
      { name: 'Created', date: booking.createdAt, completed: true },
      { name: 'Assigned', date: booking.assignedAt, completed: !!booking.assignedAt },
      { name: 'Accepted', date: booking.acceptedAt, completed: !!booking.acceptedAt },
      { name: 'Started', date: booking.startedAt, completed: !!booking.startedAt },
      { name: 'Completed', date: booking.completedAt, completed: !!booking.completedAt },
    ];

    if (booking.bookingStatus === 'cancelled') {
      stages.push({ name: 'Cancelled', date: booking.cancelledAt, completed: true });
    }

    return stages;
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not yet';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: '500px',
        background: 'white',
        boxShadow: '-4px 0 12px rgba(0, 0, 0, 0.15)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        animation: 'slideInRight 0.3s ease-out',
      }}
    >
      {/* Header */}
      <div style={{ padding: '20px', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: 0 }}>Booking Details</h2>
          <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 0 0' }}>{booking.bookingNumber}</p>
        </div>
        <button
          onClick={onClose}
          style={{
            background: '#f3f4f6',
            border: 'none',
            borderRadius: '8px',
            padding: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#e5e7eb')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#f3f4f6')}
        >
          <X size={20} />
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0', borderBottom: '1px solid #e5e7eb', padding: '0 20px' }}>
        {['overview', 'timeline', 'documents'].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab as any)}
            style={{
              padding: '12px 0',
              marginRight: '24px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: selectedTab === tab ? '600' : '500',
              color: selectedTab === tab ? '#0052cc' : '#6b7280',
              borderBottom: selectedTab === tab ? '2px solid #0052cc' : 'none',
              textTransform: 'capitalize',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: '20px' }}>
        {selectedTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Booking Info */}
            <div>
              <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', marginBottom: '12px' }}>
                Booking Information
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ background: '#f9fafb', padding: '12px', borderRadius: '8px' }}>
                  <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 4px 0' }}>Booking ID</p>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: 0 }}>{booking.bookingNumber}</p>
                </div>
                <div style={{ background: '#f9fafb', padding: '12px', borderRadius: '8px' }}>
                  <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 4px 0' }}>Date</p>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: 0 }}>{booking.bookingDate}</p>
                </div>
                <div style={{ background: '#f9fafb', padding: '12px', borderRadius: '8px' }}>
                  <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 4px 0' }}>Time</p>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: 0 }}>{booking.bookingTime}</p>
                </div>
                <div style={{ background: '#f9fafb', padding: '12px', borderRadius: '8px' }}>
                  <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 4px 0' }}>Service</p>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: 0 }}>{booking.serviceType}</p>
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div>
              <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', marginBottom: '12px' }}>
                Customer Information
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ background: '#f9fafb', padding: '12px', borderRadius: '8px' }}>
                  <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 4px 0' }}>Name</p>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: 0 }}>{booking.customerName}</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ flex: 1, background: '#f9fafb', padding: '12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Phone size={16} style={{ color: '#0052cc' }} />
                    <div>
                      <p style={{ fontSize: '11px', color: '#6b7280', margin: '0' }}>Phone</p>
                      <p style={{ fontSize: '13px', fontWeight: '600', color: '#111827', margin: 0 }}>{booking.customerPhone}</p>
                    </div>
                  </div>
                  <div style={{ flex: 1, background: '#f9fafb', padding: '12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Mail size={16} style={{ color: '#0052cc' }} />
                    <div>
                      <p style={{ fontSize: '11px', color: '#6b7280', margin: '0' }}>Email</p>
                      <p style={{ fontSize: '13px', fontWeight: '600', color: '#111827', margin: 0 }}>{booking.customerEmail}</p>
                    </div>
                  </div>
                </div>
                <div style={{ background: '#f9fafb', padding: '12px', borderRadius: '8px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <MapPin size={16} style={{ color: '#0052cc', marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 4px 0' }}>Address</p>
                    <p style={{ fontSize: '13px', fontWeight: '600', color: '#111827', margin: 0 }}>{booking.customerAddress}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Branch Info */}
            {booking.assignedBranchId && (
              <div>
                <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', marginBottom: '12px' }}>
                  Branch Information
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div style={{ background: '#f9fafb', padding: '12px', borderRadius: '8px' }}>
                    <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 4px 0' }}>Branch</p>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: 0 }}>{booking.assignedBranchName}</p>
                  </div>
                  <div style={{ background: '#f9fafb', padding: '12px', borderRadius: '8px' }}>
                    <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 4px 0' }}>Manager</p>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: 0 }}>{booking.branchManager}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Worker & Driver */}
            {booking.assignedWorkerId && (
              <div>
                <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', marginBottom: '12px' }}>
                  Assignment
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div style={{ background: '#f9fafb', padding: '12px', borderRadius: '8px' }}>
                    <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 4px 0' }}>Worker</p>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: 0 }}>{booking.assignedWorkerName}</p>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 0 0' }}>{booking.assignedWorkerPhone}</p>
                  </div>
                  <div style={{ background: '#f9fafb', padding: '12px', borderRadius: '8px' }}>
                    <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 4px 0' }}>Driver</p>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: 0 }}>{booking.assignedDriverName}</p>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 0 0' }}>{booking.vehicleNumber}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Info */}
            <div>
              <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', marginBottom: '12px' }}>
                Payment Information
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ background: '#f9fafb', padding: '12px', borderRadius: '8px' }}>
                  <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 4px 0' }}>Amount</p>
                  <p style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: 0 }}>QAR {booking.amount}</p>
                </div>
                <div style={{ background: '#f9fafb', padding: '12px', borderRadius: '8px' }}>
                  <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 4px 0' }}>Payment Status</p>
                  <PaymentStatusBadge status={booking.paymentStatus} size="sm" />
                </div>
              </div>
            </div>

            {/* Status */}
            <div>
              <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', marginBottom: '12px' }}>
                Booking Status
              </h3>
              <div style={{ background: '#f9fafb', padding: '12px', borderRadius: '8px' }}>
                <BookingStatusBadge status={booking.bookingStatus} />
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'timeline' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {getTimelineStages().map((stage, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '12px' }}>
                {/* Timeline dot */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: stage.completed ? '#0052cc' : '#e5e7eb',
                      border: '2px solid white',
                      boxShadow: '0 0 0 2px ' + (stage.completed ? '#0052cc' : '#e5e7eb'),
                    }}
                  />
                  {idx < getTimelineStages().length - 1 && (
                    <div
                      style={{
                        width: '2px',
                        height: '40px',
                        background: getTimelineStages()[idx + 1].completed ? '#0052cc' : '#e5e7eb',
                        marginTop: '8px',
                      }}
                    />
                  )}
                </div>

                {/* Content */}
                <div style={{ paddingTop: '2px' }}>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: 0 }}>{stage.name}</p>
                  <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 0 0' }}>{stage.date ? formatDate(stage.date) : 'Pending'}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedTab === 'documents' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div
              style={{
                padding: '16px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <p style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: 0 }}>Invoice</p>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 0 0' }}>PDF Document</p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  style={{
                    padding: '8px 12px',
                    background: '#e0e7ff',
                    border: '1px solid #c7d2fe',
                    borderRadius: '6px',
                    color: '#4f46e5',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '12px',
                    fontWeight: '500',
                  }}
                >
                  <Download size={14} />
                  Download
                </button>
                <button
                  style={{
                    padding: '8px 12px',
                    background: '#f3f4f6',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    color: '#6b7280',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '12px',
                    fontWeight: '500',
                  }}
                >
                  <Printer size={14} />
                  Print
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div style={{ padding: '16px 20px', borderTop: '1px solid #e5e7eb', display: 'flex', gap: '12px' }}>
        {booking.bookingStatus === 'pending' && onAssignBranch && (
          <button
            onClick={() => onAssignBranch(booking.id)}
            style={{
              flex: 1,
              padding: '10px 16px',
              background: '#0052cc',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '600',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#0047b2')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#0052cc')}
          >
            <Zap size={16} style={{ display: 'inline', marginRight: '6px' }} />
            Assign Branch
          </button>
        )}
        {booking.bookingStatus === 'assigned' && onReassign && (
          <button
            onClick={() => onReassign(booking.id)}
            style={{
              flex: 1,
              padding: '10px 16px',
              background: '#f59e0b',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '600',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#d97706')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#f59e0b')}
          >
            Reassign Booking
          </button>
        )}
      </div>
    </div>
  );
}
