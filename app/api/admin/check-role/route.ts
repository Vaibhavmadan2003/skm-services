import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';

/**
 * GET /api/admin/check-role
 * Check if the current user has admin role
 */
export async function GET(request: NextRequest) {
  try {
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch user role from users table
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (userError || !userData || !('role' in userData)) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const role = (userData as any).role;

    return NextResponse.json({
      success: true,
      role,
      user_id: user.id,
    });
  } catch (error) {
    console.error('[API /admin/check-role] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
