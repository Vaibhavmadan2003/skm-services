'use client';

import React from 'react';
import { FileText, Target, CheckCircle2, Play, Flag, XCircle } from 'lucide-react';
import { Booking } from '../../lib/mock-bookings';

interface TimelineTabProps {
  booking: Booking;
}

export default function TimelineTab({ booking }: TimelineTabProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };
  };

  const getTimelineStages = () => {
    const stages = [
      { name: 'Created', date: booking.createdAt, completed: true, icon: <FileText size={18} /> },
      { name: 'Assigned', date: booking.assignedAt, completed: !!booking.assignedAt, icon: <Target size={18} /> },
      { name: 'Accepted', date: booking.acceptedAt, completed: !!booking.acceptedAt, icon: <CheckCircle2 size={18} /> },
      { name: 'Started', date: booking.startedAt, completed: !!booking.startedAt, icon: <Play size={18} /> },
      { name: 'Completed', date: booking.completedAt, completed: !!booking.completedAt, icon: <Flag size={18} /> },
    ];

    if (booking.bookingStatus === 'cancelled') {
      stages.push({ name: 'Cancelled', date: booking.cancelledAt, completed: true, icon: <XCircle size={18} /> });
    }

    return stages;
  };

  const timelineStages = getTimelineStages();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingRight: '4px' }}>
      {timelineStages.map((stage, idx) => {
        const formatted = formatDate(stage.date);

        return (
          <div key={idx} style={{ display: 'flex', gap: '12px' }}>
            {/* Timeline dot and line */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: stage.completed ? '#0052cc' : '#e5e7eb',
                  border: '2px solid white',
                  boxShadow: `0 0 0 2px ${stage.completed ? '#0052cc' : '#e5e7eb'}`,
                  zIndex: 1,
                }}
              />
              {idx < timelineStages.length - 1 && (
                <div
                  style={{
                    width: '2px',
                    height: '56px',
                    background: timelineStages[idx + 1].completed ? '#0052cc' : '#e5e7eb',
                    marginTop: '8px',
                    transition: 'background 0.3s',
                  }}
                />
              )}
            </div>

            {/* Content */}
            <div style={{ paddingTop: '2px', flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ color: stage.completed ? '#0052cc' : '#d1d5db' }}>
                  {stage.icon}
                </span>
                <p style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: 0 }}>{stage.name}</p>
              </div>

              {formatted ? (
                <div style={{ background: '#f9fafb', padding: '8px 12px', borderRadius: '6px', fontSize: '12px' }}>
                  <p style={{ color: '#6b7280', margin: 0 }}>
                    {formatted.date} at {formatted.time}
                  </p>
                </div>
              ) : (
                <p style={{ fontSize: '12px', color: '#d1d5db', fontStyle: 'italic', margin: 0 }}>Pending...</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
