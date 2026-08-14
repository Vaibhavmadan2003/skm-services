'use client';

import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

interface SettingsBookingTabProps {
  onShowToast?: (type: 'success' | 'error', message: string) => void;
}

export default function SettingsBookingTab({ onShowToast }: SettingsBookingTabProps) {
  const { settings, updateBooking, saveSettings } = useSettings();
  const [formData, setFormData] = useState(settings.booking);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setFormData(settings.booking);
  }, [settings.booking]);

  const handleChange = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    updateBooking(formData);
    saveSettings();
    setHasChanges(false);
    onShowToast?.('success', 'Booking settings saved successfully');
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e5e7eb' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', marginBottom: '24px', margin: 0 }}>
          Booking Settings
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '8px' }}>
              Working Hours
            </label>
            <input
              type="text"
              value={formData.workingHours}
              onChange={(e) => handleChange('workingHours', e.target.value)}
              placeholder="e.g., 07:00 AM - 10:00 PM"
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none' }}
              onFocus={(e) => (e.target.style.borderColor = '#0052cc')}
              onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
            />
          </div>
          <div>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '8px' }}>
              Booking Buffer Time (minutes)
            </label>
            <input
              type="number"
              value={formData.bookingBuffer}
              onChange={(e) => handleChange('bookingBuffer', parseInt(e.target.value))}
              placeholder="e.g., 30"
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none' }}
              onFocus={(e) => (e.target.style.borderColor = '#0052cc')}
              onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
            />
          </div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={formData.autoBookingId}
              onChange={(e) => handleChange('autoBookingId', e.target.checked)}
              style={{ cursor: 'pointer' }}
            />
            <span style={{ fontSize: '13px', color: '#111827' }}>Enable Auto Booking ID Generation</span>
          </label>
          <div>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '8px' }}>
              Default Booking Status
            </label>
            <select
              value={formData.defaultStatus}
              onChange={(e) => handleChange('defaultStatus', e.target.value)}
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none', background: 'white', cursor: 'pointer' }}
            >
              <option value="pending">Pending</option>
              <option value="assigned">Assigned</option>
              <option value="in_progress">In Progress</option>
            </select>
          </div>
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
