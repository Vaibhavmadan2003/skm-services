# Booking Cancellation Notification Debug Guide

## What Was Added

Comprehensive logging has been added to track the entire notification workflow.

## Step-by-Step Logging

### 1. Cancel Button Click (Frontend - BookingsTable.tsx)
```
[BookingsTable] Sending cancel request: { bookingId, bookingNumber, branchId }
```
- User clicks Cancel Booking button
- Confirmation dialog appears
- If confirmed, sends POST to `/api/admin/bookings/cancel`

### 2. Cancel API (Backend - app/api/admin/bookings/cancel/route.ts)

#### Step 1: Update Booking Status
```
=== CANCEL BOOKING START ===
[CANCEL] Input: { bookingId, bookingNumber, branchId, reason }
[CANCEL] Step 1: Updating booking status...
[CANCEL] ✅ Step 1 SUCCESS - Booking updated: { bookingId, status }
```
**If error:**
```
[CANCEL] ❌ Step 1 FAILED - Error updating booking: { error, code, hint }
```

#### Step 2: Find Branch Admin
```
[CANCEL] Step 2: Finding branch admin for branch_id: <ID>
[CANCEL] Step 2 Query result: { found: <count>, error: null, users: [...] }
[CANCEL] ✅ Step 2 SUCCESS - Found branch admin: { branchAdminId, branchAdminEmail }
```
**If no admin found:**
```
[CANCEL] ⚠️ Step 2 WARNING - No branch admin found for branchId: <ID>
[CANCEL] This means notification will NOT be sent
```
**If error:**
```
[CANCEL] ❌ Step 2 FAILED - Error querying branch admin: { error, code, hint }
```

#### Step 3: Create Notification
```
[CANCEL] Step 3: Creating notification...
[CANCEL] Notification payload: { user_id, type, title, message, ... }
[CANCEL] ✅ Step 3 SUCCESS - Notification created: { notificationId, userId, type }
```
**If error:**
```
[CANCEL] ❌ Step 3 FAILED - Error creating notification: { error, code, hint }
```

#### Final Response
```
=== CANCEL BOOKING COMPLETE ===
[BookingsTable] Cancel response: { status: 200, data: { success, message, booking, notification } }
[BookingsTable] ✅ Booking cancelled successfully
```

### 3. Notification Display (Frontend - NotificationCenter.tsx)

#### Loading Notifications
```
[NotificationCenter] Fetching notifications...
[NotificationCenter] ✅ Notifications loaded: { total: <count>, data: [...] }
[NotificationCenter] Notifications by type: { booking_cancelled: <count>, work_assignment: <count>, ... }
[NotificationCenter] State updated - unreadCount: <count>
```
**If error:**
```
[NotificationCenter] ❌ Failed to load notifications: <status> <statusText>
[NotificationCenter] ❌ Error loading notifications: <error>
```

#### Marking as Read
```
[NotificationCenter] Marking as read: <notificationId>
[NotificationCenter] ✅ Marked as read: <notificationId>
```
**If error:**
```
[NotificationCenter] ❌ Failed to mark as read: <status>
```

## How to Debug

### 1. Check the Entire Flow

Open **Browser DevTools** → **Console** tab and look for these patterns:

1. **Frontend Cancel Request:**
   ```
   [BookingsTable] Sending cancel request:
   ```

2. **Server Cancel Processing:**
   ```
   === CANCEL BOOKING START ===
   [CANCEL] Step 1...
   [CANCEL] Step 2...
   [CANCEL] Step 3...
   === CANCEL BOOKING COMPLETE ===
   ```

3. **Frontend Response:**
   ```
   [BookingsTable] Cancel response:
   [BookingsTable] ✅ Booking cancelled successfully
   ```

4. **Notification Load:**
   ```
   [NotificationCenter] Fetching notifications...
   [NotificationCenter] ✅ Notifications loaded: { total: X }
   [NotificationCenter] Notifications by type: { booking_cancelled: X }
   ```

### 2. Common Issues to Look For

