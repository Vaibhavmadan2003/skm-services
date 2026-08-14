'use client';

import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

interface SettingsNotificationsTabProps {
  onShowToast?: (type: 'success' | 'error', message: string) => void;
}

export default function SettingsNotificationsTab({ onShowToast }: SettingsNotificationsTabProps) {
  const { settings, updateNotifications, saveSettings } = useSettings();
  const [formData, setFormData] = useState(settings.notifications);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setFormData(settings.notifications);
  }, [settings.notifications]);

  const handleChange = (field: keyof typeof formData, value: boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    updateNotifications(formData);
    saveSettings();
    setHasChanges(false);
    onShowToast?.('success', 'Notification preferences saved successfully');
  };

  const preferences = [
    { key: 'emailNotifications', label: 'Email Notifications' },
    { key: 'smsNotifications', label: 'SMS Notifications' },
    { key: 'pushNotifications', label: 'Push Notifications' },
    { key: 'bookingAlerts', label: 'Booking Alerts' },
    { key: 'paymentAlerts', label: 'Payment Alerts' },
    { key: 'reviewAlerts', label: 'Review Alerts' },
  ];

  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e5e7eb' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', marginBottom: '24px', margin: 0 }}>
          Notification Preferences
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {preferences.map((pref) => (
            <label key={pref.key} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData[pref.key as keyof typeof formData]}
                onChange={(e) => handleChange(pref.key as keyof typeof formData, e.target.checked)}
                style={{ cursor: 'pointer' }}
              />
              <span style={{ fontSize: '13px', color: '#111827' }}>{pref.label}</span>
            </label>
          ))}
        </div>

        {/* Save Button */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
          <button
            onClick={handleSave}
            disabled={!hasChanges}
            style={{
              flex: 1,
              padding: '12px 16px',
              background: hasChanges ? '#0052cc' : '#d1d5db',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: hasChanges ? 'pointer' : 'not-allowed',
              fontSize: '13px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
            onMouseEnter={(e) => {
              if (hasChanges) e.currentTarget.style.background = '#0047b2';
            }}
            onMouseLeave={(e) => {
              if (hasChanges) e.currentTarget.style.background = '#0052cc';
            }}
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
