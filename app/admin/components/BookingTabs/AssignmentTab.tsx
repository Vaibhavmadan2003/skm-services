'use client';

import React, { useState, useEffect } from 'react';
import { Zap } from 'lucide-react';
import { Booking, MOCK_WORKERS } from '../../lib/mock-bookings';
import BookingStatusBadge from '../BookingStatusBadge';

interface Branch {
  id: string;
  name: string;
  managerName: string;
  phone: string;
  city: string;
}

interface AssignmentTabProps {
  booking: Booking;
  onBranchAssigned?: (branchId: string, branchName: string) => void;
}

export default function AssignmentTab({ booking, onBranchAssigned }: AssignmentTabProps) {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedBranch, setSelectedBranch] = useState(booking.assignedBranchId || '');
  const [selectedWorker, setSelectedWorker] = useState(booking.assignedWorkerId || '');
  const [selectedDriver, setSelectedDriver] = useState(booking.assignedDriverId || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  // Fetch branches from API on component mount
  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/branches');
      
      if (!response.ok) {
        throw new Error('Failed to fetch branches');
      }
      
      const data = await response.json();
      
      if (data.data && Array.isArray(data.data)) {
        const formattedBranches = data.data.map((branch: any) => ({
          id: branch.id,
          name: branch.name,
          managerName: branch.manager_name || branch.managerName || 'N/A',
          phone: branch.phone || 'N/A',
          city: branch.city || 'N/A',
        }));
        setBranches(formattedBranches);
      }
    } catch (err) {
      console.error('Error fetching branches:', err);
      setError('Failed to load branches');
    } finally {
      setLoading(false);
    }
  };

  const currentBranchData = branches.find((b) => b.id === selectedBranch);
  const availableWorkers = selectedBranch ? MOCK_WORKERS[selectedBranch as keyof typeof MOCK_WORKERS] || [] : [];

  const handleAssignBranch = async () => {
    if (!selectedBranch) {
      alert('Please select a branch');
      return;
    }
    const branchData = branches.find((b) => b.id === selectedBranch);
    if (branchData) {
      try {
        setLoading(true);
        const payload = {
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
        };
        
        console.log('📍 [AssignmentTab] About to call /api/admin/bookings/assign with payload:', payload);
        
        // Call the API to assign booking and create notification
        const response = await fetch('/api/admin/bookings/assign', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        console.log('📍 [AssignmentTab] API Response status:', response.status);
        
        if (response.ok) {
          console.log('📍 [AssignmentTab] Assignment successful');
          // Call the callback to update local state
          onBranchAssigned?.(selectedBranch, branchData.name);
          alert(`✓ Branch ${branchData.name} assigned successfully! Notification sent to branch admin.`);
          setSelectedBranch('');
        } else {
          const errorData = await response.json();
          console.error('📍 [AssignmentTab] Assignment failed:', errorData);
          alert(`Failed to assign branch: ${errorData.error || 'Unknown error'}`);
        }
      } catch (err) {
        console.error('📍 [AssignmentTab] Error assigning branch:', err);
        alert('Error assigning branch');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAssignWorker = () => {
    if (!selectedWorker) {
      alert('Please select a worker');
      return;
    }
    alert('Worker assigned successfully!');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Current Status */}
      <div>
        <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', marginBottom: '12px' }}>
          Current Assignment
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div style={{ background: '#f9fafb', padding: '12px', borderRadius: '8px' }}>
            <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 4px 0' }}>Status</p>
            <BookingStatusBadge status={booking.bookingStatus} size="sm" />
          </div>
          <div style={{ background: '#f9fafb', padding: '12px', borderRadius: '8px' }}>
            <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 4px 0' }}>Branch</p>
            <p style={{ fontSize: '13px', fontWeight: '600', color: '#111827', margin: 0 }}>
              {booking.assignedBranchName || 'Not Assigned'}
            </p>
          </div>
          <div style={{ background: '#f9fafb', padding: '12px', borderRadius: '8px' }}>
            <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 4px 0' }}>Worker</p>
            <p style={{ fontSize: '13px', fontWeight: '600', color: '#111827', margin: 0 }}>
              {booking.assignedWorkerName || 'Not Assigned'}
            </p>
          </div>
          <div style={{ background: '#f9fafb', padding: '12px', borderRadius: '8px' }}>
            <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 4px 0' }}>Driver</p>
            <p style={{ fontSize: '13px', fontWeight: '600', color: '#111827', margin: 0 }}>
              {booking.assignedDriverName || 'Not Assigned'}
            </p>
          </div>
        </div>
      </div>

      {/* Assign Branch */}
      {booking.bookingStatus === 'pending' && (
        <div style={{ background: '#f0f4ff', padding: '16px', borderRadius: '12px', border: '1px solid #bfdbfe' }}>
          <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#0052cc', textTransform: 'uppercase', margin: '0 0 12px 0' }}>
            Assign to Branch
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#374151' }}>Select Branch</label>
              {loading ? (
                <div style={{
                  width: '100%',
                  marginTop: '6px',
                  padding: '10px 12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '13px',
                  background: '#f9fafb',
                  color: '#6b7280',
                }}>
                  Loading branches...
                </div>
              ) : (
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  style={{
                    width: '100%',
                    marginTop: '6px',
                    padding: '10px 12px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '13px',
                    outline: 'none',
                    background: 'white',
                    cursor: 'pointer',
                  }}
                >
                  <option value="">Select a branch...</option>
                  {branches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} - {b.city}
                    </option>
                  ))}
                </select>
              )}
            </div>
            {selectedBranch && (
              <div style={{ background: 'white', padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                <p style={{ fontSize: '11px', fontWeight: '600', color: '#6b7280', margin: '0 0 8px 0' }}>BRANCH DETAILS</p>
                {currentBranchData && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '12px' }}>
                    <div>
                      <span style={{ color: '#6b7280' }}>Manager:</span> {currentBranchData.managerName}
                    </div>
                    <div>
                      <span style={{ color: '#6b7280' }}>City:</span> {currentBranchData.city}
                    </div>
                    <div style={{ gridColumn: '1 / -1', fontSize: '12px' }}>
                      <span style={{ color: '#6b7280' }}>Phone:</span> {currentBranchData.phone}
                    </div>
                  </div>
                )}
              </div>
            )}
            <button
              onClick={handleAssignBranch}
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
              <Zap size={16} />
              Assign to Branch
            </button>
          </div>
        </div>
      )}

      {/* Assign Worker */}
      {booking.bookingStatus === 'assigned' && (
        <div style={{ background: '#f0f4ff', padding: '16px', borderRadius: '12px', border: '1px solid #bfdbfe' }}>
          <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#0052cc', textTransform: 'uppercase', margin: '0 0 12px 0' }}>
            Assign Worker
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#374151' }}>Select Worker</label>
              <select
                value={selectedWorker}
                onChange={(e) => setSelectedWorker(e.target.value)}
                style={{
                  width: '100%',
                  marginTop: '6px',
                  padding: '10px 12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '13px',
                  outline: 'none',
                  background: 'white',
                  cursor: 'pointer',
                }}
              >
                <option value="">Select a worker...</option>
                {availableWorkers.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.name} ({w.specialization}) - {w.available ? 'Available' : 'Busy'}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleAssignWorker}
              style={{
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
              Assign Worker
            </button>
          </div>
        </div>
      )}

      {/* Assignment History */}
      {booking && booking.assignments && Array.isArray(booking.assignments) && booking.assignments.length > 0 && (
        <div>
          <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', marginBottom: '12px' }}>
            Assignment History
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {booking.assignments.map((assignment, idx) => (
              <div key={idx} style={{ background: '#f9fafb', padding: '12px', borderRadius: '8px', borderLeft: '3px solid #0052cc' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', fontSize: '12px' }}>
                  <div>
                    <p style={{ color: '#6b7280', margin: 0, fontSize: '11px' }}>Assigned By</p>
                    <p style={{ fontWeight: '600', color: '#111827', margin: '4px 0 0 0' }}>{assignment.assignedBy}</p>
                  </div>
                  <div>
                    <p style={{ color: '#6b7280', margin: 0, fontSize: '11px' }}>Date</p>
                    <p style={{ fontWeight: '600', color: '#111827', margin: '4px 0 0 0' }}>{assignment.assignedDate}</p>
                  </div>
                  <div>
                    <p style={{ color: '#6b7280', margin: 0, fontSize: '11px' }}>Time</p>
                    <p style={{ fontWeight: '600', color: '#111827', margin: '4px 0 0 0' }}>{assignment.assignedTime}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
