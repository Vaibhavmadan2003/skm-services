'use client';

import React from 'react';

interface PaymentStatusBadgeProps {
  status: 'pending' | 'paid' | 'refunded' | 'failed';
  size?: 'sm' | 'md';
}

export default function PaymentStatusBadge({ status, size = 'md' }: PaymentStatusBadgeProps) {
  const statusConfig = {
    pending: { label: 'Pending', bg: '#fef3c7', text: '#ca8a04' },
    paid: { label: 'Paid', bg: '#dcfce7', text: '#16a34a' },
    refunded: { label: 'Refunded', bg: '#e0e7ff', text: '#4f46e5' },
    failed: { label: 'Failed', bg: '#fee2e2', text: '#dc2626' },
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
