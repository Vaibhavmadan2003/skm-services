-- ============================================================================
-- SUPPORT TICKETS TABLE MIGRATION
-- ============================================================================
-- Purpose: Create support_tickets table for the Help & Support System
-- This table stores all support tickets from both customer app and branch admin
-- Supports RLS policies for secure data access based on user roles
-- ============================================================================

-- ============================================================================
-- 1. CREATE ENUMS FOR DOMAIN TYPES
-- ============================================================================

-- Source enum: Identifies which app submitted the ticket
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'ticket_source') THEN
    CREATE TYPE ticket_source AS ENUM ('customer_app', 'branch_admin');
  END IF;
END
$$;

-- Issue category enum: Classification of the support issue
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'issue_category') THEN
    CREATE TYPE issue_category AS ENUM ('booking', 'payment', 'technical', 'other');
  END IF;
END
$$;

-- Ticket status enum: Current state of the support ticket
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'ticket_status') THEN
    CREATE TYPE ticket_status AS ENUM ('open', 'in_progress', 'resolved', 'closed');
  END IF;
END
$$;

-- ============================================================================
-- 2. CREATE SEQUENCE FOR TICKET NUMBER GENERATION (per year)
-- ============================================================================

CREATE SEQUENCE IF NOT EXISTS ticket_number_seq 
  START WITH 1 
  INCREMENT BY 1 
  NO MINVALUE 
  MAXVALUE 99999 
  CACHE 10;

-- ============================================================================
-- 3. CREATE SUPPORT_TICKETS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Ticket identification
  ticket_number VARCHAR(20) UNIQUE NOT NULL,  -- Format: TKT-YYYY-XXXXX
  source ticket_source NOT NULL,              -- Which app submitted this ticket
  
  -- User information (captured at submission time)
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_name VARCHAR(255) NOT NULL,            -- Name of person submitting
  user_email VARCHAR(255) NOT NULL,           -- Email of person submitting
  user_phone VARCHAR(20) NOT NULL,            -- Phone of person submitting
  
  -- Issue details
  issue_category issue_category NOT NULL,     -- Type of issue
  issue_description TEXT NOT NULL,            -- Full issue description
  
  -- Ticket management
  status ticket_status NOT NULL DEFAULT 'open',  -- Current ticket status
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  -- Branch reference (optional, only for branch admin tickets)
  branch_id UUID REFERENCES branches(id) ON DELETE SET NULL,
  
  -- Super admin response
  admin_notes TEXT,  -- Optional notes from super admin
  
  -- Constraints
  CONSTRAINT issue_description_length CHECK (LENGTH(TRIM(issue_description)) >= 20),
  CONSTRAINT user_email_format CHECK (user_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$'),
  CONSTRAINT user_phone_length CHECK (LENGTH(TRIM(user_phone)) >= 7)
);

-- ============================================================================
-- 4. CREATE INDEXES FOR PERFORMANCE
-- ============================================================================

-- Composite index for filtering by source and status (most common dashboard query)
CREATE INDEX IF NOT EXISTS idx_support_tickets_source_status 
  ON support_tickets(source, status);

-- Index for querying user's own tickets with creation date sorting
CREATE INDEX IF NOT EXISTS idx_support_tickets_user_created 
  ON support_tickets(user_id, created_at DESC);

-- Index for ticket number lookup (direct ticket view)
CREATE INDEX IF NOT EXISTS idx_support_tickets_ticket_number 
  ON support_tickets(ticket_number);

-- Index for branch admin tickets
CREATE INDEX IF NOT EXISTS idx_support_tickets_branch 
  ON support_tickets(branch_id);

-- Index for status-only queries (dashboard filtering)
CREATE INDEX IF NOT EXISTS idx_support_tickets_status 
  ON support_tickets(status);

-- ============================================================================
-- 5. CREATE FUNCTION FOR AUTO-UPDATING UPDATED_AT TIMESTAMP
-- ============================================================================

CREATE OR REPLACE FUNCTION update_support_ticket_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if exists (to allow re-running migration)
DROP TRIGGER IF EXISTS trigger_update_support_ticket_timestamp ON support_tickets;

