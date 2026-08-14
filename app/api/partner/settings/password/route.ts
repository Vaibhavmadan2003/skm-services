import { NextRequest, NextResponse } from 'next/server';
import { selectFrom, updateTable } from '@/lib/supabase-helpers';

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { user_id, old_password, new_password } = body;

    if (!user_id || !old_password || !new_password) {
      return NextResponse.json(
        { error: 'user_id, old_password, and new_password are required' },
        { status: 400 }
      );
    }

    // Get user using helper
    const usersResult = await selectFrom('users', 'id, password_hash, email');
    const allUsers = (usersResult.data as any) || [];
    const userData = allUsers.find((u: any) => u.id === user_id);

    if (!userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Verify old password
    if (userData.password_hash !== old_password) {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 401 }
      );
    }

    // Validate new password
    if (new_password.length < 8) {
      return NextResponse.json(
        { error: 'New password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // Update password using helper
    await updateTable('users', { password_hash: new_password, updated_at: new Date().toISOString() }, 'id', user_id);

    return NextResponse.json({
      success: true,
      message: 'Password updated successfully',
    });
  } catch (error) {
    console.error('Password change error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
