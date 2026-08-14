// Mock data for analytics and reports module

export interface KPIData {
  totalBookings: number;
  completedBookings: number;
  pendingBookings: number;
  cancelledBookings: number;
  totalRevenue: number;
  totalCustomers: number;
  activeBranches: number;
  activeTechnicians: number;
  avgServiceRating: number;
  avgBookingValue: number;
}

export interface RevenueData {
  date: string;
  revenue: number;
  bookings: number;
}

export interface BookingData {
  date: string;
  bookings: number;
}

export interface ServicePerformance {
  serviceName: string;
  bookings: number;
  revenue: number;
  completionRate: number;
  rating: number;
}

export interface BranchPerformance {
  branchName: string;
  bookings: number;
  revenue: number;
  completionRate: number;
  rating: number;
}

export interface TechnicianPerformance {
  technicianName: string;
  assignedJobs: number;
  completedJobs: number;
  pendingJobs: number;
  avgRating: number;
  avgCompletionTime: number;
}

export const MOCK_KPI: KPIData = {
  totalBookings: 1247,
  completedBookings: 1089,
  pendingBookings: 145,
  cancelledBookings: 13,
  totalRevenue: 187500,
  totalCustomers: 892,
  activeBranches: 5,
  activeTechnicians: 32,
  avgServiceRating: 4.7,
  avgBookingValue: 150,
};

// Daily revenue for last 30 days
export const MOCK_DAILY_REVENUE: RevenueData[] = [
  { date: 'Jan 1', revenue: 5200, bookings: 28 },
  { date: 'Jan 2', revenue: 6100, bookings: 32 },
  { date: 'Jan 3', revenue: 4800, bookings: 25 },
  { date: 'Jan 4', revenue: 7300, bookings: 38 },
  { date: 'Jan 5', revenue: 6900, bookings: 36 },
  { date: 'Jan 6', revenue: 8200, bookings: 42 },
  { date: 'Jan 7', revenue: 7100, bookings: 37 },
  { date: 'Jan 8', revenue: 6400, bookings: 33 },
  { date: 'Jan 9', revenue: 7800, bookings: 40 },
  { date: 'Jan 10', revenue: 8900, bookings: 45 },
  { date: 'Jan 11', revenue: 7200, bookings: 38 },
  { date: 'Jan 12', revenue: 6500, bookings: 34 },
  { date: 'Jan 13', revenue: 8100, bookings: 42 },
  { date: 'Jan 14', revenue: 9200, bookings: 47 },
  { date: 'Jan 15', revenue: 7600, bookings: 39 },
  { date: 'Jan 16', revenue: 6900, bookings: 36 },
  { date: 'Jan 17', revenue: 8400, bookings: 43 },
  { date: 'Jan 18', revenue: 9500, bookings: 49 },
  { date: 'Jan 19', revenue: 7900, bookings: 41 },
  { date: 'Jan 20', revenue: 7100, bookings: 37 },
  { date: 'Jan 21', revenue: 8600, bookings: 44 },
  { date: 'Jan 22', revenue: 9800, bookings: 50 },
  { date: 'Jan 23', revenue: 8200, bookings: 42 },
  { date: 'Jan 24', revenue: 7400, bookings: 38 },
  { date: 'Jan 25', revenue: 8900, bookings: 46 },
  { date: 'Jan 26', revenue: 10200, bookings: 52 },
  { date: 'Jan 27', revenue: 8500, bookings: 44 },
  { date: 'Jan 28', revenue: 7800, bookings: 40 },
  { date: 'Jan 29', revenue: 9100, bookings: 47 },
  { date: 'Jan 30', revenue: 10500, bookings: 54 },
];

// Revenue by service category
export const MOCK_REVENUE_BY_SERVICE = [
  { name: 'Home Cleaning', value: 65000, percentage: 35 },
  { name: 'Laundry Service', value: 48000, percentage: 26 },
  { name: 'Carpet Cleaning', value: 38000, percentage: 20 },
  { name: 'Car Wash', value: 22000, percentage: 12 },
  { name: 'Plumbing', value: 14500, percentage: 7 },
];

// Booking status distribution
export const MOCK_BOOKING_STATUS_DISTRIBUTION = [
  { name: 'Completed', value: 1089, percentage: 87 },
  { name: 'Pending', value: 145, percentage: 12 },
  { name: 'Cancelled', value: 13, percentage: 1 },
];

