'use client';

import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error';
  message: string;
}

interface ToastProps {
  messages: ToastMessage[];
  onRemove: (id: string) => void;
}

export default function Toast({ messages, onRemove }: ToastProps) {
  useEffect(() => {
    if (messages.length === 0) return;

    const timer = setTimeout(() => {
      onRemove(messages[0].id);
    }, 3000);

    return () => clearTimeout(timer);
  }, [messages, onRemove]);

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        maxWidth: '400px',
      }}
    >
      {messages.map((toast) => (
        <div
          key={toast.id}
          style={{
            background: toast.type === 'success' ? '#dcfce7' : '#fee2e2',
            border: `1px solid ${toast.type === 'success' ? '#86efac' : '#fecaca'}`,
            borderRadius: '8px',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            animation: 'slideIn 0.3s ease-out',
          }}
        >
          {toast.type === 'success' ? (
            <CheckCircle size={20} style={{ color: '#22c55e', flexShrink: 0 }} />
          ) : (
            <AlertCircle size={20} style={{ color: '#ef4444', flexShrink: 0 }} />
          )}
          <p
            style={{
              flex: 1,
              margin: 0,
              fontSize: '13px',
              fontWeight: '500',
              color: toast.type === 'success' ? '#166534' : '#991b1b',
            }}
          >
            {toast.message}
          </p>
          <button
            onClick={() => onRemove(toast.id)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              color: toast.type === 'success' ? '#22c55e' : '#ef4444',
            }}
          >
            <X size={16} />
          </button>
        </div>
      ))}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
