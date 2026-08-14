import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { selectFrom, updateTable } from '@/lib/supabase-helpers';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Get user by email using helper
    const usersResult = await selectFrom('users', 'id, email, password_hash, full_name, role, branch_id, status');
    const allUsers = (usersResult.data as any) || [];
    const userData = allUsers.find((u: any) => u.email === email);

    if (!userData) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify password (simple comparison - in production use bcrypt)
    if (userData.password_hash !== password) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Check if user is branch_admin
    if (userData.role !== 'branch_admin') {
      return NextResponse.json(
        { error: 'Only branch admins can access this dashboard' },
        { status: 403 }
      );
    }

    // Check if user is active
    if (userData.status !== 'active') {
      return NextResponse.json(
        { error: 'Your account is ' + userData.status },
        { status: 403 }
      );
    }

    // Get branch details
    if (!userData.branch_id) {
      return NextResponse.json(
        { error: 'Branch not assigned to user' },
        { status: 400 }
      );
    }

    const branchResult = await selectFrom('branches', 'id, name, logo_url, email, phone, address, city');
    const branches = (branchResult.data as any) || [];
    const branchData = branches.find((b: any) => b.id === userData.branch_id);

    // Update last login
    await updateTable('users', { last_login: new Date().toISOString() }, 'id', userData.id);

    // Return user and branch data
    return NextResponse.json({
      success: true,
      user: {
        id: userData.id,
        email: userData.email,
        full_name: userData.full_name,
        role: userData.role,
        branch_id: userData.branch_id,
      },
      branch: branchData,
      token: userData.id, // In production, use JWT
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
