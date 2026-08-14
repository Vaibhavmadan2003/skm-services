'use client';

import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { CURRENCIES } from '../lib/mock-settings';

interface SettingsPaymentTabProps {
  onShowToast?: (type: 'success' | 'error', message: string) => void;
}

export default function SettingsPaymentTab({ onShowToast }: SettingsPaymentTabProps) {
  const { settings, updatePayment, saveSettings } = useSettings();
  const [formData, setFormData] = useState(settings.payment);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setFormData(settings.payment);
  }, [settings.payment]);

  const handleChange = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    updatePayment(formData);
    saveSettings();
    setHasChanges(false);
    onShowToast?.('success', 'Payment settings saved successfully');
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e5e7eb' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', marginBottom: '24px', margin: 0 }}>
          Payment Settings
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '8px' }}>
              Currency
            </label>
            <select
              value={formData.currency}
              onChange={(e) => handleChange('currency', e.target.value)}
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none', background: 'white', cursor: 'pointer' }}
            >
              {CURRENCIES.map((curr) => (
                <option key={curr} value={curr}>
                  {curr}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '8px' }}>
              Tax Percentage (%)
            </label>
            <input
              type="number"
              value={formData.taxPercentage}
              onChange={(e) => handleChange('taxPercentage', parseFloat(e.target.value))}
              placeholder="e.g., 5"
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none' }}
              onFocus={(e) => (e.target.style.borderColor = '#0052cc')}
              onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
            />
          </div>
          <div>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '8px' }}>
              Invoice Prefix
            </label>
            <input
              type="text"
              value={formData.invoicePrefix}
              onChange={(e) => handleChange('invoicePrefix', e.target.value)}
              placeholder="e.g., INV"
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '13px', outline: 'none' }}
              onFocus={(e) => (e.target.style.borderColor = '#0052cc')}
              onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.walletEnabled}
                onChange={(e) => handleChange('walletEnabled', e.target.checked)}
                style={{ cursor: 'pointer' }}
              />
              <span style={{ fontSize: '13px', color: '#111827' }}>Enable Wallet Payments</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.onlinePaymentsEnabled}
                onChange={(e) => handleChange('onlinePaymentsEnabled', e.target.checked)}
                style={{ cursor: 'pointer' }}
              />
              <span style={{ fontSize: '13px', color: '#111827' }}>Enable Online Payments</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.cashPaymentsEnabled}
                onChange={(e) => handleChange('cashPaymentsEnabled', e.target.checked)}
                style={{ cursor: 'pointer' }}
              />
              <span style={{ fontSize: '13px', color: '#111827' }}>Enable Cash Payments</span>
            </label>
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
