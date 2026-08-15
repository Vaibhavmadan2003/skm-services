# Branch Notification Diagnostics - Implementation Summary

## Overview
Added comprehensive diagnostic logging and verification system to track branch admin notification flow from booking assignment to dashboard display.

## Changes Made

### 1. Server-Side: Assignment Route
**File**: `/app/api/admin/bookings/assign/route.ts`

**What Changed**: Enhanced logging in the notification creation section (lines 117-198)

**Logging Added**:
- Branch email retrieval verification
  - Logs: `branchId`, `branchEmail`, `branchName`, `branchEmailExists`
  - Catches: Missing email (email is NULL)

- Notification creation attempt
  - Logs: All parameters being sent to creation function
  - Logs: Metadata structure and size

- Success confirmation
  - Logs: Notification ID, timestamp, full data object
  - Catches: Partial/successful creation

- Error details
  - Logs: Error code, message, and details
  - Catches: Database constraints, validation errors

**Key Logs**:
```
[DIAGNOSTIC] Branch email retrieval: { branchId, branchEmail, branchEmailType, branchEmailExists }
[DIAGNOSTIC] Creating notification with: { branchEmail, branchId, bookingId, ... }
[DIAGNOSTIC] ✓ Booking assignment notification created successfully: { notificationId, createdAt, ... }
[DIAGNOSTIC] Error creating booking assignment notification: { error, errorCode, errorMessage, ... }
[DIAGNOSTIC] Exception creating booking assignment notification: { error, errorMessage, errorStack, ... }
```

---

### 2. API: Notifications List Endpoint
**File**: `/app/api/branch/notifications/list/route.ts`

**What Changed**: Enhanced logging throughout the entire retrieval flow (lines 1-140)

**Logging Added**:
- Initial API call logging
  - Logs: Request parameters (`branch_id`, `limit`, `offset`, `unreadOnly`)

- Branch lookup verification
  - Logs: Whether branch exists, email status
  - Catches: Non-existent branches, branches without email

- Query filter details
  - Logs: Filter types and configuration
  - Catches: Incorrect filters

- Query result verification
  - Logs: Notification count, sample notification data
  - Catches: Query errors, type mismatches

- Final result summary
  - Logs: Total loaded, total in DB, pagination info
  - Catches: Unexpected result counts

**Key Logs**:
```
[DIAGNOSTIC] Branch notifications list API called: { branchId, limit, offset, unreadOnly }
[DIAGNOSTIC] Branch lookup result: { found, error, email }
[DIAGNOSTIC] Notifications query filters: { branchId, filterTypes }
[DIAGNOSTIC] Notifications query result: { dataLength, error, sampleNotification }
[DIAGNOSTIC] Final result: { loaded, total, hasMore }
[DIAGNOSTIC] Branch notifications list error: { error, errorMessage, errorStack }
```

---

### 3. Frontend: Notification Center Component
**File**: `/app/admin/components/BranchNotificationCenter.tsx`

**What Changed**: Enhanced logging in the `loadNotifications()` function (lines 42-76)

**Logging Added**:
- Load initiation
  - Logs: Branch ID being loaded
  - Catches: Missing branch ID

- API request details
  - Logs: Full URL being fetched
  - Catches: Malformed URLs

- Response verification
  - Logs: HTTP status code
  - Catches: Non-200 responses

- Response parsing
  - Logs: Raw response structure
  - Logs: Count of notifications
  - Logs: Sample notification data
  - Catches: Unexpected response format

- Notification processing
  - Logs: Types of notifications received
  - Logs: Read/unread status of each notification
  - Catches: Invalid notification objects

- State update verification
  - Logs: Total and unread counts after processing
  - Catches: State inconsistencies

**Key Logs**:
```
[DIAGNOSTIC] Starting notification load for branch: ${branchId}
[DIAGNOSTIC] Fetching from URL: ${url}
[DIAGNOSTIC] Response status: ${response.status}
[DIAGNOSTIC] Raw API response: { success, dataLength, pagination, sampleNotification, fullDataKeys }
[DIAGNOSTIC] Processed notifications: ${count} [{ types, isReadStatus }]
[DIAGNOSTIC] Notifications state updated: { total, unread }
[DIAGNOSTIC] Failed to load notifications: { status, statusText, errorText }
[DIAGNOSTIC] Error loading branch notifications: { error, errorMessage, errorStack }
```

---

## New Diagnostic Resources

### 1. SQL Diagnostic Query File
**File**: `DIAGNOSE_BRANCH_NOTIFICATIONS.sql`

**Contains**:
- 8 pre-written SQL queries for comprehensive database investigation
- Queries for:
  1. All branch notifications (last 50)
  2. Notification count by branch
  3. Notification count by type
  4. Notifications with missing branch_id
  5. Branch-to-email mapping verification
  6. Cross-check for invalid branch emails
  7. Latest booking assignments per branch
  8. Duplicate notification detection

**Usage**: Copy-paste individual queries into Supabase SQL editor

---

### 2. Comprehensive Diagnostic Guide
**File**: `DIAGNOSTIC_GUIDE_BRANCH_NOTIFICATIONS.md`

**Contains**:
- Full 5-step testing flow with expected behaviors
- 3 diagnostic point sections for different failure scenarios
- Common issues and fixes
- Logging summary with all three locations
- Quick troubleshooting checklist
- Expected behavior description
- Additional diagnostic commands

**Usage**: Full reference for understanding the entire flow

---

### 3. Quick Reference Card
**File**: `DIAGNOSTIC_QUICK_REFERENCE.md`

