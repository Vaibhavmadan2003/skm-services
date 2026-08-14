'use client';

import React, { useState, useCallback } from 'react';
import AdminLayout from '../components/AdminLayout';
import SettingsGeneralTab from '../components/SettingsGeneralTab';
import SettingsAppearanceTab from '../components/SettingsAppearanceTab';
import SettingsBookingTab from '../components/SettingsBookingTab';
import SettingsPaymentTab from '../components/SettingsPaymentTab';
import SettingsNotificationsTab from '../components/SettingsNotificationsTab';
import SettingsSecurityTab from '../components/SettingsSecurityTab';
import SettingsApiIntegrationTab from '../components/SettingsApiIntegrationTab';
import Toast, { ToastMessage } from '../components/Toast';
import { useSettings } from '../context/SettingsContext';

export default function SettingsPage() {
  const { settings, saveSettings } = useSettings();
  const [activeTab, setActiveTab] = useState<'general' | 'company' | 'appearance' | 'booking' | 'payment' | 'security' | 'notifications' | 'api' | 'system'>('general');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((type: 'success' | 'error', message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, message }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  // Determine page background based on theme
  const getPageBgColor = () => {
    if (settings.appearance.theme === 'dark') {
      return '#111827';
    } else if (settings.appearance.theme === 'system') {
      const prefersDark = typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)').matches : false;
      return prefersDark ? '#111827' : '#f9fafb';
    }
    return '#f9fafb';
  };

  const getTextColor = () => {
    if (settings.appearance.theme === 'dark') {
      return '#f9fafb';
    } else if (settings.appearance.theme === 'system') {
      const prefersDark = typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)').matches : false;
      return prefersDark ? '#f9fafb' : '#111827';
    }
    return '#111827';
  };

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'company', label: 'Company Info' },
    { id: 'appearance', label: 'Appearance' },
    { id: 'booking', label: 'Booking' },
    { id: 'payment', label: 'Payment' },
    { id: 'security', label: 'Security' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'api', label: 'API & Integrations' },
    { id: 'system', label: 'System Info' },
  ];

  return (
    <AdminLayout>
      <div style={{
        padding: '32px',
        background: getPageBgColor(),
        minHeight: '100vh',
        transition: 'all 0.3s ease',
        color: getTextColor()
      }}>
        {/* Toast Container */}
        <Toast messages={toasts} onRemove={removeToast} />

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: getTextColor(), margin: 0 }}>Settings</h1>
          <p style={{ fontSize: '14px', color: getTextColor(), margin: '8px 0 0 0', opacity: 0.7 }}>
            Manage your application settings and preferences
          </p>
        </div>

        {/* Tabs Navigation */}
        <div style={{
          background: settings.appearance.theme === 'dark' ? '#1f2937' : 'white',
          borderRadius: '12px',
          border: `1px solid ${settings.appearance.theme === 'dark' ? '#374151' : '#e5e7eb'}`,
          marginBottom: '24px',
          transition: 'all 0.3s ease'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 0 }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: '16px',
                  border: 'none',
                  background: activeTab === tab.id ? (settings.appearance.theme === 'dark' ? '#111827' : '#f0f4ff') : 'transparent',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: activeTab === tab.id ? '600' : '500',
                  color: activeTab === tab.id ? '#0052cc' : getTextColor(),
                  borderBottom: activeTab === tab.id ? '2px solid #0052cc' : `1px solid ${settings.appearance.theme === 'dark' ? '#374151' : '#e5e7eb'}`,
                  textAlign: 'center',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.color = '#0052cc';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.color = getTextColor();
                  }
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div>
          {activeTab === 'general' && <SettingsGeneralTab onShowToast={showToast} />}
          {activeTab === 'appearance' && <SettingsAppearanceTab onShowToast={showToast} />}
          {activeTab === 'booking' && <SettingsBookingTab onShowToast={showToast} />}
          {activeTab === 'payment' && <SettingsPaymentTab onShowToast={showToast} />}
          {activeTab === 'notifications' && <SettingsNotificationsTab onShowToast={showToast} />}
          {activeTab === 'security' && <SettingsSecurityTab onShowToast={showToast} />}
          {activeTab === 'api' && <SettingsApiIntegrationTab onShowToast={showToast} />}

          {activeTab === 'company' && (
            <div style={{ maxWidth: '800px' }}>
              <div style={{
                background: settings.appearance.theme === 'dark' ? '#1f2937' : 'white',
                borderRadius: '12px',
                padding: '24px',
                border: `1px solid ${settings.appearance.theme === 'dark' ? '#374151' : '#e5e7eb'}`,
                color: getTextColor()
              }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: getTextColor(), marginBottom: '24px', margin: 0 }}>
                  Company Information
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {[
                    { label: 'Company Name', value: 'SKM Services Qatar' },
                    { label: 'GST Number', value: 'GST123456789' },
                    { label: 'PAN Number', value: 'PAN987654321' },
                    { label: 'Registration Number', value: 'REG-2023-001' },
                    { label: 'Website', value: 'www.skm-services.qa' },
                    { label: 'Support Email', value: 'support@skm-services.qa' },
                  ].map((field, idx) => (
                    <div key={idx}>
                      <label style={{ fontSize: '13px', fontWeight: '600', color: getTextColor(), display: 'block', marginBottom: '8px', opacity: 0.8 }}>
                        {field.label}
                      </label>
                      <input
                        type="text"
                        defaultValue={field.value}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: `1px solid ${settings.appearance.theme === 'dark' ? '#374151' : '#e5e7eb'}`,
                          borderRadius: '8px',
                          fontSize: '13px',
                          outline: 'none',
                          background: settings.appearance.theme === 'dark' ? '#111827' : 'white',
                          color: getTextColor()
                        }}
                        onFocus={(e) => (e.target.style.borderColor = '#0052cc')}
                        onBlur={(e) => (e.target.style.borderColor = settings.appearance.theme === 'dark' ? '#374151' : '#e5e7eb')}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div style={{ maxWidth: '800px' }}>
              <div style={{
                background: settings.appearance.theme === 'dark' ? '#1f2937' : 'white',
                borderRadius: '12px',
                padding: '24px',
                border: `1px solid ${settings.appearance.theme === 'dark' ? '#374151' : '#e5e7eb'}`,
                color: getTextColor()
              }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: getTextColor(), marginBottom: '24px', margin: 0 }}>
                  System Information
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                  {[
                    { label: 'Application Version', value: '1.0.0' },
                    { label: 'Frontend Version', value: '1.0.0' },
                    { label: 'Backend Status', value: 'Operational' },
                    { label: 'Database Status', value: 'Healthy' },
                  ].map((item, idx) => (
                    <div key={idx} style={{
                      background: settings.appearance.theme === 'dark' ? '#111827' : '#f9fafb',
                      padding: '16px',
                      borderRadius: '8px',
                      border: `1px solid ${settings.appearance.theme === 'dark' ? '#374151' : '#e5e7eb'}`
                    }}>
                      <p style={{ fontSize: '12px', color: getTextColor(), margin: '0 0 8px 0', fontWeight: '600', opacity: 0.7 }}>{item.label}</p>
                      <p style={{ fontSize: '14px', fontWeight: '600', color: getTextColor(), margin: 0 }}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
