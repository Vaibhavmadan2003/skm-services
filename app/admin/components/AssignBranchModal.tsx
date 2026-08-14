'use client';

import React, { useState, useEffect } from 'react';
import { X, Zap } from 'lucide-react';
import { Booking } from '../lib/mock-bookings';

interface Branch {
  id: string;
  name: string;
  managerName: string;
  phone: string;
  city: string;
}

interface AssignBranchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssign: (branchId: string, branchName: string) => void;
  booking?: Booking | null;
}

export default function AssignBranchModal({ isOpen, onClose, onAssign, booking }: AssignBranchModalProps) {
  const [selectedBranch, setSelectedBranch] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  // Fetch branches from database
  useEffect(() => {
    if (isOpen) {
      fetchBranches();
    }
  }, [isOpen]);

  const fetchBranches = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch('/api/branches');
      
      if (!response.ok) {
        throw new Error('Failed to fetch branches');
      }
      
      const data = await response.json();
      
      if (!data.data || data.data.length === 0) {
        setError('No branches available.');
        return;
      }
      
      const formattedBranches = data.data.map((branch: any) => ({
        id: branch.id,
        name: branch.name,
        managerName: branch.manager_name || branch.managerName || 'N/A',
        phone: branch.phone || 'N/A',
        city: branch.city || 'N/A',
      }));
      
      setBranches(formattedBranches);
    } catch (err) {
      console.error('Error fetching branches:', err);
      setError('Failed to load branches. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !booking) return null;

  const handleAssign = async () => {
    if (!selectedBranch) {
      alert('Please select a branch');
      return;
    }
    
    const branch = branches.find((b) => b.id === selectedBranch);
    if (branch) {
      try {
        // Call the assign work API with actual booking data
        const response = await fetch('/api/admin/bookings/assign', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            bookingId: booking.id,
            branchId: selectedBranch,
            bookingNumber: booking.bookingNumber,
            customerName: booking.customerName,
            service: booking.serviceType,
            scheduledDate: booking.bookingDate,
            bookingTime: booking.bookingTime,
            amount: booking.amount,
            customerPhone: booking.customerPhone,
            customerAddress: booking.customerAddress,
            city: booking.customerCity,
            reason: reason,
          }),
        });

        if (response.ok) {
          onAssign(selectedBranch, branch.name);
          setSelectedBranch('');
          setReason('');
          onClose();
          // Show success toast/alert
          alert('✓ Booking assigned successfully! Notification sent to branch admin.');
        } else {
          const error = await response.json();
          alert(`Failed to assign work: ${error.error}`);
        }
      } catch (error) {
        console.error('Error assigning work:', error);
        alert('Error assigning work');
      }
    }
  };

  const selectedBranchData = branches.find((b) => b.id === selectedBranch);

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
          maxWidth: '400px',
          padding: '24px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: 0 }}>Assign to Branch</h2>
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

        {/* Error Message */}
        {error && (
          <div style={{
            background: '#fee2e2',
            color: '#dc2626',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '16px',
            fontSize: '13px',
          }}>
            {error}
          </div>
        )}

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Branch Selection */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '8px' }}>
              Select Branch *
            </label>
            {loading ? (
              <div style={{ padding: '10px', color: '#6b7280', textAlign: 'center' }}>Loading branches...</div>
            ) : (
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
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
                <option value="">Choose a branch...</option>
                {branches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} - {b.city}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Branch Details */}
          {selectedBranchData && (
            <div style={{ background: '#f9fafb', padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
              <p style={{ fontSize: '11px', fontWeight: '600', color: '#6b7280', margin: '0 0 8px 0', textTransform: 'uppercase' }}>
                Branch Details
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px' }}>
                  <div>
                    <span style={{ color: '#6b7280', fontWeight: '600' }}>Manager:</span>{' '}
                    <span style={{ color: '#111827' }}>{selectedBranchData.managerName}</span>
                  </div>
                  <div>
                    <span style={{ color: '#6b7280', fontWeight: '600' }}>City:</span>{' '}
                    <span style={{ color: '#111827' }}>{selectedBranchData.city}</span>
                  </div>
                </div>
                <div style={{ fontSize: '12px' }}>
                  <span style={{ color: '#6b7280', fontWeight: '600' }}>Phone:</span>{' '}
                  <span style={{ color: '#111827' }}>{selectedBranchData.phone}</span>
                </div>
              </div>
            </div>
          )}

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
                minHeight: '80px',
              }}
            />
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
          <button
            onClick={onClose}
            style={{
              flex: 1,
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
            disabled={loading || !selectedBranch}
            style={{
              flex: 1,
              padding: '10px 16px',
              background: loading || !selectedBranch ? '#d1d5db' : '#0052cc',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: loading || !selectedBranch ? 'not-allowed' : 'pointer',
              fontSize: '13px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
            onMouseEnter={(e) => {
              if (!loading && selectedBranch) {
                e.currentTarget.style.background = '#0047b2';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading && selectedBranch) {
                e.currentTarget.style.background = '#0052cc';
              }
            }}
          >
            <Zap size={14} />
            Assign Branch
          </button>
        </div>
      </div>
    </div>
  );
}
