import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';
import { insertInto, updateBranch, getBranchById, safeBranchData } from '@/lib/supabase-helpers';

// Server-only import for nodemailer
let transporter: any = null;

const getTransporter = async () => {
  if (!transporter) {
    try {
      const nodemailer = await import('nodemailer');
      transporter = nodemailer.default.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASSWORD,
        },
      });
    } catch (err) {
      console.error('Error initializing email transporter:', err);
    }
  }
  return transporter;
};

/**
 * Send email notification (disabled for now - use in-app notifications)
 */
async function sendEmailNotification(
  recipientEmail: string,
  branchId: string,
  branchName: string,
  subject: string,
  type: 'suspended' | 'deleted'
) {
  // Email disabled for development - notifications will be in-app only
  console.log(`[EMAIL DISABLED] Would send to ${recipientEmail}: ${subject}`);
  // Production: Enable when domain + SendGrid is setup
  /*
  try {
    const transporter = await getTransporter();
    if (transporter) {
      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: recipientEmail,
        subject: subject,
        html: htmlTemplate,
      });
    }
  } catch (emailError) {
    console.error('Error sending email:', emailError);
  }
  */
}

/**
 * Create notification in database
 */
async function createNotification(
  admin_id: string,
  branch_id: string,
  branch_email: string,
  message: string,
  type: string
) {
  try {
    console.log('Creating notification with:', { admin_id, branch_id, branch_email, message, type });
    
    const result = await insertInto('notifications', [
      {
        admin_id,
        branch_id,
        branch_email,
        message,
        title: type === 'deleted' ? 'Branch Deleted' : 'Branch Suspended',
        type,
        is_read: false,
        created_at: new Date().toISOString(),
      },
    ]);

    const data = (result.data as any);
    
    if (!data) {
      console.error('Error creating notification: no data returned');
      return null;
    }
    
    console.log('✓ Notification saved successfully:', data);
    console.log('✓ Suspend/Delete notification created:', { branch_id, type, branch_email });
    return data;
  } catch (err) {
    console.error('Exception creating notification:', err);
    return null;
  }
}

/**
 * GET /api/branches/[id]
 * Get a specific branch
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const { data, error } = await supabase
      .from('branches')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return NextResponse.json(
        { error: 'Branch not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (err) {
    console.error('Unexpected error in GET /api/branches/[id]:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/branches/[id]
 * Update branch (suspend/activate)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { is_active, name, phone, city, address, working_hours_start, working_hours_end } = body;

    // Get current branch data before update
    const { data: currentBranchData } = await supabase
      .from('branches')
      .select('*')
      .eq('id', id)
      .single();
    
    const currentBranch = (currentBranchData as any);

    const updateData: any = {};
    let statusChanged = false;
    let isSuspending = false;

    if (is_active !== undefined) {
      updateData.is_active = is_active;
      if (currentBranch && currentBranch.is_active !== is_active) {
        statusChanged = true;
        isSuspending = !is_active; // If changing to false, it's a suspension
      }
    }
    if (name !== undefined) {
      updateData.name = name;
    }
    if (phone !== undefined) {
      updateData.phone = phone;
    }
    if (city !== undefined) {
      updateData.city = city;
    }
    if (address !== undefined) {
      updateData.address = address;
    }
    if (working_hours_start !== undefined) {
      updateData.working_hours_start = working_hours_start;
    }
    if (working_hours_end !== undefined) {
      updateData.working_hours_end = working_hours_end;
    }

    const updateResult = await updateBranch(id, updateData);
    
    const data = (updateResult.data as any);
    const error = updateResult.error;

    if (error) {
      console.error('Error updating branch:', error);
      return NextResponse.json(
        { error: 'Failed to update branch', details: error.message },
        { status: 500 }
      );
    }

    console.log('Branch update complete. Checking notification conditions:', { statusChanged, isSuspending, hasCurrentBranch: !!currentBranch });

    // Create notification if branch was suspended
    if (statusChanged && isSuspending && currentBranch) {
      const adminId = 'admin@skm.com';
      const message = `Your branch has been suspended by SKM Services`;
      
      console.log('Creating suspend notification...');
      await createNotification(
        adminId,
        id,
        currentBranch.email,
        message,
        'suspended'
      );

      await sendEmailNotification(
        currentBranch.email,
        id,
        currentBranch.name,
        'Your Branch Has Been Suspended',
        'suspended'
      );
    } else {
      console.log('Skipping notification - conditions not met');
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (err) {
    console.error('Unexpected error in PATCH /api/branches/[id]:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/branches/[id]
 * Delete a branch
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // First, check if branch exists using helper
    const branchResult = await getBranchById(id);
    const { data: branchRaw, error: fetchError } = branchResult;
    const branch = safeBranchData(branchRaw);

    if (fetchError || !branchRaw) {
      return NextResponse.json(
        { error: 'Branch not found' },
        { status: 404 }
      );
    }

    // Delete the branch
    const { error: deleteError } = await supabase
      .from('branches')
      .delete()
      .eq('id', id);

    if (deleteError) {
      console.error('Error deleting branch:', deleteError);
      return NextResponse.json(
        { error: 'Failed to delete branch', details: deleteError.message },
        { status: 500 }
      );
    }

    // Create notification for deleted branch
    const adminId = 'admin@skm.com';
    const message = `Branch ${branch.name} has been deleted`;
    
    await createNotification(
      adminId,
      id,
      branch.email,
      message,
      'deleted'
    );

    // Send email notification
    await sendEmailNotification(
      branch.email,
      id,
      branch.name,
      'Your Branch Has Been Deleted',
      'deleted'
    );

    return NextResponse.json({
      success: true,
      message: 'Branch deleted successfully',
    });
  } catch (err) {
    console.error('Unexpected error in DELETE /api/branches/[id]:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
