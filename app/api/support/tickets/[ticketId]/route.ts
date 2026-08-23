import { NextRequest, NextResponse } from 'next/server';
import { supabase, supabaseAdmin } from '@/lib/supabase';

/**
 * GET /api/support/tickets/[ticketId]
 * Fetch a single support ticket
 * 
 * Auth: Ticket owner or super admin only
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ ticketId: string }> }
) {
  try {
    const { ticketId } = await params;

    console.log('[API /support/tickets/[ticketId] GET] Request:', { ticketId });

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch ticket
    const { data: ticket, error: queryError } = await supabaseAdmin
      .from('support_tickets')
      .select('*')
      .eq('id', ticketId)
      .single();

    if (queryError || !ticket) {
      console.error('[API /support/tickets/[ticketId] GET] Ticket not found:', queryError);
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
    }

    // Check if user is super admin
    const { data: userData } = await supabaseAdmin
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    const isSuperAdmin = (userData as any)?.role === 'super_admin';

    // Authorization: ticket owner or super admin
    const ticketData = ticket as any;
    if (ticketData.user_id !== user.id && !isSuperAdmin) {
      console.log('[API /support/tickets/[ticketId] GET] Forbidden:', {
        ticketUserId: ticketData.user_id,
        userId: user.id,
      });
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    console.log('[API /support/tickets/[ticketId] GET] Ticket fetched:', {
      id: ticketData.id,
      ticket_number: ticketData.ticket_number,
      user_id: ticketData.user_id,
    });

    return NextResponse.json(ticketData);
  } catch (error) {
    console.error('[API /support/tickets/[ticketId] GET] Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// TODO: Fix TypeScript error with Record<string, any> type in update call
// export async function PATCH(
//   request: NextRequest,
//   { params }: { params: Promise<{ ticketId: string }> }
// ) {
//   try {
//     const { ticketId } = await params;
//     const { status, admin_notes } = await request.json();

//     console.log('[API /support/tickets/[ticketId] PATCH] Request:', {
//       ticketId,
//       status,
//       hasNotes: !!admin_notes,
//     });

//     // Get authenticated user
//     const { data: { user }, error: authError } = await supabase.auth.getUser();
//     if (authError || !user) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     // Check if user is super admin
//     const { data: userData, error: userError } = await supabaseAdmin
//       .from('users')
//       .select('role')
//       .eq('id', user.id)
//       .single();

//     if (userError || (userData as any)?.role !== 'super_admin') {
//       console.log('[API /support/tickets/[ticketId] PATCH] Forbidden - not super admin');
//       return NextResponse.json({ error: 'Forbidden - super admin only' }, { status: 403 });
//     }

//     // Validate status
//     if (!status || !['open', 'in_progress', 'resolved', 'closed'].includes(status)) {
//       return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
//     }

//     // Fetch ticket to verify it exists
//     const { data: ticket, error: fetchError } = await supabaseAdmin
//       .from('support_tickets')
//       .select('*')
//       .eq('id', ticketId)
//       .single();

//     if (fetchError || !ticket) {
//       console.error('[API /support/tickets/[ticketId] PATCH] Ticket not found:', fetchError);
//       return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
//     }

//     // Update ticket
//     const updateData: Record<string, any> = {
//       status,
//       updated_at: new Date().toISOString(),
//     };

//     if (admin_notes !== undefined) {
//       updateData.admin_notes = admin_notes;
//     }

//     const { data: updatedTicket, error: updateError } = await (supabaseAdmin
//       .from('support_tickets')
//       .update(updateData)
//       .eq('id', ticketId)
//       .select('*')
//       .single() as any);

//     if (updateError) {
//       console.error('[API /support/tickets/[ticketId] PATCH] Update error:', updateError);
//       return NextResponse.json({ error: 'Failed to update ticket' }, { status: 500 });
//     }

//     console.log('[API /support/tickets/[ticketId] PATCH] Ticket updated:', {
//       id: updatedTicket.id,
//       status: updatedTicket.status,
//       updated_at: updatedTicket.updated_at,
//     });

//     return NextResponse.json({
//       success: true,
//       ticket: updatedTicket,
//       message: 'Ticket updated successfully',
//     });
//   } catch (error) {
//     console.error('[API /support/tickets/[ticketId] PATCH] Error:', error);
//     return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
//   }
// }
