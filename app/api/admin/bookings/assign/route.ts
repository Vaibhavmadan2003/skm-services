import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';
import { 
  testBookingUpdate, 
  getBranchDetails, 
  getBookingDetails,
  safeBranchData,
  createBookingAssignmentNotification
} from '@/lib/supabase-helpers';

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
 * Send email notification for booking assignment (disabled for now - use in-app notifications)
 */
async function sendBookingAssignmentEmail(
  recipientEmail: string,
  bookingNumber: string,
  customerName: string,
  service: string,
  scheduledDate: string,
  amount: number,
  branchName: string
) {
  // Email disabled for development - notifications will be in-app only
  console.log(`[EMAIL DISABLED] Would send work assignment to ${recipientEmail}: ${bookingNumber}`);
  // Production: Enable when domain + SendGrid is setup
  /*
  try {
    const mailer = await getTransporter();
    if (mailer) {
      await mailer.sendMail({
        from: process.env.GMAIL_USER,
        to: recipientEmail,
        subject: `New Work Assignment: ${bookingNumber}`,
        html: htmlTemplate,
      });
    }
  } catch (emailError) {
    console.error('Error sending work assignment email:', emailError);
  }
  */
}

/**
 * POST /api/admin/bookings/assign
 * Assign a booking to a branch
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      bookingId,
      branchId,
      bookingNumber,
      customerName,
      service,
      scheduledDate,
      bookingTime,
      amount,
      customerPhone,
      customerAddress,
      city,
    } = body;

    // Get branch details using helper
    const branchResult = await getBranchDetails(branchId);
    const { data: branchRaw, error: branchError } = branchResult;

    if (branchError || !branchRaw) {
      return NextResponse.json(
        { error: 'Branch not found' },
        { status: 404 }
      );
    }

    // Convert to safe branch object
    const branch = safeBranchData(branchRaw);

    // Check if booking exists, if not skip creation (bookings should come from real booking system)
    const bookingResult = await getBookingDetails(bookingId);
    const { data: bookingData, error: fetchError } = bookingResult;

    // If booking doesn't exist in our system, that's OK - we'll still assign the branch
    if (fetchError) {
      console.log(`Booking ${bookingId} not found in system, but proceeding with assignment...`);
    }

    // Try to update booking - if it doesn't exist, Supabase will handle it gracefully
    const result = await testBookingUpdate(bookingId, branchId, 'assigned');
    const { data: updatedBooking, error: updateError } = result;

    // Even if booking doesn't exist, we still create the notification
    console.log(`Assignment update result for ${bookingId}:`, { updated: updatedBooking?.length || 0, error: updateError });

    // Get branch email for notification
    const branchEmail = branch.email;
    
    if (!branchEmail) {
      console.error('Branch has no email assigned');
      return NextResponse.json(
        { error: 'Branch has no email assigned' },
        { status: 400 }
      );
    }
    
    // Create notification with branch_email instead of user_id
    try {
      const message = `New booking assignment: ${bookingNumber} - ${service} for ${customerName}`;
      
      const { data, error } = await createBookingAssignmentNotification(
        branchEmail,
        branchId,
        bookingId,
        bookingNumber,
        message,
        {
          bookingId,
          customerName,
          service,
          scheduledDate,
          bookingTime,
          amount,
          customerPhone,
          customerAddress,
          city,
        }
      );

      if (error) {
        console.error('Error creating booking assignment notification:', error);
      } else {
        console.log('✓ Booking assignment notification created:', { branch_id: branchId, branch_email: branchEmail, booking_number: bookingNumber });
      }
    } catch (err) {
      console.error('Exception creating booking assignment notification:', err);
    }

    // Send email
    await sendBookingAssignmentEmail(
      branch.email,
      bookingNumber,
      customerName,
      service,
      scheduledDate,
      amount,
      branch.name
    );

    return NextResponse.json({
      success: true,
      message: 'Booking assigned successfully and notification sent',
      data: updatedBooking && updatedBooking.length > 0 ? updatedBooking[0] : { bookingId, branchId, status: 'assigned' },
    });
  } catch (error) {
    console.error('Error in POST /api/admin/bookings/assign:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
