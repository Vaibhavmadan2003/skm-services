'use client';

import React, { useState, useEffect } from 'react';
import { X, Zap, ArrowRightLeft } from 'lucide-react';
import { Booking } from '../lib/mock-bookings';
import BookingStatusBadge from './BookingStatusBadge';
import OverviewTab from './BookingTabs/OverviewTab';
import AssignmentTab from './BookingTabs/AssignmentTab';
import PaymentTab from './BookingTabs/PaymentTab';
import TimelineTab from './BookingTabs/TimelineTab';
import DocumentsTab from './BookingTabs/DocumentsTab';
import ActivityLogTab from './BookingTabs/ActivityLogTab';
import AssignBranchModal from './AssignBranchModal';

interface BookingDetailsDrawerEnhancedProps {
  booking: Booking | null;
  onClose: () => void;
}

export default function BookingDetailsDrawerEnhanced({ booking, onClose }: BookingDetailsDrawerEnhancedProps) {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'assignment' | 'payment' | 'timeline' | 'documents' | 'activity'>('overview');
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);

  // Initialize and sync state when booking prop changes
  useEffect(() => {
    if (booking) {
      setCurrentBooking(booking);
    }
  }, [booking]);

  // Return early after hooks have run
  if (!currentBooking) return null;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'assignment', label: 'Assignment' },
    { id: 'payment', label: 'Payment' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'documents', label: 'Documents' },
    { id: 'activity', label: 'Activity Log' },
  ] as const;

  const handleAssignBranch = (branchId: string, branchName: string) => {
    if (currentBooking) {
      const updatedBooking = {
        ...currentBooking,
        assignedBranchId: branchId,
        assignedBranchName: branchName,
        bookingStatus: 'assigned' as const,
        assignedAt: new Date().toISOString(),
        assignments: [
          ...currentBooking.assignments,
          {
            assignedBy: 'Super Admin',
            assignedDate: new Date().toISOString().split('T')[0],
            assignedTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          },
        ],
        activityLog: [
          ...currentBooking.activityLog,
          {
            id: String(currentBooking.activityLog.length + 1),
            action: 'Assigned to Branch',
            user: 'Super Admin',
            timestamp: new Date().toISOString(),
            details: `Assigned to ${branchName}`,
          },
        ],
      };
      setCurrentBooking(updatedBooking);
    }
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
          <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 0 0' }}>{currentBooking.bookingNumber}</p>
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
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#e5e7eb')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#f3f4f6')}
        >
          <X size={20} />
        </button>
      </div>

      {/* Quick Status */}
      <div style={{ padding: '12px 20px', background: '#f9fafb', borderBottom: '1px solid #e5e7eb', display: 'flex', gap: '12px', alignItems: 'center' }}>
        <div>
          <p style={{ fontSize: '10px', color: '#9ca3af', margin: 0, textTransform: 'uppercase', fontWeight: '700' }}>Status</p>
          <p style={{ fontSize: '12px', color: '#6b7280', margin: '2px 0 0 0' }}>
            <BookingStatusBadge status={currentBooking.bookingStatus} size="sm" />
          </p>
        </div>
        <div
          style={{
            width: '1px',
            height: '32px',
            background: '#e5e7eb',
          }}
        />
        <div>
          <p style={{ fontSize: '10px', color: '#9ca3af', margin: 0, textTransform: 'uppercase', fontWeight: '700' }}>Amount</p>
          <p style={{ fontSize: '14px', fontWeight: '700', color: '#0052cc', margin: '2px 0 0 0' }}>QAR {currentBooking.amount}</p>
        </div>
        <div style={{ flex: 1 }} />
        {currentBooking.bookingStatus === 'pending' && (
          <button
            onClick={() => setIsAssignModalOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              background: '#0052cc',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '600',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#0047b2')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#0052cc')}
          >
            <Zap size={14} />
            Assign
          </button>
        )}
        {currentBooking.bookingStatus === 'assigned' && (
          <button
            onClick={() => setIsAssignModalOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              background: '#f59e0b',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '600',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#d97706')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#f59e0b')}
          >
            <ArrowRightLeft size={14} />
            Reassign
          </button>
        )}
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0', borderBottom: '1px solid #e5e7eb', padding: '0 20px', overflowX: 'auto' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id)}
            style={{
              padding: '12px 0',
              marginRight: '24px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: selectedTab === tab.id ? '600' : '500',
              color: selectedTab === tab.id ? '#0052cc' : '#6b7280',
              borderBottom: selectedTab === tab.id ? '2px solid #0052cc' : 'none',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              if (selectedTab !== tab.id) {
                e.currentTarget.style.color = '#111827';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedTab !== tab.id) {
                e.currentTarget.style.color = '#6b7280';
              }
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: '20px' }}>
        {selectedTab === 'overview' && <OverviewTab booking={currentBooking} />}
        {selectedTab === 'assignment' && <AssignmentTab booking={currentBooking} />}
        {selectedTab === 'payment' && <PaymentTab booking={currentBooking} />}
        {selectedTab === 'timeline' && <TimelineTab booking={currentBooking} />}
        {selectedTab === 'documents' && <DocumentsTab booking={currentBooking} />}
        {selectedTab === 'activity' && <ActivityLogTab booking={currentBooking} />}
      </div>

      {/* Assign Branch Modal */}
      <AssignBranchModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        onAssign={handleAssignBranch}
        booking={currentBooking}
      />
    </div>
  );
}
