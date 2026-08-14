'use client';

import React from 'react';
import Image from 'next/image';
import { useSettings } from '../context/SettingsContextWithDB';

export function HeaderWithLogo() {
  const { settings, isLoading } = useSettings();

  return (
    <header className="header-with-logo">
      <div className="header-content">
        {/* Logo */}
        <div className="logo-container">
          {isLoading ? (
            <div className="logo-skeleton">Loading...</div>
          ) : settings.logo ? (
            <Image
              src={settings.logo}
              alt={settings.general.businessName}
              width={48}
              height={48}
              className="logo-image"
              priority
            />
          ) : (
            <div className="logo-placeholder">📦</div>
          )}
        </div>

        {/* Text */}
        <div className="header-text">
          <h1 className="business-name">{settings.general.businessName}</h1>
          <p className="business-email">{settings.general.businessEmail}</p>
        </div>

        {/* Right side */}
        <div className="header-right">
          <p className="business-phone">{settings.general.supportPhone}</p>
        </div>
      </div>

      <style jsx>{`
        .header-with-logo {
          background: white;
          border-bottom: 1px solid #e5e7eb;
          padding: 16px 24px;
          margin-bottom: 24px;
        }

        .header-content {
          display: flex;
          align-items: center;
          gap: 16px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .logo-container {
          flex-shrink: 0;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          background: #f3f4f6;
          border: 1px solid #e5e7eb;
        }

        .logo-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 4px;
          border-radius: 6px;
        }

        .logo-skeleton {
          font-size: 12px;
          color: #9ca3af;
          text-align: center;
        }

        .logo-placeholder {
          font-size: 24px;
        }

        .header-text {
          flex: 1;
        }

        .business-name {
          font-size: 18px;
          font-weight: 600;
          color: #111827;
          margin: 0;
          line-height: 1.2;
        }

        .business-email {
          font-size: 12px;
          color: #6b7280;
          margin: 4px 0 0 0;
        }

        .header-right {
          text-align: right;
        }

        .business-phone {
          font-size: 14px;
          color: #374151;
          margin: 0;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            text-align: center;
          }

          .header-right {
            text-align: center;
            width: 100%;
          }

          .business-email {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
