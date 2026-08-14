'use client';

import React from 'react';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  XCircle,
  DollarSign,
  Users,
  Building2,
  Zap,
  Star,
  TrendingUp,
} from 'lucide-react';
import { KPIData } from '../lib/mock-analytics';

interface AnalyticsKPICardsProps {
  kpiData: KPIData;
}

export default function AnalyticsKPICards({ kpiData }: AnalyticsKPICardsProps) {
  const cards = [
    {
      label: 'Total Bookings',
      value: kpiData.totalBookings,
      icon: <BookOpen size={24} />,
      color: '#0052cc',
      bgColor: '#f0f4ff',
      trend: '+12%',
    },
    {
      label: 'Completed',
      value: kpiData.completedBookings,
      icon: <CheckCircle2 size={24} />,
      color: '#16a34a',
      bgColor: '#f0fdf4',
      trend: '+8%',
    },
    {
      label: 'Pending',
      value: kpiData.pendingBookings,
      icon: <Clock size={24} />,
      color: '#f59e0b',
      bgColor: '#fffbf0',
      trend: '-2%',
    },
    {
      label: 'Cancelled',
      value: kpiData.cancelledBookings,
      icon: <XCircle size={24} />,
      color: '#dc2626',
      bgColor: '#fef2f2',
      trend: '-5%',
    },
    {
      label: 'Total Revenue',
      value: `QAR ${(kpiData.totalRevenue / 1000).toFixed(0)}k`,
      icon: <DollarSign size={24} />,
      color: '#059669',
      bgColor: '#f0fdf4',
      trend: '+24%',
    },
    {
      label: 'Total Customers',
      value: kpiData.totalCustomers,
      icon: <Users size={24} />,
      color: '#7c3aed',
      bgColor: '#faf5ff',
      trend: '+15%',
    },
    {
      label: 'Active Branches',
      value: kpiData.activeBranches,
      icon: <Building2 size={24} />,
      color: '#0891b2',
      bgColor: '#f0f9fa',
      trend: '+0%',
    },
    {
      label: 'Active Technicians',
      value: kpiData.activeTechnicians,
      icon: <Zap size={24} />,
      color: '#ea580c',
      bgColor: '#fff7ed',
      trend: '+3%',
    },
    {
      label: 'Avg Rating',
      value: kpiData.avgServiceRating.toFixed(1),
      icon: <Star size={24} />,
      color: '#f59e0b',
      bgColor: '#fffbf0',
      trend: '+0.2',
    },
    {
      label: 'Avg Booking Value',
      value: `QAR ${kpiData.avgBookingValue}`,
      icon: <TrendingUp size={24} />,
      color: '#0052cc',
      bgColor: '#f0f4ff',
      trend: '+5%',
    },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
      {cards.map((card, idx) => (
        <div
          key={idx}
          style={{
            background: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            padding: '20px',
            transition: 'all 0.2s',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
            e.currentTarget.style.transform = 'translateY(-4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: card.bgColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: card.color,
              }}
            >
              {card.icon}
            </div>
            <span
              style={{
                fontSize: '12px',
                fontWeight: '600',
                color: card.trend.startsWith('+') ? '#16a34a' : '#dc2626',
                background: card.trend.startsWith('+') ? '#f0fdf4' : '#fef2f2',
                padding: '4px 8px',
                borderRadius: '6px',
              }}
            >
              {card.trend}
            </span>
          </div>

          <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 6px 0', fontWeight: '600' }}>
            {card.label}
          </p>
          <p style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: 0 }}>
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}
