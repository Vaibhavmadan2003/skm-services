'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, FileText } from 'lucide-react';

interface WorkAssignmentNotificationProps {
  notif: any;
  onAction: () => void;
  onMarkAsRead: (id: string) => void;
  onRemove: () => void;
}

export default function WorkAssignmentNotification({
  notif,
  onAction,
  onMarkAsRead,
  onRemove,
}: WorkAssignmentNotificationProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleAccept = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch(`/api/admin/bookings/${notif.booking_id}/accept-assignment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('Failed to accept');
      
      onMarkAsRead(notif.id);
      onRemove();
      onAction();
    } catch (err) {
      console.error('Accept error:', err);
      alert('Failed to accept assignment');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch(`/api/admin/bookings/${notif.booking_id}/reject-assignment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('Failed to reject');
      
      onMarkAsRead(notif.id);
      onRemove();
      onAction();
    } catch (err) {
      console.error('Reject error:', err);
      alert('Failed to reject assignment');
    } finally {
      setIsProcessing(false);
    }
  };

  const meta = notif.metadata || {};

  return (
    <>
      <div
        style={{
          padding: '14px 20px',
          borderBottom: '1px solid #f3f4f6',
          background: notif.is_read ? 'transparent' : '#dbeafe',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = notif.is_read ? '#f9fafb' : '#bfdbfe';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = notif.is_read ? 'transparent' : '#dbeafe';
        }}
      >
        <div style={{ marginBottom: '12px' }}>
          <p style={{
            fontSize: '13px',
            color: '#111827',
            margin: 0,
            marginBottom: '2px',
            fontWeight: notif.is_read ? 'normal' : '600'
          }}>
            {notif.booking_number} - {meta.service || 'Work'}
          </p>
          <p style={{ fontSize: '12px', color: '#6b7280', margin: 0, marginBottom: '2px' }}>
            {meta.customerName || 'Customer'}
          </p>
          <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0 }}>
            {meta.scheduledDate} at {meta.bookingTime}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={handleAccept}
            disabled={isProcessing}
            style={{
              flex: 1,
              padding: '6px 10px',
              background: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '11px',
              fontWeight: '600',
              cursor: isProcessing ? 'not-allowed' : 'pointer',
              opacity: isProcessing ? 0.7 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
            }}
          >
            <CheckCircle size={14} />
            Accept
          </button>

          <button
            onClick={() => setShowDetails(true)}
            style={{
              flex: 1,
              padding: '6px 10px',
              background: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '11px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
            }}
          >
            <FileText size={14} />
            Details
          </button>

          <button
            onClick={handleReject}
            disabled={isProcessing}
            style={{
              flex: 1,
              padding: '6px 10px',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '11px',
              fontWeight: '600',
              cursor: isProcessing ? 'not-allowed' : 'pointer',
              opacity: isProcessing ? 0.7 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
            }}
          >
            <XCircle size={14} />
            Reject
          </button>
        </div>
      </div>

      {showDetails && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={() => setShowDetails(false)}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '28px',
              maxWidth: '500px',
              width: '90%',
              boxShadow: '0 20px 25px rgba(0,0,0,0.15)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: 0, marginBottom: '20px' }}>
              {notif.booking_number}
            </h2>

            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontSize: '11px', fontWeight: '700', color: '#6b7280', margin: '0 0 12px 0', textTransform: 'uppercase' }}>
                Booking Details
              </p>
              <div style={{ background: '#f3f4f6', padding: '12px', borderRadius: '8px', marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>Service</span>
                  <span style={{ fontSize: '12px', color: '#111827', fontWeight: '600' }}>{meta.service}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>Date & Time</span>
                  <span style={{ fontSize: '12px', color: '#111827', fontWeight: '600' }}>{meta.scheduledDate} at {meta.bookingTime}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>Amount</span>
                  <span style={{ fontSize: '12px', color: '#0052cc', fontWeight: '600' }}>QAR {meta.amount}</span>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontSize: '11px', fontWeight: '700', color: '#6b7280', margin: '0 0 12px 0', textTransform: 'uppercase' }}>
                Customer Information
              </p>
              <div style={{ background: '#f3f4f6', padding: '12px', borderRadius: '8px' }}>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>Name</span>
                  <p style={{ fontSize: '12px', color: '#111827', margin: '2px 0 0 0', fontWeight: '500' }}>{meta.customerName}</p>
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>Phone</span>
                  <p style={{ fontSize: '12px', color: '#111827', margin: '2px 0 0 0', fontWeight: '500' }}>{meta.customerPhone}</p>
                </div>
                <div>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>Address</span>
                  <p style={{ fontSize: '12px', color: '#111827', margin: '2px 0 0 0', fontWeight: '500' }}>{meta.customerAddress}, {meta.city}</p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setShowDetails(false)}
                style={{
                  flex: 1,
                  padding: '10px',
                  background: '#f3f4f6',
                  color: '#111827',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
