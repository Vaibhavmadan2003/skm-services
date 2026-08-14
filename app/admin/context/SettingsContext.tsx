'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface AppSettings {
  general: {
    businessName: string;
    businessEmail: string;
    supportPhone: string;
    businessAddress: string;
    timeZone: string;
    currency: string;
    language: string;
  };
  appearance: {
    theme: 'light' | 'dark' | 'system';
    fontSize: 'small' | 'medium' | 'large';
    borderRadius: 'small' | 'medium' | 'large';
    primaryColor: string;
  };
  booking: {
    workingHours: string;
    bookingBuffer: number;
    autoBookingId: boolean;
    defaultStatus: string;
  };
  payment: {
    currency: string;
    taxPercentage: number;
    invoicePrefix: string;
    walletEnabled: boolean;
    onlinePaymentsEnabled: boolean;
    cashPaymentsEnabled: boolean;
  };
  notifications: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
    bookingAlerts: boolean;
    paymentAlerts: boolean;
    reviewAlerts: boolean;
  };
  logo: string;
  sidebar: {
    collapsed: boolean;
  };
}

const DEFAULT_SETTINGS: AppSettings = {
  general: {
    businessName: 'SKM Services Qatar',
    businessEmail: 'info@skm-services.qa',
    supportPhone: '+974-4100-2200',
    businessAddress: '123 Pearl Street, West Bay, Doha, Qatar',
    timeZone: 'Asia/Qatar',
    currency: 'QAR',
    language: 'en',
  },
  appearance: {
    theme: 'light',
    fontSize: 'medium',
    borderRadius: 'medium',
    primaryColor: '#0052cc',
  },
  booking: {
    workingHours: '07:00 AM - 10:00 PM',
    bookingBuffer: 30,
    autoBookingId: true,
    defaultStatus: 'pending',
  },
  payment: {
    currency: 'QAR',
    taxPercentage: 5,
    invoicePrefix: 'INV',
    walletEnabled: true,
    onlinePaymentsEnabled: true,
    cashPaymentsEnabled: true,
  },
  notifications: {
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    bookingAlerts: true,
    paymentAlerts: true,
    reviewAlerts: true,
  },
  logo: '/logos/logo.png',
  sidebar: {
    collapsed: false,
  },
};

// Helper function to load settings from localStorage synchronously
function loadSettingsFromStorage(): AppSettings {
  if (typeof window === 'undefined') {
    return DEFAULT_SETTINGS;
  }
  try {
    const saved = localStorage.getItem('skm_app_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  } catch (error) {
    console.error('Failed to load settings from localStorage:', error);
    return DEFAULT_SETTINGS;
  }
}

interface SettingsContextType {
  settings: AppSettings;
  updateGeneral: (data: AppSettings['general']) => void;
  updateAppearance: (data: AppSettings['appearance']) => void;
  updateBooking: (data: AppSettings['booking']) => void;
  updatePayment: (data: AppSettings['payment']) => void;
  updateNotifications: (data: AppSettings['notifications']) => void;
  updateLogo: (logo: string) => void;
  updateSidebar: (collapsed: boolean) => void;
  resetToDefaults: () => void;
  saveSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

// Function to apply theme to DOM
function applyTheme(theme: string, primaryColor: string, fontSize: string, borderRadius: string) {
  if (typeof window === 'undefined') return;

  const root = document.documentElement;

  // Apply theme colors - background, text, borders
  if (theme === 'dark') {
    root.style.setProperty('--bg-primary', '#1f2937');
    root.style.setProperty('--text-primary', '#f9fafb');
    root.style.setProperty('--bg-secondary', '#111827');
    root.style.setProperty('--border-color', '#374151');
  } else if (theme === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.style.setProperty('--bg-primary', prefersDark ? '#1f2937' : '#ffffff');
    root.style.setProperty('--text-primary', prefersDark ? '#f9fafb' : '#111827');
    root.style.setProperty('--bg-secondary', prefersDark ? '#111827' : '#f9fafb');
    root.style.setProperty('--border-color', prefersDark ? '#374151' : '#e5e7eb');
  } else {
    root.style.setProperty('--bg-primary', '#ffffff');
    root.style.setProperty('--text-primary', '#111827');
    root.style.setProperty('--bg-secondary', '#f9fafb');
    root.style.setProperty('--border-color', '#e5e7eb');
  }

  // Apply primary color
  root.style.setProperty('--primary-color', primaryColor);

  // Apply font size
  let fontSizeValue = '14px';
  if (fontSize === 'small') fontSizeValue = '12px';
  if (fontSize === 'large') fontSizeValue = '16px';
  root.style.setProperty('--font-size-base', fontSizeValue);
  document.documentElement.style.fontSize = fontSizeValue;

  // Apply border radius
  let radiusValue = '8px';
  if (borderRadius === 'small') radiusValue = '4px';
  if (borderRadius === 'large') radiusValue = '12px';
  root.style.setProperty('--border-radius', radiusValue);

  console.log('Theme applied:', { theme, primaryColor, fontSize, borderRadius });
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  // Initialize state with localStorage values immediately (no async wait)
  const [settings, setSettings] = useState<AppSettings>(() => loadSettingsFromStorage());
  const [isClient, setIsClient] = useState(false);

  // Mark component as mounted on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Apply theme whenever appearance settings change
  useEffect(() => {
    if (!isClient) return;
    applyTheme(
      settings.appearance.theme,
      settings.appearance.primaryColor,
      settings.appearance.fontSize,
      settings.appearance.borderRadius
    );
  }, [settings.appearance, isClient]);

  const updateGeneral = useCallback((data: AppSettings['general']) => {
    setSettings(prev => ({ ...prev, general: data }));
  }, []);

  const updateAppearance = useCallback((data: AppSettings['appearance']) => {
    setSettings(prev => ({ ...prev, appearance: data }));
  }, []);

  const updateBooking = useCallback((data: AppSettings['booking']) => {
    setSettings(prev => ({ ...prev, booking: data }));
  }, []);

  const updatePayment = useCallback((data: AppSettings['payment']) => {
    setSettings(prev => ({ ...prev, payment: data }));
  }, []);

  const updateNotifications = useCallback((data: AppSettings['notifications']) => {
    setSettings(prev => ({ ...prev, notifications: data }));
  }, []);

  const updateLogo = useCallback((logo: string) => {
    setSettings(prev => ({ ...prev, logo }));
  }, []);

  const updateSidebar = useCallback((collapsed: boolean) => {
    setSettings(prev => ({ ...prev, sidebar: { collapsed } }));
  }, []);

  const saveSettings = useCallback(() => {
    localStorage.setItem('skm_app_settings', JSON.stringify(settings));
    // Re-apply theme to ensure it's persisted
    applyTheme(
      settings.appearance.theme,
      settings.appearance.primaryColor,
      settings.appearance.fontSize,
      settings.appearance.borderRadius
    );
  }, [settings]);

  const resetToDefaults = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    localStorage.setItem('skm_app_settings', JSON.stringify(DEFAULT_SETTINGS));
    // Re-apply default theme
    applyTheme(
      DEFAULT_SETTINGS.appearance.theme,
      DEFAULT_SETTINGS.appearance.primaryColor,
      DEFAULT_SETTINGS.appearance.fontSize,
      DEFAULT_SETTINGS.appearance.borderRadius
    );
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateGeneral,
        updateAppearance,
        updateBooking,
        updatePayment,
        updateNotifications,
        updateLogo,
        updateSidebar,
        resetToDefaults,
        saveSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
}
