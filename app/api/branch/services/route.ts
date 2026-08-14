import { NextRequest, NextResponse } from 'next/server';
import { getServices, createService } from '@/lib/supabase-helpers';

export async function GET(request: NextRequest) {
  try {
    const branchId = request.nextUrl.searchParams.get('branch_id');

    if (!branchId) {
      return NextResponse.json(
        { error: 'branch_id is required' },
        { status: 400 }
      );
    }

    const result = await getServices('branch_id', branchId);
    const data = (result.data as any) || [];
    
    // Sort by created_at descending
    const sorted = data.sort((a: any, b: any) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return NextResponse.json({ services: sorted });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { branch_id, service_id, name, category, price, duration, availability } = body;

    if (!branch_id || !name || !price || !duration) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await createService({
      branch_id,
      service_id: service_id || null,
      name,
      category,
      price,
      duration,
      availability: availability || 'available'
    });

    const service = (result.data as any);

    return NextResponse.json({ service }, { status: 201 });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
