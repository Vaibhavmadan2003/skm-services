'use client';

import React, { useState } from 'react';
import { Download, Calendar } from 'lucide-react';
import { Branch } from '../../lib/mock-branches';

interface BranchReportsTabProps {
  branch: Branch;
}

export default function BranchReportsTab({ branch }: BranchReportsTabProps) {
  const [reportType, setReportType] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('monthly');
  const [dateFrom, setDateFrom] = useState('2024-01-01');
  const [dateTo, setDateTo] = useState('2024-01-31');

  const reportData = {
    daily: {
      title: 'Daily Report',
      metrics: [
        { label: 'Today\'s Bookings', value: branch.todaysBookings },
        { label: 'Today\'s Revenue', value: `QAR ${(branch.monthlyRevenue / 30).toFixed(0)}` },
      ],
    },
    weekly: {
      title: 'Weekly Report',
      metrics: [
        { label: 'Weekly Bookings', value: Math.round(branch.monthlyBookings / 4) },
        { label: 'Weekly Revenue', value: `QAR ${(branch.monthlyRevenue / 4).toFixed(0)}` },
      ],
    },
    monthly: {
      title: 'Monthly Report',
      metrics: [
        { label: 'Monthly Bookings', value: branch.monthlyBookings },
        { label: 'Monthly Revenue', value: `QAR ${branch.monthlyRevenue.toLocaleString()}` },
      ],
    },
    yearly: {
      title: 'Yearly Report',
      metrics: [
        { label: 'Yearly Bookings', value: branch.monthlyBookings * 12 },
        { label: 'Yearly Revenue', value: `QAR ${(branch.monthlyRevenue * 12).toLocaleString()}` },
      ],
    },
  };

  const currentReport = reportData[reportType];

  return (
    <div>
      {/* Report Type Selection */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', marginBottom: '12px', margin: '0 0 12px 0' }}>
          Report Type
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          {(['daily', 'weekly', 'monthly', 'yearly'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setReportType(type)}
              style={{
                padding: '12px',
                background: reportType === type ? '#0052cc' : '#f3f4f6',
                color: reportType === type ? 'white' : '#374151',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600',
                transition: 'all 0.2s',
                textTransform: 'capitalize',
              }}
              onMouseEnter={(e) => {
                if (reportType !== type) {
                  e.currentTarget.style.background = '#e5e7eb';
                }
              }}
              onMouseLeave={(e) => {
                if (reportType !== type) {
                  e.currentTarget.style.background = '#f3f4f6';
                }
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Date Range */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', marginBottom: '12px', margin: '0 0 12px 0' }}>
          Date Range
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            style={{
              padding: '10px 12px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '13px',
              outline: 'none',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#0052cc')}
            onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e7eb')}
          />
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            style={{
              padding: '10px 12px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '13px',
              outline: 'none',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#0052cc')}
            onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e7eb')}
          />
        </div>
      </div>

      {/* Report Summary */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', marginBottom: '12px', margin: '0 0 12px 0' }}>
          {currentReport.title} - {dateFrom} to {dateTo}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {currentReport.metrics.map((metric, index) => (
            <div key={index} style={{ padding: '16px', background: '#f9fafb', borderRadius: '8px', borderLeft: '4px solid #0052cc' }}>
              <p style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '600', margin: 0, marginBottom: '8px' }}>{metric.label}</p>
              <p style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: 0 }}>{metric.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Export Options */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', marginBottom: '12px', margin: '0 0 12px 0' }}>
          Export Report
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '600',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#dc2626')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#ef4444')}
            onClick={() => alert('Exporting as PDF...')}
          >
            <Download size={16} />
            Export PDF
          </button>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '12px',
              background: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '600',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#059669')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#10b981')}
            onClick={() => alert('Exporting as Excel...')}
          >
            <Download size={16} />
            Export Excel
          </button>
        </div>
      </div>

      {/* Available Reports */}
      <div style={{ padding: '16px', background: '#f9fafb', borderRadius: '8px', borderLeft: '4px solid #0052cc' }}>
        <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
          <strong>Available Reports:</strong>
          <br />• Daily: Today's activity and revenue
          <br />• Weekly: 7-day aggregated data
          <br />• Monthly: Full month performance
          <br />• Yearly: Annual summary
        </p>
      </div>
    </div>
  );
}
