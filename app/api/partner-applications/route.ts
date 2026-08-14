import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';
import { selectFrom, insertInto } from '@/lib/supabase-helpers';

/**
 * POST /api/partner-applications
 * Submit a new partner application
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { business_name, manager_name, service_type, email, phone, city } = body;

    if (!business_name || !manager_name || !service_type || !email || !phone || !city) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if email already exists - use helper
    const appResult = await selectFrom('partner_applications', 'id, status');
    const allApps = (appResult.data as any) || [];
    const existing = allApps.find((a: any) => a.email === email);

    if (existing) {
      // If already approved/rejected, suggest contacting support
      if (existing.status === 'approved' || existing.status === 'rejected') {
        return NextResponse.json(
          {
            error: `You already have an ${existing.status} application. Please contact support if you need assistance.`,
          },
          { status: 400 }
        );
      }

      // If pending, tell them to wait
      if (existing.status === 'pending') {
        return NextResponse.json(
          {
            error:
              'You already have a pending application. Our team will review it shortly.',
          },
          { status: 400 }
        );
      }
    }

    // Insert the application using helper
    const insertResult = await insertInto('partner_applications', [
      {
        business_name,
        manager_name,
        service_type,
        email,
        phone,
        city,
        years_in_business: body.years_in_business || null,
        website: body.website || null,
        additional_info: body.additional_info || null,
        status: 'pending',
        ip_address: request.headers.get('x-forwarded-for') || null,
        user_agent: request.headers.get('user-agent'),
      },
    ]);

    const data = insertResult.data;
    const error = insertResult.error;

    if (error) {
      console.error('Error creating application:', error);
      return NextResponse.json(
        { error: 'Failed to submit application', details: error.message },
        { status: 500 }
      );
    }

    console.log(`✅ Partner application submitted: ${email}`);

    // Create notification for super admin
    if (data && (data as any)[0]) {
      const applicationId = (data as any)[0].id;
      const message = `🆕 New partner application from ${business_name} (${service_type}). Email: ${email}`;
      console.log(`📢 Creating notification for admin with app ID: ${applicationId}`);
      
      try {
        const notifResult = await insertInto('notifications', [{
          admin_id: 'admin@skm.com',
          application_id: applicationId,
          message,
          type: 'setting_change', // Must match NotificationCenter filter
          is_read: false,
          created_at: new Date().toISOString(),
        }]);
        
        if (notifResult.error) {
          console.error('❌ Notification creation error:', notifResult.error);
        } else {
          console.log('✅ Notification created successfully:', notifResult.data);
        }
      } catch (notifErr) {
        console.error('❌ Error creating notification:', notifErr);
      }
    }

    // TODO: Send confirmation email to the applicant

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      data: (data as any)?.[0],
    });
  } catch (err) {
    console.error('Unexpected error in POST /api/partner-applications:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/partner-applications
 * Get all applications (admin only)
 * Query params:
 * - status: filter by status (pending, approved, rejected)
 * - service_type: filter by service type
 * - limit: number of results (default 20)
 * - offset: pagination offset (default 0)
 */
export async function GET(request: NextRequest) {
  try {
    // TODO: Add authentication check for admin users

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const serviceType = searchParams.get('service_type');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Fetch all applications using helper
    const result = await selectFrom('partner_applications', '*');
    let data = (result.data as any) || [];

    // Apply filters in memory
    if (status) {
      data = data.filter((a: any) => a.status === status);
    }

    if (serviceType) {
      data = data.filter((a: any) => a.service_type === serviceType);
    }

    // Sort by created_at descending
    data = data.sort((a: any, b: any) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    const count = data.length;

    // Apply pagination
    data = data.slice(offset, offset + limit);

    return NextResponse.json({
      success: true,
      data,
      pagination: {
        total: count || 0,
        limit,
        offset,
      },
    });
  } catch (err) {
    console.error('Unexpected error in GET /api/partner-applications:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
