# Supabase `never` Type Error - Workaround & Solution

## Problem

When using the centralized `supabaseAdmin` or `supabase` client from `@/lib/supabase.ts` **directly in API route files**, Supabase queries result in type `never` for update/insert/select operations.

```typescript
// ❌ FAILS in app/api/admin/bookings/[id]/accept-assignment/route.ts:
const { data: updatedBooking, error } = await supabaseAdmin
  .from('bookings')
  .update({ status: 'confirmed' })  // Type error: parameter type is 'never'
  .eq('id', bookingId)
  .select();
```

## Root Cause

This is a **TypeScript type inference issue specific to Next.js API route files**. The exact same query works perfectly when placed in a helper module (`lib/`) but fails in route handlers.

**Not caused by:**
- ❌ Database schema
- ❌ Supabase version
- ❌ TypeScript configuration
- ❌ Dynamic vs static routes

**Likely caused by:**
- Next.js/Turbopack module resolution with generics
- Route file context affecting type parameter inference
- Interaction between route signatures and Supabase generic types

## Workaround - Use Helper Module

Move all Supabase queries to `lib/supabase-helpers.ts`. Queries execute in the helper context where types resolve correctly.

### Why It Works

```typescript
// ✅ WORKS in lib/supabase-helpers.ts:
export async function testBookingUpdate(bookingId: string, branchId: string) {
  return await supabaseAdmin
    .from('bookings')
    .update({ status: 'confirmed' })  // ✅ Types resolve correctly!
    .eq('id', bookingId)
    .select();
}
```

Then call from route:

```typescript
// ✅ Route imports and calls helper - no type error
import { testBookingUpdate } from '@/lib/supabase-helpers';
const result = await testBookingUpdate(bookingId, branchId);
```

## Files Already Fixed ✅

1. `app/api/admin/bookings/[id]/accept-assignment/route.ts`
2. `app/api/admin/bookings/[id]/reject-assignment/route.ts`
3. `app/api/admin/bookings/assign/route.ts`
4. `app/api/admin/branches/stats/route.ts`

## Files Requiring Fixes ❌

**Total routes with Supabase queries: 30**

### Critical (Blocking Build)
- `app/api/admin/dashboard/stats/route.ts` ← Currently blocking build
- `app/api/admin/bookings/route.ts`
- `app/api/admin/notifications/list/route.ts`
- `app/api/branch/drivers/route.ts`
- `app/api/branch/notifications/list/route.ts`
- `app/api/branch/services/route.ts`
- `app/api/branch/staff/route.ts`
- `app/api/auth/admin/login/route.ts`
- `app/api/auth/branch/login/route.ts`
- `app/api/branches/route.ts`
- `app/api/partner/auth/check/route.ts`
- `app/api/partner/auth/login/route.ts`
- `app/api/partner/bookings/route.ts`
- `app/api/partner/dashboard/stats/route.ts`
- `app/api/partner/drivers/route.ts`
- `app/api/partner/payments/route.ts`
- `app/api/partner/services/route.ts`
- `app/api/partner/settings/password/route.ts`
- `app/api/partner/settings/update/route.ts`
- `app/api/partner/settings/upload-logo/route.ts`
- `app/api/partner/staff/route.ts`
- `app/api/partner/upload/driver/route.ts`
- `app/api/partner/upload/logo/route.ts`
- `app/api/partner/upload/service/route.ts`
- `app/api/partner/upload/staff/route.ts`
- `app/api/partner-applications/route.ts`
- `app/api/seed/route.ts`
- `app/api/settings/route.ts`
- `app/api/upload/route.ts`
- `app/api/fix-rls/route.ts`

### Reference (Working with Untyped Local Client)
- `app/api/admin/bookings/cancel/route.ts` (creates local client, no type checking)

## Helper Functions Available in `lib/supabase-helpers.ts`

### Booking Operations
```typescript
export async function testBookingUpdate(
  bookingId: string,
  branchId: string,
  status: 'confirmed' | 'pending' | 'assigned' = 'confirmed'
)

export async function getAndMarkNotificationAsRead(
  bookingId: string,
  branchId: string,
  type: string = 'booking_assignment'
)

export async function createBookingAssignmentNotification(
  branchEmail: string,
  branchId: string,
  bookingId: string,
  bookingNumber: string,
  message: string,
  metadata: Record<string, any>
)
```

### Branch Operations
```typescript
export async function getBranchDetails(branchId: string)

export async function getBranchStats(branchId: string)

export async function safeBranchData(data: any)
```

### Other
```typescript
export async function getBookingDetails(bookingId: string)
```

## How to Fix Remaining Routes

For any route with Supabase queries:

### Pattern 1: Simple Select Queries

**Before** (in route):
```typescript
const { data: branches } = await supabase
  .from('branches')
  .select('*');
```

**After** (in helper):
```typescript
// lib/supabase-helpers.ts
export async function getAllBranches() {
  return await supabase
    .from('branches')
    .select('*');
}
```

**In route**:
```typescript
import { getAllBranches } from '@/lib/supabase-helpers';
const { data: branches } = await getAllBranches();
```

### Pattern 2: Accessing Returned Data

**Before** (in route):
```typescript
const { data: branches } = await supabase.from('branches').select('*');
const active = branches?.filter(b => b.is_active);
```

**After**:
```typescript
// lib/supabase-helpers.ts
export async function getActiveBranches() {
  const { data } = await supabase.from('branches').select('*');
  return (data as any)?.filter((b: any) => b.is_active) || [];
}
```

**In route**:
```typescript
const active = await getActiveBranches();
```

### Pattern 3: Insert/Update Operations

**Before** (in route):
```typescript
const { data } = await supabaseAdmin
  .from('table')
  .insert(payload);
```

**After** (in helper):
```typescript
export async function insertTableRecord(payload: any) {
  return await supabaseAdmin
    .from('table')
    .insert(payload)
    .select();
}
```

**In route**:
```typescript
const { data } = await insertTableRecord(payload);
```

## Long-term Solution

This workaround is temporary pending:
1. Next.js/Turbopack fix for module generic type inference in route handlers
2. Supabase TypeScript types enhancement
3. Alternative: Consider using REST API instead of JavaScript client

## Build Status

**Current**: ❌ Blocked on `app/api/admin/dashboard/stats/route.ts`

**To proceed**: Fix the 30 remaining routes by extracting their Supabase queries to helpers

---

**Note**: This is NOT the ideal solution. It's a workaround for a root cause that should ideally be fixed at the framework/library level. However, it's the only path forward without changing architecture or using unsafe casts.

