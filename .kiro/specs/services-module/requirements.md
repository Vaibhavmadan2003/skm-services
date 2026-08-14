# Services Module - Requirements

## Overview
Make the Services module fully functional with Add/Edit/Delete capabilities, connecting mock data to real database operations.

## User Stories

### US1: View Services
**As a** branch partner
**I want to** see all services offered by my branch
**So that** I can manage and track them

**Acceptance Criteria:**
- Services load from database (not mock data)
- Services are filtered by branch_id
- Search functionality works on real data
- Page displays a message if no services exist

### US2: Add Service
**As a** branch partner
**I want to** add new services to my branch
**So that** I can expand my offerings

**Acceptance Criteria:**
- "Add Service" button opens a modal
- Modal has fields: name, category, price, duration, availability status
- Submit button creates service and adds to branch
- Success alert shows "Service added successfully"
- Service appears immediately in the list
- Modal closes after successful submission

### US3: Edit Service
**As a** branch partner
**I want to** edit existing service details
**So that** I can update pricing, duration, or availability

**Acceptance Criteria:**
- Edit button opens modal pre-populated with current service data
- Modal allows updating: name, category, price, duration, availability
- Submit button updates service in database
- Success alert shows "Service updated successfully"
- Changes appear immediately in the list
- Modal closes after successful submission

### US4: Delete Service
**As a** branch partner
**I want to** delete services I no longer offer
**So that** my service list stays current

**Acceptance Criteria:**
- Delete button shows confirmation dialog
- Confirmation dialog asks "Are you sure you want to delete this service?"
- Confirming deletion removes service from database
- Success alert shows "Service deleted successfully"
- Service disappears immediately from list
- Canceling deletion keeps service in list

## Technical Requirements
- Database tables: `services` and `branch_services`
- API endpoints for CRUD operations
- Real data retrieval from Supabase
- Proper error handling and user feedback
- Branch context passed from session/parent component
