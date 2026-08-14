import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
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

    // For testing: hardcoded super admin
    if (email === 'admin@skm.com' && password === 'Admin@123') {
      console.log('✅ Super admin logged in: admin@skm.com');
      return NextResponse.json({
        success: true,
        user: {
          id: 'super-admin-001',
          email: 'admin@skm.com',
          fullName: 'Super Administrator',
          role: 'super_admin',
          status: 'active',
        },
        token: 'temp-token-' + Date.now(),
      });
    }

    // Try Supabase auth for real admin accounts (if any)
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Admin login error:', error);
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

    // Check if user is admin in database - use helper to avoid type errors
    const result = await selectFrom('users', 'id, email, full_name, role, status');
    const allUsers = (result.data as any) || [];
    const adminUser = allUsers.filter((u: any) => u.id === data.user.id && u.role === 'super_admin');

    if (!adminUser || adminUser.length === 0) {
      console.error('Admin not found or not authorized');
      return NextResponse.json(
        { error: 'Not authorized as admin' },
        { status: 403 }
      );
    }

    const user = adminUser[0];

    console.log(`✅ Admin logged in: ${email}`);

    return NextResponse.json({
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email,
        fullName: user.full_name,
        role: user.role,
        status: user.status,
      },
      token: data.session?.access_token,
    });
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
