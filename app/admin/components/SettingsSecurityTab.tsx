'use client';

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface SettingsSecurityTabProps {
  onShowToast?: (type: 'success' | 'error', message: string) => void;
}

export default function SettingsSecurityTab({ onShowToast }: SettingsSecurityTabProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      onShowToast?.('error', 'Please fill in all password fields');
      return;
    }

    if (newPassword.length < 8) {
      onShowToast?.('error', 'New password must be at least 8 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      onShowToast?.('error', 'New passwords do not match');
      return;
    }

    setShowConfirmDialog(true);
  };

  const confirmChangePassword = () => {
    // Frontend only - just show success
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShowConfirmDialog(false);
    onShowToast?.('success', 'Password changed successfully');
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ background: 'white', borderRadius: '12px', padding: '24px', border: '1px solid #e5e7eb' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', marginBottom: '24px', margin: 0 }}>
          Security Settings
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Current Password */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '8px' }}>
              Current Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPasswords.current ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  paddingRight: '40px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '13px',
                  outline: 'none',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#0052cc')}
                onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
              />
              <button
                onClick={() => togglePasswordVisibility('current')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#6b7280',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {showPasswords.current ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '8px' }}>
              New Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPasswords.new ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password (min 8 characters)"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  paddingRight: '40px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '13px',
                  outline: 'none',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#0052cc')}
                onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
              />
              <button
                onClick={() => togglePasswordVisibility('new')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#6b7280',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {showPasswords.new ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '8px' }}>
              Confirm Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPasswords.confirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  paddingRight: '40px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '13px',
                  outline: 'none',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#0052cc')}
                onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
              />
              <button
                onClick={() => togglePasswordVisibility('confirm')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#6b7280',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {showPasswords.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleChangePassword}
          style={{
            padding: '12px 24px',
            background: '#0052cc',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '600',
            marginTop: '24px',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#0047b2')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#0052cc')}
        >
          Change Password
        </button>
      </div>

      {/* Confirmation Dialog */}
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
              Confirm Password Change?
            </h3>
            <p
              style={{
                fontSize: '14px',
                color: '#6b7280',
                margin: '8px 0 20px 0',
              }}
            >
              Are you sure you want to change your password? You will need to log in again.
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
                onClick={confirmChangePassword}
                style={{
                  padding: '10px 20px',
                  background: '#0052cc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontWeight: '600',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#0047b2';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#0052cc';
                }}
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
