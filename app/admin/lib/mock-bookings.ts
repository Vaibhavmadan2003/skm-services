// Mock data for bookings module
// This will be replaced with real API calls in Phase 2

export interface Assignment {
  assignedBy: string;
  assignedDate: string;
  assignedTime: string;
  previousBranch?: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  details?: string;
}

export interface Booking {
  id: string;
  bookingNumber: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAddress: string;
  customerCity: string;
  serviceType: string;
  serviceDuration: number; // in minutes
  bookingDate: string; // YYYY-MM-DD
  bookingTime: string; // HH:MM
  assignedBranchId: string;
  assignedBranchName: string;
  branchManager: string;
  branchStatus: 'active' | 'inactive' | 'suspended';
  assignedWorkerId: string;
  assignedWorkerName: string;
  assignedWorkerPhone: string;
  workerAvailability: 'available' | 'busy' | 'on_leave';
  assignedDriverId: string;
  assignedDriverName: string;
  assignedDriverPhone: string;
  vehicleNumber: string;
  driverStatus: 'available' | 'busy' | 'on_leave';
  amount: number;
  paymentMethod: string;
  bookingStatus: 'pending' | 'assigned' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded' | 'failed';
  transactionId: string;
  invoiceNumber: string;
  companyCommission: number; // percentage
  branchShare: number; // percentage
  settlementStatus: 'pending' | 'processed' | 'paid';
  notes: string;
  createdAt: string;
  assignedAt: string | null;
  acceptedAt: string | null;
  startedAt: string | null;
  completedAt: string | null;
  cancelledAt: string | null;
  latitude: number;
  longitude: number;
  invoiceUrl: string;
  assignments: Assignment[];
  activityLog: ActivityLog[];
}

