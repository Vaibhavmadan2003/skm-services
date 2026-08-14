'use client';

import React from 'react';
import { MapPin, Phone, Mail, Zap, Shirt, Wind, Wrench, Grid3x3 } from 'lucide-react';
import { Booking } from '../../lib/mock-bookings';

interface OverviewTabProps {
  booking: Booking;
}

const getServiceIcon = (serviceType: string) => {
  // Default icon for all services since we're getting actual names from API
  return <Zap size={16} />;
};

const getServiceName = (serviceType: string) => {
  // Service names come directly from the database/API now
  return serviceType || 'Service';
};

export default function OverviewTab({ booking }: OverviewTabProps) {
  return (
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
            <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 4px 0' }}>Service</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: '#0052cc' }}>
                {getServiceIcon(booking.serviceType)}
              </span>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: 0 }}>
                {getServiceName(booking.serviceType)}
              </p>
            </div>
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
            <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 4px 0' }}>Duration</p>
            <p style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: 0 }}>{booking.serviceDuration} min</p>
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
            <div style={{ background: '#f9fafb', padding: '12px', borderRadius: '8px', gridColumn: '1 / -1' }}>
              <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 4px 0' }}>Status</p>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '4px 10px',
                  background: booking.branchStatus === 'active' ? '#dcfce7' : '#fee2e2',
                  color: booking.branchStatus === 'active' ? '#16a34a' : '#dc2626',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '600',
                }}
              >
                {booking.branchStatus ? booking.branchStatus.charAt(0).toUpperCase() + booking.branchStatus.slice(1) : 'Active'}
              </span>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}
