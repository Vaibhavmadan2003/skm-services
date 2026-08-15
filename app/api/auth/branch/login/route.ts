import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

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

    // Get user information using service role to bypass RLS
    const userClient = supabaseAdmin as any;
    const userQueryResult = await userClient
      .from('users')
      .select('id, email, full_name, role, branch_id, status')
      .eq('id', data.user.id);

    if (userQueryResult.error) {
      console.error('Error fetching user:', userQueryResult.error);
      return NextResponse.json(
        { error: 'User profile not found. Please contact support.' },
        { status: 404 }
      );
    }

    const userList = (userQueryResult.data as any) || [];
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

    // Get branch details using service role
    const branchClient = supabaseAdmin as any;
    const branchQueryResult = await branchClient
      .from('branches')
      .select('id, name, email, phone, city, address, logo_url, manager_name, working_hours_start, working_hours_end')
      .eq('id', user.branch_id)
      .single();

    const branch = branchQueryResult.data;
    
    if (branchQueryResult.error) {
      console.error('Error fetching branch:', branchQueryResult.error);
      // Continue without branch details - branch might have been deleted
      console.log(`⚠️ Branch ${user.branch_id} not found for user ${email}`);
    }

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
