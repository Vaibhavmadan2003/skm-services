'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Save, AlertCircle, CheckCircle, Upload, Eye, EyeOff } from 'lucide-react';

export default function SettingsPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  
  const [branchInfo, setBranchInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    manager_name: '',
    working_hours_start: '07:00',
    working_hours_end: '22:00'
  });

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [saveMessage, setSaveMessage] = useState('');
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordStatus, setPasswordStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  });

  // Load branch data on mount
  useEffect(() => {
    const loadBranchData = () => {
      try {
        const userData = sessionStorage.getItem('userData');
        const branchData = sessionStorage.getItem('branchData');
        
        if (userData) {
          const user = JSON.parse(userData);
          setUserEmail(user.email);
        }

        if (branchData) {
          const branch = JSON.parse(branchData);
          setBranchInfo({
            name: branch.name || '',
            email: branch.email || '',
            phone: branch.phone || '',
            address: branch.address || '',
            city: branch.city || '',
            manager_name: branch.manager_name || '',
            working_hours_start: branch.working_hours_start || '07:00',
            working_hours_end: branch.working_hours_end || '22:00'
          });

          // Load logo if exists
          if (branch.logo_url) {
            setLogoPreview(branch.logo_url);
          }
        }
      } catch (error) {
        console.error('Error loading branch data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBranchData();
  }, []);

  const handleBranchChange = (field: string, value: string) => {
    setBranchInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      // Show preview
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setLogoPreview(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSettings = async () => {
    setSaveStatus('saving');
    try {
      const userData = sessionStorage.getItem('userData');
      if (!userData) {
        setSaveMessage('User session not found');
        setSaveStatus('error');
        setTimeout(() => setSaveStatus('idle'), 3000);
        return;
      }

      const user = JSON.parse(userData);

      const response = await fetch('/api/partner/settings/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          branchId: user.branchId,
          ...branchInfo
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save settings');
      }

      // Update sessionStorage
      const branchData = sessionStorage.getItem('branchData');
      if (branchData) {
        const branch = JSON.parse(branchData);
        const updatedBranch = { ...branch, ...branchInfo };
        sessionStorage.setItem('branchData', JSON.stringify(updatedBranch));
      }

      setSaveMessage('Settings saved successfully!');
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      setSaveMessage(error instanceof Error ? error.message : 'Error saving settings');
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const handleSavePassword = async () => {
    // Validations
    if (!passwordData.currentPassword) {
      setPasswordStatus('error');
      setSaveMessage('Current password is required');
      setTimeout(() => setPasswordStatus('idle'), 3000);
      return;
    }

    if (!passwordData.newPassword) {
      setPasswordStatus('error');
      setSaveMessage('New password is required');
      setTimeout(() => setPasswordStatus('idle'), 3000);
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setPasswordStatus('error');
      setSaveMessage('New password must be at least 8 characters');
      setTimeout(() => setPasswordStatus('idle'), 3000);
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordStatus('error');
      setSaveMessage('New passwords do not match');
      setTimeout(() => setPasswordStatus('idle'), 3000);
      return;
    }

    setPasswordStatus('saving');
    try {
      const response = await fetch('/api/partner/settings/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to change password');
      }

      setSaveMessage('Password changed successfully!');
      setPasswordStatus('success');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setPasswordStatus('idle'), 3000);
    } catch (error) {
      setSaveMessage(error instanceof Error ? error.message : 'Error changing password');
      setPasswordStatus('error');
      setTimeout(() => setPasswordStatus('idle'), 3000);
    }
  };

  const handleUploadLogo = async () => {
    if (!logoPreview) return;

    setSaveStatus('saving');
    try {
      const userData = sessionStorage.getItem('userData');
      if (!userData) {
        throw new Error('User session not found');
      }

      const user = JSON.parse(userData);

      const response = await fetch('/api/partner/settings/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          branchId: user.branchId,
          logo_url: logoPreview
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload logo');
      }

      // Update sessionStorage
      const branchData = sessionStorage.getItem('branchData');
      if (branchData) {
        const branch = JSON.parse(branchData);
        branch.logo_url = logoPreview;
        sessionStorage.setItem('branchData', JSON.stringify(branch));
        sessionStorage.setItem('branchLogo', logoPreview);
      }

      // Dispatch custom event
      window.dispatchEvent(new Event('branchLogoUpdated'));

      setSaveMessage('Logo uploaded successfully!');
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      setSaveMessage(error instanceof Error ? error.message : 'Error uploading logo');
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  if (isLoading) {
    return (
      <div style={{ padding: '32px', textAlign: 'center' }}>
        <div style={{ fontSize: '14px', color: '#6b7280' }}>Loading settings...</div>
      </div>
    );
  }

  return (
    <div style={{ padding: '32px', maxWidth: '1000px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#111827', margin: 0 }}>Settings</h1>
        <p style={{ fontSize: '14px', color: '#6b7280', margin: '8px 0 0 0' }}>Manage your branch profile and account settings</p>
      </div>

      {/* Branch Logo */}
      <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: '0 0 20px 0' }}>Branch Logo</h2>
        
        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
          {/* Logo Preview */}
          <div style={{
            width: '120px',
            height: '120px',
            background: '#f9fafb',
            border: '2px dashed #e5e7eb',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            {logoPreview ? (
              <img src={logoPreview} alt="Logo Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', marginBottom: '4px' }}>📸</div>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>No logo</p>
              </div>
            )}
          </div>

          {/* Upload Controls */}
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '12px' }}>
              Upload your branch logo (JPG, PNG, max 2MB)
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleLogoUpload}
              style={{ display: 'none' }}
            />
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={() => fileInputRef.current?.click()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  border: '1px solid #e5e7eb',
                  background: 'white',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#0052CC',
                  cursor: 'pointer'
                }}
              >
                <Upload size={18} />
                <span>Choose File</span>
              </button>
              {logoPreview && (
                <button
                  onClick={handleUploadLogo}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 16px',
                    background: 'linear-gradient(135deg, #0052CC 0%, #003D99 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  <Save size={18} />
                  <span>Upload Logo</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Branch Information */}
      <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: '0 0 20px 0' }}>Branch Information</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '20px' }}>
          {[
            { label: 'Branch Name', field: 'name', type: 'text' },
            { label: 'Manager Name', field: 'manager_name', type: 'text' },
            { label: 'Email', field: 'email', type: 'email' },
            { label: 'Phone', field: 'phone', type: 'tel' },
            { label: 'City', field: 'city', type: 'text' },
            { label: 'Address', field: 'address', type: 'text' },
          ].map(item => (
            <div key={item.field}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#111827', marginBottom: '6px' }}>
                {item.label}
              </label>
              <input
                type={item.type}
                value={branchInfo[item.field as keyof typeof branchInfo]}
                onChange={(e) => handleBranchChange(item.field, e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          ))}
        </div>

        {/* Working Hours */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px', padding: '16px 0', borderTop: '1px solid #f3f4f6', borderBottom: '1px solid #f3f4f6' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#111827', marginBottom: '6px' }}>
              Working Hours Start
            </label>
            <input
              type="time"
              value={branchInfo.working_hours_start}
              onChange={(e) => handleBranchChange('working_hours_start', e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#111827', marginBottom: '6px' }}>
              Working Hours End
            </label>
            <input
              type="time"
              value={branchInfo.working_hours_end}
              onChange={(e) => handleBranchChange('working_hours_end', e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>

        {/* Save Status Message */}
        {saveStatus !== 'idle' && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '20px',
            background: saveStatus === 'success' ? '#d1fae5' : saveStatus === 'error' ? '#fee2e2' : '#f0f6ff',
            color: saveStatus === 'success' ? '#065f46' : saveStatus === 'error' ? '#991b1b' : '#1e40af'
          }}>
            {saveStatus === 'saving' && <div style={{ width: '16px', height: '16px', border: '2px solid currentColor', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />}
            {saveStatus === 'success' && <CheckCircle size={20} />}
            {saveStatus === 'error' && <AlertCircle size={20} />}
            <span style={{ fontSize: '14px', fontWeight: '500' }}>
              {saveMessage || (saveStatus === 'saving' ? 'Saving changes...' : saveStatus === 'success' ? 'Changes saved successfully!' : 'Error saving changes')}
            </span>
          </div>
        )}

        {/* Save Button */}
        <button
          onClick={handleSaveSettings}
          disabled={saveStatus === 'saving'}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            background: saveStatus === 'saving' ? '#9ca3af' : 'linear-gradient(135deg, #0052CC 0%, #003D99 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: saveStatus === 'saving' ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <Save size={18} />
          <span>{saveStatus === 'saving' ? 'Saving...' : 'Save Branch Settings'}</span>
        </button>
      </div>

      {/* Change Password */}
      <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: '0 0 20px 0' }}>Change Password</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
          {[
            { label: 'Current Password', field: 'currentPassword', placeholder: 'Enter current password' },
            { label: 'New Password', field: 'newPassword', placeholder: 'Enter new password' },
            { label: 'Confirm New Password', field: 'confirmPassword', placeholder: 'Confirm new password' },
          ].map(item => (
            <div key={item.field}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#111827', marginBottom: '6px' }}>
                {item.label}
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <input
                  type={showPasswords[item.field as keyof typeof showPasswords] ? 'text' : 'password'}
                  placeholder={item.placeholder}
                  value={passwordData[item.field as keyof typeof passwordData]}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, [item.field]: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '10px 40px 10px 12px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords(prev => ({ ...prev, [item.field]: !prev[item.field as keyof typeof prev] }))}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    background: 'none',
                    border: 'none',
                    color: '#9ca3af',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {showPasswords[item.field as keyof typeof showPasswords] ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          ))}
        </div>

        {passwordStatus !== 'idle' && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '20px',
            background: passwordStatus === 'success' ? '#d1fae5' : passwordStatus === 'error' ? '#fee2e2' : '#f0f6ff',
            color: passwordStatus === 'success' ? '#065f46' : passwordStatus === 'error' ? '#991b1b' : '#1e40af'
          }}>
            {passwordStatus === 'saving' && <div style={{ width: '16px', height: '16px', border: '2px solid currentColor', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />}
            {passwordStatus === 'success' && <CheckCircle size={20} />}
            {passwordStatus === 'error' && <AlertCircle size={20} />}
            <span style={{ fontSize: '14px', fontWeight: '500' }}>{saveMessage}</span>
          </div>
        )}

        <button
          onClick={handleSavePassword}
          disabled={passwordStatus === 'saving'}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            background: passwordStatus === 'saving' ? '#9ca3af' : 'linear-gradient(135deg, #0052CC 0%, #003D99 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: passwordStatus === 'saving' ? 'not-allowed' : 'pointer'
          }}
        >
          <Save size={18} />
          <span>{passwordStatus === 'saving' ? 'Updating...' : 'Update Password'}</span>
        </button>
      </div>
    </div>
  );
}
