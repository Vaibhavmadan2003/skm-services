'use client';

import React from 'react';
import { Branch } from '../lib/mock-branches';
import { Building2, CheckCircle, AlertCircle, Calendar, TrendingUp, Clock } from 'lucide-react';

interface BranchSummaryCardsProps {
  branches: Branch[];
  selectedFilter: string | null;
  onFilterChange: (filter: string | null) => void;
}

export default function BranchSummaryCards({
  branches,
  selectedFilter,
  onFilterChange,
}: BranchSummaryCardsProps) {
  // Calculate statistics
  const stats = {
    totalBranches: branches.length,
    activeBranches: branches.filter((b) => b.status === 'active').length,
    suspendedBranches: branches.filter((b) => b.status === 'suspended').length,
    todaysBookings: branches.reduce((sum, b) => sum + b.todaysBookings, 0),
    monthlyRevenue: branches.reduce((sum, b) => sum + b.monthlyRevenue, 0),
    pendingSettlements: branches.filter((b) => b.settlementStatus === 'pending').length,
  };

  const cards = [
    {
      id: 'total',
      label: 'Total Branches',
      value: stats.totalBranches,
      color: '#0284c7',
      bgColor: '#dbeafe',
      icon: Building2,
      filterKey: null,
    },
    {
      id: 'active',
      label: 'Active Branches',
      value: stats.activeBranches,
      color: '#059669',
      bgColor: '#d1fae5',
      icon: CheckCircle,
      filterKey: 'active',
    },
    {
      id: 'suspended',
      label: 'Suspended',
      value: stats.suspendedBranches,
      color: '#dc2626',
      bgColor: '#fee2e2',
      icon: AlertCircle,
      filterKey: 'suspended',
    },
    {
      id: 'today',
      label: "Today's Bookings",
      value: stats.todaysBookings,
      color: '#ca8a04',
      bgColor: '#fef3c7',
      icon: Calendar,
      filterKey: null,
    },
    {
      id: 'revenue',
      label: 'Monthly Revenue',
      value: `QAR ${(stats.monthlyRevenue / 1000).toFixed(0)}K`,
      color: '#7c3aed',
      bgColor: '#ede9fe',
      icon: TrendingUp,
      filterKey: null,
    },
    {
      id: 'settlement',
      label: 'Pending Settlements',
      value: stats.pendingSettlements,
      color: '#f59e0b',
      bgColor: '#fef3c7',
      icon: Clock,
      filterKey: null,
    },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '32px' }}>
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
              cursor: card.filterKey ? 'pointer' : 'default',
              transition: 'all 0.2s',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              position: 'relative',
              overflow: 'hidden',
              opacity: card.filterKey ? 1 : 0.9,
            }}
            onMouseEnter={(e) => {
              if (!isActive && card.filterKey) {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.borderColor = card.color;
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive && card.filterKey) {
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
