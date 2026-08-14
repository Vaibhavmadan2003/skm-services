'use client';

import React, { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';

interface SettingsLogoUploadProps {
  onLogoChange: (logoBase64: string) => void;
}

export default function SettingsLogoUpload({ onLogoChange }: SettingsLogoUploadProps) {
  const [logo, setLogo] = useState<string>('/logos/logo.png');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      setLogo(base64);
      onLogoChange(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemove = () => {
    setLogo('/logos/logo.png');
    onLogoChange('/logos/logo.png');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '12px' }}>
        Business Logo
      </label>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: isDragging ? '2px solid #0052cc' : '2px dashed #e5e7eb',
          borderRadius: '8px',
          padding: '32px',
          textAlign: 'center',
          cursor: 'pointer',
          background: isDragging ? '#f0f4ff' : '#fafbfc',
          transition: 'all 0.2s',
          marginBottom: '16px',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#0052cc';
          e.currentTarget.style.background = '#f0f4ff';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = isDragging ? '#0052cc' : '#e5e7eb';
          e.currentTarget.style.background = isDragging ? '#f0f4ff' : '#fafbfc';
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <Upload size={32} style={{ color: '#0052cc' }} />
          <div>
            <p style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600', color: '#111827' }}>
              Drag and drop your logo here
            </p>
            <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>
              or click to select (Max 5MB)
            </p>
          </div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        style={{ display: 'none' }}
      />

      {logo && logo !== '/logos/logo.png' && (
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', background: '#f9fafb', padding: '12px', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <img
            src={logo}
            alt="Logo preview"
            style={{ width: '60px', height: '60px', borderRadius: '6px', objectFit: 'contain', background: 'white' }}
          />
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: '#111827' }}>Logo uploaded</p>
            <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#6b7280' }}>Ready to save</p>
          </div>
          <button
            onClick={handleRemove}
            style={{
              background: '#fee2e2',
              border: '1px solid #fecaca',
              borderRadius: '6px',
              padding: '8px 12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#dc2626',
              fontSize: '12px',
              fontWeight: '600',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#fecaca')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#fee2e2')}
          >
            <X size={14} />
            Remove
          </button>
        </div>
      )}
    </div>
  );
}
