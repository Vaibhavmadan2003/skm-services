'use client';

import React from 'react';
import { Download, Printer, DollarSign } from 'lucide-react';
import { Booking } from '../../lib/mock-bookings';
import PaymentStatusBadge from '../PaymentStatusBadge';

interface PaymentTabProps {
  booking: Booking;
}

export default function PaymentTab({ booking }: PaymentTabProps) {
  const branchAmount = (booking.amount * booking.branchShare) / 100;
  const companyAmount = (booking.amount * booking.companyCommission) / 100;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Payment Overview */}
      <div>
        <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', marginBottom: '12px' }}>
          Payment Overview
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div style={{ background: '#f9fafb', padding: '12px', borderRadius: '8px' }}>
            <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 4px 0' }}>Amount</p>
            <p style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: 0 }}>QAR {booking.amount}</p>
          </div>
          <div style={{ background: '#f9fafb', padding: '12px', borderRadius: '8px' }}>
            <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 4px 0' }}>Payment Method</p>
            <p style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: 0, textTransform: 'capitalize' }}>
              {booking.paymentMethod}
            </p>
          </div>
          <div style={{ background: '#f9fafb', padding: '12px', borderRadius: '8px' }}>
            <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 4px 0' }}>Payment Status</p>
            <PaymentStatusBadge status={booking.paymentStatus} size="sm" />
          </div>
          <div style={{ background: '#f9fafb', padding: '12px', borderRadius: '8px' }}>
            <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 4px 0' }}>Transaction ID</p>
            <p style={{ fontSize: '13px', fontWeight: '600', color: '#111827', margin: 0 }}>
              {booking.transactionId || 'Pending'}
            </p>
          </div>
          <div style={{ background: '#f9fafb', padding: '12px', borderRadius: '8px' }}>
            <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 4px 0' }}>Invoice #</p>
            <p style={{ fontSize: '13px', fontWeight: '600', color: '#111827', margin: 0 }}>
              {booking.invoiceNumber || 'N/A'}
            </p>
          </div>
          <div style={{ background: '#f9fafb', padding: '12px', borderRadius: '8px' }}>
            <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 4px 0' }}>Settlement Status</p>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '4px 10px',
                background:
                  booking.settlementStatus === 'paid'
                    ? '#dcfce7'
                    : booking.settlementStatus === 'processed'
                      ? '#dbeafe'
                      : '#fef3c7',
                color:
                  booking.settlementStatus === 'paid'
                    ? '#16a34a'
                    : booking.settlementStatus === 'processed'
                      ? '#0284c7'
                      : '#ca8a04',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '600',
              }}
            >
              {booking.settlementStatus ? booking.settlementStatus.charAt(0).toUpperCase() + booking.settlementStatus.slice(1) : 'Pending'}
            </span>
          </div>
        </div>
      </div>

      {/* Revenue Split */}
      <div>
        <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', marginBottom: '12px' }}>
          Revenue Distribution
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Total Revenue */}
          <div style={{ background: '#f9fafb', padding: '16px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>Total Revenue</p>
                <p style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: '4px 0 0 0' }}>QAR {booking.amount}</p>
              </div>
              <DollarSign size={24} style={{ color: '#0052cc', opacity: 0.3 }} />
            </div>
          </div>

          {/* Branch Share */}
          <div style={{ background: '#d1fae5', padding: '16px', borderRadius: '8px', border: '1px solid #6ee7b7' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '12px', color: '#047857', margin: 0 }}>Branch Share ({booking.branchShare}%)</p>
                <p style={{ fontSize: '16px', fontWeight: '700', color: '#065f46', margin: '4px 0 0 0' }}>QAR {branchAmount.toFixed(2)}</p>
              </div>
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  background: 'rgba(16, 185, 129, 0.1)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#059669',
                }}
              >
                {booking.branchShare}%
              </div>
            </div>
          </div>

          {/* Company Commission */}
          <div style={{ background: '#fef3c7', padding: '16px', borderRadius: '8px', border: '1px solid #fcd34d' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <p style={{ fontSize: '12px', color: '#9a3412', margin: 0 }}>Company Commission ({booking.companyCommission}%)</p>
                <p style={{ fontSize: '16px', fontWeight: '700', color: '#7c2d12', margin: '4px 0 0 0' }}>QAR {companyAmount.toFixed(2)}</p>
              </div>
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  background: 'rgba(217, 119, 6, 0.1)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#ca8a04',
                }}
              >
                {booking.companyCommission}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Documents */}
      <div>
        <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', marginBottom: '12px' }}>
          Documents
        </h3>
        <div
          style={{
            padding: '16px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <p style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: 0 }}>Invoice</p>
            <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 0 0' }}>{booking.invoiceNumber || 'Invoice'} • PDF</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              style={{
                padding: '8px 12px',
                background: '#e0e7ff',
                border: '1px solid #c7d2fe',
                borderRadius: '6px',
                color: '#4f46e5',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                fontWeight: '500',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#c7d2fe')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#e0e7ff')}
            >
              <Download size={14} />
              Download
            </button>
            <button
              style={{
                padding: '8px 12px',
                background: '#f3f4f6',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                color: '#6b7280',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                fontWeight: '500',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#e5e7eb')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#f3f4f6')}
            >
              <Printer size={14} />
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
