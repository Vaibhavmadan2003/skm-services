'use client';

import React, { useState, ReactNode, useEffect } from 'react';
import { Menu, X, LogOut, LayoutGrid, Calendar, Wrench, Users, Truck, CreditCard, Settings } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import BranchNotificationCenter from '@/app/admin/components/BranchNotificationCenter';

interface LayoutProps {
  children: ReactNode;
}

export default function PartnerLayout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [branchName, setBranchName] = useState('Branch Dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [branchLogo, setBranchLogo] = useState<string | null>(null);
  const [branchId, setBranchId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check authentication from sessionStorage (set during login)
    const checkAuth = () => {
      try {
        const adminToken = sessionStorage.getItem('adminToken');
        const userData = sessionStorage.getItem('userData');
        const branchData = sessionStorage.getItem('branchData');
        const userRole = sessionStorage.getItem('userRole');

        console.log('🔍 Partner layout auth check:', {
          hasToken: !!adminToken,
          hasUserData: !!userData,
          userRole,
          isLoading
        });

        if (!adminToken || !userData || userRole !== 'branch_admin') {
          console.log('❌ Auth failed, redirecting to login');
          setIsAuthenticated(false);
          router.push('/admin/login');
          return;
        }

        const user = JSON.parse(userData);
        const branch = branchData ? JSON.parse(branchData) : null;
        
        console.log('✅ Auth passed, setting authenticated state');
        setIsAuthenticated(true);
        setBranchName(branch?.name || user.fullName || 'Branch Dashboard');
        
        // Set branch_id from database
        if (branch?.id) {
          setBranchId(branch.id);
        }
        
        // Get logo from branch data and set state for display
        if (branch?.logo_url) {
          setBranchLogo(branch.logo_url);
          sessionStorage.setItem('branchLogo', branch.logo_url);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
        router.push('/admin/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Listen for logo updates from settings page
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const branchData = sessionStorage.getItem('branchData');
        const branch = branchData ? JSON.parse(branchData) : null;
        
        if (branch?.logo_url) {
          setBranchLogo(branch.logo_url);
        }
      } catch (error) {
        console.error('Storage listener error:', error);
      }
    };

    // Listen for storage changes
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom event from settings page
    window.addEventListener('branchLogoUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('branchLogoUpdated', handleStorageChange);
    };
  }, []);

  const handleLogout = async () => {
    try {
      // Clear sessionStorage
      sessionStorage.removeItem('authToken');
      sessionStorage.removeItem('userRole');
      sessionStorage.removeItem('userData');
      sessionStorage.removeItem('branchData');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      router.push('/admin/login');
    }
  };

  const menuItems = [
    { label: 'Dashboard', href: '/partner/dashboard', icon: LayoutGrid },
    { label: 'Bookings', href: '/partner/bookings', icon: Calendar },
    { label: 'Services', href: '/partner/services', icon: Wrench },
    { label: 'Staff', href: '/partner/staff', icon: Users },
    { label: 'Drivers', href: '/partner/drivers', icon: Truck },
    { label: 'Payments', href: '/partner/payments', icon: CreditCard },
    { label: 'Settings', href: '/partner/settings', icon: Settings },
  ];

  if (isLoading) {
    return (
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: '#f9fafb' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', border: '4px solid #e5e7eb', borderTop: '4px solid #0052CC', borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 1s linear infinite' }} />
          <p style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280' }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#f9fafb' }}>
      {/* Sidebar */}
      <div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          height: '100vh',
          background: 'white',
          borderRight: '1px solid #e5e7eb',
          transition: 'all 0.3s ease',
          width: sidebarOpen ? '280px' : '0px',
          overflow: 'hidden',
          zIndex: 40,
          boxShadow: sidebarOpen ? '0 10px 25px rgba(0,0,0,0.08)' : 'none'
        }}
      >
        {/* Sidebar Header */}
        <div style={{
          padding: '24px',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: branchLogo ? 'transparent' : 'linear-gradient(135deg, #0052CC 0%, #003D99 100%)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '16px',
            flexShrink: 0,
            overflow: 'hidden'
          }}>
            {branchLogo ? (
              <img 
                src={branchLogo} 
                alt="Branch Logo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
            ) : (
              'B'
            )}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h2 style={{ fontSize: '14px', fontWeight: '700', color: '#111827', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {branchName}
            </h2>
            <p style={{ fontSize: '12px', color: '#6b7280', margin: '2px 0 0 0' }}>
              Branch Admin
            </p>
          </div>
        </div>

        {/* Sidebar Menu */}
        <nav style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{ textDecoration: 'none' }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#6b7280',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f3f4f6';
                    e.currentTarget.style.color = '#0052CC';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#6b7280';
                  }}
                >
                  <Icon style={{ width: '20px', height: '20px' }} />
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: sidebarOpen ? '280px' : '0px', transition: 'all 0.3s ease' }}>
        {/* Header */}
        <header style={{
          background: 'white',
          borderBottom: '1px solid #e5e7eb',
          padding: '16px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '72px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                padding: '8px',
                border: 'none',
                background: '#f3f4f6',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#6b7280',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#e5e7eb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f3f4f6';
              }}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', margin: 0 }}>
              Partner Dashboard
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Notification Bell */}
            {branchId && <BranchNotificationCenter branchId={branchId} />}

            <div style={{ width: '1px', height: '24px', background: '#e5e7eb' }} />

            <button
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: '500',
                color: '#ef4444',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                borderRadius: '8px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#fee2e2';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, overflow: 'auto', background: '#f9fafb' }}>
          {children}
        </main>
      </div>
    </div>
  );
}

