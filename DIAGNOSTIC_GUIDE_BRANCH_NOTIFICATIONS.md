# Branch Notification Diagnostic Guide

## Issue
Branch admin not receiving notifications when super admin assigns a booking.

## Root Cause Analysis
The notification creation logic exists, but notifications may not be created or retrieved correctly.

---

## Testing Flow

### Step 1: Trigger a Booking Assignment
1. Log in as super admin
2. Go to bookings management
3. Assign a booking to a specific branch (note the branch name and ID)
4. Check browser console for `[DIAGNOSTIC]` logs

### Step 2: Monitor Server Logs
Watch the server logs for these key diagnostic messages:

```
[DIAGNOSTIC] Branch email retrieval:
  - branchId: <should match>
  - branchEmail: <should exist>
  - branchEmailExists: true (if false = PROBLEM)

[DIAGNOSTIC] Creating notification with:
  - branchEmail: <should match branch.email>
  - branchId: <should match>
  - bookingNumber: <assigned booking>

[DIAGNOSTIC] ✓ Booking assignment notification created successfully:
  - notificationId: <should exist>
  - createdAt: <should have timestamp>
  - fullData: <complete notification object>
```

### Step 3: Check Browser Console
Open DevTools in the branch admin dashboard:

1. Go to Network tab
2. Look for `/api/branch/notifications/list` requests
3. Check response contains:
   ```json
   {
     "success": true,
     "data": [
       {
         "id": "...",
         "branch_id": "...",
         "booking_number": "...",
         "type": "booking_assignment",
         "is_read": false,
         "created_at": "..."
       }
     ],
     "pagination": {...}
   }
   ```

4. In Console tab, look for `[DIAGNOSTIC]` messages:
   ```
   [DIAGNOSTIC] Starting notification load for branch: <branchId>
   [DIAGNOSTIC] Fetching from URL: /api/branch/notifications/list?...
   [DIAGNOSTIC] Response status: 200
   [DIAGNOSTIC] Raw API response:
     - dataLength: <should be > 0>
     - sampleNotification: <notification object>
   ```

### Step 4: Run SQL Diagnostic Query
Execute the query in Supabase SQL editor:

```sql
SELECT 
  id,
  branch_id,
  branch_email,
  type,
  booking_number,
  created_at 
FROM notifications 
WHERE branch_id IS NOT NULL 
   OR branch_email IS NOT NULL
ORDER BY created_at DESC 
LIMIT 50;
```

Look for:
- **Notifications exist**: Good, proceed to Step 5
- **No notifications**: Notifications not being created (check server logs in Step 2)

### Step 5: Verify Branch Configuration
Run this query to verify branch is properly configured:

```sql
SELECT 
  id,
  name,
  email,
  is_active
FROM branches
WHERE id = '<the-branch-id-from-assignment>';
```

Look for:
- **email IS NOT NULL**: Good
- **email IS NULL**: ❌ PROBLEM - Branch has no email assigned
- **is_active = false**: ⚠️ Branch may be inactive

---

## Diagnostic Points

### If Notifications ARE Created (in DB) but NOT Retrieved

**Problem**: Notifications exist in database but don't appear in branch dashboard

**Check**:
1. Is `branch_id` in notification matching the querying branch?
   ```sql
   SELECT branch_id, COUNT(*) FROM notifications 
   WHERE branch_id IS NOT NULL 
   GROUP BY branch_id;
   ```

2. Is the RLS policy blocking retrieval?
   - Current code uses `supabaseAdmin` (service role) which bypasses RLS
   - This should work, but check logs for RLS errors

3. Are notifications filtered correctly?
   - API filters by: `branch_id` + type in `['work_assignment', 'booking_assignment', 'booking_cancelled']`
   - If type is wrong, notification won't appear

**Fix**:
- Verify notification `type` = `'booking_assignment'`
- Verify notification `branch_id` matches the branch querying for it

### If Notifications NOT Created

**Problem**: Notification creation fails silently

**Check logs for**:
1. `[DIAGNOSTIC] Branch email retrieval:` - Does branch have email?
2. `[DIAGNOSTIC] Error creating booking assignment notification:` - What error?
3. `[DIAGNOSTIC] Exception creating booking assignment notification:` - What exception?

**Common Issues**:
- Branch email is NULL → Set email for branch
- `branch_id` doesn't match querying branch → Verify IDs match
- Metadata is invalid JSON → Check metadata serialization

**Fix**:
- Check branch configuration (see Step 5)
- Check branch email is valid email format
- Run diagnostic SQL to see what's in database

### If API Returns Empty Array

**Problem**: API responds with `{ "data": [] }` even though notifications exist

**Check**:
1. Is `branch_id` parameter correct?
   ```
   /api/branch/notifications/list?branch_id=<CORRECT_ID>
   ```

