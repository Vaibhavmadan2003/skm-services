'use client';

import React from 'react';
import { Download, Printer, Eye, FileText, Image as ImageIcon } from 'lucide-react';
import { Booking } from '../../lib/mock-bookings';

interface DocumentsTabProps {
  booking: Booking;
}

export default function DocumentsTab({ booking }: DocumentsTabProps) {
  const documents = [
    {
      id: 'invoice',
      name: 'Invoice',
      number: booking.invoiceNumber || 'INV-2024-001',
      type: 'PDF',
      icon: FileText,
    },
  ];

  const attachments = [
    { id: 'customer-1', name: 'Customer Attachment 1', type: 'PDF', date: '2024-01-15' },
    { id: 'customer-2', name: 'Customer Attachment 2', type: 'Document', date: '2024-01-15' },
  ];

  const serviceImages = [
    { id: 'service-1', name: 'Before Service', type: 'Image', date: '2024-01-15' },
    { id: 'service-2', name: 'After Service', type: 'Image', date: '2024-01-15' },
  ];

  const completionImages = [
    { id: 'completion-1', name: 'Completion Photo 1', type: 'Image', date: booking.completedAt?.split('T')[0] || '—' },
    { id: 'completion-2', name: 'Completion Photo 2', type: 'Image', date: booking.completedAt?.split('T')[0] || '—' },
  ];

  const DocumentItem = ({ name, number, type, date, isPending }: any) => (
    <div
      style={{
        padding: '12px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        opacity: isPending ? 0.6 : 1,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
        <div
          style={{
            width: '40px',
            height: '40px',
            background: '#f3f4f6',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {type === 'Image' ? <ImageIcon size={20} color='#6b7280' /> : <FileText size={20} color='#6b7280' />}
        </div>
        <div>
          <p style={{ fontSize: '13px', fontWeight: '600', color: '#111827', margin: 0 }}>{name}</p>
          <p style={{ fontSize: '11px', color: '#6b7280', margin: '2px 0 0 0' }}>
            {number || type} • {date}
          </p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '6px' }}>
        {!isPending && (
          <>
            <button
              style={{
                padding: '6px 10px',
                background: '#e0e7ff',
                border: '1px solid #c7d2fe',
                borderRadius: '6px',
                color: '#4f46e5',
                cursor: 'pointer',
                fontSize: '11px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#c7d2fe')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#e0e7ff')}
            >
              <Eye size={12} />
            </button>
            <button
              style={{
                padding: '6px 10px',
                background: '#e0e7ff',
                border: '1px solid #c7d2fe',
                borderRadius: '6px',
                color: '#4f46e5',
                cursor: 'pointer',
                fontSize: '11px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#c7d2fe')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#e0e7ff')}
            >
              <Download size={12} />
            </button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Invoice */}
      <div>
        <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', marginBottom: '12px' }}>
          Invoice
        </h3>
        <DocumentItem name="Invoice" number={booking.invoiceNumber} type="PDF" date={booking.bookingDate} isPending={false} />
      </div>

      {/* Customer Attachments */}
      <div>
        <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', marginBottom: '12px' }}>
          Customer Attachments
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {attachments.map((att) => (
            <DocumentItem key={att.id} name={att.name} type={att.type} date={att.date} isPending={false} />
          ))}
        </div>
      </div>

      {/* Service Images */}
      <div>
        <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', marginBottom: '12px' }}>
          Service Images
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {serviceImages.map((img) => (
            <DocumentItem key={img.id} name={img.name} type={img.type} date={img.date} isPending={false} />
          ))}
        </div>
      </div>

      {/* Completion Images */}
      <div>
        <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', marginBottom: '12px' }}>
          Completion Images
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {completionImages.map((img) => (
            <DocumentItem
              key={img.id}
              name={img.name}
              type={img.type}
              date={img.date}
              isPending={booking.bookingStatus !== 'completed'}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
