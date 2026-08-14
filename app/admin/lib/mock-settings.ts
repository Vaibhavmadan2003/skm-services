// Mock data for settings

export interface GeneralSettings {
  businessName: string;
  businessEmail: string;
  supportPhone: string;
  businessAddress: string;
  timeZone: string;
  currency: string;
  language: string;
}

export interface CompanyInfo {
  companyName: string;
  gstNumber: string;
  panNumber: string;
  registrationNumber: string;
  website: string;
  supportEmail: string;
  supportPhone: string;
  companyAddress: string;
}

export interface AppearanceSettings {
  theme: 'light' | 'dark' | 'system';
  sidebarCollapsed: boolean;
  sidebarColor: string;
  primaryColor: string;
  borderRadius: string;
  fontSize: string;
}

export interface BookingSettings {
  workingHours: string;
  bookingBuffer: number;
  autoBookingId: boolean;
  defaultStatus: string;
}

export interface PaymentSettings {
  currency: string;
  taxPercentage: number;
  invoicePrefix: string;
  walletEnabled: boolean;
  onlinePaymentsEnabled: boolean;
  cashPaymentsEnabled: boolean;
}

export interface SecuritySettings {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface NotificationPreferences {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  bookingAlerts: boolean;
  paymentAlerts: boolean;
  reviewAlerts: boolean;
}

export interface ApiIntegration {
  name: string;
  status: 'connected' | 'not_connected';
  apiKey?: string;
}

export interface SystemInfo {
  appVersion: string;
  frontendVersion: string;
  backendStatus: string;
  databaseStatus: string;
  serverStatus: string;
}

export const DEFAULT_GENERAL_SETTINGS: GeneralSettings = {
  businessName: 'SKM Services Qatar',
  businessEmail: 'info@skm-services.qa',
  supportPhone: '+974-4100-2200',
  businessAddress: '123 Pearl Street, West Bay, Doha, Qatar',
  timeZone: 'Asia/Qatar',
  currency: 'QAR',
  language: 'en',
};

export const DEFAULT_COMPANY_INFO: CompanyInfo = {
  companyName: 'SKM Services Qatar',
  gstNumber: 'GST123456789',
  panNumber: 'PAN987654321',
  registrationNumber: 'REG-2023-001',
  website: 'www.skm-services.qa',
  supportEmail: 'support@skm-services.qa',
  supportPhone: '+974-4100-2200',
  companyAddress: '123 Pearl Street, West Bay, Doha, Qatar',
};

export const DEFAULT_APPEARANCE_SETTINGS: AppearanceSettings = {
  theme: 'light',
  sidebarCollapsed: false,
  sidebarColor: '#ffffff',
  primaryColor: '#0052cc',
  borderRadius: 'medium',
  fontSize: 'medium',
};

export const DEFAULT_BOOKING_SETTINGS: BookingSettings = {
  workingHours: '07:00 AM - 10:00 PM',
  bookingBuffer: 30,
  autoBookingId: true,
  defaultStatus: 'pending',
};

export const DEFAULT_PAYMENT_SETTINGS: PaymentSettings = {
  currency: 'QAR',
  taxPercentage: 5,
  invoicePrefix: 'INV',
  walletEnabled: true,
  onlinePaymentsEnabled: true,
  cashPaymentsEnabled: true,
};

export const DEFAULT_NOTIFICATION_PREFERENCES: NotificationPreferences = {
  emailNotifications: true,
  smsNotifications: true,
  pushNotifications: true,
  bookingAlerts: true,
  paymentAlerts: true,
  reviewAlerts: true,
};

export const MOCK_API_INTEGRATIONS: ApiIntegration[] = [
  { name: 'Google Maps API', status: 'not_connected' },
  { name: 'Firebase', status: 'not_connected' },
  { name: 'Razorpay', status: 'not_connected' },
  { name: 'WhatsApp API', status: 'not_connected' },
];

export const MOCK_SYSTEM_INFO: SystemInfo = {
  appVersion: '1.0.0',
  frontendVersion: '1.0.0',
  backendStatus: 'Operational',
  databaseStatus: 'Healthy',
  serverStatus: 'Running',
};

export const TIME_ZONES = [
  'Asia/Qatar',
  'Asia/Dubai',
  'Asia/Riyadh',
  'Asia/Kuwait',
  'Asia/Bahrain',
  'UTC',
];

export const CURRENCIES = ['QAR', 'AED', 'SAR', 'KWD', 'USD', 'EUR'];

export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'ar', name: 'العربية' },
];