**Contains**:
- Investigation checklist (pre-flight through post-delivery)
- Investigation checklist for 3 key points
- Table of checks and commands
- 3 common scenarios with decision trees
- Log reading guide for each component
- Copy-paste SQL queries
- Decision tree flowchart
- Emergency actions
- Support file locations

**Usage**: Fast lookup during troubleshooting

---

## Testing & Verification Flow

### When Issue Reported: "Branch admin not receiving notifications"

1. **Super admin assigns booking to branch**
   - Note: Branch ID and booking number

2. **Check Server Logs**
   - Look for: `[DIAGNOSTIC] Branch email retrieval: branchEmailExists: true`
   - If missing: Route not called or branch has no email
   - If false: Update branch email in database

3. **Check Browser Console**
   - Open DevTools in branch admin dashboard
   - Look for: `[DIAGNOSTIC] Starting notification load`
   - Look for: `[DIAGNOSTIC] Response status: 200`
   - Look for: `[DIAGNOSTIC] Raw API response: dataLength: X`

4. **Check Network Tab**
   - Look for: `/api/branch/notifications/list` request
   - Check response: Should contain notification in `data` array

5. **Run SQL Query**
   ```sql
   SELECT * FROM notifications 
   WHERE booking_number = '<booking-number>'
   LIMIT 1;
   ```
   - If no results: Notification not created (see Point 1)
   - If results exist: Check branch_id and type match

6. **Verify Branch Configuration**
   ```sql
   SELECT id, name, email FROM branches WHERE id = '<branch-id>';
   ```
   - If email is NULL: Update branch email

---

## Log Locations & How to Access

### Server Logs
- **Production**: Logs visible in terminal/console where Next.js server runs
- **Supabase**: Check Supabase dashboard or server logs if deployed
- **Filter for**: `[DIAGNOSTIC]` prefix

### Browser Logs
- **Access**: Open DevTools → Console tab
- **Filter for**: `[DIAGNOSTIC]` prefix
- **Each page load**: Logs show recent notification loads

### Database
- **Access**: Supabase SQL Editor
- **Query**: See `DIAGNOSE_BRANCH_NOTIFICATIONS.sql` file
- **Look for**: Notifications with matching branch_id

---

## Diagnostic Information Captured

### Per Booking Assignment:
- ✓ Branch ID being assigned
- ✓ Branch email being used
- ✓ Branch email validity
- ✓ Notification object created
- ✓ Notification ID in database
- ✓ Timestamp of creation
- ✓ All metadata stored
- ✓ Any errors during creation

### Per API Call:
- ✓ Branch ID being queried
- ✓ Branch existence verification
- ✓ Branch email validation
- ✓ Query filters applied
- ✓ Notification count returned
- ✓ Sample notification structure
- ✓ Query errors if any
- ✓ Pagination metadata

### Per Dashboard Load:
- ✓ Branch ID of dashboard user
- ✓ API URL being called
- ✓ HTTP response status
- ✓ Response data structure
- ✓ Number of notifications returned
- ✓ Notification types received
- ✓ Read/unread status per notification
- ✓ State update results

---

## Quick Enable/Disable

### To Disable Diagnostic Logging:
Search files for `[DIAGNOSTIC]` and comment out those lines. All logging uses `console.log()` with the `[DIAGNOSTIC]` prefix for easy filtering.

### To Filter Server Logs:
```bash
# Show only diagnostic logs
grep "\[DIAGNOSTIC\]" server.log

# Show errors
grep "\[DIAGNOSTIC\]" server.log | grep -i error
```

### To Filter Browser Logs:
1. Open DevTools
2. Console tab → Filter input
3. Type: `DIAGNOSTIC`
4. Shows only diagnostic messages

---

## Next Steps After Diagnostics

### If Notifications Are Created But Not Retrieved:
1. Check `notification.type` matches filter in API
2. Check `notification.branch_id` matches querying branch
3. Check `is_read` status in database

### If Notifications Created But Dashboard Empty:
1. Check API returns 200 status
2. Check browser receives data in response
3. Check frontend state updates in React

### If Branch Email Missing:
```sql
UPDATE branches 
SET email = 'admin@branch.example.com' 
WHERE id = '<branch-id>' AND email IS NULL;
```

### If Notifications Not Created:
1. Check branch exists and has email
2. Check server logs for creation errors
3. Verify `branchEmail` is not NULL

---

## Files Modified
- ✓ `/app/api/admin/bookings/assign/route.ts` - Added assignment logging
- ✓ `/app/api/branch/notifications/list/route.ts` - Added API logging
- ✓ `/app/admin/components/BranchNotificationCenter.tsx` - Added frontend logging

## Files Created
- ✓ `DIAGNOSE_BRANCH_NOTIFICATIONS.sql` - SQL diagnostic queries
- ✓ `DIAGNOSTIC_GUIDE_BRANCH_NOTIFICATIONS.md` - Full diagnostic guide
- ✓ `DIAGNOSTIC_QUICK_REFERENCE.md` - Quick reference card
- ✓ `DIAGNOSTIC_IMPLEMENTATION_SUMMARY.md` - This file

---

## Success Criteria
After implementing these diagnostics, you can:
- ✓ See exactly when notifications are created
- ✓ See exact branch email and ID being used
- ✓ See if API retrieval is working
- ✓ See if frontend is receiving data
- ✓ Query database to verify data exists
- ✓ Identify specific point of failure if issue occurs
- ✓ Make informed decisions about fixes based on logs

---

**Status**: ✅ Implementation Complete
**Logging Level**: DIAGNOSTIC (Comprehensive)
**Ready for**: Real-world troubleshooting
