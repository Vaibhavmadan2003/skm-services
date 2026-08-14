'use client';

import { useSettings } from '../context/SettingsContextWithDB';
import { LogoUploader } from '../components/LogoUploader';
import { HeaderWithLogo } from '../components/HeaderWithLogo';
import { useState } from 'react';

export default function TestLogoContent() {
  const { settings, isSaving, saveSettings } = useSettings();
  const [message, setMessage] = useState('');

  const handleSave = async () => {
    try {
      setMessage('💾 Saving...');
      await saveSettings();
      setMessage('✅ Saved! Refresh to verify.');
    } catch (err) {
      setMessage('❌ Error: ' + String(err));
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      <HeaderWithLogo />
      
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px' }}>
        <h1>🧪 Logo Upload Test</h1>
        
        <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px', marginBottom: '24px' }}>
          <h2>Status</h2>
          <p>Logo: {settings.logo ? '✅ ' + settings.logo.substring(0, 50) + '...' : '❌ Not set'}</p>
          <p>Business: {settings.general.businessName}</p>
        </div>

        <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '24px', marginBottom: '24px' }}>
          <h2>📸 Upload Logo</h2>
          <LogoUploader />
        </div>

        {message && (
          <div style={{ background: message.includes('✅') ? '#dcfce7' : '#fee2e2', border: '1px solid ' + (message.includes('✅') ? '#86efac' : '#fca5a5'), borderRadius: '8px', padding: '16px', marginBottom: '24px', color: message.includes('✅') ? '#166534' : '#991b1b' }}>
            {message}
          </div>
        )}

        <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '24px' }}>
          <h2>💾 Save Settings</h2>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            style={{ padding: '12px 24px', background: isSaving ? '#d1d5db' : '#0052cc', color: 'white', border: 'none', borderRadius: '6px', cursor: isSaving ? 'not-allowed' : 'pointer', fontSize: '16px', fontWeight: 600 }}
          >
            {isSaving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  );
}
