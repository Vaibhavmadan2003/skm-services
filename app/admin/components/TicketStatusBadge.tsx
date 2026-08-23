'use client';

import React from 'react';
import { Chip } from '@mui/material';

interface TicketStatusBadgeProps {
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  size?: 'small' | 'medium';
}

const statusColors: Record<string, { background: string; color: string }> = {
  open: { background: '#DBEAFE', color: '#1E40AF' }, // Blue
  in_progress: { background: '#FED7AA', color: '#92400E' }, // Orange
  resolved: { background: '#DCFCE7', color: '#166534' }, // Green
  closed: { background: '#E5E7EB', color: '#374151' }, // Gray
};

const statusLabels: Record<string, string> = {
  open: 'Open',
  in_progress: 'In Progress',
  resolved: 'Resolved',
  closed: 'Closed',
};

export default function TicketStatusBadge({ status, size = 'small' }: TicketStatusBadgeProps) {
  const colors = statusColors[status] || statusColors.open;
  const label = statusLabels[status] || status;

  return (
    <Chip
      label={label}
      size={size}
      sx={{
        backgroundColor: colors.background,
        color: colors.color,
        fontWeight: '600',
        fontSize: size === 'small' ? '12px' : '14px',
      }}
    />
  );
}
