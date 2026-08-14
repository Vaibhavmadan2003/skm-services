import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';
import { generateRandomPassword } from '@/lib/utils';
import { insertInto, getSingleRecord, updateTable, upsertUser } from '@/lib/supabase-helpers';

/**
 * GET /api/partner-applications/[id]
 * Get a specific application
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // TODO: Add authentication check for admin users
    const { id } = await params;

    const { data, error } = await supabase
      .from('partner_applications')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (err) {
    console.error('Unexpected error in GET /api/partner-applications/[id]:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/partner-applications/[id]
 * Update application status (approve/reject)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // TODO: Add authentication check for admin users
    const { id } = await params;

    const body = await request.json();
    const { action, rejection_reason } = body;

    if (!action || !['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action. Must be "approve" or "reject"' },
        { status: 400 }
      );
    }

    if (action === 'reject' && !rejection_reason) {
      return NextResponse.json(
        { error: 'Rejection reason is required' },
        { status: 400 }
      );
    }

    // Get the application using helper
    const applicationResult = await getSingleRecord('partner_applications', 'id', id);
    const { data: application, error: fetchError } = applicationResult;

    if (fetchError) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      );
    }

    if (action === 'approve') {
      // Generate temporary password
      const tempPassword = generateRandomPassword(12);

      // Create a new branch using helper
      const application_cast = (application as any);
      const branchInsertResult = await insertInto('branches', [
        {
          name: application_cast.business_name,
          email: application_cast.email,
          phone: application_cast.phone,
          city: application_cast.city,
          address: application_cast.city, // Using city as default address
          manager_name: application_cast.manager_name,
          is_active: true,
          working_hours_start: '07:00',
          working_hours_end: '22:00',
        },
      ]);

      const branch = (branchInsertResult.data as any)?.[0];
      const branchError = branchInsertResult.error;

      if (branchError) {
        console.error('Error creating branch:', branchError);
        return NextResponse.json(
          { error: 'Failed to create branch', details: branchError.message },
          { status: 500 }
        );
      }

      // Create user account
      const { data: auth, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email: application_cast.email,
        password: tempPassword,
        email_confirm: true,
        user_metadata: {
          business_name: application_cast.business_name,
          branch_id: branch.id,
          role: 'partner',
        },
      });

      if (authError) {
        console.error('Error creating user:', authError);
        return NextResponse.json(
          { error: 'Failed to create user account', details: authError.message },
          { status: 500 }
        );
      }

      // Create user record in users table using helper
      console.log('Creating user record with ID:', auth.user?.id);
      const userInsertResult = await insertInto('users', [
        {
          id: auth.user?.id,
          email: application_cast.email,
          full_name: application_cast.business_name,
          phone: application_cast.phone,
          role: 'branch_admin', // Partner becomes branch admin
          branch_id: branch.id,
          status: 'active',
          password_hash: '', // This will be managed by Supabase auth
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);

      const insertedUser = (userInsertResult.data as any)?.[0];
      const userError = userInsertResult.error;

      if (userError) {
        console.error('❌ Error creating user record:', userError);
        console.error('Full error details:', JSON.stringify(userError, null, 2));
        console.error('User ID:', auth.user?.id);
        console.error('Email:', application_cast.email);
        console.error('Branch ID:', branch.id);
        
        // Try alternate approach - use upsert helper
        console.log('Attempting upsert as fallback...');
        const upsertResult = await upsertUser({
          id: auth.user?.id,
          email: application_cast.email,
          full_name: application_cast.business_name,
          phone: application_cast.phone,
          role: 'branch_admin',
          branch_id: branch.id,
          status: 'active',
          password_hash: '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

        const upsertError = upsertResult.error;
        if (upsertError) {
          console.error('❌ Upsert also failed:', upsertError);
          console.error('Full upsert error details:', JSON.stringify(upsertError, null, 2));
          return NextResponse.json(
            { error: 'Failed to create user record', details: upsertError.message },
            { status: 500 }
          );
        }

        console.log('✅ Upsert succeeded');
      } else {
        console.log('✅ User record created successfully:', insertedUser);
      }

      // Update application status using helper
      const updateResult = await updateTable('partner_applications', {
        status: 'approved',
        approved_at: new Date().toISOString(),
        created_branch_id: branch.id,
        created_user_id: auth.user?.id,
        auto_generated_password: tempPassword,
      }, 'id', id);

      const updated = (updateResult.data as any)?.[0];
      const updateError = updateResult.error;

      if (updateError) {
        console.error('Error updating application:', updateError);
        return NextResponse.json(
          { error: 'Failed to update application', details: updateError.message },
          { status: 500 }
        );
      }

      console.log(`✅ Partner approved: ${application_cast.email}`);
      console.log(`   Branch ID: ${branch.id}`);
      console.log(`   User ID: ${auth.user?.id}`);
      console.log(`   Temp Password: ${tempPassword}`);

      // TODO: Send email to partner with login credentials and temporary password

      return NextResponse.json({
        success: true,
        message: 'Application approved successfully',
        data: updated,
        new_branch: branch,
        temporary_credentials: {
          email: application_cast.email,
          password: tempPassword,
          note: 'Partner must change password on first login',
        },
      });
    } else if (action === 'reject') {
      // Update application status using helper
      const application_cast = (application as any);
      const updateResult = await updateTable('partner_applications', {
        status: 'rejected',
        rejection_reason,
      }, 'id', id);

      const updated = (updateResult.data as any)?.[0];
      const updateError = updateResult.error;

      if (updateError) {
        console.error('Error updating application:', updateError);
        return NextResponse.json(
          { error: 'Failed to update application', details: updateError.message },
          { status: 500 }
        );
      }

      console.log(`❌ Partner rejected: ${application_cast.email}`);
      console.log(`   Reason: ${rejection_reason}`);

      // TODO: Send rejection email to applicant

      return NextResponse.json({
        success: true,
        message: 'Application rejected',
        data: updated,
      });
    }
  } catch (err) {
    console.error('Unexpected error in PATCH /api/partner-applications/[id]:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
