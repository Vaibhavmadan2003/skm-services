'use client';

import React, { useState, useEffect } from 'react';
import { Save, AlertCircle } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

interface SettingsAppearanceTabProps {
  onShowToast?: (type: 'success' | 'error', message: string) => void;
}

export default function SettingsAppearanceTab({ onShowToast }: SettingsAppearanceTabProps) {
  const { settings, updateAppearance, saveSettings, resetToDefaults } = useSettings();
  const [formData, setFormData] = useState(settings.appearance);
  const [hasChanges, setHasChanges] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    setFormData(settings.appearance);
  }, [settings.appearance]);

  const handleChange = (field: keyof typeof formData, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    setHasChanges(true);

    // IMMEDIATE UPDATE - Apply changes instantly to context
    updateAppearance(newData);
  };

  const handleSave = () => {
    // Settings are already updated in context via handleChange
    // Just save to localStorage
    saveSettings();
    setHasChanges(false);
    onShowToast?.('success', 'Appearance settings saved successfully');
  };

  const handleReset = () => {
    setShowConfirmDialog(true);
  };

  const confirmReset = () => {
    resetToDefaults();
    setFormData(settings.appearance);
    setHasChanges(false);
    setShowConfirmDialog(false);
    onShowToast?.('success', 'Appearance settings reset to defaults');
  };

  const themeBackground = formData.theme === 'dark' ? '#1f2937' : '#ffffff';
  const themeText = formData.theme === 'dark' ? '#f9fafb' : '#111827';
  const themeBorder = formData.theme === 'dark' ? '#374151' : '#e5e7eb';

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
      {/* Unsaved Changes Warning */}
      {hasChanges && (
        <div
          style={{
            gridColumn: '1 / -1',
            background: '#fef3c7',
            border: '1px solid #fcd34d',
            borderRadius: '8px',
            padding: '12px 16px',
            marginBottom: '12px',
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
          }}
        >
          <AlertCircle size={18} style={{ color: '#f59e0b', flexShrink: 0 }} />
          <p style={{ fontSize: '13px', color: '#92400e', margin: 0 }}>
            Preview enabled - Changes visible instantly. Click "Apply Theme Changes" to save permanently.
          </p>
        </div>
      )}

      {/* LIVE PREVIEW BOX */}
      <div
        style={{
          gridColumn: '1 / -1',
          background: themeBackground,
          color: themeText,
          padding: '24px',
          borderRadius: '12px',
          border: `1px solid ${themeBorder}`,
          transition: 'all 0.3s ease',
        }}
      >
        <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '700' }}>Live Preview</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          <div>
            <p style={{ margin: 0, fontSize: '12px', opacity: 0.7 }}>Theme</p>
            <p style={{ margin: '4px 0 0 0', fontSize: '14px', fontWeight: '600', textTransform: 'capitalize' }}>{formData.theme}</p>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '12px', opacity: 0.7 }}>Primary Color</p>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '4px' }}>
              <div style={{ width: '20px', height: '20px', background: formData.primaryColor, borderRadius: '4px', border: `1px solid ${themeBorder}` }} />
              <span style={{ fontSize: '12px' }}>{formData.primaryColor}</span>
            </div>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '12px', opacity: 0.7 }}>Font Size</p>
            <p style={{ margin: '4px 0 0 0', fontSize: '14px', fontWeight: '600', textTransform: 'capitalize' }}>{formData.fontSize}</p>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: '12px', opacity: 0.7 }}>Border Radius</p>
            <p style={{ margin: '4px 0 0 0', fontSize: '14px', fontWeight: '600', textTransform: 'capitalize' }}>{formData.borderRadius}</p>
          </div>
        </div>
      </div>

      {/* Theme Section */}
      <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e5e7eb' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', marginBottom: '16px', margin: 0 }}>
          Theme
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {['light', 'dark', 'system'].map((theme) => (
            <label key={theme} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <input
                type="radio"
                name="theme"
                value={theme}
                checked={formData.theme === theme}
                onChange={(e) => handleChange('theme', e.target.value as any)}
                style={{ cursor: 'pointer' }}
              />
              <span style={{ fontSize: '14px', color: '#111827', textTransform: 'capitalize' }}>{theme} Mode</span>
            </label>
          ))}
        </div>
      </div>

      {/* Font Size Section */}
      <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e5e7eb' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', marginBottom: '16px', margin: 0 }}>
          Font Size
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {['small', 'medium', 'large'].map((size) => (
            <label key={size} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <input
                type="radio"
                name="fontSize"
                value={size}
                checked={formData.fontSize === size}
                onChange={(e) => handleChange('fontSize', e.target.value as any)}
                style={{ cursor: 'pointer' }}
              />
              <span style={{ fontSize: '14px', color: '#111827', textTransform: 'capitalize' }}>{size}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Border Radius Section */}
      <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e5e7eb' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', marginBottom: '16px', margin: 0 }}>
          Border Radius
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {['small', 'medium', 'large'].map((radius) => (
            <label key={radius} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <input
                type="radio"
                name="borderRadius"
                value={radius}
                checked={formData.borderRadius === radius}
                onChange={(e) => handleChange('borderRadius', e.target.value as any)}
                style={{ cursor: 'pointer' }}
              />
              <span style={{ fontSize: '14px', color: '#111827', textTransform: 'capitalize' }}>{radius}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Colors Section */}
      <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e5e7eb' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', marginBottom: '16px', margin: 0 }}>
          Colors
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '8px' }}>
              Primary Color
            </label>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <input
                type="color"
                value={formData.primaryColor}
                onChange={(e) => handleChange('primaryColor', e.target.value)}
                style={{ width: '50px', height: '40px', borderRadius: '8px', cursor: 'pointer', border: '1px solid #e5e7eb' }}
              />
              <span style={{ fontSize: '12px', color: '#6b7280' }}>{formData.primaryColor}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '12px' }}>
        <button
          onClick={handleSave}
          disabled={!hasChanges}
          style={{
            flex: 1,
            padding: '12px 24px',
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
          Apply Theme Changes
        </button>
        <button
          onClick={handleReset}
          style={{
            padding: '12px 24px',
            background: '#f3f4f6',
            color: '#6b7280',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '600',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#e5e7eb')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#f3f4f6')}
        >
          Reset
        </button>
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
              Are you sure you want to reset all appearance settings to their default values?
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