// Sample mock bookings with complete workflow data
export const MOCK_BOOKINGS: Booking[] = [
  {
    id: '1',
    bookingNumber: 'BK-001001',
    customerId: 'cust-001',
    customerName: 'Ahmed Al-Mansouri',
    customerPhone: '+974-3344-5566',
    customerEmail: 'ahmed.mansouri@email.com',
    customerAddress: '123 Pearl Street, West Bay',
    customerCity: 'Doha',
    serviceType: 'home_cleaning',
    serviceDuration: 120,
    bookingDate: '2024-01-15',
    bookingTime: '10:00',
    assignedBranchId: 'branch-01',
    assignedBranchName: 'Downtown Branch',
    branchManager: 'Mohammad Ibrahim',
    branchStatus: 'active',
    assignedWorkerId: 'worker-001',
    assignedWorkerName: 'Hassan Ahmed',
    assignedWorkerPhone: '+974-5566-7788',
    workerAvailability: 'available',
    assignedDriverId: 'driver-001',
    assignedDriverName: 'Ali Hassan',
    assignedDriverPhone: '+974-7788-9900',
    vehicleNumber: 'QR-123-ABC',
    driverStatus: 'available',
    amount: 250,
    paymentMethod: 'card',
    bookingStatus: 'completed',
    paymentStatus: 'paid',
    transactionId: 'TXN-001001',
    invoiceNumber: 'INV-001001',
    companyCommission: 20,
    branchShare: 80,
    settlementStatus: 'paid',
    notes: 'Customer requested morning service. Completed successfully.',
    createdAt: '2024-01-14T14:30:00Z',
    assignedAt: '2024-01-14T15:00:00Z',
    acceptedAt: '2024-01-14T15:30:00Z',
    startedAt: '2024-01-15T10:15:00Z',
    completedAt: '2024-01-15T12:30:00Z',
    cancelledAt: null,
    latitude: 25.2854,
    longitude: 51.5310,
    invoiceUrl: '/invoices/BK-001001.pdf',
    assignments: [
      {
        assignedBy: 'Super Admin',
        assignedDate: '2024-01-14',
        assignedTime: '15:00',
      },
    ],
    activityLog: [
      {
        id: '1',
        action: 'Booking Created',
        user: 'System',
        timestamp: '2024-01-14T14:30:00Z',
      },
      {
        id: '2',
        action: 'Assigned to Branch',
        user: 'Super Admin',
        timestamp: '2024-01-14T15:00:00Z',
        details: 'Assigned to Downtown Branch',
      },
      {
        id: '3',
        action: 'Accepted by Branch',
        user: 'Mohammad Ibrahim',
        timestamp: '2024-01-14T15:30:00Z',
      },
      {
        id: '4',
        action: 'Job Started',
        user: 'Hassan Ahmed',
        timestamp: '2024-01-15T10:15:00Z',
      },
      {
        id: '5',
        action: 'Job Completed',
        user: 'Hassan Ahmed',
        timestamp: '2024-01-15T12:30:00Z',
      },
      {
        id: '6',
        action: 'Payment Received',
        user: 'System',
        timestamp: '2024-01-15T13:00:00Z',
        details: 'Payment of QAR 250 received',
      },
    ],
  },
  {
    id: '2',
    bookingNumber: 'BK-001002',
    customerId: 'cust-002',
    customerName: 'Fatima Al-Thani',
    customerPhone: '+974-4455-6677',
    customerEmail: 'fatima.thani@email.com',
    customerAddress: '456 Lusail Tower, Lusail',
    customerCity: 'Lusail',
    serviceType: 'laundry_service',
    serviceDuration: 180,
    bookingDate: '2024-01-16',
    bookingTime: '14:00',
    assignedBranchId: 'branch-02',
    assignedBranchName: 'Lusail Branch',
    branchManager: 'Sara Abdullah',
    branchStatus: 'active',
    assignedWorkerId: 'worker-005',
    assignedWorkerName: 'Layla Hassan',
    assignedWorkerPhone: '+974-5577-6688',
    workerAvailability: 'busy',
    assignedDriverId: 'driver-003',
    assignedDriverName: 'Omar Ahmed',
    assignedDriverPhone: '+974-7799-8811',
    vehicleNumber: 'QR-456-DEF',
    driverStatus: 'busy',
    amount: 180,
    paymentMethod: 'wallet',
    bookingStatus: 'in_progress',
    paymentStatus: 'paid',
    transactionId: 'TXN-001002',
    invoiceNumber: 'INV-001002',
    companyCommission: 20,
    branchShare: 80,
    settlementStatus: 'pending',
    notes: 'Priority laundry service. Customer has VIP status.',
    createdAt: '2024-01-15T09:00:00Z',
    assignedAt: '2024-01-15T09:30:00Z',
    acceptedAt: '2024-01-15T10:00:00Z',
    startedAt: '2024-01-16T14:30:00Z',
    completedAt: null,
    cancelledAt: null,
    latitude: 25.2862,
    longitude: 51.5489,
    invoiceUrl: '/invoices/BK-001002.pdf',
    assignments: [
      {
        assignedBy: 'Super Admin',
        assignedDate: '2024-01-15',
        assignedTime: '09:30',
      },
    ],
    activityLog: [
      {
        id: '1',
        action: 'Booking Created',
        user: 'System',
        timestamp: '2024-01-15T09:00:00Z',
      },
      {
        id: '2',
        action: 'Assigned to Branch',
        user: 'Super Admin',
        timestamp: '2024-01-15T09:30:00Z',
        details: 'Assigned to Lusail Branch',
      },
      {
        id: '3',
        action: 'Accepted by Branch',
        user: 'Sara Abdullah',
        timestamp: '2024-01-15T10:00:00Z',
      },
      {
        id: '4',
        action: 'Job Started',
        user: 'Layla Hassan',
        timestamp: '2024-01-16T14:30:00Z',
      },
    ],
  },
  {
    id: '3',
    bookingNumber: 'BK-001003',
    customerId: 'cust-003',
    customerName: 'Mohammed Al-Kaabi',
    customerPhone: '+974-5566-7788',
    customerEmail: 'mohammed.kaabi@email.com',
    customerAddress: '789 Gulf Drive, Al Manara',
    customerCity: 'Doha',
    serviceType: 'car_wash',
    serviceDuration: 60,
    bookingDate: '2024-01-17',
    bookingTime: '09:00',
    assignedBranchId: 'branch-01',
    assignedBranchName: 'Downtown Branch',
    branchManager: 'Mohammad Ibrahim',
    branchStatus: 'active',
    assignedWorkerId: 'worker-003',
    assignedWorkerName: 'Khalid Mohammed',
    assignedWorkerPhone: '+974-5588-9900',
    workerAvailability: 'available',
    assignedDriverId: 'driver-002',
    assignedDriverName: 'Rashid Abdullah',
    assignedDriverPhone: '+974-7811-9922',
    vehicleNumber: 'QR-789-GHI',
    driverStatus: 'available',
    amount: 150,
    paymentMethod: 'cash',
    bookingStatus: 'accepted',
    paymentStatus: 'pending',
    transactionId: 'TXN-001003',
    invoiceNumber: 'INV-001003',
    companyCommission: 20,
    branchShare: 80,
    settlementStatus: 'pending',
    notes: 'Premium car wash with interior cleaning.',
    createdAt: '2024-01-16T10:00:00Z',
    assignedAt: '2024-01-16T10:30:00Z',
    acceptedAt: '2024-01-16T11:00:00Z',
    startedAt: null,
    completedAt: null,
    cancelledAt: null,
    latitude: 25.2760,
    longitude: 51.5264,
    invoiceUrl: '/invoices/BK-001003.pdf',
    assignments: [
      {
        assignedBy: 'Super Admin',
        assignedDate: '2024-01-16',
        assignedTime: '10:30',
      },
    ],
    activityLog: [
      {
        id: '1',
        action: 'Booking Created',
        user: 'System',
        timestamp: '2024-01-16T10:00:00Z',
      },
      {
        id: '2',
        action: 'Assigned to Branch',
        user: 'Super Admin',
        timestamp: '2024-01-16T10:30:00Z',
        details: 'Assigned to Downtown Branch',
      },
      {
        id: '3',
        action: 'Accepted by Branch',
        user: 'Mohammad Ibrahim',
        timestamp: '2024-01-16T11:00:00Z',
      },
    ],
  },
  {
    id: '4',
    bookingNumber: 'BK-001004',
    customerId: 'cust-004',
    customerName: 'Noor Al-Marri',
    customerPhone: '+974-3366-5577',
    customerEmail: 'noor.marri@email.com',
    customerAddress: '321 Marina Boulevard, Marina',
    customerCity: 'Doha',
    serviceType: 'home_cleaning',
    serviceDuration: 150,
    bookingDate: '2024-01-18',
    bookingTime: '11:00',
    assignedBranchId: 'branch-03',
    assignedBranchName: 'Marina Branch',
    branchManager: 'Aisha Hassan',
    branchStatus: 'active',
    assignedWorkerId: 'worker-002',
    assignedWorkerName: 'Huda Abdullah',
    assignedWorkerPhone: '+974-5599-7711',
    workerAvailability: 'available',
    assignedDriverId: 'driver-004',
    assignedDriverName: 'Samir Hassan',
    assignedDriverPhone: '+974-7822-9933',
    vehicleNumber: 'QR-321-JKL',
    driverStatus: 'available',
    amount: 300,
    paymentMethod: 'card',
    bookingStatus: 'assigned',
    paymentStatus: 'paid',
    transactionId: 'TXN-001004',
    invoiceNumber: 'INV-001004',
    companyCommission: 20,
    branchShare: 80,
    settlementStatus: 'pending',
    notes: 'Deep cleaning service. Large 3-bedroom apartment.',
    createdAt: '2024-01-17T08:00:00Z',
    assignedAt: '2024-01-17T08:30:00Z',
    acceptedAt: null,
    startedAt: null,
    completedAt: null,
    cancelledAt: null,
    latitude: 25.2873,
    longitude: 51.5301,
    invoiceUrl: '/invoices/BK-001004.pdf',
    assignments: [
      {
        assignedBy: 'Super Admin',
        assignedDate: '2024-01-17',
        assignedTime: '08:30',
      },
    ],
    activityLog: [
      {
        id: '1',
        action: 'Booking Created',
        user: 'System',
        timestamp: '2024-01-17T08:00:00Z',
      },
      {
        id: '2',
        action: 'Assigned to Branch',
        user: 'Super Admin',
        timestamp: '2024-01-17T08:30:00Z',
        details: 'Assigned to Marina Branch',
      },
    ],
  },
  {
    id: '5',
    bookingNumber: 'BK-001005',
    customerId: 'cust-005',
    customerName: 'Zainab Al-Shami',
    customerPhone: '+974-6677-8899',
    customerEmail: 'zainab.shami@email.com',
    customerAddress: '654 Beach Road, North Gate',
    customerCity: 'Doha',
    serviceType: 'plumbing_service',
    serviceDuration: 90,
    bookingDate: '2024-01-19',
    bookingTime: '15:00',
    assignedBranchId: '',
    assignedBranchName: 'Unassigned',
    branchManager: '',
    branchStatus: 'active',
    assignedWorkerId: '',
    assignedWorkerName: 'Unassigned',
    assignedWorkerPhone: '',
    workerAvailability: 'available',
    assignedDriverId: '',
    assignedDriverName: 'Unassigned',
    assignedDriverPhone: '',
    vehicleNumber: '',
    driverStatus: 'available',
    amount: 200,
    paymentMethod: 'wallet',
    bookingStatus: 'pending',
    paymentStatus: 'pending',
    transactionId: '',
    invoiceNumber: '',
    companyCommission: 20,
    branchShare: 80,
    settlementStatus: 'pending',
    notes: 'Kitchen sink repair needed. Requires plumbing specialist.',
    createdAt: '2024-01-18T13:00:00Z',
    assignedAt: null,
    acceptedAt: null,
    startedAt: null,
    completedAt: null,
    cancelledAt: null,
    latitude: 25.2920,
    longitude: 51.5350,
    invoiceUrl: '/invoices/BK-001005.pdf',
    assignments: [],
    activityLog: [
      {
        id: '1',
        action: 'Booking Created',
        user: 'System',
        timestamp: '2024-01-18T13:00:00Z',
      },
    ],
  },
  {
    id: '6',
    bookingNumber: 'BK-001006',
    customerId: 'cust-006',
    customerName: 'Khalifa Al-Dosari',
    customerPhone: '+974-7788-9900',
    customerEmail: 'khalifa.dosari@email.com',
    customerAddress: '987 Al Waab Street, Al Waab',
    customerCity: 'Doha',
    serviceType: 'home_cleaning',
    serviceDuration: 120,
    bookingDate: '2024-01-20',
    bookingTime: '10:00',
    assignedBranchId: 'branch-02',
    assignedBranchName: 'Lusail Branch',
    branchManager: 'Sara Abdullah',
    branchStatus: 'active',
    assignedWorkerId: 'worker-004',
    assignedWorkerName: 'Amira Mohammed',
    assignedWorkerPhone: '+974-5611-7722',
    workerAvailability: 'available',
    assignedDriverId: 'driver-005',
    assignedDriverName: 'Fahad Abdullah',
    assignedDriverPhone: '+974-7833-9944',
    vehicleNumber: 'QR-987-MNO',
    driverStatus: 'available',
    amount: 250,
    paymentMethod: 'card',
    bookingStatus: 'cancelled',
    paymentStatus: 'refunded',
    transactionId: 'TXN-001006',
    invoiceNumber: 'INV-001006',
    companyCommission: 20,
    branchShare: 80,
    settlementStatus: 'pending',
    notes: 'Customer cancelled due to schedule conflict.',
    createdAt: '2024-01-19T07:00:00Z',
    assignedAt: '2024-01-19T07:30:00Z',
    acceptedAt: null,
    startedAt: null,
    completedAt: null,
    cancelledAt: '2024-01-19T12:00:00Z',
    latitude: 25.2678,
    longitude: 51.5200,
    invoiceUrl: '/invoices/BK-001006.pdf',
    assignments: [
      {
        assignedBy: 'Super Admin',
        assignedDate: '2024-01-19',
        assignedTime: '07:30',
      },
    ],
    activityLog: [
      {
        id: '1',
        action: 'Booking Created',
        user: 'System',
        timestamp: '2024-01-19T07:00:00Z',
      },
      {
        id: '2',
        action: 'Assigned to Branch',
        user: 'Super Admin',
        timestamp: '2024-01-19T07:30:00Z',
        details: 'Assigned to Lusail Branch',
      },
      {
        id: '3',
        action: 'Booking Cancelled',
        user: 'Khalifa Al-Dosari',
        timestamp: '2024-01-19T12:00:00Z',
        details: 'Customer cancelled due to schedule conflict',
      },
    ],
  },
  {
    id: '7',
    bookingNumber: 'BK-001007',
    customerId: 'cust-007',
    customerName: 'Maryam Al-Kuwari',
    customerPhone: '+974-8899-0011',
    customerEmail: 'maryam.kuwari@email.com',
    customerAddress: '159 Corniche Road, Corniche',
    customerCity: 'Doha',
    serviceType: 'carpet_cleaning',
    serviceDuration: 180,
    bookingDate: '2024-01-20',
    bookingTime: '08:00',
    assignedBranchId: 'branch-01',
    assignedBranchName: 'Downtown Branch',
    branchManager: 'Mohammad Ibrahim',
    branchStatus: 'active',
    assignedWorkerId: 'worker-001',
    assignedWorkerName: 'Hassan Ahmed',
    assignedWorkerPhone: '+974-5566-7788',
    workerAvailability: 'busy',
    assignedDriverId: 'driver-001',
    assignedDriverName: 'Ali Hassan',
    assignedDriverPhone: '+974-7788-9900',
    vehicleNumber: 'QR-123-ABC',
    driverStatus: 'busy',
    amount: 400,
    paymentMethod: 'card',
    bookingStatus: 'in_progress',
    paymentStatus: 'paid',
    transactionId: 'TXN-001007',
    invoiceNumber: 'INV-001007',
    companyCommission: 20,
    branchShare: 80,
    settlementStatus: 'pending',
    notes: 'Carpet cleaning for entire villa. 5 bedrooms.',
    createdAt: '2024-01-19T14:00:00Z',
    assignedAt: '2024-01-19T14:30:00Z',
    acceptedAt: '2024-01-19T15:00:00Z',
    startedAt: '2024-01-20T08:30:00Z',
    completedAt: null,
    cancelledAt: null,
    latitude: 25.2900,
    longitude: 51.5450,
    invoiceUrl: '/invoices/BK-001007.pdf',
    assignments: [
      {
        assignedBy: 'Super Admin',
        assignedDate: '2024-01-19',
        assignedTime: '14:30',
      },
    ],
    activityLog: [
      {
        id: '1',
        action: 'Booking Created',
        user: 'System',
        timestamp: '2024-01-19T14:00:00Z',
      },
      {
        id: '2',
        action: 'Assigned to Branch',
        user: 'Super Admin',
        timestamp: '2024-01-19T14:30:00Z',
        details: 'Assigned to Downtown Branch',
      },
      {
        id: '3',
        action: 'Accepted by Branch',
        user: 'Mohammad Ibrahim',
        timestamp: '2024-01-19T15:00:00Z',
      },
      {
        id: '4',
        action: 'Job Started',
        user: 'Hassan Ahmed',
        timestamp: '2024-01-20T08:30:00Z',
      },
    ],
  },
];

