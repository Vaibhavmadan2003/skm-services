# RLS Policies Quick Reference

## What is RLS?

Row-Level Security (RLS) is a PostgreSQL feature that automatically filters database query results based on the authenticated user's role and attributes. It's enforced at the database level, not the application level, making it secure and reliable.

---

## The 4 RLS Policies at a Glance

### 1️⃣ Regular Users See Own Tickets Only
```sql
-- Policy: "Users can view their own support tickets"
-- Operation: SELECT
-- Users affected: Customers, Branch Admins
-- Effect: Each user sees only tickets where user_id = auth.uid()
```

**Example**:
- Customer John queries support_tickets → sees only John's tickets
- Customer Jane queries support_tickets → sees only Jane's tickets
- John cannot see Jane's tickets (automatic filtering)

---

### 2️⃣ Super Admin Sees All Tickets
```sql
-- Policy: "Super admin can view all support tickets"
-- Operation: SELECT
-- Users affected: Super Admin only (role = 'super_admin')
-- Effect: Super admin bypasses the user_id filter, sees everything
```

**Example**:
- Super Admin Alice queries support_tickets → sees all tickets (from John, Jane, and all other users)
- Can see tickets from customers AND branch admins
- Can apply filters (by status, source, date, etc.)

---

### 3️⃣ Anyone Can Create Their Own Ticket
```sql
-- Policy: "Authenticated users can create support tickets"
-- Operation: INSERT
-- Users affected: All authenticated users (customers, branch admins, super admin)
-- Effect: Can create new tickets only with user_id = auth.uid()
```

**Example**:
- Customer submits form → INSERT creates ticket with user_id = customer's UUID ✅
- Customer tries to submit on behalf of another user → INSERT fails ❌
- Unauthenticated visitor tries to submit → INSERT fails ❌

---

### 4️⃣ Only Super Admin Can Modify Tickets
```sql
-- Policy: "Only super admin can update support tickets"
-- Operation: UPDATE
-- Users affected: Super Admin only (role = 'super_admin')
-- Effect: Regular users cannot update ANY tickets (even their own)
```

**Example**:
- Super Admin updates status to 'resolved' ✅
- Super Admin adds admin notes ✅
- Customer tries to mark own ticket as resolved ❌
- Branch Admin tries to update status ❌

---

## User Role Access Matrix

```
OPERATION      | Customer | Branch Admin | Super Admin | Unauth
               |          |              |             |
SELECT own     |    ✅    |      ✅      |     ✅      |   ❌
SELECT others  |    ❌    |      ❌      |     ✅      |   ❌
INSERT own     |    ✅    |      ✅      |     ✅      |   ❌
INSERT as other|    ❌    |      ❌      |     ❌      |   ❌
UPDATE own     |    ❌    |      ❌      |     ✅      |   ❌
UPDATE others  |    ❌    |      ❌      |     ✅      |   ❌
DELETE         |    ❌    |      ❌      |     ❌      |   ❌
```

---

## How It Works Under the Hood

### When SELECT is executed:

1. User runs: `SELECT * FROM support_tickets WHERE status = 'open'`
2. Database checks: "Is this user super_admin?" 
   - **YES** → Apply Policy 2 (see all tickets, then apply WHERE clause)
   - **NO** → Apply Policy 1 (only see own tickets, then apply WHERE clause)

### When INSERT is executed:

1. User runs: `INSERT INTO support_tickets (user_id, ...) VALUES (uuid-abc, ...)`
2. Database checks: "Does user_id = auth.uid()?"
   - **YES** → INSERT succeeds
   - **NO** → INSERT fails with 403 Forbidden

### When UPDATE is executed:

1. User runs: `UPDATE support_tickets SET status = 'resolved' WHERE id = 'ticket-123'`
2. Database checks: "Is this user super_admin?"
   - **YES** → UPDATE succeeds
   - **NO** → UPDATE fails (0 rows updated, no error message)

---

## Testing Commands (Pseudocode)

### Test as Regular Customer:
```
auth_user = uuid-customer-1

SELECT * FROM support_tickets
→ Result: Only tickets where user_id = uuid-customer-1

UPDATE support_tickets SET status = 'resolved' WHERE id = '...'
→ Result: 0 rows updated (silently rejected)
```

### Test as Super Admin:
```
auth_user = uuid-super-admin (role = 'super_admin')

SELECT * FROM support_tickets
→ Result: ALL tickets from all users

UPDATE support_tickets SET status = 'resolved' WHERE id = '...'
→ Result: 1 row updated (success)
```

---

## Security Properties Enforced

✅ **Data Isolation**: Each customer only sees their own data
✅ **Write Protection**: Only super admin can modify tickets
✅ **Audit Trail**: All updates linked to super admin
✅ **Impersonation Prevention**: Can't create tickets as other users
✅ **Branch Admin Isolation**: Branch admins see only their own tickets
✅ **Multi-tenancy Support**: Each tenant (source) is properly isolated
✅ **Automatic Enforcement**: Happens at DB level, not app level (can't be bypassed)

---

## Common Mistakes to Avoid

❌ **Don't bypass RLS** - Always go through normal queries, let RLS filter
❌ **Don't use service_role** in user-facing APIs - Only in secure backend
❌ **Don't manually check permissions** in app code - RLS does it automatically
❌ **Don't assume client-side filtering** - RLS prevents data leakage

---

## Verification Scenarios

Test these to confirm RLS is working:

1. **Customer 1 logs in**: Should only see their tickets
2. **Customer 2 logs in**: Should NOT see Customer 1's tickets
3. **Super Admin logs in**: Should see all customers' tickets
4. **Customer updates own ticket**: Should fail
5. **Super Admin updates ticket**: Should succeed
6. **Unauthenticated user queries**: Should get 0 results or error

---

## Related Files

- **Full Documentation**: See `RLS_POLICIES_VERIFICATION.md`
- **SQL Migration**: See `CREATE_SUPPORT_TICKETS_TABLE.sql` (lines 142-179 for policies)
- **Design**: See `.kiro/specs/help-support-system/design.md`
- **Requirements**: See `.kiro/specs/help-support-system/requirements.md`

