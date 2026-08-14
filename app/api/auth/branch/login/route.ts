import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { selectFrom } from '@/lib/supabase-helpers';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Sign in with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Supabase auth error:', error);
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    if (!data.user) {
      return NextResponse.json(
        { error: 'Authentication failed' },
        { status: 401 }
      );
    }

    // Get user information - use helper to avoid type errors
    const userResult = await selectFrom('users', 'id, email, full_name, role, branch_id, status');
    const allUsers = (userResult.data as any) || [];
    const userList = allUsers.filter((u: any) => u.id === data.user.id);

    if (!userList || userList.length === 0) {
      console.log('No user found for ID:', data.user.id);
      return NextResponse.json(
        { error: 'User profile not found. Please contact support.' },
        { status: 404 }
      );
    }

    const user = userList[0];

    // Check if user has a branch_id
    if (!user.branch_id) {
      return NextResponse.json(
        { error: 'Not authorized as branch admin' },
        { status: 403 }
      );
    }

    // Get branch details - use helper
    const branchResult = await selectFrom('branches', 'id, name, email, phone, city, address, logo_url, manager_name, working_hours_start, working_hours_end');
    const allBranches = (branchResult.data as any) || [];
    const branch = allBranches.find((b: any) => b.id === user.branch_id);

    console.log(`✅ Branch admin logged in: ${email} (Branch: ${user.branch_id})`);

    return NextResponse.json({
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email,
        fullName: user.full_name,
        role: user.role,
        branchId: user.branch_id,
        status: user.status,
      },
      branch,
      token: data.session?.access_token,
    });
  } catch (error) {
    console.error('Branch login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
