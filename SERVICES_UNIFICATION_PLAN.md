# Services Unification Plan

## Current State
- Services table has 35+ services (customer app list)
- Bookings store `service_name` as string
- Admin filters by service name (working but fragile)
- No relationship between bookings and services table

## Target State
- Single source of truth: services table
- Bookings store `service_id` (FK to services table)
- Admin dashboard uses same services everywhere
- All apps reference unified services

## Implementation Steps

### Phase 1: Database Setup ✅
- [x] Add all customer app services to services table
- [ ] Add `service_id` column to bookings table (nullable initially)
- [ ] Create migration script to populate service_id from service_name

### Phase 2: Customer App Updates
- [ ] Update HomeScreen to fetch services from database
- [ ] Update ExploreScreen to fetch services from database  
- [ ] Update booking creation to store both `serviceId` and `serviceName`
- [ ] Create useServices hook to fetch from database

### Phase 3: Admin Dashboard Updates
- [ ] Update admin bookings filter to use service_id
- [ ] Update BookingFilters component to work with IDs
- [ ] Update filtered bookings display

### Phase 4: Migration & Cleanup
- [ ] Migrate existing bookings: service_name → service_id
- [ ] Remove old service data (if any)
- [ ] Make service_id NOT NULL
- [ ] Add FOREIGN KEY constraint

## Key Files to Update

### Customer App
- `src/screens/main/HomeScreen.tsx` - Fetch services from DB
- `src/screens/main/ExploreScreen.tsx` - Fetch services from DB
- `src/hooks/useServices.ts` - NEW: Fetch services hook
- `src/context/BookingContext.tsx` - Store serviceId

### Admin Dashboard  
- `app/admin/components/BookingFilters.tsx` - Use service IDs
- `app/admin/hooks/useFilterData.ts` - Return service IDs
- `app/api/admin/bookings/route.ts` - Filter by service_id

## Benefits
✅ Single source of truth for services
✅ Easy to add/remove/update services
✅ Admin analytics work correctly
✅ Multi-language support ready
✅ No more typo issues
