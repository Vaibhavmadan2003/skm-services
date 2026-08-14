'use client';

import React from 'react';
import { Booking } from '../lib/mock-bookings';
import { AlertCircle, CheckCircle, Clock, Zap, TrendingUp, Calendar } from 'lucide-react';

interface BookingSummaryCardsProps {
  bookings: Booking[];
  selectedFilter: string | null;
  onFilterChange: (filter: string | null) => void;
}

export default function BookingSummaryCards({
  bookings,
  selectedFilter,
  onFilterChange,
}: BookingSummaryCardsProps) {
  // Calculate statistics
  const stats = {
    pending: bookings.filter((b) => b.bookingStatus === 'pending').length,
    assigned: bookings.filter((b) => b.bookingStatus === 'assigned').length,
    accepted: bookings.filter((b) => b.bookingStatus === 'accepted').length,
    inProgress: bookings.filter((b) => b.bookingStatus === 'in_progress').length,
    completed: bookings.filter((b) => b.bookingStatus === 'completed').length,
    cancelled: bookings.filter((b) => b.bookingStatus === 'cancelled').length,
    todaysBookings: bookings.filter((b) => {
      const today = new Date().toISOString().split('T')[0];
      return b.bookingDate === today;
    }).length,
    monthlyBookings: bookings.filter((b) => {
      const currentMonth = new Date().toISOString().slice(0, 7);
      return b.bookingDate.slice(0, 7) === currentMonth;
    }).length,
  };

  const cards = [
    {
      id: 'pending',
      label: 'Pending',
      value: stats.pending,
      color: '#ca8a04',
      bgColor: '#fef3c7',
      icon: AlertCircle,
      filterKey: 'pending',
    },
    {
      id: 'assigned',
      label: 'Assigned',
      value: stats.assigned,
      color: '#0284c7',
      bgColor: '#dbeafe',
      icon: Zap,
      filterKey: 'assigned',
    },
    {
      id: 'accepted',
      label: 'Accepted',
      value: stats.accepted,
      color: '#059669',
      bgColor: '#d1fae5',
      icon: CheckCircle,
      filterKey: 'accepted',
    },
    {
      id: 'in_progress',
      label: 'In Progress',
      value: stats.inProgress,
      color: '#be185d',
      bgColor: '#fce7f3',
      icon: Clock,
      filterKey: 'in_progress',
    },
    {
      id: 'completed',
      label: 'Completed',
      value: stats.completed,
      color: '#16a34a',
      bgColor: '#dcfce7',
      icon: CheckCircle,
      filterKey: 'completed',
    },
    {
      id: 'cancelled',
      label: 'Cancelled',
      value: stats.cancelled,
      color: '#dc2626',
      bgColor: '#fee2e2',
      icon: AlertCircle,
      filterKey: 'cancelled',
    },
    {
      id: 'today',
      label: "Today's Bookings",
      value: stats.todaysBookings,
      color: '#0284c7',
      bgColor: '#dbeafe',
      icon: Calendar,
      filterKey: null,
    },
    {
      id: 'monthly',
      label: 'Monthly Bookings',
      value: stats.monthlyBookings,
      color: '#7c3aed',
      bgColor: '#ede9fe',
      icon: TrendingUp,
      filterKey: null,
    },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', marginBottom: '32px' }}>
      {cards.map((card) => {
        const Icon = card.icon;
        const isActive = selectedFilter === card.filterKey;

        return (
          <button
            key={card.id}
            onClick={() => onFilterChange(isActive ? null : card.filterKey)}
            style={{
              padding: '20px',
              background: isActive ? card.bgColor : 'white',
              border: isActive ? `2px solid ${card.color}` : '1px solid #e5e7eb',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.borderColor = card.color;
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = '#e5e7eb';
              }
            }}
          >
            {/* Background decoration */}
            <div
              style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '80px',
                height: '80px',
                background: card.bgColor,
                borderRadius: '50%',
                opacity: 0.3,
                zIndex: 0,
              }}
            />

            {/* Content */}
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>{card.label}</span>
                <span style={{ fontSize: '28px', fontWeight: '700', color: card.color, marginTop: '4px' }}>
                  {card.value}
                </span>
              </div>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  background: card.bgColor,
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon size={20} color={card.color} />
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
