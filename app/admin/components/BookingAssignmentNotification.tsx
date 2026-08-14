'use client';

import React, { useState } from 'react';
import { MapPin, Clock, DollarSign, User, Phone, MapIcon, CheckCircle, XCircle } from 'lucide-react';

interface BookingAssignmentNotificationProps {
  notif: any;
  onAction: () => void;
  onMarkAsRead: (id: string) => void;
  onRemove?: (id: string) => void;
}

export default function BookingAssignmentNotification({
  notif,
  onAction,
  onMarkAsRead,
  onRemove,
}: BookingAssignmentNotificationProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  if (isRemoved) return null;

  const metadata = notif.metadata || {};
  const bookingNumber = notif.booking_number || 'N/A';
  const customerName = metadata.customerName || notif.message?.split(' from ')?.[1]?.split(' ')?.[0] || 'Unknown';
  const serviceType = metadata.service || 'Service';
  const amount = metadata.amount || 'N/A';
  const bookingDate = metadata.scheduledDate || 'N/A';
  const bookingTime = metadata.bookingTime || 'N/A';
  const customerPhone = metadata.customerPhone || 'N/A';
  const customerAddress = metadata.customerAddress || 'N/A';
  const city = metadata.city || 'N/A';

  const handleAccept = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch(`/api/admin/bookings/${metadata.bookingId || 'unknown'}/accept-assignment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: metadata.bookingId,
          branchId: notif.branch_id,
        }),
      });

      if (!response.ok) throw new Error('Failed to accept assignment');

      // Mark as read and remove
      await onMarkAsRead(notif.id);
      setIsRemoved(true);
      onRemove?.(notif.id);

      // Delete notification
      await fetch(`/api/admin/notifications/${notif.id}`, {
        method: 'DELETE',
      });

      alert('✅ Booking accepted successfully!');
      onAction();
    } catch (err) {
      console.error('Error accepting booking:', err);
      alert(`Error: ${err instanceof Error ? err.message : 'Failed to accept'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch(`/api/admin/bookings/${metadata.bookingId || 'unknown'}/reject-assignment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: metadata.bookingId,
          branchId: notif.branch_id,
        }),
      });

      if (!response.ok) throw new Error('Failed to reject assignment');

      // Mark as read and remove
      await onMarkAsRead(notif.id);
      setIsRemoved(true);
      onRemove?.(notif.id);

      // Delete notification
      await fetch(`/api/admin/notifications/${notif.id}`, {
        method: 'DELETE',
      });

      alert('✅ Booking rejected');
      onAction();
    } catch (err) {
      console.error('Error rejecting booking:', err);
      alert(`Error: ${err instanceof Error ? err.message : 'Failed to reject'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {/* Main Notification Card */}
      <div
        style={{
          padding: '16px 20px',
          borderBottom: '1px solid #f3f4f6',
          background: notif.is_read ? 'transparent' : '#f0f4ff',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = notif.is_read ? '#f9fafb' : '#e0eaff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = notif.is_read ? 'transparent' : '#f0f4ff';
        }}
      >
        {/* Header with booking number and badge */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '12px' }}>
          {/* Icon */}
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #0052cc 0%, #0047b2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <MapIcon size={22} style={{ color: 'white' }} />
          </div>

          {/* Info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <p
                style={{
                  fontSize: '13px',
                  fontWeight: notif.is_read ? '600' : '700',
                  color: '#111827',
                  margin: 0,
                }}
              >
                {bookingNumber}
              </p>
              <span
                style={{
                  display: 'inline-block',
                  padding: '2px 8px',
                  background: '#dbeafe',
                  color: '#0052cc',
                  fontSize: '10px',
                  fontWeight: '600',
                  borderRadius: '4px',
                  textTransform: 'uppercase',
                }}
              >
                New Assignment
              </span>
            </div>
            <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 4px 0' }}>
              {customerName} • {serviceType}
            </p>
            <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0 }}>
              {new Date(notif.created_at).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Quick Info Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
          <div
            style={{
              background: 'white',
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <Clock size={14} style={{ color: '#6b7280' }} />
              <p style={{ fontSize: '10px', color: '#9ca3af', margin: 0, fontWeight: '600', textTransform: 'uppercase' }}>
                Date & Time
              </p>
            </div>
            <p style={{ fontSize: '12px', fontWeight: '600', color: '#111827', margin: 0 }}>
              {bookingDate} {bookingTime}
            </p>
          </div>
          <div
            style={{
              background: 'white',
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <DollarSign size={14} style={{ color: '#6b7280' }} />
              <p style={{ fontSize: '10px', color: '#9ca3af', margin: 0, fontWeight: '600', textTransform: 'uppercase' }}>
                Amount
              </p>
            </div>
            <p style={{ fontSize: '12px', fontWeight: '700', color: '#0052cc', margin: 0 }}>
              QAR {amount}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handleAccept}
            disabled={isProcessing}
            style={{
              flex: 1,
              padding: '10px 12px',
              background: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: isProcessing ? 'not-allowed' : 'pointer',
              opacity: isProcessing ? 0.7 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (!isProcessing) e.currentTarget.style.background = '#059669';
            }}
            onMouseLeave={(e) => {
              if (!isProcessing) e.currentTarget.style.background = '#10b981';
            }}
          >
            <CheckCircle size={16} />
            {isProcessing ? 'Processing...' : 'Accept'}
          </button>
          <button
            onClick={() => setShowDetailsModal(true)}
            disabled={isProcessing}
            style={{
              flex: 1,
              padding: '10px 12px',
              background: '#f3f4f6',
              color: '#6b7280',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: isProcessing ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (!isProcessing) {
                e.currentTarget.style.background = '#e5e7eb';
                e.currentTarget.style.color = '#111827';
              }
            }}
            onMouseLeave={(e) => {
              if (!isProcessing) {
                e.currentTarget.style.background = '#f3f4f6';
                e.currentTarget.style.color = '#6b7280';
              }
            }}
          >
            Details
          </button>
          <button
            onClick={handleReject}
            disabled={isProcessing}
            style={{
              flex: 1,
              padding: '10px 12px',
              background: '#fee2e2',
              color: '#dc2626',
              border: '1px solid #fecaca',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: isProcessing ? 'not-allowed' : 'pointer',
              opacity: isProcessing ? 0.7 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (!isProcessing) e.currentTarget.style.background = '#fca5a5';
            }}
            onMouseLeave={(e) => {
              if (!isProcessing) e.currentTarget.style.background = '#fee2e2';
            }}
          >
            <XCircle size={16} />
            Reject
          </button>
        </div>
      </div>

      {/* Details Modal */}
      {showDetailsModal && (
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
            zIndex: 1000,
          }}
          onClick={() => setShowDetailsModal(false)}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '12px',
              boxShadow: '0 20px 25px rgba(0, 0, 0, 0.15)',
              width: '90%',
              maxWidth: '500px',
              padding: '32px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ marginBottom: '24px' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #0052cc 0%, #0047b2 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                <MapIcon size={28} style={{ color: 'white' }} />
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#111827', margin: 0, marginBottom: '4px' }}>
                Booking Details
              </h2>
              <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>
                {bookingNumber}
              </p>
            </div>

            {/* Content Sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              {/* Booking Info */}
              <div>
                <p style={{ fontSize: '11px', fontWeight: '700', color: '#6b7280', margin: '0 0 12px 0', textTransform: 'uppercase' }}>
                  Booking Information
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div style={{ background: '#f9fafb', padding: '12px', borderRadius: '8px' }}>
                    <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 4px 0' }}>Service</p>
                    <p style={{ fontSize: '13px', fontWeight: '600', color: '#111827', margin: 0 }}>
                      {serviceType}
                    </p>
                  </div>
                  <div style={{ background: '#f9fafb', padding: '12px', borderRadius: '8px' }}>
                    <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 4px 0' }}>Amount</p>
                    <p style={{ fontSize: '13px', fontWeight: '700', color: '#0052cc', margin: 0 }}>
                      QAR {amount}
                    </p>
                  </div>
                  <div style={{ background: '#f9fafb', padding: '12px', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <Clock size={12} style={{ color: '#6b7280' }} />
                      <p style={{ fontSize: '11px', color: '#6b7280', margin: 0 }}>Date & Time</p>
                    </div>
                    <p style={{ fontSize: '13px', fontWeight: '600', color: '#111827', margin: 0 }}>
                      {bookingDate}
                    </p>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: '2px 0 0 0' }}>{bookingTime}</p>
                  </div>
                  <div style={{ background: '#f9fafb', padding: '12px', borderRadius: '8px' }}>
                    <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 4px 0' }}>Status</p>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '4px 10px',
                        background: '#fef3c7',
                        color: '#92400e',
                        fontSize: '12px',
                        fontWeight: '600',
                        borderRadius: '4px',
                      }}
                    >
                      Pending
                    </span>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div>
                <p style={{ fontSize: '11px', fontWeight: '700', color: '#6b7280', margin: '0 0 12px 0', textTransform: 'uppercase' }}>
                  Customer Information
                </p>
                <div style={{ background: '#f9fafb', padding: '14px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '8px',
                        background: '#e0e7ff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <User size={20} style={{ color: '#6366f1' }} />
                    </div>
                    <div>
                      <p style={{ fontSize: '13px', fontWeight: '600', color: '#111827', margin: 0 }}>
                        {customerName}
                      </p>
                      <p style={{ fontSize: '12px', color: '#6b7280', margin: '2px 0 0 0' }}>
                        {city}
                      </p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Phone size={14} style={{ color: '#6b7280' }} />
                      <p style={{ fontSize: '12px', color: '#111827', margin: 0 }}>{customerPhone}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <MapPin size={14} style={{ color: '#6b7280', marginTop: '2px', flexShrink: 0 }} />
                      <p style={{ fontSize: '12px', color: '#111827', margin: 0 }}>{customerAddress}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setShowDetailsModal(false)}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  background: '#f3f4f6',
                  color: '#6b7280',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#e5e7eb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f3f4f6';
                }}
              >
                Close
              </button>
              <button
                onClick={handleAccept}
                disabled={isProcessing}
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  background: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  opacity: isProcessing ? 0.7 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isProcessing) e.currentTarget.style.background = '#059669';
                }}
                onMouseLeave={(e) => {
                  if (!isProcessing) e.currentTarget.style.background = '#10b981';
                }}
              >
                <CheckCircle size={16} />
                {isProcessing ? 'Accepting...' : 'Accept Booking'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
