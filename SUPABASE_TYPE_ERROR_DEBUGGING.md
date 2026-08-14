# Supabase Type Error - Detailed Debugging Investigation

**Status:** STUCK - Need expert analysis

---

## Investigation Summary

Methodical investigation (steps 1-9 per requirements) completed. Root cause identified but requires expert guidance to resolve without workarounds.

---

## Key Finding

### The Core Issue
`.from('bookings').update()` parameter type is resolving to `never` ONLY in these two route files:
- `app/api/admin/bookings/[id]/accept-assignment/route.ts`
- `app/api/admin/bookings/[id]/reject-assignment/route.ts`

**Same query works elsewhere:**
- ✅ `app/api/admin/bookings/cancel/route.ts` - Works fine
- ✅ `lib/supabase.ts` helper functions - Work fine
- ✅ Other Supabase operations - Work fine

---

## Investigation Steps Completed

### Step 1-3: Client and Import Comparison

**ACCEPT-ASSIGNMENT (FAILING):**
```typescript
import { Database } from '@/lib/database.types';

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  { auth: { autoRefreshToken: false, persistSession: false } }
);

// Error on this line:
await supabase.from('bookings').update({...})
```

**CANCEL (WORKING):**
```typescript
// NO TYPE PARAMETER - UNTYPED CLIENT
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

// NO ERROR - Works fine:
await supabaseAdmin.from('bookings').update({...})
```

**COMPARISON FINDING:**
- Cancel route uses UNtyped client → Works
- Accept/Reject use typed client → Fails
- Yet lib/supabase.ts uses typed client → Works

This suggests the problem is NOT type parameter itself, but something specific to these route files.

---

### Step 5-6: Explicit Type Test

**Attempted:**
```typescript
const updatePayload: Database['public']['Tables']['bookings']['Update'] = {
  status: 'confirmed',
  branch_id: branchId,
  updated_at: new Date().toISOString(),
};

await supabaseAdmin.from('bookings').update(updatePayload).eq('id', bookingId);
```

**Result:** Error persists on `.update(updatePayload)` call
- The payload itself is correctly typed
- But `.update()` parameter still resolves to `never`

**This proves:** The Update type definition is correct, but the method signature inference is broken in these files.

---

### Step 8: Duplicate Type Check

**Search Result:**
```
c:\Mystic Tarrot and gems\home-service-qatar\lib\database.types.ts:6:export interface Database {
```

✅ Only ONE Database definition exists - no conflicts

---

### Step 9: Dependency Versions

**Installed:**
```
@supabase/supabase-js@2.111.0 (package.json: ^2.43.0)
@supabase/postgrest-js@2.111.0 (dependency of supabase-js)
```

✅ Dependencies are consistent and no duplicates
✅ Actually running newer version (2.111.0) than in package.json

---

## What Works vs What Doesn't

### Working Patterns

**Cancel Route (WORKS):**
```typescript
const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const { data, error } = await supabaseAdmin
  .from('bookings')
  .update({ status: 'cancelled', cancellation_reason: 'test', updated_at: new Date().toISOString() })
  .eq('id', bookingId)
  .select()
  .single();
```

**Lib Helper (WORKS):**
```typescript
import { supabase } from './supabase';

const { data, error } = await supabase
  .from('bookings')
  .update({ status, updated_at: new Date().toISOString() })
  .eq('id', bookingId)
  .select()
  .single();
```

### Failing Patterns

**Accept-Assignment (FAILS):**
```typescript
import { Database } from '@/lib/database.types';

const supabase = createClient<Database>(...);

// ❌ FAILS with 'never' type
const { data, error } = await supabase
  .from('bookings')
  .update({ status: 'confirmed', branch_id: branchId, updated_at: new Date().toISOString() })
  .eq('id', bookingId)
  .select();
```

**Reject-Assignment (FAILS):**
- Same structure as accept-assignment
- Same error

---

## Theories Tested

| Attempt | Approach | Result |
|---------|----------|--------|
| 1 | Direct literal object | ❌ `never` type |
| 2 | `as const` on status | ❌ `never` type |
| 3 | `as any` on object | ❌ `any` rejected by `never` |
| 4 | Variable with `any` type | ❌ `any` rejected by `never` |
| 5 | Type request body as `{ branchId: string }` | ✅ Fixed `branchId` typing, but main error persists |
| 6 | Create local supabase client | ❌ `never` persists |
| 7 | Use supabaseAdmin instead of supabase | ❌ `never` persists |
| 8 | Explicit type `Database['public']['Tables']['bookings']['Update']` | ❌ `never` persists on `.update()` |
| 9 | Change to value import (not type import) | ❌ `never` persists |
| 10 | Cast entire result as `any` | ❌ Error happens before result |

---

## Environment Details

**Project:**
- Next.js: 16.2.12
- TypeScript: ^5
- Supabase.js: 2.111.0 (from ^2.43.0)
- Turbopack compiler in use