// Service analytics
export const MOCK_SERVICE_PERFORMANCE: ServicePerformance[] = [
  {
    serviceName: 'Home Cleaning',
    bookings: 425,
    revenue: 65000,
    completionRate: 89,
    rating: 4.8,
  },
  {
    serviceName: 'Laundry Service',
    bookings: 320,
    revenue: 48000,
    completionRate: 87,
    rating: 4.6,
  },
  {
    serviceName: 'Carpet Cleaning',
    bookings: 253,
    revenue: 38000,
    completionRate: 85,
    rating: 4.5,
  },
  {
    serviceName: 'Car Wash',
    bookings: 147,
    revenue: 22000,
    completionRate: 91,
    rating: 4.7,
  },
  {
    serviceName: 'Plumbing',
    bookings: 102,
    revenue: 14500,
    completionRate: 83,
    rating: 4.4,
  },
];

// Branch performance
export const MOCK_BRANCH_PERFORMANCE: BranchPerformance[] = [
  {
    branchName: 'Downtown Branch',
    bookings: 342,
    revenue: 51300,
    completionRate: 89,
    rating: 4.8,
  },
  {
    branchName: 'Lusail Branch',
    bookings: 278,
    revenue: 41700,
    completionRate: 87,
    rating: 4.7,
  },
  {
    branchName: 'Marina Branch',
    bookings: 215,
    revenue: 32250,
    completionRate: 85,
    rating: 4.6,
  },
  {
    branchName: 'Al Rayyan Branch',
    bookings: 156,
    revenue: 23400,
    completionRate: 86,
    rating: 4.5,
  },
  {
    branchName: 'Al Wakrah Branch',
    bookings: 89,
    revenue: 13350,
    completionRate: 84,
    rating: 4.4,
  },
];

// Technician performance
export const MOCK_TECHNICIAN_PERFORMANCE: TechnicianPerformance[] = [
  {
    technicianName: 'Ahmad Al-Mansouri',
    assignedJobs: 156,
    completedJobs: 142,
    pendingJobs: 14,
    avgRating: 4.9,
    avgCompletionTime: 45,
  },
  {
    technicianName: 'Mohammed Al-Kaabi',
    assignedJobs: 142,
    completedJobs: 128,
    pendingJobs: 14,
    avgRating: 4.8,
    avgCompletionTime: 48,
  },
  {
    technicianName: 'Fatima Al-Thani',
    assignedJobs: 138,
    completedJobs: 125,
    pendingJobs: 13,
    avgRating: 4.7,
    avgCompletionTime: 50,
  },
  {
    technicianName: 'Sara Abdullah',
    assignedJobs: 125,
    completedJobs: 111,
    pendingJobs: 14,
    avgRating: 4.6,
    avgCompletionTime: 52,
  },
  {
    technicianName: 'Khalid Al-Marri',
    assignedJobs: 112,
    completedJobs: 98,
    pendingJobs: 14,
    avgRating: 4.5,
    avgCompletionTime: 55,
  },
];

// Peak booking hours
export const MOCK_PEAK_BOOKING_HOURS = [
  { hour: '08:00', bookings: 12 },
  { hour: '09:00', bookings: 18 },
  { hour: '10:00', bookings: 25 },
  { hour: '11:00', bookings: 32 },
  { hour: '12:00', bookings: 28 },
  { hour: '13:00', bookings: 15 },
  { hour: '14:00', bookings: 22 },
  { hour: '15:00', bookings: 29 },
  { hour: '16:00', bookings: 35 },
  { hour: '17:00', bookings: 38 },
  { hour: '18:00', bookings: 42 },
  { hour: '19:00', bookings: 28 },
];

// Peak booking days
export const MOCK_PEAK_BOOKING_DAYS = [
  { day: 'Monday', bookings: 156 },
  { day: 'Tuesday', bookings: 148 },
  { day: 'Wednesday', bookings: 162 },
  { day: 'Thursday', bookings: 171 },
  { day: 'Friday', bookings: 189 },
  { day: 'Saturday', bookings: 201 },
  { day: 'Sunday', bookings: 178 },
];

// Customer insights
export const MOCK_CUSTOMER_INSIGHTS = {
  newCustomers: 125,
  returningCustomers: 767,
  repeatBookingRate: 86,
  avgCustomerRating: 4.7,
  totalCustomerSessions: 1247,
};

// Payment reports
export const MOCK_PAYMENT_REPORTS = {
  totalPaymentsReceived: 187500,
  pendingPayments: 12300,
  failedPayments: 2100,
  refunds: 5600,
};

// Payment method distribution
export const MOCK_PAYMENT_METHODS = [
  { method: 'Credit Card', percentage: 45, amount: 84375 },
  { method: 'Debit Card', percentage: 35, amount: 65625 },
  { method: 'Digital Wallet', percentage: 15, amount: 28125 },
  { method: 'Bank Transfer', percentage: 5, amount: 9375 },
];
