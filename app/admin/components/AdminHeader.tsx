'use client';

import React, { useState } from 'react';
import { Menu, User, Search, X } from 'lucide-react';
import NotificationCenter from './NotificationCenter';

interface AdminHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  onApplicationsChange?: () => void;
}

export default function AdminHeader({ sidebarOpen, setSidebarOpen, onApplicationsChange }: AdminHeaderProps) {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header style={{
      height: '64px',
      background: 'white',
      borderBottom: '1px solid #e5e7eb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: '24px',
      paddingRight: '24px',
      position: 'sticky',
      top: 0,
      zIndex: 30
    }}>
      {/* Left Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Toggle Sidebar */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#6b7280',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#111827';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#6b7280';
          }}
        >
          <Menu size={20} />
        </button>

        {/* Search */}
        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          background: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '8px 12px',
          gap: '8px',
          minWidth: '300px'
        }}>
          <Search size={16} color="#9ca3af" />
          <input
            type="text"
            placeholder="Search bookings, branches, workers..."
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              outline: 'none',
              fontSize: '13px',
              color: '#111827',
              fontFamily: 'inherit'
            }}
            onFocus={(e) => {
              e.currentTarget.parentElement!.style.borderColor = '#0052CC';
              e.currentTarget.parentElement!.style.background = 'white';
            }}
            onBlur={(e) => {
              e.currentTarget.parentElement!.style.borderColor = '#e5e7eb';
              e.currentTarget.parentElement!.style.background = '#f9fafb';
            }}
          />
        </div>
      </div>

      {/* Right Section */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        
        {/* Notifications */}
        <NotificationCenter onApplicationsChange={onApplicationsChange} />

        {/* Profile */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowProfile(!showProfile)}
            style={{
              background: '#f0f4ff',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0052CC',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#0052CC';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#f0f4ff';
              e.currentTarget.style.color = '#0052CC';
            }}
          >
            <User size={18} />
          </button>

          {/* Profile Dropdown */}
          {showProfile && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: '12px',
              width: '200px',
              background: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
              zIndex: 50,
              overflow: 'hidden'
            }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>
                <p style={{ fontSize: '13px', fontWeight: '600', color: '#111827', margin: 0 }}>
                  admin@skm.com
                </p>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: '4px 0 0 0' }}>
                  Super Admin
                </p>
              </div>
              {[
                { label: 'Profile', href: '#' },
                { label: 'Settings', href: '#' }
              ].map((item, idx) => (
                <a key={idx} href={item.href} style={{
                  display: 'block',
                  padding: '12px 16px',
                  fontSize: '13px',
                  color: '#6b7280',
                  textDecoration: 'none',
                  borderBottom: '1px solid #f3f4f6',
                  transition: 'all 0.2s'
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f9fafb';
                    e.currentTarget.style.color = '#111827';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'white';
                    e.currentTarget.style.color = '#6b7280';
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