2. Are all notifications marked as read?
   ```sql
   SELECT * FROM notifications 
   WHERE branch_id = '<branch-id>'
   AND is_read = false;
   ```

3. Are notification types matching filter?
   ```sql
   SELECT DISTINCT type FROM notifications 
   WHERE branch_id = '<branch-id>';
   ```

**Fix**:
- Verify correct `branch_id` is sent to API
- Check notification `is_read` status
- Verify notification `type` is in the filter list

---

## Diagnostic Logging Summary

### Three Key Locations for Logs

#### 1. **Server Assignment Route** (`/api/admin/bookings/assign`)
```
✓ [DIAGNOSTIC] Branch email retrieval:
  - branchId
  - branchEmail
  - branchName
  - branchEmailExists

✓ [DIAGNOSTIC] Creating notification with:
  - All parameters being sent to createBookingAssignmentNotification

✓ [DIAGNOSTIC] Booking assignment notification created successfully:
  - notificationId (should exist if successful)
  - createdAt timestamp

✗ [DIAGNOSTIC] Error creating booking assignment notification:
  - errorCode
  - errorMessage
  - errorDetails
```

#### 2. **Notifications List API** (`/api/branch/notifications/list`)
```
✓ [DIAGNOSTIC] Branch notifications list API called:
  - branch_id
  - limit, offset
  - unreadOnly flag

✓ [DIAGNOSTIC] Branch lookup result:
  - found: true/false
  - email: <branch-email>

✓ [DIAGNOSTIC] Notifications query result:
  - dataLength: <count>
  - sampleNotification: <first notification>

✓ [DIAGNOSTIC] Final result:
  - loaded: <count>
  - total: <total-count>
  - hasMore: <pagination>
```

#### 3. **Browser Console** (BranchNotificationCenter)
```
✓ [DIAGNOSTIC] Starting notification load for branch: <id>
✓ [DIAGNOSTIC] Fetching from URL: <full-url>
✓ [DIAGNOSTIC] Response status: 200
✓ [DIAGNOSTIC] Raw API response:
  - dataLength
  - sampleNotification
✓ [DIAGNOSTIC] Processed notifications:
  - types: array of notification types
  - isReadStatus: array of id + is_read
```

---

## Quick Troubleshooting Checklist

- [ ] Super admin assigned booking to branch (not to staff/driver)
- [ ] Check browser console for `[DIAGNOSTIC]` messages
- [ ] Check server logs for `[DIAGNOSTIC]` messages
- [ ] Run SQL: `SELECT * FROM notifications WHERE branch_id IS NOT NULL ORDER BY created_at DESC LIMIT 10;`
- [ ] Verify branch has email: `SELECT email FROM branches WHERE id = '<branch-id>';`
- [ ] Check notification has correct branch_id: `SELECT branch_id, branch_email FROM notifications WHERE booking_number = '<booking-number>';`
- [ ] Check notification is not marked as read: `SELECT is_read FROM notifications WHERE booking_number = '<booking-number>';`
- [ ] Check notification type: `SELECT type FROM notifications WHERE booking_number = '<booking-number>';` (should be `booking_assignment`)
- [ ] Refresh branch dashboard and check for notification

---

## Expected Behavior

### Success Flow:
1. Super admin clicks "Assign" on booking
2. Assignment route logs:
   - `[DIAGNOSTIC] Branch email retrieval: branchEmailExists: true`
   - `[DIAGNOSTIC] Creating notification with: branchEmail: ...`
   - `[DIAGNOSTIC] ✓ Booking assignment notification created successfully`
3. Database now has new notification
4. Branch admin sees notification badge in dashboard
5. API logs: `[DIAGNOSTIC] Loaded 1 notification`
6. Browser console logs: `[DIAGNOSTIC] Processed notifications: 1`

### Failure Points:
- **Point 1**: No `[DIAGNOSTIC]` logs in assignment route → Assignment route not called
- **Point 2**: `branchEmailExists: false` → Branch has no email
- **Point 3**: `Error creating booking assignment notification` → Database write failed
- **Point 4**: Notification doesn't appear in DB → Middleware/RLS issue
- **Point 5**: API returns empty → Query filter issue
- **Point 6**: Browser console empty → Frontend not loading notifications

---

## Additional Commands

### View all branch notifications created in last hour:
```sql
SELECT 
  id, branch_id, branch_email, type, booking_number, is_read, created_at
FROM notifications
WHERE branch_id IS NOT NULL 
  AND created_at > NOW() - INTERVAL '1 hour'
ORDER BY created_at DESC;
```

### Mark all notifications as read for debugging:
```sql
UPDATE notifications
SET is_read = true
WHERE branch_id = '<branch-id>'
  AND type = 'booking_assignment';
```

### Delete test notifications:
```sql
DELETE FROM notifications
WHERE branch_id = '<branch-id>'
  AND booking_number = '<test-booking-number>';
```