**Configuration:**
- tsconfig.json: `strict: true`
- No skip checks enabled
- Database types: Auto-generated from Supabase schema

**Files Involved:**
- `app/api/admin/bookings/[id]/accept-assignment/route.ts` - ❌ FAILS
- `app/api/admin/bookings/[id]/reject-assignment/route.ts` - ❌ FAILS
- `app/api/admin/bookings/cancel/route.ts` - ✅ WORKS
- `lib/supabase.ts` - ✅ WORKS
- `lib/database.types.ts` - Type definitions (verified correct)

---

## Database & Type Definitions (VERIFIED CORRECT)

### Actual Database Schema (bookings table)
```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY,
  booking_number VARCHAR(50) UNIQUE NOT NULL,
  customer_id UUID NOT NULL,
  branch_id UUID NOT NULL,
  service_id UUID NOT NULL,
  ...
  status VARCHAR(50) CHECK (status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'postponed')),
  ...
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
);
```

### TypeScript Generated Type (bookings.Update)
```typescript
Update: {
  id?: string;
  booking_number?: string;
  customer_id?: string;
  branch_id?: string;
  service_id?: string;
  ...
  status?: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'postponed';
  ...
  created_at?: string;
  updated_at?: string;
  ...
}
```

✅ All fields present and correctly typed
✅ No type mismatches between schema and generated types

---

## Current Code State

### Accept-Assignment Route
**File:** `app/api/admin/bookings/[id]/accept-assignment/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/lib/database.types';

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: bookingId } = await params;
    const body = await request.json() as { branchId: string };
    const { branchId } = body;

    if (!bookingId || !branchId) {
      return NextResponse.json(
        { error: 'Missing bookingId or branchId' },
        { status: 400 }
      );
    }

    // ❌ THIS LINE FAILS:
    // Type error: Argument of type '{ status: "confirmed"; branch_id: string; updated_at: string; }'
    // is not assignable to parameter of type 'never'.
    
    const { data: updatedBooking, error: updateError } = await supabaseAdmin
      .from('bookings')
      .update({ status: 'confirmed', branch_id: branchId, updated_at: new Date().toISOString() })
      .eq('id', bookingId)
      .select();

    if (updateError) {
      console.error('Error updating booking status:', updateError);
      return NextResponse.json(
        { error: 'Failed to accept assignment' },
        { status: 500 }
      );
    }

    // Find and mark the notification as read
    const { data: notifications, error: notifError } = await supabase
      .from('notifications')
      .select('*')
      .eq('booking_id', bookingId)
      .eq('branch_id', branchId)
      .eq('type', 'booking_assignment')
      .single();

    if (!notifError && notifications) {
      await supabaseAdmin
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notifications.id);
    }

    return NextResponse.json({
      success: true,
      message: 'Booking assignment accepted',
      data: updatedBooking && updatedBooking.length > 0 ? updatedBooking[0] : { bookingId, status: 'confirmed' },
    });
  } catch (error) {
    console.error('Error in POST /api/admin/bookings/[id]/accept-assignment:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

**Reject-Assignment:** Identical structure, same error.

---

## Questions for ChatGPT

1. **Why does `.from('bookings').update()` resolve to `never` type ONLY in these two route files while working elsewhere?**

2. **Is this a known issue in supabase-js v2.111.0?** The package appears to be working fine in other routes.

3. **Could this be related to:**
   - Next.js 16.2.12 + Turbopack type inference?
   - The way the generic type `Database` is being resolved in this specific context?
   - Module path resolution (@/lib/database.types)?
   - Local client creation vs imported client?

4. **What's the structural difference between:**
   - `const supabase = createClient<Database>(...)` (fails in these files)
   - `const supabaseAdmin = createClient(...)` (works in cancel route)
   - `export const supabase = createClient<Database>(...)` (works in lib/supabase.ts)

5. **Should we:**
   - Downgrade to supabase-js v2.43.0 specifically?
   - Upgrade to latest v2 or v3 version?
   - Use a different query pattern (RPC, raw SQL)?
   - Apply a minimal tsconfig change?
   - Use a type factory/wrapper function?

6. **Is there a way to debug the actual inferred type at compile time** to see why it's `never`?

---

## Next Steps (To Be Determined with ChatGPT)

**DO NOT DO:**
- ❌ Use `as any` or `@ts-ignore`
- ❌ Change DATABASE_SCHEMA.sql
- ❌ Broad tsconfig changes
- ❌ Downgrade without understanding the issue

**POSSIBLE APPROACHES:**
1. Investigate specific Next.js + Supabase version combination
2. Try alternative query patterns (not raw SQL yet)
3. Check if this is a known resolved issue in newer versions
4. Consider type factory or wrapper function approach
5. Determine if local client creation pattern needs to be different

---

## Ready for ChatGPT

This document contains all investigation findings, verified facts, and code state. ChatGPT can use this to:
1. Identify the root cause
2. Suggest specific solution
3. Guide implementation without workarounds

**No guessing needed - just expert analysis of documented facts.**
