'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  Building2,
  DollarSign,
  BarChart3,
  LineChart,
  Bell,
  UserCog,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function AdminSidebar({ isOpen, setIsOpen }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { settings } = useSettings();
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: BookOpen, label: 'Bookings', href: '/admin/bookings' },
    { icon: Building2, label: 'Branches', href: '/admin/branches' },
    { icon: DollarSign, label: 'Payments', href: '/admin/payments' },
    { icon: BarChart3, label: 'Reports & Analytics', href: '/admin/reports' },
    { icon: Bell, label: 'Notifications', href: '/admin/notifications' },
    { icon: UserCog, label: 'Users', href: '/admin/users' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminRole');
    router.push('/admin/login');
  };

  const isActive = (href: string) => pathname === href;

  // Get first letter of business name
  const businessInitial = settings.general.businessName.charAt(0).toUpperCase();
  
  // Check if we have a real logo (not default)
  const hasRealLogo = isClient && settings.logo && settings.logo !== '/logos/logo.png';

  return (
    <>
      {/* Sidebar */}
      <div style={{
        width: isOpen ? '260px' : '72px',
        background: 'white',
        borderRight: '1px solid #e5e7eb',
        transition: 'width 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'relative',
        zIndex: 40
      }}>
        {/* Logo */}
        <div style={{
          padding: isOpen ? '20px' : '16px',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {isOpen && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Logo Image or Initial */}
              {hasRealLogo ? (
                <img
                  src={settings.logo}
                  alt="Logo"
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    objectFit: 'contain',
                    background: '#f3f4f6'
                  }}
                />
              ) : (
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #0052CC 0%, #003D99 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: '700',
                  fontSize: '16px'
                }}>
                  {businessInitial}
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#111827' }}>
                  {settings.general.businessName.substring(0, 10)}
                </span>
                <span style={{ fontSize: '11px', color: '#9ca3af' }}>Admin</span>
              </div>
            </div>
          )}
        </div>

        {/* Menu Items */}
        <nav style={{
          flex: 1,
          overflow: 'auto',
          padding: '16px 0'
        }}>
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link key={idx} href={item.href}>
                <div style={{
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: active ? '#0052CC' : '#6b7280',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  background: active ? '#f0f4ff' : 'transparent',
                  borderLeft: active ? '3px solid #0052CC' : '3px solid transparent',
                  position: 'relative',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: active ? '600' : '500'
                }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.background = '#f9fafb';
                      e.currentTarget.style.color = '#111827';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#6b7280';
                    }
                  }}
                >
                  <Icon size={18} />
                  {isOpen && <span>{item.label}</span>}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div style={{
          padding: '16px',
          borderTop: '1px solid #e5e7eb'
        }}>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '8px',
              color: '#dc2626',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontSize: '14px',
              fontWeight: '500'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#fee2e2';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#fef2f2';
            }}
          >
            <LogOut size={18} />
            {isOpen && <span>Logout</span>}
          </button>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            position: 'absolute',
            right: '-12px',
            top: '100px',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: 'white',
            border: '1px solid #e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#f3f4f6';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'white';
          }}
        >
          {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>
      </div>
    </>
  );
}
