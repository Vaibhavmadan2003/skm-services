'use client';

import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { Branch } from '../../lib/mock-branches';

interface BranchSettingsTabProps {
  branch: Branch;
}

export default function BranchSettingsTab({ branch }: BranchSettingsTabProps) {
  const [formData, setFormData] = useState({
    name: branch.name,
    manager: branch.managerName,
    email: branch.email,
    phone: branch.phone,
    address: branch.address,
    city: branch.city,
    workingHoursStart: branch.workingHoursStart,
    workingHoursEnd: branch.workingHoursEnd,
    status: branch.status,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setSaveMessage('Changes saved successfully!');
      setIsSaving(false);
      setTimeout(() => setSaveMessage(''), 3000);
    }, 500);
  };

  return (
    <div>
      {/* Save Message */}
      {saveMessage && (
        <div style={{ marginBottom: '16px', padding: '12px 16px', background: '#d1fae5', color: '#059669', borderRadius: '8px', fontSize: '13px', fontWeight: '600' }}>
          ✓ {saveMessage}
        </div>
      )}

      {/* Branch Information */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', marginBottom: '16px', margin: '0 0 16px 0' }}>
          Branch Information
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: '#9ca3af', fontWeight: '600', marginBottom: '6px' }}>BRANCH NAME</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '13px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#0052cc')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e7eb')}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: '#9ca3af', fontWeight: '600', marginBottom: '6px' }}>MANAGER NAME</label>
            <input
              type="text"
              name="manager"
              value={formData.manager}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '13px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#0052cc')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e7eb')}
            />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', marginBottom: '16px', margin: '0 0 16px 0' }}>
          Contact Information
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: '#9ca3af', fontWeight: '600', marginBottom: '6px' }}>EMAIL</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '13px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#0052cc')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e7eb')}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: '#9ca3af', fontWeight: '600', marginBottom: '6px' }}>PHONE</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '13px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#0052cc')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e7eb')}
            />
          </div>
        </div>
      </div>

      {/* Address */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', marginBottom: '16px', margin: '0 0 16px 0' }}>
          Address
        </h3>
        <div style={{ marginBottom: '12px' }}>
          <label style={{ display: 'block', fontSize: '11px', color: '#9ca3af', fontWeight: '600', marginBottom: '6px' }}>ADDRESS</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={2}
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '13px',
              outline: 'none',
              boxSizing: 'border-box',
              fontFamily: 'inherit',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#0052cc')}
            onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e7eb')}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '11px', color: '#9ca3af', fontWeight: '600', marginBottom: '6px' }}>CITY</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px 12px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '13px',
              outline: 'none',
              boxSizing: 'border-box',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#0052cc')}
            onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e7eb')}
          />
        </div>
      </div>

      {/* Working Hours */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', marginBottom: '16px', margin: '0 0 16px 0' }}>
          Working Hours
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: '#9ca3af', fontWeight: '600', marginBottom: '6px' }}>START TIME</label>
            <input
              type="time"
              name="workingHoursStart"
              value={formData.workingHoursStart}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '13px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#0052cc')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e7eb')}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '11px', color: '#9ca3af', fontWeight: '600', marginBottom: '6px' }}>END TIME</label>
            <input
              type="time"
              name="workingHoursEnd"
              value={formData.workingHoursEnd}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '13px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#0052cc')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e7eb')}
            />
          </div>
        </div>
      </div>

      {/* Status */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', marginBottom: '16px', margin: '0 0 16px 0' }}>
          Branch Status
        </h3>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '10px 12px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '13px',
            outline: 'none',
            boxSizing: 'border-box',
            background: 'white',
            cursor: 'pointer',
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#0052cc')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e7eb')}
        >
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={isSaving}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          width: '100%',
          padding: '12px',
          background: isSaving ? '#cbd5e1' : '#0052cc',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: isSaving ? 'not-allowed' : 'pointer',
          fontSize: '13px',
          fontWeight: '600',
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          if (!isSaving) {
            e.currentTarget.style.background = '#0047b2';
          }
        }}
        onMouseLeave={(e) => {
          if (!isSaving) {
            e.currentTarget.style.background = '#0052cc';
          }
        }}
      >
        <Save size={16} />
        {isSaving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
}
