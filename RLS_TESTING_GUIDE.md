# RLS Policies Testing Guide

This guide provides step-by-step instructions for testing the RLS policies with different user roles in Supabase.

---

## Prerequisites

- Access to Supabase project dashboard
- Test users already created in `auth.users` with assigned roles:
  - Customer: `uuid-customer-1` (role: 'customer')
  - Customer: `uuid-customer-2` (role: 'customer')
  - Branch Admin: `uuid-branch-admin-1` (role: 'branch_admin')
  - Super Admin: `uuid-super-admin` (role: 'super_admin')
- Test tickets already created in `support_tickets` table

---

## Testing Environment Setup

### 1. Create Test Users (if not already created)

In Supabase SQL Editor, run:

```sql
-- Create test customer 1
INSERT INTO auth.users (id, email, role) 
VALUES ('11111111-1111-1111-1111-111111111111', 'customer1@test.com', 'customer')
ON CONFLICT DO NOTHING;

-- Create test customer 2
INSERT INTO auth.users (id, email, role) 
VALUES ('22222222-2222-2222-2222-222222222222', 'customer2@test.com', 'customer')
ON CONFLICT DO NOTHING;

-- Create test branch admin
INSERT INTO auth.users (id, email, role) 
VALUES ('33333333-3333-3333-3333-333333333333', 'admin@branch.com', 'branch_admin')
ON CONFLICT DO NOTHING;

-- Create super admin
INSERT INTO auth.users (id, email, role) 
VALUES ('99999999-9999-9999-9999-999999999999', 'superadmin@company.com', 'super_admin')
ON CONFLICT DO NOTHING;

-- Verify users created
SELECT id, email, role FROM users WHERE role IN ('customer', 'branch_admin', 'super_admin');
```

### 2. Create Test Tickets

In Supabase SQL Editor, run:

```sql
-- Create ticket from customer 1
INSERT INTO support_tickets 
  (ticket_number, source, user_id, user_name, user_email, user_phone, issue_category, issue_description, status)
VALUES 
  ('TKT-2026-00001', 'customer_app', '11111111-1111-1111-1111-111111111111', 'John Doe', 'customer1@test.com', '+974501234567', 'booking', 'My booking is not showing in the app correctly', 'open')
ON CONFLICT DO NOTHING;

-- Create ticket from customer 2
INSERT INTO support_tickets 
  (ticket_number, source, user_id, user_name, user_email, user_phone, issue_category, issue_description, status)
VALUES 
  ('TKT-2026-00002', 'customer_app', '22222222-2222-2222-2222-222222222222', 'Jane Smith', 'customer2@test.com', '+974507654321', 'payment', 'Payment failed during checkout', 'open')
ON CONFLICT DO NOTHING;

-- Create ticket from branch admin
INSERT INTO support_tickets 
  (ticket_number, source, user_id, user_name, user_email, user_phone, issue_category, issue_description, status)
VALUES 
  ('TKT-2026-00003', 'branch_admin', '33333333-3333-3333-3333-333333333333', 'Branch Manager', 'admin@branch.com', '+974509999999', 'technical', 'Dashboard is loading slowly', 'open')
ON CONFLICT DO NOTHING;

-- Verify tickets created
SELECT ticket_number, source, user_id, user_name, status FROM support_tickets WHERE ticket_number LIKE 'TKT-2026-0000%' ORDER BY ticket_number;
```

---

## Test Cases

### TEST 1: Customer Can View Only Their Own Tickets

**Objective**: Verify that Policy 1 works correctly for customers

#### Step 1A: Query as Customer 1

In Supabase SQL Editor, set the authenticated user to `11111111-1111-1111-1111-111111111111`, then run:

```sql
SELECT ticket_number, user_name, issue_category, status FROM support_tickets ORDER BY ticket_number;
```

**Expected Result**:
```
ticket_number | user_name | issue_category | status
TKT-2026-00001 | John Doe | booking | open
```

**Why**: RLS Policy 1 filters to only rows where `user_id = 11111111-1111-1111-1111-111111111111`

