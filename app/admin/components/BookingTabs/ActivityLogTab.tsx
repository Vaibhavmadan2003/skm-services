'use client';

import React from 'react';
import {
  FileText,
  Eye,
  Target,
  CheckCircle,
  Wrench,
  Car,
  Play,
  Flag,
  CreditCard,
  DollarSign,
  RefreshCw,
  XCircle,
  Users,
  Truck,
} from 'lucide-react';
import { Booking, ActivityLog } from '../../lib/mock-bookings';

interface ActivityLogTabProps {
  booking: Booking;
}

const getActivityIcon = (action: string) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    'Booking Created': <FileText size={16} />,
    'Viewed by Super Admin': <Eye size={16} />,
    'Assigned to Branch': <Target size={16} />,
    'Accepted by Branch': <CheckCircle size={16} />,
    'Worker Assigned': <Wrench size={16} />,
    'Driver Assigned': <Car size={16} />,
    'Job Started': <Play size={16} />,
    'Job Completed': <Flag size={16} />,
    'Payment Received': <CreditCard size={16} />,
    'Payment Updated': <DollarSign size={16} />,
    'Status Changed': <RefreshCw size={16} />,
    'Booking Cancelled': <XCircle size={16} />,
    'Worker Changed': <Users size={16} />,
    'Driver Changed': <Truck size={16} />,
  };
  return iconMap[action] || <FileText size={16} />;
};

const getActivityColor = (action: string) => {
  if (action.includes('Error') || action.includes('Failed') || action.includes('Cancelled')) return '#dc2626';
  if (action.includes('Completed') || action.includes('Accepted') || action.includes('Received')) return '#16a34a';
  if (action.includes('Created') || action.includes('Assigned') || action.includes('Started')) return '#0052cc';
  return '#6b7280';
};

export default function ActivityLogTab({ booking }: ActivityLogTabProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {booking && booking.activityLog && Array.isArray(booking.activityLog) && booking.activityLog.length > 0 ? (
        booking.activityLog.map((activity, idx) => {
          const timestamp = new Date(activity.timestamp);
          const date = timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
          const time = timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
          const color = getActivityColor(activity.action);

          return (
            <div key={activity.id} style={{ display: 'flex', gap: '12px' }}>
              {/* Timeline indicator */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: '#f3f4f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `2px solid ${color}`,
                    color: color,
                  }}
                >
                  {getActivityIcon(activity.action)}
                </div>
                {idx < booking.activityLog.length - 1 && (
                  <div
                    style={{
                      width: '2px',
                      height: '40px',
                      background: '#e5e7eb',
                      marginTop: '6px',
                    }}
                  />
                )}
              </div>

              {/* Activity content */}
              <div style={{ flex: 1, paddingTop: '6px' }}>
                <div style={{ background: '#f9fafb', padding: '12px', borderRadius: '8px', border: `1px solid ${color}20` }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <p style={{ fontSize: '13px', fontWeight: '600', color: color, margin: 0 }}>{activity.action}</p>
                    <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0 }}>
                      {date} · {time}
                    </p>
                  </div>
                  <p style={{ fontSize: '12px', color: '#6b7280', margin: '6px 0 0 0' }}>
                    <span style={{ fontWeight: '600' }}>By:</span> {activity.user}
                  </p>
                  {activity.details && (
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: '6px 0 0 0' }}>
                      <span style={{ fontWeight: '600' }}>Details:</span> {activity.details}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div style={{ textAlign: 'center', padding: '32px 16px' }}>
          <p style={{ fontSize: '14px', color: '#9ca3af', margin: 0 }}>No activity yet</p>
        </div>
      )}
    </div>
  );
}
