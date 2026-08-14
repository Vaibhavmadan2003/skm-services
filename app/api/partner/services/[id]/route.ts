import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: serviceId } = await params;
    const body = await request.json();
    const { branch_id, custom_price, is_available, custom_image_url } = body;

    if (!branch_id) {
      return NextResponse.json(
        { error: 'branch_id is required' },
        { status: 400 }
      );
    }

    // Verify service belongs to this branch
    const { data: service, error: serviceError } = await supabase
      .from('branch_services')
      .select('id')
      .eq('id', serviceId)
      .eq('branch_id', branch_id)
      .single();

    if (serviceError || !service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    const updateData: any = {
      updated_at: new Date().toISOString(),
    };

    if (custom_price !== undefined) {
      updateData.custom_price = custom_price;
    }

    if (is_available !== undefined) {
      updateData.is_available = is_available;
    }

    if (custom_image_url !== undefined) {
      updateData.custom_image_url = custom_image_url;
    }

    const { data, error } = await supabase
      .from('branch_services')
      .update(updateData)
      .eq('id', serviceId)
      .select();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      service: data?.[0],
    });
  } catch (error) {
    console.error('Update service error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: serviceId } = await params;
    const branchId = request.nextUrl.searchParams.get('branch_id');

    if (!branchId) {
      return NextResponse.json(
        { error: 'branch_id is required' },
        { status: 400 }
      );
    }

    // Verify service belongs to this branch
    const { data: service, error: serviceError } = await supabase
      .from('branch_services')
      .select('id')
      .eq('id', serviceId)
      .eq('branch_id', branchId)
      .single();

    if (serviceError || !service) {
      return NextResponse.json(
        { error: 'Service not found' },
        { status: 404 }
      );
    }

    const { error } = await supabase
      .from('branch_services')
      .delete()
      .eq('id', serviceId);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Service deleted successfully',
    });
  } catch (error) {
    console.error('Delete service error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
