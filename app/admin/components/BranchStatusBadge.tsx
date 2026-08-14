'use client';

import React from 'react';

interface BranchStatusBadgeProps {
  status: 'active' | 'suspended';
}

export default function BranchStatusBadge({ status }: BranchStatusBadgeProps) {
  const config = {
    active: {
      bg: '#d1fae5',
      color: '#059669',
      label: '✓ Active',
    },
    suspended: {
      bg: '#fee2e2',
      color: '#dc2626',
      label: '✕ Suspended',
    },
  };

  const colors = config[status] || config.active;

  return (
    <span
      style={{
        display: 'inline-block',
        padding: '6px 12px',
        background: colors.bg,
        color: colors.color,
        borderRadius: '6px',
        fontSize: '12px',
        fontWeight: '600',
      }}
    >
      {colors.label}
    </span>
  );
}
