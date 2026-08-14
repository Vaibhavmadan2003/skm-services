import { NextRequest, NextResponse } from 'next/server';
import { selectFrom, insertInto } from '@/lib/supabase-helpers';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const branchId = request.nextUrl.searchParams.get('branch_id');

    if (!branchId) {
      return NextResponse.json(
        { error: 'branch_id is required' },
        { status: 400 }
      );
    }

    // Fetch branch services using helper
    const result = await selectFrom('branch_services', '*');
    const allServices = (result.data as any) || [];
    const services = allServices
      .filter((s: any) => s.branch_id === branchId)
      .sort((a: any, b: any) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

    return NextResponse.json({
      success: true,
      services: services || [],
    });
  } catch (error) {
    console.error('Get services error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { branch_id, service_id, custom_price, is_available } = body;

    if (!branch_id || !service_id) {
      return NextResponse.json(
        { error: 'branch_id and service_id are required' },
        { status: 400 }
      );
    }

    // Check if service already exists for this branch - fetch and filter
    const checkResult = await selectFrom('branch_services', 'id, branch_id, service_id');
    const allServices = (checkResult.data as any) || [];
    const existing = allServices.find((s: any) => s.branch_id === branch_id && s.service_id === service_id);

    if (existing) {
      return NextResponse.json(
        { error: 'Service already exists for this branch' },
        { status: 400 }
      );
    }

    // Insert using helper
    const insertResult = await insertInto('branch_services', [
      {
        branch_id,
        service_id,
        custom_price: custom_price || null,
        is_available: is_available !== undefined ? is_available : true,
      },
    ]);

    const data = insertResult.data;
    const error = insertResult.error;

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        service: (data as any)?.[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create service error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
