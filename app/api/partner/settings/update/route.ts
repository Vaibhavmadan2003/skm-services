import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { selectFrom, insertInto, updateBranch } from '@/lib/supabase-helpers';

/**
 * PATCH /api/partner/settings/update
 * Update partner branch settings and create notifications for changed fields
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { branchId, ...updateData } = body;

    if (!branchId) {
      return NextResponse.json(
        { error: 'Branch ID is required' },
        { status: 400 }
      );
    }

    // Get current branch data using helper
    const branchResult = await selectFrom('branches', 'id, name, manager_name, working_hours_start, working_hours_end, city');
    const allBranches = (branchResult.data as any) || [];
    const currentBranch = allBranches.find((b: any) => b.id === branchId);

    if (!currentBranch) {
      console.error('Error: current branch not found');
      return NextResponse.json(
        { error: 'Failed to fetch current settings' },
        { status: 500 }
      );
    }

    // Update branch information using helper
    const result = await updateBranch(branchId, updateData);
    const { data, error } = result;

    if (error) {
      console.error('Error updating branch settings:', error);
      return NextResponse.json(
        { error: 'Failed to update settings', details: error.message },
        { status: 500 }
      );
    }

    const updatedData = (data as any)?.[0];
    if (!updatedData) {
      return NextResponse.json(
        { error: 'Failed to retrieve updated data' },
        { status: 500 }
      );
    }

    // Generate notifications for changed fields
    const fieldNames: Record<string, string> = {
      name: 'branch name',
      manager_name: 'manager name',
      city: 'city',
      working_hours_start: 'working hours',
      working_hours_end: 'working hours'
    };

    const notificationsToCreate: Array<any> = [];

    // Check for changes in monitored fields
    for (const [field, fieldLabel] of Object.entries(fieldNames)) {
      if (field in updateData && currentBranch[field as keyof typeof currentBranch] !== updateData[field]) {
        const oldValue = currentBranch[field as keyof typeof currentBranch] || '(not set)';
        const newValue = updateData[field];
        
        console.log(`Field changed: ${field} from ${oldValue} to ${newValue}`);
        
        const message = `Branch ${updatedData.name} changed ${fieldLabel} from ${oldValue} to ${newValue}`;
        
        notificationsToCreate.push({
          admin_id: 'admin@skm.com',
          branch_id: branchId,
          message,
          type: 'setting_change'
        });
      }
    }

    console.log(`Total notifications to create: ${notificationsToCreate.length}`);

    // Create notifications if there are changes
    if (notificationsToCreate.length > 0) {
      try {
        await insertInto('notifications', notificationsToCreate.map(notif => ({
          admin_id: notif.admin_id,
          message: notif.message,
          title: notif.message.split(' ')[0] + ' ' + notif.message.split(' ')[1],
        })));

        console.log(`✅ Created ${notificationsToCreate.length} notification(s) for branch settings change`);
      } catch (err) {
        console.error('Exception creating notifications:', err);
      }
    }

    console.log(`✅ Branch settings updated: ${branchId}`);

    return NextResponse.json({
      success: true,
      message: 'Settings updated successfully',
      data: updatedData
    });
  } catch (error) {
    console.error('Settings update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
