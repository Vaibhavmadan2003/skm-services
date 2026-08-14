/**
 * Temporary Admin Authentication
 * Demo credentials for development and testing
 * 
 * SECURITY NOTE: These are temporary demo credentials only
 * Replace with proper authentication system before production
 */

export interface AdminCredentials {
  email: string;
  password: string;
  role: "Super Admin" | "Admin" | "Moderator";
  name: string;
  permissions: string[];
}

/**
 * Demo admin credentials
 * Email: admin@skmservices.com
 * Password: Admin@2024
 */
export const TEMP_ADMIN_CREDENTIALS: AdminCredentials = {
  email: "admin@skmservices.com",
  password: "Admin@2024",
  role: "Super Admin",
  name: "Admin User",
  permissions: [
    "dashboard:view",
    "users:manage",
    "services:manage",
    "bookings:manage",
    "payments:manage",
    "reports:view",
    "settings:manage",
    "support:manage",
  ],
};

/**
 * Additional test credentials for different roles
 */
export const TEST_CREDENTIALS = {
  superAdmin: {
    email: "admin@skmservices.com",
    password: "Admin@2024",
    role: "Super Admin" as const,
  },
  admin: {
    email: "admin.user@skmservices.com",
    password: "Admin@2024",
    role: "Admin" as const,
  },
  moderator: {
    email: "moderator@skmservices.com",
    password: "Mod@2024",
    role: "Moderator" as const,
  },
};

/**
 * Validate credentials against demo credentials
 * IMPORTANT: This is for demo/testing only
 * Replace with proper backend authentication before production
 */
export function validateTempCredentials(email: string, password: string): boolean {
  return (
    email === TEMP_ADMIN_CREDENTIALS.email &&
    password === TEMP_ADMIN_CREDENTIALS.password
  );
}

/**
 * Get admin user info
 * In production, fetch from database/API
 */
export function getAdminUserInfo() {
  return {
    id: "admin-001",
    email: TEMP_ADMIN_CREDENTIALS.email,
    name: TEMP_ADMIN_CREDENTIALS.name,
    role: TEMP_ADMIN_CREDENTIALS.role,
    avatar: null, // Can be populated later
    permissions: TEMP_ADMIN_CREDENTIALS.permissions,
    createdAt: new Date("2024-01-01"),
    lastLogin: new Date(),
  };
}

/**
 * Create a mock session token
 * In production, use JWT or session management system
 */
export function createMockSessionToken(): string {
  // This is just a mock. In production, use a proper JWT/session system
  return `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Verify session token
 * In production, validate JWT or session against database
 */
export function verifyMockSessionToken(token: string): boolean {
  // Simple check - in production use proper JWT verification
  return token.startsWith("token_") && token.length > 20;
}
