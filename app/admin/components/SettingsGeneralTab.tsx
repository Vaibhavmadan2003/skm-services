'use client';

import React, { useState, useEffect } from 'react';
import { Save, RotateCcw, AlertCircle } from 'lucide-react';
import SettingsLogoUpload from './SettingsLogoUpload';
import { useSettings } from '../context/SettingsContext';
import { TIME_ZONES, CURRENCIES, LANGUAGES } from '../lib/mock-settings';

interface SettingsGeneralTabProps {
  onShowToast?: (type: 'success' | 'error', message: string) => void;
}

export default function SettingsGeneralTab({ onShowToast }: SettingsGeneralTabProps) {
  const { settings, updateGeneral, updateLogo, saveSettings, resetToDefaults } = useSettings();
  const [formData, setFormData] = useState(settings.general);
  const [hasChanges, setHasChanges] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    setFormData(settings.general);
  }, [settings.general]);

  const handleChange = (field: keyof typeof formData, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    setHasChanges(true);
    
    // Update context immediately so changes show in sidebar/header in real-time
    updateGeneral(newData);
  };

  const handleLogoChange = (logo: string) => {
    updateLogo(logo);
    onShowToast?.('success', 'Logo updated successfully');
  };

  const handleSave = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.businessEmail)) {
      onShowToast?.('error', 'Please enter a valid business email');
      return;
    }

    // Settings already updated in context, just save to localStorage
    saveSettings();
    setHasChanges(false);
    onShowToast?.('success', 'General settings saved successfully');
  };

  const handleReset = () => {
    setShowConfirmDialog(true);
  };

  const confirmReset = () => {
    resetToDefaults();
    setFormData(settings.general);
    setHasChanges(false);
    setShowConfirmDialog(false);
    onShowToast?.('success', 'Settings reset to defaults');
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      {hasChanges && (
        <div
          style={{
            background: '#fef3c7',
            border: '1px solid #fcd34d',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '20px',
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
          }}
        >
          <AlertCircle size={18} style={{ color: '#f59e0b', flexShrink: 0 }} />
          <p style={{ fontSize: '13px', color: '#92400e', margin: 0 }}>
            You have unsaved changes. Click "Save Changes" to apply them.
          </p>
        </div>
      )}

      <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e5e7eb' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', marginBottom: '24px', margin: 0 }}>
          General Settings
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Logo Upload */}
          <SettingsLogoUpload onLogoChange={handleLogoChange} />

          {/* Business Name */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '8px' }}>
              Business Name
            </label>
            <input
              type="text"
              value={formData.businessName}
              onChange={(e) => handleChange('businessName', e.target.value)}
              placeholder="Enter business name"
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '13px',
                outline: 'none',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#0052cc')}
              onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
            />
          </div>

          {/* Business Email */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '8px' }}>
              Business Email
            </label>
            <input
              type="email"
              value={formData.businessEmail}
              onChange={(e) => handleChange('businessEmail', e.target.value)}
              placeholder="Enter business email"
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '13px',
                outline: 'none',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#0052cc')}
              onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
            />
          </div>

          {/* Support Phone */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '8px' }}>
              Support Phone Number
            </label>
            <input
              type="tel"
              value={formData.supportPhone}
              onChange={(e) => handleChange('supportPhone', e.target.value)}
              placeholder="Enter support phone"
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '13px',
                outline: 'none',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#0052cc')}
              onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
            />
          </div>

          {/* Business Address */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '8px' }}>
              Business Address
            </label>
            <textarea
              value={formData.businessAddress}
              onChange={(e) => handleChange('businessAddress', e.target.value)}
              placeholder="Enter business address"
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '13px',
                outline: 'none',
                fontFamily: 'inherit',
                minHeight: '80px',
                resize: 'vertical',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#0052cc')}
              onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
            />
          </div>

          {/* Time Zone */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '8px' }}>
              Time Zone
            </label>
            <select
              value={formData.timeZone}
              onChange={(e) => handleChange('timeZone', e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '13px',
                outline: 'none',
                background: 'white',
                cursor: 'pointer',
              }}
            >
              {TIME_ZONES.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
          </div>

          {/* Currency */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '8px' }}>
              Currency
            </label>
            <select
              value={formData.currency}
              onChange={(e) => handleChange('currency', e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '13px',
                outline: 'none',
                background: 'white',
                cursor: 'pointer',
              }}
            >
              {CURRENCIES.map((curr) => (
                <option key={curr} value={curr}>
                  {curr}
                </option>
              ))}
            </select>
          </div>

          {/* Language */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '8px' }}>
              Language
            </label>
            <select
              value={formData.language}
              onChange={(e) => handleChange('language', e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '13px',
                outline: 'none',
                background: 'white',
                cursor: 'pointer',
              }}
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Buttons */}
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
          <button
            onClick={handleReset}
            style={{
              padding: '12px 16px',
              background: '#f3f4f6',
              color: '#6b7280',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#e5e7eb')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#f3f4f6')}
          >
            <RotateCcw size={16} />
            Reset
          </button>
        </div>
      </div>

      {/* Confirmation Dialog for Reset */}
      {showConfirmDialog && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={() => setShowConfirmDialog(false)}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              maxWidth: '400px',
              boxShadow: '0 20px 25px rgba(0,0,0,0.15)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#111827',
                margin: 0,
                marginBottom: '8px',
              }}
            >
              Reset to Defaults?
            </h3>
            <p
              style={{
                fontSize: '14px',
                color: '#6b7280',
                margin: '8px 0 20px 0',
              }}
            >
              Are you sure you want to reset all general settings to their default values? This action cannot be undone.
            </p>
            <div
              style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'flex-end',
              }}
            >
              <button
                onClick={() => setShowConfirmDialog(false)}
                style={{
                  padding: '10px 20px',
                  background: '#f3f4f6',
                  color: '#6b7280',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '600',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#e5e7eb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#f3f4f6';
                }}
              >
                Cancel
              </button>
              <button
                onClick={confirmReset}
                style={{
                  padding: '10px 20px',
                  background: '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '600',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#b91c1c';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#dc2626';
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
