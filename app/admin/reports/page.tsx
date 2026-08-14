'use client';

import React, { useState } from 'react';
import { Download, Filter, Calendar } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import AnalyticsKPICards from '../components/AnalyticsKPICards';
import { MOCK_KPI, MOCK_DAILY_REVENUE, MOCK_REVENUE_BY_SERVICE, MOCK_SERVICE_PERFORMANCE, MOCK_BRANCH_PERFORMANCE, MOCK_TECHNICIAN_PERFORMANCE, MOCK_PEAK_BOOKING_HOURS, MOCK_PEAK_BOOKING_DAYS, MOCK_CUSTOMER_INSIGHTS, MOCK_PAYMENT_REPORTS, MOCK_PAYMENT_METHODS } from '../lib/mock-analytics';

export default function ReportsPage() {
  const [selectedDateRange, setSelectedDateRange] = useState('30days');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [activeTab, setActiveTab] = useState<'overview' | 'revenue' | 'bookings' | 'services' | 'branches' | 'technicians' | 'customers' | 'payments'>('overview');

  const handleExport = (format: 'pdf' | 'excel' | 'csv') => {
    alert(`Exporting report as ${format.toUpperCase()}...`);
  };

  const renderLineChart = (data: any[], dataKey: string, title: string) => (
    <div style={{ background: 'white', borderRadius: '12px', padding: '20px', border: '1px solid #e5e7eb', marginBottom: '24px' }}>
      <div style={{ marginBottom: '16px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: 0 }}>{title}</h3>
      </div>
      <div style={{ height: '300px', display: 'flex', alignItems: 'flex-end', gap: '8px', paddingBottom: '16px', borderBottom: '1px solid #e5e7eb' }}>
        {data.map((item, idx) => {
          const maxValue = Math.max(...data.map((d) => d[dataKey]));
          const height = (item[dataKey] / maxValue) * 250;
          return (
            <div
              key={idx}
              style={{
                flex: 1,
                height: `${height}px`,
                background: 'linear-gradient(180deg, #0052cc 0%, #0047b2 100%)',
                borderRadius: '8px 8px 0 0',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
              title={`${item.date}: ${item[dataKey]}`}
            />
          );
        })}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '16px', fontSize: '12px', color: '#6b7280' }}>
        <span>{data[0].date}</span>
        <span>{data[data.length - 1].date}</span>
      </div>
    </div>
  );

  const renderTable = (columns: string[], rows: any[]) => (
    <div style={{ overflowX: 'auto', background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
            {columns.map((col, idx) => (
              <th
                key={idx}
                style={{
                  padding: '16px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} style={{ borderBottom: idx < rows.length - 1 ? '1px solid #e5e7eb' : 'none', background: idx % 2 === 0 ? 'white' : '#fafbfc' }}>
              {Object.values(row).map((val: any, colIdx) => (
                <td key={colIdx} style={{ padding: '16px', fontSize: '13px', color: '#111827' }}>
                  {String(val)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <AdminLayout>
      <div style={{ padding: '32px', background: '#f9fafb', minHeight: '100vh' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', margin: 0 }}>Reports & Analytics</h1>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: '8px 0 0 0' }}>
                Business insights and performance analytics
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  background: '#f3f4f6',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#374151',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#e5e7eb')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#f3f4f6')}
              >
                <Filter size={16} />
                Filters
              </button>
              <button
                onClick={() => handleExport('pdf')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  background: '#f3f4f6',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#374151',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#e5e7eb')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#f3f4f6')}
              >
                <Download size={16} />
                Export
              </button>
            </div>
          </div>

          {/* Date Range & Filters */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <select
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '13px',
                outline: 'none',
                background: 'white',
                cursor: 'pointer',
              }}
            >
              <option value='today'>Today</option>
              <option value='yesterday'>Yesterday</option>
              <option value='7days'>Last 7 Days</option>
              <option value='30days'>Last 30 Days</option>
              <option value='thismonth'>This Month</option>
              <option value='lastmonth'>Last Month</option>
              <option value='thisyear'>This Year</option>
            </select>

            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '13px',
                outline: 'none',
                background: 'white',
                cursor: 'pointer',
              }}
            >
              <option value='all'>All Branches</option>
              <option value='downtown'>Downtown Branch</option>
              <option value='lusail'>Lusail Branch</option>
              <option value='marina'>Marina Branch</option>
              <option value='rayyan'>Al Rayyan Branch</option>
            </select>
          </div>
        </div>

        {/* KPI Cards */}
        <AnalyticsKPICards kpiData={MOCK_KPI} />

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #e5e7eb', background: 'white', borderRadius: '12px 12px 0 0', padding: '0 20px', marginBottom: '24px' }}>
          {['overview', 'revenue', 'bookings', 'services', 'branches', 'technicians', 'customers', 'payments'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              style={{
                padding: '12px 0',
                marginRight: '24px',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: activeTab === tab ? '600' : '500',
                color: activeTab === tab ? '#0052cc' : '#6b7280',
                borderBottom: activeTab === tab ? '2px solid #0052cc' : 'none',
                textTransform: 'capitalize',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div>{renderLineChart(MOCK_DAILY_REVENUE, 'revenue', 'Daily Revenue (Last 30 Days)')}</div>
        )}

        {activeTab === 'revenue' && (
          <div>
            {renderLineChart(MOCK_DAILY_REVENUE, 'revenue', 'Daily Revenue Trend')}
            {renderLineChart(MOCK_DAILY_REVENUE, 'bookings', 'Daily Bookings')}
          </div>
        )}

        {activeTab === 'bookings' && (
          <div>
            {renderLineChart(MOCK_DAILY_REVENUE, 'bookings', 'Booking Trends')}
            {renderTable(
              ['Hour', 'Bookings'],
              MOCK_PEAK_BOOKING_HOURS.map((h) => ({ hour: h.hour, bookings: h.bookings }))
            )}
          </div>
        )}

        {activeTab === 'services' && (
          <div>
            {renderTable(
              ['Service', 'Bookings', 'Revenue', 'Completion Rate', 'Rating'],
              MOCK_SERVICE_PERFORMANCE.map((s) => ({
                service: s.serviceName,
                bookings: s.bookings,
                revenue: `QAR ${s.revenue.toLocaleString()}`,
                completion: `${s.completionRate}%`,
                rating: s.rating.toFixed(1),
              }))
            )}
          </div>
        )}

        {activeTab === 'branches' && (
          <div>
            {renderTable(
              ['Branch', 'Bookings', 'Revenue', 'Completion Rate', 'Rating'],
              MOCK_BRANCH_PERFORMANCE.map((b) => ({
                branch: b.branchName,
                bookings: b.bookings,
                revenue: `QAR ${b.revenue.toLocaleString()}`,
                completion: `${b.completionRate}%`,
                rating: b.rating.toFixed(1),
              }))
            )}
          </div>
        )}

        {activeTab === 'technicians' && (
          <div>
            {renderTable(
              ['Technician', 'Assigned', 'Completed', 'Pending', 'Rating', 'Avg Time'],
              MOCK_TECHNICIAN_PERFORMANCE.map((t) => ({
                technician: t.technicianName,
                assigned: t.assignedJobs,
                completed: t.completedJobs,
                pending: t.pendingJobs,
                rating: t.avgRating.toFixed(1),
                avgTime: `${t.avgCompletionTime}m`,
              }))
            )}
          </div>
        )}

        {activeTab === 'customers' && (
          <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e5e7eb' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              <div>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: 0, fontWeight: '600' }}>New Customers</p>
                <p style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: '8px 0 0 0' }}>
                  {MOCK_CUSTOMER_INSIGHTS.newCustomers}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: 0, fontWeight: '600' }}>Returning Customers</p>
                <p style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: '8px 0 0 0' }}>
                  {MOCK_CUSTOMER_INSIGHTS.returningCustomers}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: 0, fontWeight: '600' }}>Repeat Booking Rate</p>
                <p style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: '8px 0 0 0' }}>
                  {MOCK_CUSTOMER_INSIGHTS.repeatBookingRate}%
                </p>
              </div>
              <div>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: 0, fontWeight: '600' }}>Avg Customer Rating</p>
                <p style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: '8px 0 0 0' }}>
                  {MOCK_CUSTOMER_INSIGHTS.avgCustomerRating.toFixed(1)}
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'payments' && (
          <div>
            <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e5e7eb', marginBottom: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                <div>
                  <p style={{ fontSize: '12px', color: '#6b7280', margin: 0, fontWeight: '600' }}>Total Received</p>
                  <p style={{ fontSize: '20px', fontWeight: '700', color: '#16a34a', margin: '8px 0 0 0' }}>
                    QAR {MOCK_PAYMENT_REPORTS.totalPaymentsReceived.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#6b7280', margin: 0, fontWeight: '600' }}>Pending</p>
                  <p style={{ fontSize: '20px', fontWeight: '700', color: '#f59e0b', margin: '8px 0 0 0' }}>
                    QAR {MOCK_PAYMENT_REPORTS.pendingPayments.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#6b7280', margin: 0, fontWeight: '600' }}>Failed</p>
                  <p style={{ fontSize: '20px', fontWeight: '700', color: '#dc2626', margin: '8px 0 0 0' }}>
                    QAR {MOCK_PAYMENT_REPORTS.failedPayments.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#6b7280', margin: 0, fontWeight: '600' }}>Refunds</p>
                  <p style={{ fontSize: '20px', fontWeight: '700', color: '#0052cc', margin: '8px 0 0 0' }}>
                    QAR {MOCK_PAYMENT_REPORTS.refunds.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {renderTable(
              ['Payment Method', 'Count', 'Percentage', 'Amount'],
              MOCK_PAYMENT_METHODS.map((p) => ({
                method: p.method,
                count: '-',
                percentage: `${p.percentage}%`,
                amount: `QAR ${p.amount.toLocaleString()}`,
              }))
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
