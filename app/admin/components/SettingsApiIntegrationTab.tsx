'use client';

import React, { useState } from 'react';
import { Copy, Trash2, Plus, Eye, EyeOff } from 'lucide-react';
import { MOCK_API_INTEGRATIONS } from '../lib/mock-settings';

interface SettingsApiIntegrationTabProps {
  onShowToast?: (type: 'success' | 'error', message: string) => void;
}

export default function SettingsApiIntegrationTab({ onShowToast }: SettingsApiIntegrationTabProps) {
  const [integrations, setIntegrations] = useState(MOCK_API_INTEGRATIONS);
  const [showApiKey, setShowApiKey] = useState<Record<string, boolean>>({});

  const toggleApiKeyVisibility = (index: number) => {
    setShowApiKey(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    onShowToast?.('success', 'API Key copied to clipboard');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ maxWidth: '800px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', marginBottom: '8px', margin: 0 }}>
          API & Integrations
        </h3>
        <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>
          Connect and manage your third-party API integrations
        </p>
      </div>

      {/* Integrations List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '16px' }}>
        {integrations.map((integration, idx) => (
          <div
            key={idx}
            style={{
              background: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {/* Status Badge */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#111827', margin: 0 }}>
                {integration.name}
              </h4>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: '600',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  background: integration.status === 'connected' ? '#dcfce7' : '#fee2e2',
                  color: integration.status === 'connected' ? '#166534' : '#991b1b',
                }}
              >
                {integration.status === 'connected' ? 'Connected' : 'Not Connected'}
              </span>
            </div>

            {/* API Key Field */}
            {integration.apiKey && (
              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', display: 'block', marginBottom: '6px' }}>
                  API Key
                </label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input
                    type={showApiKey[idx] ? 'text' : 'password'}
                    value={integration.apiKey}
                    readOnly
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px',
                      background: '#f9fafb',
                      outline: 'none',
                    }}
                  />
                  <button
                    onClick={() => toggleApiKeyVisibility(idx)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#6b7280',
                      padding: '4px 8px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    title={showApiKey[idx] ? 'Hide' : 'Show'}
                  >
                    {showApiKey[idx] ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  <button
                    onClick={() => copyToClipboard(integration.apiKey || '')}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#6b7280',
                      padding: '4px 8px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    title="Copy API Key"
                  >
                    <Copy size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              {integration.status === 'not_connected' ? (
                <button
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    background: '#0052cc',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#0047b2')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#0052cc')}
                >
                  Connect
                </button>
              ) : (
                <button
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    background: '#f3f4f6',
                    color: '#6b7280',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#e5e7eb')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#f3f4f6')}
                >
                  Disconnect
                </button>
              )}
              <button
                style={{
                  padding: '8px 12px',
                  background: '#fee2e2',
                  color: '#dc2626',
                  border: '1px solid #fecaca',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#fecaca')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#fee2e2')}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}

        {/* Add New Integration Card */}
        <div
          style={{
            background: 'white',
            border: '2px dashed #e5e7eb',
            borderRadius: '12px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            minHeight: '200px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#0052cc';
            e.currentTarget.style.background = '#f0f4ff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#e5e7eb';
            e.currentTarget.style.background = 'white';
          }}
        >
          <Plus size={32} style={{ color: '#0052cc' }} />
          <p style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: 0 }}>
            Add Integration
          </p>
          <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
            Connect a new API service
          </p>
        </div>
      </div>

      {/* Save Button */}
      <div style={{ maxWidth: '800px', display: 'flex', gap: '12px' }}>
        <button
          onClick={() => onShowToast?.('success', 'API integrations saved successfully')}
          style={{
            padding: '12px 24px',
            background: '#0052cc',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#0047b2')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#0052cc')}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
