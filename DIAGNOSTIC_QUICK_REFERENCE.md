# Branch Notification Diagnostic - Quick Reference Card

## The Three Investigation Points

### 🔴 RED FLAG: "I assigned a booking but branch admin saw nothing"

**What to check:**

| Step | Check | Command | Expected Result |
|------|-------|---------|-----------------|
| 1 | Server logs | Look for `[DIAGNOSTIC]` messages | Should see creation logs |
| 2 | Browser console | Look for `[DIAGNOSTIC]` messages | Should see API response |
| 3 | Database | Run SQL query | Notification should exist |
| 4 | Branch config | Run SQL query | Branch should have email |

---

## Investigation Checklist

### ✅ Pre-flight Checks
- [ ] Used super admin account to assign booking
- [ ] Assigned to a **branch** (not staff/driver)
- [ ] Branch has an email address set
- [ ] Branch is marked as active

### ✅ Point 1: Server-Side Creation
**File**: `/app/api/admin/bookings/assign/route.ts`

**In server logs, look for**:
```
[DIAGNOSTIC] Branch email retrieval:
  branchEmailExists: true ← THIS MUST BE TRUE
```

**If false** → Branch has no email. Fix:
```sql
UPDATE branches SET email = 'admin@branch.com' WHERE id = '<branch-id>';
```

**Then look for**:
```
[DIAGNOSTIC] ✓ Booking assignment notification created successfully:
  notificationId: "abc123" ← NOTIFICATION WAS CREATED
```

**If error instead** → Notification creation failed. Check error details.

### ✅ Point 2: API Retrieval
**File**: `/app/api/branch/notifications/list/route.ts`

**In server logs, look for**:
```
[DIAGNOSTIC] Branch notifications list API called:
  branch_id: "xyz456"
  
[DIAGNOSTIC] Notifications query result:
  dataLength: 1 ← COUNT OF NOTIFICATIONS RETURNED
```

**If dataLength = 0** → Query returned nothing. Either:
- Notifications weren't created (see Point 1)
- Branch ID doesn't match
- Notification type is wrong

### ✅ Point 3: Database Check
**Run these SQL queries**:

```sql
-- Check if notifications exist
SELECT COUNT(*) FROM notifications 
WHERE branch_id IS NOT NULL 
ORDER BY created_at DESC;

-- Check specific branch
SELECT * FROM notifications 
WHERE branch_id = '<branch-id>'
ORDER BY created_at DESC
LIMIT 5;

-- Check notification details
SELECT 
  id, 
  branch_id, 
  booking_number, 
  type, 
  is_read, 
  created_at
FROM notifications 
WHERE booking_number = '<booking-number>';
```

**Expected output**:
- Notification exists ✓
- `branch_id` is not NULL ✓
- `type` = `'booking_assignment'` ✓
- `is_read` = `false` ✓

---

## Common Scenarios

### Scenario 1: "Notifications don't appear in dashboard"

```
Step 1: Check server logs for [DIAGNOSTIC]
  ↓
  See "Booking assignment notification created successfully"?
    ✓ YES → Go to Step 2
    ✗ NO → Check error details, see Point 1 above
    
Step 2: Check browser console for [DIAGNOSTIC]
  ↓
  See "Response status: 200" and notifications in data?
    ✓ YES → Go to Step 3
    ✗ NO → API returned empty, check Point 2 above
    
Step 3: Check database
  ↓
  Notifications exist?
    ✓ YES → Possible frontend bug
    ✗ NO → Something deleted the notification
```

### Scenario 2: "Only some branches receive notifications"

```
For each branch:
  1. Check if branch has email:
     SELECT email FROM branches WHERE id = '<branch-id>';
     
  2. If email is NULL, update it:
     UPDATE branches SET email = 'branch@example.com' 
     WHERE id = '<branch-id>';
```

### Scenario 3: "All notifications are marked as read"

```
Check if notifications are being auto-marked:
  1. Check if branch admin reads them
  2. Run: SELECT is_read, COUNT(*) FROM notifications 
           GROUP BY is_read;
     
If all are marked as read:
  - Manual reset: UPDATE notifications SET is_read = false 
                  WHERE branch_id = '<branch-id>';
```

---

## Log Reading Guide

### Assignment Route Logs: `/api/admin/bookings/assign`

```
✓ SUCCESS logs:
  [DIAGNOSTIC] Branch email retrieval: branchEmailExists: true
  [DIAGNOSTIC] Creating notification with: branchEmail: admin@xyz.com
  [DIAGNOSTIC] ✓ Booking assignment notification created successfully: notificationId: "..."

✗ FAILURE logs:
  [DIAGNOSTIC] Branch has no email assigned ← branch.email is NULL
  [DIAGNOSTIC] Error creating booking assignment notification: errorCode: "..."
  [DIAGNOSTIC] Exception creating booking assignment notification: errorMessage: "..."
```

