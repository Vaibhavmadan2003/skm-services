'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { SettingsProvider, useSettings } from '../context/SettingsContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

// Create a context to manage refetch signals
export const RefetchContext = React.createContext<{
  refetchCount: number;
  triggerRefetch: () => void;
}>({
  refetchCount: 0,
  triggerRefetch: () => {},
});

function AdminLayoutContent({ children, sidebarOpen, setSidebarOpen }: { children: React.ReactNode; sidebarOpen: boolean; setSidebarOpen: (val: boolean) => void }) {
  const { settings } = useSettings();
  const [refetchCount, setRefetchCount] = useState(0);

  const triggerRefetch = useCallback(() => {
    setRefetchCount(prev => prev + 1);
  }, []);

  // Removed the refetchCallbackRef and setRefetchCallback since we're using refetchCount now

  // Determine background based on theme from context
  const getBgColor = () => {
    if (settings.appearance.theme === 'dark') {
      return '#111827';
    } else if (settings.appearance.theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? '#111827' : '#f9fafb';
    }
    return '#f9fafb';
  };

  const getMainBgColor = () => {
    if (settings.appearance.theme === 'dark') {
      return '#1f2937';
    } else if (settings.appearance.theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? '#1f2937' : '#ffffff';
    }
    return '#ffffff';
  };

  const getTextColor = () => {
    if (settings.appearance.theme === 'dark') {
      return '#f9fafb';
    } else if (settings.appearance.theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? '#f9fafb' : '#111827';
    }
    return '#111827';
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: getBgColor(),
      color: getTextColor(),
      transition: 'all 0.3s ease'
    }}>
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <AdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} onApplicationsChange={triggerRefetch} />

        {/* Page Content */}
        <RefetchContext.Provider value={{ refetchCount, triggerRefetch }}>
          <main style={{
            flex: 1,
            overflow: 'auto',
            background: getMainBgColor(),
            color: getTextColor(),
            transition: 'all 0.3s ease'
          }}>
            {children}
          </main>
        </RefetchContext.Provider>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <SettingsProvider>
      <AdminLayoutContent sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
        {children}
      </AdminLayoutContent>
    </SettingsProvider>
  );
}
