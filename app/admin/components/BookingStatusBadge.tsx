'use client';

import React from 'react';

interface BookingStatusBadgeProps {
  status: 'pending' | 'assigned' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  size?: 'sm' | 'md';
}

export default function BookingStatusBadge({ status, size = 'md' }: BookingStatusBadgeProps) {
  const statusConfig = {
    pending: { label: 'Pending', bg: '#fef3c7', text: '#ca8a04' },
    assigned: { label: 'Assigned', bg: '#dbeafe', text: '#0284c7' },
    accepted: { label: 'Accepted', bg: '#d1fae5', text: '#059669' },
    in_progress: { label: 'In Progress', bg: '#fce7f3', text: '#be185d' },
    completed: { label: 'Completed', bg: '#dcfce7', text: '#16a34a' },
    cancelled: { label: 'Cancelled', bg: '#fee2e2', text: '#dc2626' },
  };

  const config = statusConfig[status];

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: size === 'sm' ? '4px 10px' : '6px 12px',
        background: config.bg,
        color: config.text,
        borderRadius: '6px',
        fontSize: size === 'sm' ? '12px' : '13px',
        fontWeight: '600',
        whiteSpace: 'nowrap',
      }}
    >
      {config.label}
    </span>
  );
}