### API Logs: `/api/branch/notifications/list`

```
✓ SUCCESS logs:
  [DIAGNOSTIC] Branch notifications list API called: branch_id: "..."
  [DIAGNOSTIC] Notifications query result: dataLength: 1
  [DIAGNOSTIC] Final result: loaded: 1, total: 1

✗ FAILURE logs:
  [DIAGNOSTIC] Missing branch_id parameter
  [DIAGNOSTIC] Error fetching branch: error: "..."
  [DIAGNOSTIC] Error fetching notifications: errorCode: "..."
```

### Browser Logs: `BranchNotificationCenter`

```
✓ SUCCESS logs:
  [DIAGNOSTIC] Starting notification load for branch: ...
  [DIAGNOSTIC] Response status: 200
  [DIAGNOSTIC] Raw API response: dataLength: 1
  [DIAGNOSTIC] Processed notifications: 1

✗ FAILURE logs:
  [DIAGNOSTIC] Failed to load notifications: status: 404
  [DIAGNOSTIC] Error loading branch notifications: error: "..."
```

---

## SQL Debug Queries (Copy-Paste Ready)

### What notifications exist?
```sql
SELECT id, branch_id, booking_number, type, is_read, created_at 
FROM notifications 
WHERE branch_id IS NOT NULL 
ORDER BY created_at DESC 
LIMIT 20;
```

### Does specific branch have notifications?
```sql
SELECT * FROM notifications 
WHERE branch_id = 'PASTE_BRANCH_ID_HERE'
ORDER BY created_at DESC 
LIMIT 10;
```

### Is branch email configured?
```sql
SELECT id, name, email FROM branches 
WHERE email IS NULL;
```

### Count notifications by type
```sql
SELECT type, COUNT(*) FROM notifications 
WHERE branch_id IS NOT NULL 
GROUP BY type;
```

### Find notifications missing branch_id
```sql
SELECT id, branch_email, booking_number 
FROM notifications 
WHERE branch_id IS NULL AND branch_email IS NOT NULL;
```

---

## Decision Tree

```
Booking assigned to branch
│
├─ Server logs show "notification created successfully"?
│  ├─ NO → Branch has no email OR database error
│  │       └─ FIX: Check Point 1 above
│  │
│  └─ YES
│     │
│     ├─ Database contains the notification?
│     │  ├─ NO → Data didn't persist
│     │  │       └─ FIX: Check database constraints
│     │  │
│     │  └─ YES
│     │     │
│     │     ├─ API returns notification?
│     │     │  ├─ NO → Query filter wrong
│     │     │  │       └─ FIX: Check notification type/branch_id
│     │     │  │
│     │     │  └─ YES
│     │     │     │
│     │     │     ├─ Branch dashboard shows notification?
│     │     │     │  ├─ NO → Frontend bug
│     │     │     │  │       └─ FIX: Check frontend code
│     │     │     │  │
│     │     │     │  └─ YES → SUCCESS! ✓
```

---

## Emergency Actions

### Reset and test notifications for a branch:
```sql
-- 1. Delete test notifications
DELETE FROM notifications 
WHERE branch_id = '<branch-id>' 
  AND booking_number LIKE '%TEST%';

-- 2. Ensure branch has email
UPDATE branches 
SET email = 'branch@example.com' 
WHERE id = '<branch-id>' AND email IS NULL;

-- 3. Check branches with missing email
SELECT id, name FROM branches WHERE email IS NULL;

-- 4. Check total unread notifications
SELECT branch_id, COUNT(*) 
FROM notifications 
WHERE is_read = false 
GROUP BY branch_id;
```

### View full notification object:
```sql
SELECT jsonb_pretty(to_jsonb(n)) 
FROM notifications n 
WHERE booking_number = '<booking-number>'
LIMIT 1;
```

---

## Support: File Locations

| Component | File |
|-----------|------|
| Assignment Route | `/app/api/admin/bookings/assign/route.ts` |
| Notifications List API | `/app/api/branch/notifications/list/route.ts` |
| Branch Dashboard | `/app/admin/components/BranchNotificationCenter.tsx` |
| Helpers | `/lib/supabase-helpers.ts` |
| SQL Diagnostics | `DIAGNOSE_BRANCH_NOTIFICATIONS.sql` |
| Full Guide | `DIAGNOSTIC_GUIDE_BRANCH_NOTIFICATIONS.md` |

---

**Last Updated**: $(date)
**Diagnostic Logging**: ENABLED in all three key points
**Ready to Use**: YES ✓
