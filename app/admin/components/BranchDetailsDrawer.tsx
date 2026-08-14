'use client';

import React, { useState } from 'react';
import { X, Zap, ArrowRightLeft } from 'lucide-react';
import { Branch } from '../lib/mock-branches';
import { MOCK_BOOKINGS } from '../lib/mock-bookings';
import BranchStatusBadge from './BranchStatusBadge';
import BranchOverviewTab from './BranchTabs/BranchOverviewTab';
import BranchAssignmentTab from './BranchTabs/BranchAssignmentTab';
import BranchBookingsTab from './BranchTabs/BranchBookingsTab';
import BranchPaymentsTab from './BranchTabs/BranchPaymentsTab';
import BranchReportsTab from './BranchTabs/BranchReportsTab';
import BranchSettingsTab from './BranchTabs/BranchSettingsTab';
import AssignBookingsModal from './AssignBookingsModal';

interface BranchDetailsDrawerProps {
  branch: Branch | null;
  onClose: () => void;
}

export default function BranchDetailsDrawer({ branch, onClose }: BranchDetailsDrawerProps) {
  const [selectedTab, setSelectedTab] = useState<'overview' | 'assignment' | 'bookings' | 'payments' | 'reports' | 'settings'>('overview');
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [currentBranch, setCurrentBranch] = useState<Branch | null>(null);

  React.useEffect(() => {
    if (branch) {
      setCurrentBranch(branch);
    }
  }, [branch]);

  if (!currentBranch) return null;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'assignment', label: 'Assignment' },
    { id: 'bookings', label: 'Bookings' },
    { id: 'payments', label: 'Payments' },
    { id: 'reports', label: 'Reports' },
    { id: 'settings', label: 'Settings' },
  ] as const;

  const handleAssignBookings = async (selectedBookingIds: string[], reason?: string) => {
    if (!currentBranch || selectedBookingIds.length === 0) return;

    try {
      // Get booking details for each selected booking
      const bookingsToAssign = MOCK_BOOKINGS.filter((b) => selectedBookingIds.includes(b.id));

      // Call API for each booking individually
      for (const booking of bookingsToAssign) {
        // Generate a consistent UUID from mock ID for now
        // In production, bookings should come from database with real UUIDs
        const bookingUUID = `00000000-0000-0000-0000-${String(booking.id).padStart(12, '0')}`;

        const response = await fetch('/api/admin/bookings/assign', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            bookingId: bookingUUID,
            branchId: currentBranch.id,
            bookingNumber: booking.bookingNumber,
            customerName: booking.customerName,
            service: booking.serviceType,
            scheduledDate: booking.bookingDate,
            amount: booking.amount,
            reason: reason,
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(`Failed to assign ${booking.bookingNumber}: ${error.error}`);
        }

        console.log(`✓ Assigned booking ${booking.bookingNumber} to ${currentBranch.name}`);
      }

      // Update UI after successful assignment
      const updatedBranch = {
        ...currentBranch,
        assignedBookings: (currentBranch.assignedBookings || 0) + selectedBookingIds.length,
      };
      setCurrentBranch(updatedBranch);
      
      // Close modal and show success
      setIsAssignModalOpen(false);
      alert(`✓ Successfully assigned ${selectedBookingIds.length} booking(s) to ${currentBranch.name}!`);
    } catch (error) {
      console.error('Error assigning bookings:', error);
      alert(`Error: ${error instanceof Error ? error.message : 'Failed to assign bookings'}`);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: '600px',
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
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: 0 }}>Branch Details</h2>
          <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 0 0' }}>{currentBranch.name}</p>
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
      <div style={{ padding: '12px 20px', background: '#f9fafb', borderBottom: '1px solid #e5e7eb', display: 'flex', gap: '24px', alignItems: 'center' }}>
        <div>
          <p style={{ fontSize: '10px', color: '#9ca3af', margin: 0, textTransform: 'uppercase', fontWeight: '700' }}>Status</p>
          <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 0 0' }}>
            <BranchStatusBadge status={currentBranch.status} />
          </p>
        </div>
        <div style={{ width: '1px', height: '32px', background: '#e5e7eb' }} />
        <div>
          <p style={{ fontSize: '10px', color: '#9ca3af', margin: 0, textTransform: 'uppercase', fontWeight: '700' }}>Monthly Revenue</p>
          <p style={{ fontSize: '14px', fontWeight: '700', color: '#059669', margin: '4px 0 0 0' }}>QAR {currentBranch.monthlyRevenue.toLocaleString()}</p>
        </div>
        <div style={{ width: '1px', height: '32px', background: '#e5e7eb' }} />
        <div>
          <p style={{ fontSize: '10px', color: '#9ca3af', margin: 0, textTransform: 'uppercase', fontWeight: '700' }}>Today's Bookings</p>
          <p style={{ fontSize: '14px', fontWeight: '700', color: '#0052cc', margin: '4px 0 0 0' }}>{currentBranch.todaysBookings}</p>
        </div>
        <div style={{ width: '1px', height: '32px', background: '#e5e7eb' }} />
        <div>
          <p style={{ fontSize: '10px', color: '#9ca3af', margin: 0, textTransform: 'uppercase', fontWeight: '700' }}>Rating</p>
          <p style={{ fontSize: '14px', fontWeight: '700', color: '#f59e0b', margin: '4px 0 0 0' }}>⭐ {currentBranch.customerRating.toFixed(1)}</p>
        </div>
        <div style={{ flex: 1 }} />
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
          Assign Bookings
        </button>
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
        {selectedTab === 'overview' && <BranchOverviewTab branch={currentBranch} />}
        {selectedTab === 'assignment' && <BranchAssignmentTab branch={currentBranch} />}
        {selectedTab === 'bookings' && <BranchBookingsTab branch={currentBranch} />}
        {selectedTab === 'payments' && <BranchPaymentsTab branch={currentBranch} />}
        {selectedTab === 'reports' && <BranchReportsTab branch={currentBranch} />}
        {selectedTab === 'settings' && <BranchSettingsTab branch={currentBranch} />}
      </div>

      {/* Assign Bookings Modal */}
      <AssignBookingsModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        onAssign={handleAssignBookings}
        branchId={currentBranch.id}
        branchName={currentBranch.name}
      />

      {/* CSS Animation */}
      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
