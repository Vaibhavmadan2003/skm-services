export interface Branch {
  id: string;
  name: string;
  managerId: string;
  managerName: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  workingHoursStart: string;
  workingHoursEnd: string;
  status: 'active' | 'suspended';
  todaysBookings: number;
  monthlyBookings: number;
  monthlyRevenue: number;
  settlementStatus: 'pending' | 'completed' | 'partial';
  customerRating: number;
  createdAt: string;
  logoUrl?: string;
  assignedBookings?: number;
}

// Empty array - branches are created from partner applications
// When admin approves a partner application, a branch is created automatically
export const MOCK_BRANCHES: Branch[] = [];

export const CITIES = ['Doha', 'Al Rayyan', 'Lusail', 'Wakrah', 'Al Khor', 'Umm Salal'];

export const MANAGERS = [
  { id: 'manager_001', name: 'Ahmed Al-Dosari' },
  { id: 'manager_002', name: 'Fatima Al-Marri' },
  { id: 'manager_003', name: 'Mohammed Hassan' },
  { id: 'manager_004', name: 'Noor Al-Khatib' },
  { id: 'manager_005', name: 'Layla Al-Jabri' },
  { id: 'manager_006', name: 'Khalid Al-Sulaiti' },
];
