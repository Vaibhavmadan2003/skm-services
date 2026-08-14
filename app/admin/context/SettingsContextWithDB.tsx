'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// For now, using localStorage as fallback
// This will be replaced with database calls

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
  saveSettings: () => Promise<void>;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

function applyTheme(theme: string, primaryColor: string, fontSize: string, borderRadius: string) {
  if (typeof window === 'undefined') return;

  const root = document.documentElement;

  // Apply theme colors
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

  root.style.setProperty('--primary-color', primaryColor);

  let fontSizeValue = '14px';
  if (fontSize === 'small') fontSizeValue = '12px';
  if (fontSize === 'large') fontSizeValue = '16px';
  root.style.setProperty('--font-size-base', fontSizeValue);
  document.documentElement.style.fontSize = fontSizeValue;

  let radiusValue = '8px';
  if (borderRadius === 'small') radiusValue = '4px';
  if (borderRadius === 'large') radiusValue = '12px';
  root.style.setProperty('--border-radius', radiusValue);

  console.log('Theme applied:', { theme, primaryColor, fontSize, borderRadius });
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Initialize on client side
  useEffect(() => {
    setIsClient(true);
    loadSettings();
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

  const loadSettings = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Try to fetch from API first
      const response = await fetch('/api/settings');
      
      if (response.ok) {
        const result = await response.json();
        if (result.data) {
          // Map database format to app format
          const mappedSettings: AppSettings = {
            general: {
              businessName: result.data.business_name || DEFAULT_SETTINGS.general.businessName,
              businessEmail: result.data.business_email || DEFAULT_SETTINGS.general.businessEmail,
              supportPhone: result.data.support_phone || DEFAULT_SETTINGS.general.supportPhone,
              businessAddress: result.data.business_address || DEFAULT_SETTINGS.general.businessAddress,
              timeZone: result.data.timezone || DEFAULT_SETTINGS.general.timeZone,
              currency: result.data.currency || DEFAULT_SETTINGS.general.currency,
              language: result.data.language || DEFAULT_SETTINGS.general.language,
            },
            appearance: {
              theme: (result.data.theme || DEFAULT_SETTINGS.appearance.theme) as any,
              fontSize: (result.data.font_size || DEFAULT_SETTINGS.appearance.fontSize) as any,
              borderRadius: (result.data.border_radius || DEFAULT_SETTINGS.appearance.borderRadius) as any,
              primaryColor: result.data.primary_color || DEFAULT_SETTINGS.appearance.primaryColor,
            },
            booking: {
              workingHours: result.data.working_hours_start + ' - ' + result.data.working_hours_end || DEFAULT_SETTINGS.booking.workingHours,
              bookingBuffer: result.data.booking_buffer_minutes || DEFAULT_SETTINGS.booking.bookingBuffer,
              autoBookingId: result.data.auto_assign_booking || DEFAULT_SETTINGS.booking.autoBookingId,
              defaultStatus: result.data.default_booking_status || DEFAULT_SETTINGS.booking.defaultStatus,
            },
            payment: {
              currency: result.data.currency || DEFAULT_SETTINGS.payment.currency,
              taxPercentage: parseFloat(result.data.tax_percentage) || DEFAULT_SETTINGS.payment.taxPercentage,
              invoicePrefix: result.data.invoice_prefix || DEFAULT_SETTINGS.payment.invoicePrefix,
              walletEnabled: result.data.wallet_enabled !== false,
              onlinePaymentsEnabled: result.data.online_payments_enabled !== false,
              cashPaymentsEnabled: result.data.cash_payments_enabled !== false,
            },
            notifications: {
              emailNotifications: result.data.email_notifications_enabled !== false,
              smsNotifications: result.data.sms_notifications_enabled !== false,
              pushNotifications: result.data.push_notifications_enabled !== false,
              bookingAlerts: result.data.booking_alerts_enabled !== false,
              paymentAlerts: result.data.payment_alerts_enabled !== false,
              reviewAlerts: result.data.review_alerts_enabled !== false,
            },
            logo: result.data.logo_url || DEFAULT_SETTINGS.logo,
            sidebar: {
              collapsed: false,
            },
          };
          setSettings(mappedSettings);
        }
      } else {
        throw new Error('Failed to fetch settings');
      }
    } catch (err) {
      console.error('Error loading settings:', err);
      // Fall back to defaults
      setSettings(DEFAULT_SETTINGS);
    } finally {
      setIsLoading(false);
    }
  };

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

  const saveSettings = useCallback(async () => {
    try {
      setIsSaving(true);
      setError(null);

      // Map app format to database format
      const dbSettings = {
        business_name: settings.general.businessName,
        business_email: settings.general.businessEmail,
        support_phone: settings.general.supportPhone,
        business_address: settings.general.businessAddress,
        timezone: settings.general.timeZone,
        currency: settings.general.currency,
        language: settings.general.language,
        theme: settings.appearance.theme,
        primary_color: settings.appearance.primaryColor,
        font_size: settings.appearance.fontSize,
        border_radius: settings.appearance.borderRadius,
        logo_url: settings.logo,
        booking_buffer_minutes: settings.booking.bookingBuffer,
        auto_assign_booking: settings.booking.autoBookingId,
        default_booking_status: settings.booking.defaultStatus,
        tax_percentage: settings.payment.taxPercentage,
        invoice_prefix: settings.payment.invoicePrefix,
        wallet_enabled: settings.payment.walletEnabled,
        online_payments_enabled: settings.payment.onlinePaymentsEnabled,
        cash_payments_enabled: settings.payment.cashPaymentsEnabled,
        email_notifications_enabled: settings.notifications.emailNotifications,
        sms_notifications_enabled: settings.notifications.smsNotifications,
        push_notifications_enabled: settings.notifications.pushNotifications,
        booking_alerts_enabled: settings.notifications.bookingAlerts,
        payment_alerts_enabled: settings.notifications.paymentAlerts,
        review_alerts_enabled: settings.notifications.reviewAlerts,
      };

      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dbSettings),
      });

      if (!response.ok) {
        throw new Error('Failed to save settings');
      }

      console.log('Settings saved successfully');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      console.error('Error saving settings:', err);
      throw err;
    } finally {
      setIsSaving(false);
    }
  }, [settings]);

  const resetToDefaults = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
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
        isLoading,
        isSaving,
        error,
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
