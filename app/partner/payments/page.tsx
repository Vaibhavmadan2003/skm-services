'use client';

import React, { useState } from 'react';
import { Search, Download, Filter, TrendingUp } from 'lucide-react';

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const payments = [
    { id: '1', booking_id: '#BK001', date: '2026-07-31', amount: 69, status: 'completed', method: 'Credit Card' },
    { id: '2', booking_id: '#BK002', date: '2026-08-01', amount: 30, status: 'pending', method: 'Cash' },
    { id: '3', booking_id: '#BK003', date: '2026-07-29', amount: 85, status: 'completed', method: 'Bank Transfer' },
    { id: '4', booking_id: '#BK004', date: '2026-08-02', amount: 120, status: 'completed', method: 'Credit Card' },
    { id: '5', booking_id: '#BK005', date: '2026-08-03', amount: 50, status: 'failed', method: 'Wallet' },
  ];

  const filteredPayments = payments.filter(p =>
    (p.booking_id.toLowerCase().includes(searchTerm.toLowerCase()) || p.method.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterStatus === 'all' || p.status === filterStatus)
  );

  const totalRevenue = payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);

  const statusColors = {
    completed: { bg: '#d1fae5', text: '#065f46', label: 'Completed' },
    pending: { bg: '#fef3c7', text: '#92400e', label: 'Pending' },
    failed: { bg: '#fee2e2', text: '#991b1b', label: 'Failed' }
  };

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#111827', margin: 0 }}>Payments</h1>
        <p style={{ fontSize: '14px', color: '#6b7280', margin: '8px 0 0 0' }}>Track and manage all payment transactions</p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <p style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500', margin: 0, textTransform: 'uppercase' }}>Total Revenue</p>
          <p style={{ fontSize: '28px', fontWeight: '700', color: '#10b981', margin: '8px 0 0 0' }}>QAR {totalRevenue}</p>
        </div>
        <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <p style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500', margin: 0, textTransform: 'uppercase' }}>Pending</p>
          <p style={{ fontSize: '28px', fontWeight: '700', color: '#f59e0b', margin: '8px 0 0 0' }}>QAR {pendingAmount}</p>
        </div>
        <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <p style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500', margin: 0, textTransform: 'uppercase' }}>Total Transactions</p>
          <p style={{ fontSize: '28px', fontWeight: '700', color: '#0052CC', margin: '8px 0 0 0' }}>{payments.length}</p>
        </div>
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '200px', padding: '0 12px', borderRadius: '8px', border: '1px solid #e5e7eb', background: 'white' }}>
          <Search size={18} style={{ color: '#9ca3af' }} />
          <input type="text" placeholder="Search payments..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ flex: 1, border: 'none', outline: 'none', padding: '10px 0', fontSize: '14px', fontFamily: 'inherit' }} />
        </div>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={{ padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', background: 'white', fontSize: '14px', cursor: 'pointer', fontWeight: '500', color: '#6b7280' }}>
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
        <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px', fontWeight: '600', color: '#0052CC', cursor: 'pointer' }}>
          <Download size={18} />
          <span>Export</span>
        </button>
      </div>

      {/* Payments Table */}
      <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ textAlign: 'left', padding: '16px', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Booking ID</th>
                <th style={{ textAlign: 'left', padding: '16px', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Date</th>
                <th style={{ textAlign: 'left', padding: '16px', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Amount</th>
                <th style={{ textAlign: 'left', padding: '16px', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Method</th>
                <th style={{ textAlign: 'left', padding: '16px', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.length > 0 ? filteredPayments.map(payment => {
                const statusInfo = statusColors[payment.status as keyof typeof statusColors];
                return (
                  <tr key={payment.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '16px', fontSize: '13px', fontWeight: '600', color: '#0052CC' }}>{payment.booking_id}</td>
                    <td style={{ padding: '16px', fontSize: '13px', color: '#6b7280' }}>{new Date(payment.date).toLocaleDateString()}</td>
                    <td style={{ padding: '16px', fontSize: '13px', fontWeight: '600', color: '#111827' }}>QAR {payment.amount}</td>
                    <td style={{ padding: '16px', fontSize: '13px', color: '#6b7280' }}>{payment.method}</td>
                    <td style={{ padding: '16px', fontSize: '13px' }}>
                      <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', background: statusInfo.bg, color: statusInfo.text }}>{statusInfo.label}</span>
                    </td>
                  </tr>
                );
              }) : <tr><td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: '#6b7280' }}>No payments found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
