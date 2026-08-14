'use client';

import React from 'react';
import { Branch } from '../../lib/mock-branches';

interface BranchPaymentsTabProps {
  branch: Branch;
}

export default function BranchPaymentsTab({ branch }: BranchPaymentsTabProps) {
  const totalRevenue = branch.monthlyRevenue;
  const companyCommission = Math.round(totalRevenue * 0.15); // 15% commission
  const branchShare = totalRevenue - companyCommission;

  const settlementHistory = [
    {
      month: 'December 2024',
      revenue: 42300,
      commission: 6345,
      share: 35955,
      status: 'Completed',
      date: '2024-12-31',
    },
    {
      month: 'November 2024',
      revenue: 38900,
      commission: 5835,
      share: 33065,
      status: 'Completed',
      date: '2024-11-30',
    },
    {
      month: 'October 2024',
      revenue: 41200,
      commission: 6180,
      share: 35020,
      status: 'Completed',
      date: '2024-10-31',
    },
  ];

  const getSettlementBadge = (status: string) => {
    const config: Record<string, { bg: string; color: string; label: string }> = {
      'Completed': { bg: '#d1fae5', color: '#059669', label: '✓ Completed' },
      'Pending': { bg: '#fef3c7', color: '#92400e', label: '⏳ Pending' },
      'Partial': { bg: '#fce7f3', color: '#be185d', label: '○ Partial' },
    };
    return config[status] || config['Pending'];
  };

  return (
    <div>
      {/* Current Month Summary */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', marginBottom: '16px', margin: '0 0 16px 0' }}>
          Current Month (January 2025)
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div style={{ padding: '16px', background: '#f9fafb', borderRadius: '8px', borderLeft: '4px solid #059669' }}>
            <p style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '600', margin: 0, marginBottom: '8px' }}>TOTAL REVENUE</p>
            <p style={{ fontSize: '18px', fontWeight: '700', color: '#059669', margin: 0 }}>QAR {totalRevenue.toLocaleString()}</p>
          </div>
          <div style={{ padding: '16px', background: '#f9fafb', borderRadius: '8px', borderLeft: '4px solid #ef4444' }}>
            <p style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '600', margin: 0, marginBottom: '8px' }}>COMPANY COMMISSION (15%)</p>
            <p style={{ fontSize: '18px', fontWeight: '700', color: '#ef4444', margin: 0 }}>QAR {companyCommission.toLocaleString()}</p>
          </div>
          <div style={{ padding: '16px', background: '#f9fafb', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
            <p style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '600', margin: 0, marginBottom: '8px' }}>BRANCH SHARE (85%)</p>
            <p style={{ fontSize: '18px', fontWeight: '700', color: '#3b82f6', margin: 0 }}>QAR {branchShare.toLocaleString()}</p>
          </div>
          <div style={{ padding: '16px', background: '#f9fafb', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
            <p style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '600', margin: 0, marginBottom: '8px' }}>SETTLEMENT STATUS</p>
            <p style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: 0 }}>
              <span
                style={{
                  display: 'inline-block',
                  padding: '4px 8px',
                  background: '#fef3c7',
                  color: '#92400e',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: '600',
                }}
              >
                ⏳ Pending
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Settlement History */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', marginBottom: '16px', margin: '0 0 16px 0' }}>
          Settlement History
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#6b7280', fontSize: '11px' }}>MONTH</th>
                <th style={{ padding: '12px', textAlign: 'right', fontWeight: '600', color: '#6b7280', fontSize: '11px' }}>REVENUE</th>
                <th style={{ padding: '12px', textAlign: 'right', fontWeight: '600', color: '#6b7280', fontSize: '11px' }}>COMMISSION</th>
                <th style={{ padding: '12px', textAlign: 'right', fontWeight: '600', color: '#6b7280', fontSize: '11px' }}>BRANCH SHARE</th>
                <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600', color: '#6b7280', fontSize: '11px' }}>STATUS</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#6b7280', fontSize: '11px' }}>DATE</th>
              </tr>
            </thead>
            <tbody>
              {settlementHistory.map((settlement, index) => {
                const badge = getSettlementBadge(settlement.status);
                return (
                  <tr key={index} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '12px', color: '#111827', fontWeight: '600' }}>{settlement.month}</td>
                    <td style={{ padding: '12px', textAlign: 'right', color: '#059669', fontWeight: '600' }}>QAR {settlement.revenue.toLocaleString()}</td>
                    <td style={{ padding: '12px', textAlign: 'right', color: '#ef4444', fontWeight: '600' }}>QAR {settlement.commission.toLocaleString()}</td>
                    <td style={{ padding: '12px', textAlign: 'right', color: '#3b82f6', fontWeight: '600' }}>QAR {settlement.share.toLocaleString()}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '4px 8px',
                          background: badge.bg,
                          color: badge.color,
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: '600',
                        }}
                      >
                        {badge.label}
                      </span>
                    </td>
                    <td style={{ padding: '12px', color: '#6b7280' }}>{settlement.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Box */}
      <div style={{ padding: '16px', background: '#f9fafb', borderRadius: '8px', borderLeft: '4px solid #0052cc' }}>
        <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
          <strong>Commission Structure:</strong> SKM Services retains 15% commission on all bookings. The branch receives 85% of the booking amount. Settlements are processed monthly.
        </p>
      </div>
    </div>
  );
}
