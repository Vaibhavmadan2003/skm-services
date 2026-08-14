'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useSettings } from '../context/SettingsContextWithDB';

interface LogoUploaderProps {
  onLogoChange?: (url: string) => void;
}

export function LogoUploader({ onLogoChange }: LogoUploaderProps) {
  const { settings, updateLogo } = useSettings();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setSuccess(false);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'logo');

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const data = await response.json();

      if (data.success && data.url) {
        // Update settings context with new logo URL
        updateLogo(data.url);
        onLogoChange?.(data.url);
        setSuccess(true);
        console.log('✅ Logo uploaded:', data.url);

        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Upload failed';
      setError(message);
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="logo-uploader">
      <div className="logo-preview">
        <h3 className="text-sm font-semibold mb-3">Company Logo</h3>

        {/* Logo Display */}
        <div className="relative w-40 h-40 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center mb-4 overflow-hidden">
          {settings.logo ? (
            <Image
              src={settings.logo}
              alt="Company Logo"
              fill
              className="object-contain p-2"
              sizes="160px"
            />
          ) : (
            <div className="text-center text-gray-400">
              <div className="text-4xl mb-2">🏢</div>
              <div className="text-xs">No logo yet</div>
            </div>
          )}
        </div>

        {/* Current Logo Info */}
        {settings.logo && (
          <p className="text-xs text-gray-600 mb-4">
            Current: {settings.logo.split('/').pop()}
          </p>
        )}

        {/* Upload Area */}
        <div className="upload-area">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp"
            onChange={handleFileSelect}
            disabled={uploading}
            className="hidden"
            id="logo-input"
          />

          <label
            htmlFor="logo-input"
            className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition"
            onClick={() => !uploading && fileInputRef.current?.click()}
          >
            {uploading ? 'Uploading...' : 'Choose Logo File'}
          </label>

          <p className="text-xs text-gray-600 mt-2">
            PNG, JPG, GIF, WebP • Max 5MB
          </p>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="mt-3 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            ❌ {error}
          </div>
        )}

        {success && (
          <div className="mt-3 p-3 bg-green-100 border border-green-400 text-green-700 rounded text-sm">
            ✅ Logo uploaded successfully!
          </div>
        )}
      </div>

      <style jsx>{`
        .logo-uploader {
          padding: 16px;
          background: white;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
        }

        .logo-preview {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .upload-area {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
      `}</style>
    </div>
  );
}