**Pass/Fail**: ✅ PASS if only 1 row returned (John Doe's ticket)
               ❌ FAIL if other customers' tickets are visible

---

#### Step 1B: Query as Customer 2

Set the authenticated user to `22222222-2222-2222-2222-222222222222`, then run:

```sql
SELECT ticket_number, user_name, issue_category, status FROM support_tickets ORDER BY ticket_number;
```

**Expected Result**:
```
ticket_number | user_name  | issue_category | status
TKT-2026-00002 | Jane Smith | payment        | open
```

**Why**: RLS Policy 1 filters to only rows where `user_id = 22222222-2222-2222-2222-222222222222`

**Pass/Fail**: ✅ PASS if only 1 row returned (Jane Smith's ticket)
               ❌ FAIL if John's ticket is visible

---

#### Step 1C: Verify Different Users Cannot See Each Other's Tickets

As Customer 1, try to see Customer 2's ticket:

```sql
-- Run as Customer 1
SELECT * FROM support_tickets WHERE ticket_number = 'TKT-2026-00002';
```

**Expected Result**: 0 rows (silently filtered by RLS)

**Why**: The ticket doesn't match `user_id = 11111111-1111-1111-1111-111111111111`

**Pass/Fail**: ✅ PASS if 0 rows returned (not an error, just silent filtering)
               ❌ FAIL if the ticket is returned

---

### TEST 2: Super Admin Can View All Tickets

**Objective**: Verify that Policy 2 grants super admin access to all tickets

#### Step 2A: Query as Super Admin

Set the authenticated user to `99999999-9999-9999-9999-999999999999`, then run:

```sql
SELECT ticket_number, user_name, source, issue_category, status FROM support_tickets WHERE ticket_number LIKE 'TKT-2026-0000%' ORDER BY ticket_number;
```

**Expected Result**:
```
ticket_number | user_name       | source        | issue_category | status
TKT-2026-00001 | John Doe       | customer_app  | booking        | open
TKT-2026-00002 | Jane Smith     | customer_app  | payment        | open
TKT-2026-00003 | Branch Manager | branch_admin  | technical      | open
```

**Why**: RLS Policy 2 allows super admin to see ALL rows

**Pass/Fail**: ✅ PASS if all 3 tickets returned
               ❌ FAIL if any tickets are missing

---

#### Step 2B: Super Admin Can See Different Sources

As Super Admin, filter by source:

```sql
-- Query as super admin - see only branch admin tickets
SELECT ticket_number, user_name, source FROM support_tickets 
WHERE source = 'branch_admin' AND ticket_number LIKE 'TKT-2026-0000%';
```

**Expected Result**:
```
ticket_number | user_name      | source
TKT-2026-00003 | Branch Manager | branch_admin
```

**Pass/Fail**: ✅ PASS if branch admin ticket visible
               ❌ FAIL if no results

---

### TEST 3: Authenticated Users Can Create Their Own Tickets

**Objective**: Verify that Policy 3 allows users to create tickets only with their own user_id

#### Step 3A: Customer Creates a Ticket

Set the authenticated user to `11111111-1111-1111-1111-111111111111`, then run:

```sql
INSERT INTO support_tickets 
  (source, user_id, user_name, user_email, user_phone, issue_category, issue_description)
VALUES 
  ('customer_app', '11111111-1111-1111-1111-111111111111', 'John Doe', 'customer1@test.com', '+974501234567', 'technical', 'App is crashing when I try to view my bookings')
RETURNING ticket_number, user_id, status;
```

**Expected Result**:
```
ticket_number | user_id                            | status
TKT-2026-00004 | 11111111-1111-1111-1111-111111111111 | open
```

**Why**: RLS Policy 3 allows INSERT because `user_id = auth.uid()` and ticket number is auto-generated

**Pass/Fail**: ✅ PASS if insert succeeds with proper ticket number
               ❌ FAIL if insert fails

---

#### Step 3B: Customer Cannot Create Ticket as Another User

Set the authenticated user to `11111111-1111-1111-1111-111111111111`, then try to insert with a different user_id:

```sql
INSERT INTO support_tickets 
  (source, user_id, user_name, user_email, user_phone, issue_category, issue_description)
VALUES 
  ('customer_app', '22222222-2222-2222-2222-222222222222', 'Jane Smith', 'customer2@test.com', '+974507654321', 'booking', 'Testing impersonation')
RETURNING ticket_number;
```

**Expected Result**: 
```
ERROR: new row violates row-level security policy "Authenticated users can create support tickets" for table "support_tickets"
```

Or: 0 rows inserted (depending on PostgreSQL version)

**Why**: RLS Policy 3 blocks INSERT because `user_id` (Jane's) does NOT match `auth.uid()` (John's)

**Pass/Fail**: ✅ PASS if insert fails
               ❌ FAIL if insert succeeds (security violation!)

---

#### Step 3C: Branch Admin Creates a Ticket

Set the authenticated user to `33333333-3333-3333-3333-333333333333`, then run:

```sql
INSERT INTO support_tickets 
  (source, user_id, user_name, user_email, user_phone, issue_category, issue_description)
VALUES 
  ('branch_admin', '33333333-3333-3333-3333-333333333333', 'Branch Manager', 'admin@branch.com', '+974509999999', 'payment', 'Payment processing is slow')
RETURNING ticket_number, source;
```

**Expected Result**:
```
ticket_number | source
TKT-2026-00005 | branch_admin
```

**Pass/Fail**: ✅ PASS if insert succeeds
               ❌ FAIL if insert fails

---

### TEST 4: Only Super Admin Can Update Tickets

**Objective**: Verify that Policy 4 restricts updates to super admin only

#### Step 4A: Customer Tries to Update Their Own Ticket

Set the authenticated user to `11111111-1111-1111-1111-111111111111`, then run:

```sql
UPDATE support_tickets 
SET status = 'resolved'
WHERE ticket_number = 'TKT-2026-00001'
RETURNING ticket_number, status;
```

**Expected Result**: 
```
(0 rows updated)
```

Or: 
```
ERROR: new row violates row-level security policy "Only super admin can update support tickets"
```

**Why**: RLS Policy 4 blocks UPDATE because user is not super_admin

**Pass/Fail**: ✅ PASS if update fails (0 rows or error)
               ❌ FAIL if status is changed (security violation!)

---

#### Step 4B: Super Admin Can Update Status

Set the authenticated user to `99999999-9999-9999-9999-999999999999`, then run:

```sql
UPDATE support_tickets 
SET status = 'in_progress'
WHERE ticket_number = 'TKT-2026-00001'
RETURNING ticket_number, status, updated_at;
```

**Expected Result**:
```
ticket_number | status       | updated_at
TKT-2026-00001 | in_progress | [current timestamp]
```

**Why**: RLS Policy 4 allows UPDATE because user is super_admin

**Pass/Fail**: ✅ PASS if update succeeds
               ❌ FAIL if update is blocked

---

#### Step 4C: Super Admin Can Add Admin Notes

Set the authenticated user to `99999999-9999-9999-9999-999999999999`, then run:

```sql
UPDATE support_tickets 
SET admin_notes = 'Investigating this issue now. We can reproduce on our test devices.'
WHERE ticket_number = 'TKT-2026-00001'
RETURNING ticket_number, admin_notes;
```

**Expected Result**:
```
ticket_number | admin_notes
TKT-2026-00001 | Investigating this issue now. We can reproduce on our test devices.
```

**Pass/Fail**: ✅ PASS if update succeeds
               ❌ FAIL if update is blocked

---

#### Step 4D: Branch Admin Cannot Update Tickets

Set the authenticated user to `33333333-3333-3333-3333-333333333333`, then run:

```sql
UPDATE support_tickets 
SET status = 'resolved'
WHERE ticket_number = 'TKT-2026-00002'
RETURNING ticket_number, status;
```

**Expected Result**: 
```
(0 rows updated)
```

**Why**: RLS Policy 4 blocks UPDATE because user is not super_admin (even though they can see the ticket)

**Pass/Fail**: ✅ PASS if update fails
               ❌ FAIL if status is changed

---

## Summary Checklist

Run through all tests and check them off:

### Policy 1: Users View Own Tickets
- [ ] TEST 1A: Customer 1 sees only own ticket ✅
- [ ] TEST 1B: Customer 2 sees only own ticket ✅
- [ ] TEST 1C: Customer 1 cannot see Customer 2's ticket ✅

### Policy 2: Super Admin Views All Tickets
- [ ] TEST 2A: Super Admin sees all tickets ✅
- [ ] TEST 2B: Super Admin can filter by source ✅

### Policy 3: Users Can Create Their Own Tickets
- [ ] TEST 3A: Customer can create ticket with own user_id ✅
- [ ] TEST 3B: Customer cannot create ticket with another user_id ✅
- [ ] TEST 3C: Branch Admin can create ticket ✅

### Policy 4: Only Super Admin Can Update
- [ ] TEST 4A: Customer cannot update own ticket ✅
- [ ] TEST 4B: Super Admin can update status ✅
- [ ] TEST 4C: Super Admin can add admin notes ✅
- [ ] TEST 4D: Branch Admin cannot update tickets ✅

---

## All Tests Passed! ✅

If all tests pass, the RLS policies are working correctly and the support_tickets table is secure.

**Next Steps**:
1. Proceed to Task 3: Create API endpoints that properly handle RLS
2. Test API endpoints with different authenticated users
3. Verify that proper error responses (403 Forbidden) are returned
4. Deploy with confidence that data access is secured at the database level

