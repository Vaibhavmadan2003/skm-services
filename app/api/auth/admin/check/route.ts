import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { authorized: false, error: 'No token provided' },
        { status: 401 }
      );
    }

    // For now: simple token validation (hardcoded super admin token check)
    // In production: decode JWT and verify signature
    if (token.startsWith('temp-token-')) {
      return NextResponse.json({
        authorized: true,
        role: 'super_admin',
      });
    }

    return NextResponse.json(
      { authorized: false, error: 'Invalid token' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
