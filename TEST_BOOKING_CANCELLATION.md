# Test Checklist: Booking Cancellation Notifications

## Pre-Test

- [ ] Backend is running
- [ ] Refresh the admin dashboard page
- [ ] Open browser DevTools (F12)
- [ ] Go to Console tab

## Test Steps

### Step 1: Find a Booking to Cancel
- [ ] Navigate to Bookings section
- [ ] Find a booking with status: **pending**, **assigned**, or **accepted**
- [ ] Note the booking number (e.g., BK001)

### Step 2: Cancel the Booking
- [ ] Click the "..." menu button on the booking row
- [ ] Click "Cancel Booking"
- [ ] Confirm in the dialog

### Step 3: Check Console Logs (Most Important!)

Look for these log patterns:

**✅ If Success:**
```
[BookingsTable] Sending cancel request: { bookingId: "...", bookingNumber: "BK001", branchId: "..." }
[BookingsTable] Cancel response: { status: 200, data: { success: true, ... } }
[BookingsTable] ✅ Booking cancelled successfully
```

**Then after 1-5 seconds:**
```
[NotificationCenter] Fetching notifications...
[NotificationCenter] ✅ Notifications loaded: { total: 1, data: [{...}] }
[NotificationCenter] Notifications by type: { booking_cancelled: 1 }
[NotificationCenter] State updated - unreadCount: 1
```

**❌ If Error - Look For:**
```
[CANCEL] ❌ Step X FAILED - ...
```

### Step 4: Check Notification Bell

- [ ] Look at the top-right notification bell icon
- [ ] Should show a red badge with count "1"
- [ ] Click the bell icon

### Step 5: Verify Notification Display

In the dropdown, you should see:

- [ ] Section header: "BOOKING CANCELLATIONS" (uppercase)
- [ ] Red background color (light pink/red)
- [ ] Notification showing:
  - [ ] Title: "Booking Cancelled"
  - [ ] Booking number: "BK001" (or your booking number)
  - [ ] Message: "Your booking BK001 has been cancelled. We apologize for any inconvenience..."
  - [ ] Timestamp (e.g., "8/12/2026, 2:30:45 PM")
  - [ ] "Mark as read" button (in red text)

### Step 6: Test Mark as Read

- [ ] Click "Mark as read" button
- [ ] Notification background should change from red to white
- [ ] Button should disappear
- [ ] Bell badge should disappear or decrement

### Step 7: Test Multiple Cancellations

- [ ] Cancel another booking
- [ ] Verify:
  - [ ] New notification appears in the list
  - [ ] Bell badge shows "2"
  - [ ] Both notifications visible in dropdown
  - [ ] Both in "Booking Cancellations" section

## Expected Behavior Summary

| Action | Expected Result |
|--------|-----------------|
| Cancel booking | Message appears: "Booking cancelled successfully" |
| Check console | `[CANCEL] ✅ Step 3 SUCCESS` appears |
| Wait 5 seconds | Bell shows red badge |
| Click bell | Red notification visible |
| Click "Mark as read" | Notification turns white/disappears from unread |
| Close and reopen bell | Only unread notifications show red badge |

## Troubleshooting

### Problem: No logs appear
- [ ] Check if cancel request was sent (look for `[BookingsTable] Sending cancel request`)
- [ ] Check browser network tab for `/api/admin/bookings/cancel` request
- [ ] Check if response status is 200 or error

### Problem: Cancel succeeds but notification doesn't appear
- [ ] Look for `[NotificationCenter] ✅ Notifications loaded: { total: 0 }`
- [ ] This means notification wasn't in database
- [ ] Check server logs for `[CANCEL]` messages with errors
- [ ] Verify `admin_id: 'admin@skm.com'` is being set

### Problem: Notification appears in database but not in UI
- [ ] Check `[NotificationCenter] Notifications by type:` 
- [ ] If `booking_cancelled: 0`, the API is filtering it out
- [ ] Verify notifications list API includes `'booking_cancelled'` in type filter

### Problem: Notification appears but in wrong section
- [ ] Verify notification `type` is exactly `'booking_cancelled'` (case-sensitive)
- [ ] Check NotificationCenter filtering logic

## Success Criteria

✅ **All of these must pass:**
- [ ] Booking status changes to "cancelled" in database
- [ ] Cancel API logs show all 3 steps completed with ✅
- [ ] Notification created with `admin_id: 'admin@skm.com'` and `type: 'booking_cancelled'`
- [ ] Bell shows red badge with count
- [ ] Notification visible in "Booking Cancellations" section
- [ ] Notification displays booking number, title, message, and timestamp
- [ ] "Mark as read" button works and removes red highlight
- [ ] Multiple cancellations create multiple notifications

## Test Data

Use any booking from your test data, preferably one that:
- Has a branch assigned (not "Unassigned")
- Has status: pending, assigned, or accepted (not already cancelled/completed)
- Is recent enough to remember which one you cancelled

## Rollback / Reset

If you need to undo test cancellations:

```sql
-- Reset booking status from cancelled back to assigned/accepted
UPDATE bookings 
SET status = 'assigned' 
WHERE id = '...' AND status = 'cancelled';

-- Delete test notifications
DELETE FROM notifications 
WHERE type = 'booking_cancelled' AND admin_id = 'admin@skm.com';
```