-- Create trigger to auto-update updated_at on any change
CREATE TRIGGER trigger_update_support_ticket_timestamp
BEFORE UPDATE ON support_tickets
FOR EACH ROW
EXECUTE FUNCTION update_support_ticket_timestamp();

-- ============================================================================
-- 6. CREATE FUNCTION FOR AUTO-GENERATING TICKET NUMBERS
-- ============================================================================

CREATE OR REPLACE FUNCTION generate_ticket_number()
RETURNS VARCHAR(20) AS $$
DECLARE
  current_year INTEGER;
  next_sequence INTEGER;
  ticket_num VARCHAR(20);
BEGIN
  -- Get current year
  current_year := EXTRACT(YEAR FROM CURRENT_TIMESTAMP);
  
  -- Get next sequence number
  next_sequence := NEXTVAL('ticket_number_seq');
  
  -- Format: TKT-YYYY-XXXXX
  ticket_num := 'TKT-' || current_year || '-' || LPAD(next_sequence::TEXT, 5, '0');
  
  RETURN ticket_num;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- 7. CREATE TRIGGER FOR AUTO-GENERATING TICKET NUMBERS ON INSERT
-- ============================================================================

CREATE OR REPLACE FUNCTION auto_generate_ticket_number()
RETURNS TRIGGER AS $$
BEGIN
  -- Only generate if ticket_number is not provided
  IF NEW.ticket_number IS NULL OR NEW.ticket_number = '' THEN
    NEW.ticket_number := generate_ticket_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop trigger if exists (to allow re-running migration)
DROP TRIGGER IF EXISTS trigger_auto_generate_ticket_number ON support_tickets;

-- Create trigger to auto-generate ticket number on insert
CREATE TRIGGER trigger_auto_generate_ticket_number
BEFORE INSERT ON support_tickets
FOR EACH ROW
EXECUTE FUNCTION auto_generate_ticket_number();

-- ============================================================================
-- 8. ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================================================

ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 9. CREATE RLS POLICIES
-- ============================================================================

-- Drop existing policies to allow re-running migration
DROP POLICY IF EXISTS "Users can view their own support tickets" ON support_tickets;
DROP POLICY IF EXISTS "Super admin can view all support tickets" ON support_tickets;
DROP POLICY IF EXISTS "Authenticated users can create support tickets" ON support_tickets;
DROP POLICY IF EXISTS "Only super admin can update support tickets" ON support_tickets;

-- POLICY 1: Regular users (customers/branch admins) can view only their own tickets
CREATE POLICY "Users can view their own support tickets"
  ON support_tickets FOR SELECT
  USING (auth.uid() = user_id);

-- POLICY 2: Super admin can view all tickets
CREATE POLICY "Super admin can view all support tickets"
  ON support_tickets FOR SELECT
  USING (
    EXISTS (
      SELECT 1 
      FROM users 
      WHERE id = auth.uid() 
        AND role = 'super_admin'
    )
  );

-- POLICY 3: Authenticated users can create support tickets
CREATE POLICY "Authenticated users can create support tickets"
  ON support_tickets FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- POLICY 4: Only super admin can update support tickets
CREATE POLICY "Only super admin can update support tickets"
  ON support_tickets FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 
      FROM users 
      WHERE id = auth.uid() 
        AND role = 'super_admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 
      FROM users 
      WHERE id = auth.uid() 
        AND role = 'super_admin'
    )
  );

-- ============================================================================
-- 10. GRANT PERMISSIONS
-- ============================================================================

GRANT SELECT, INSERT ON support_tickets TO authenticated;
GRANT SELECT, INSERT, UPDATE ON support_tickets TO service_role;
GRANT USAGE, SELECT ON SEQUENCE ticket_number_seq TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE ticket_number_seq TO service_role;

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================
-- The support_tickets table is now ready for use with:
-- - Auto-generating ticket numbers in TKT-YYYY-XXXXX format
-- - Row-level security policies for data access control
-- - Performance indexes for common queries
-- - Automatic timestamp management
-- - Type safety with ENUM fields
-- ============================================================================

