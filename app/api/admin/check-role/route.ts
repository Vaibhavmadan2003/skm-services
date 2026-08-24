import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';

/**
 * GET /api/admin/check-role
 * Check if current user is super admin
 */
export async function GET(request: NextRequest) {
  try {
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      console.log('[API /admin/check-role] Auth error:', authError?.message || 'No user');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('[API /admin/check-role] User:', user.id);

    // Check user role in database
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (userError || !userData) {
      console.log('[API /admin/check-role] User not found in database');
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const role = (userData as any)?.role || 'user';
    console.log('[API /admin/check-role] User role:', role);

    return NextResponse.json({
      user_id: user.id,
      role: role,
      is_super_admin: role === 'super_admin',
    });
  } catch (error) {
    console.error('[API /admin/check-role] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