// Mock branches for assignment
export const MOCK_BRANCHES = [
  { id: 'branch-01', name: 'Downtown Branch', manager: 'Mohammad Ibrahim', workers: 12, drivers: 5 },
  { id: 'branch-02', name: 'Lusail Branch', manager: 'Sara Abdullah', workers: 8, drivers: 3 },
  { id: 'branch-03', name: 'Marina Branch', manager: 'Aisha Hassan', workers: 10, drivers: 4 },
];

// Mock workers for branches
export const MOCK_WORKERS = {
  'branch-01': [
    { id: 'worker-001', name: 'Hassan Ahmed', phone: '+974-5566-7788', specialization: 'General Cleaning', available: true },
    { id: 'worker-003', name: 'Khalid Mohammed', phone: '+974-5588-9900', specialization: 'Car Wash', available: true },
  ],
  'branch-02': [
    { id: 'worker-005', name: 'Layla Hassan', phone: '+974-5577-6688', specialization: 'Laundry', available: false },
    { id: 'worker-004', name: 'Amira Mohammed', phone: '+974-5611-7722', specialization: 'General Cleaning', available: true },
  ],
  'branch-03': [
    { id: 'worker-002', name: 'Huda Abdullah', phone: '+974-5599-7711', specialization: 'Deep Cleaning', available: true },
  ],
};

export const SERVICES = [
  { id: 'home_cleaning', name: 'Home Cleaning', icon: '🧹' },
  { id: 'laundry_service', name: 'Laundry Service', icon: '👕' },
  { id: 'car_wash', name: 'Car Wash', icon: '🚗' },
  { id: 'plumbing_service', name: 'Plumbing Service', icon: '🔧' },
  { id: 'carpet_cleaning', name: 'Carpet Cleaning', icon: '🛋️' },
];

export const CITIES = ['Doha', 'Lusail', 'Al Rayyan', 'Al Wakrah', 'Umm Salal'];
