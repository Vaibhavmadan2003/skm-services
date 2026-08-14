# Notification System Separation Fix

## Problem
Branch admin notifications are not appearing in their bell icon even though suspended/deleted notifications exist in the database. Additionally, super admin is seeing branch-specific notifications when they should only appear to branch admins.

## Root Causes
1. Super admin endpoint `/api/admin/notifications/list` returns ALL notifications with admin_id='admin@skm.com', including branch-specific types (`suspended`, `deleted`)
2. NotificationCenter displays these branch-specific types in the super admin's bell icon
3. These types should only be returned to and displayed for branch admins

## Requirements

### R1: Separate Notification Types by Role
- Super admin bell icon should ONLY show notifications of type: `setting_change` and `work_assignment`
- Branch admin bell icon should ONLY show notifications of type: `suspended`, `deleted`, and `work_assignment`
- This separation must happen at the database/API level, not just UI filtering

### R2: Super Admin Endpoint Filter
- `/api/admin/notifications/list` must exclude branch-specific notification types (`suspended`, `deleted`)
- Only return notifications with `type IN ('setting_change', 'work_assignment')`
- Must filter by `admin_id = 'admin@skm.com'`

### R3: Branch Admin Endpoint Filter  
- `/api/branch/notifications/list` must return only branch-specific notifications
- Only return notifications where `type IN ('suspended', 'deleted', 'work_assignment')` AND `branch_id = ?`
- Currently this works correctly

### R4: Super Admin UI
- NotificationCenter should only display `setting_change` and `work_assignment` types
- Remove display of `suspended` and `deleted` types from UI
- Clean up unused imports

### R5: Branch Admin UI
- BranchNotificationCenter should display all notification types correctly
- Already implemented correctly

### R6: Verification
- Super admin sees no suspended/deleted notifications in their bell
- Branch admin sees suspended/deleted notifications in their bell after branch suspend
- Notifications appear immediately (within 5 second poll interval)