#### Issue: "No branch admin found"
```
[CANCEL] ⚠️ Step 2 WARNING - No branch admin found for branchId: <ID>
```
**Fix**: Check that:
- Branch ID exists in the booking
- There is a user with `role='branch_admin'` and `branch_id=<ID>`
- Run: `SELECT * FROM users WHERE branch_id='<ID>' AND role='branch_admin'`

#### Issue: "Notification creation failed"
```
[CANCEL] ❌ Step 3 FAILED - Error creating notification
```
**Check error details:**
- Code: Look for constraint violations
- Hint: Check if user_id is valid
- Check notifications table structure

#### Issue: "Notifications not showing in UI"
```
[NotificationCenter] ✅ Notifications loaded: { total: 0 }
```
**Possible causes:**
- Notification not being created (check Step 3 logs)
- API endpoint `/api/admin/notifications/list` is filtering them out
- User receiving notification is wrong
- NotificationCenter polling not running

#### Issue: "booking_cancelled type not rendering"
The NotificationCenter now has a section for `type='booking_cancelled'`. Look for:
```
[NotificationCenter] Notifications by type: { booking_cancelled: 1 }
```
If count > 0 but not showing in UI, the rendering logic may be blocked.

### 3. Server Logs to Check

Look in your server logs for patterns:
```
[CANCEL] ❌
[CANCEL] ⚠️
[CANCEL] ✅
```

### 4. Manual Testing

1. **Step 1**: Cancel a booking
2. **Check Frontend Console**: Look for `[BookingsTable]` logs
3. **Check Server Output**: Look for `[CANCEL]` logs
4. **Wait 5 seconds**: NotificationCenter polls every 5 seconds
5. **Check Console Again**: Look for `[NotificationCenter]` logs
6. **Check Notification Bell**: Should show badge and red notification

## Expected Log Sequence

```
// Frontend sends request
[BookingsTable] Sending cancel request: { bookingId: "abc123", bookingNumber: "BK001", branchId: "br001" }

// Server processes
=== CANCEL BOOKING START ===
[CANCEL] Input: { bookingId: "abc123", bookingNumber: "BK001", branchId: "br001", reason: "..." }
[CANCEL] Step 1: Updating booking status...
[CANCEL] ✅ Step 1 SUCCESS - Booking updated: { bookingId: "abc123", status: "cancelled" }
[CANCEL] Step 2: Finding branch admin for branch_id: br001
[CANCEL] Step 2 Query result: { found: 1, error: null, users: [...] }
[CANCEL] ✅ Step 2 SUCCESS - Found branch admin: { branchAdminId: "user123", branchAdminEmail: "admin@example.com" }
[CANCEL] Step 3: Creating notification...
[CANCEL] ✅ Step 3 SUCCESS - Notification created: { notificationId: "notif123", userId: "user123", type: "booking_cancelled" }
=== CANCEL BOOKING COMPLETE ===

// Frontend receives response
[BookingsTable] Cancel response: { status: 200, data: { success: true, message: "...", notification: {...} } }
[BookingsTable] ✅ Booking cancelled successfully

// Frontend polls and loads notification (after 5 seconds)
[NotificationCenter] Fetching notifications...
[NotificationCenter] ✅ Notifications loaded: { total: 1, data: [{...}] }
[NotificationCenter] Notifications by type: { booking_cancelled: 1 }
[NotificationCenter] State updated - unreadCount: 1
```

## Files Modified

1. **Backend API**: `app/api/admin/bookings/cancel/route.ts`
   - Added comprehensive logging at each step
   - Error details include code and hint

2. **Frontend Component**: `app/admin/components/BookingsTable.tsx`
   - Added logging when sending cancel request
   - Added logging for response handling

3. **Notification Component**: `app/admin/components/NotificationCenter.tsx`
   - Added logging when fetching notifications
   - Added notification count by type
   - Added logging when marking as read
   - **NEW**: Added rendering support for `booking_cancelled` type

## Next Steps if Still Not Working

1. Check all logs above - they should tell you exactly where it fails
2. Search for errors with `❌` prefix - those are critical
3. If Step 2 fails, verify branch admin exists
4. If Step 3 fails, check notifications table constraints
5. If NotificationCenter doesn't show, verify API returns the notification
