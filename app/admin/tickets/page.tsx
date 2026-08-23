'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import AdminLayout from '../components/AdminLayout';
import TicketFilters from '../components/TicketFilters';
import TicketsList from '../components/TicketsList';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface Ticket {
  id: string;
  ticket_number: string;
  user_name: string;
  user_email: string;
  source: 'customer_app' | 'branch_admin';
  issue_category: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  created_at: string;
  issue_description: string;
}

interface Filters {
  status?: string[];
  source?: string[];
  search?: string;
}

export default function TicketsDashboard() {
  const router = useRouter();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [userRole, setUserRole] = useState<string | null>(null);

  const pageSize = 20;

  /**
   * Check if user is super admin on mount
   */
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError || !user) {
          router.push('/admin/login');
          return;
        }

        // Check user role
        const response = await fetch('/api/admin/check-role', {
          headers: {
            'Authorization': `Bearer ${user.id}`,
          },
        });

        if (!response.ok) {
          router.push('/admin/dashboard');
          return;
        }

        const roleData = await response.json();
        if (roleData.role !== 'super_admin') {
          router.push('/admin/dashboard');
          return;
        }

        setUserRole(roleData.role);
      } catch (err) {
        console.error('Auth check error:', err);
        router.push('/admin/dashboard');
      }
    };

    checkAuth();
  }, [router]);

  /**
   * Load tickets based on filters and page
   */
  useEffect(() => {
    if (!userRole) return;

    const loadTickets = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Build query parameters
        const params = new URLSearchParams();
        params.set('page', currentPage.toString());

        if (filters.status && filters.status.length > 0) {
          filters.status.forEach((status) => {
            params.append('status', status);
          });
        }

        if (filters.source && filters.source.length > 0) {
          filters.source.forEach((source) => {
            params.append('source', source);
          });
        }

        if (filters.search) {
          params.set('search', filters.search);
        }

        console.log('[Tickets Dashboard] Fetching with params:', params.toString());

        const response = await fetch(`/api/support/tickets?${params.toString()}`);

        if (!response.ok) {
          throw new Error('Failed to fetch tickets');
        }

        const data = await response.json();
        setTickets(data.tickets || []);
        setTotalCount(data.total_count || 0);
      } catch (err) {
        console.error('Load tickets error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load tickets');
      } finally {
        setIsLoading(false);
      }
    };

    loadTickets();
  }, [filters, currentPage, userRole]);

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!userRole) {
    return (
      <AdminLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <CircularProgress />
        </Box>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Box sx={{ maxWidth: 1400, mx: 'auto', py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
            Support Tickets
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Manage and respond to customer support tickets from both the customer app and branch admins.
          </Typography>
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Filters */}
        <TicketFilters filters={filters} onFilterChange={handleFilterChange} />

        {/* Tickets List */}
        <TicketsList
          tickets={tickets}
          isLoading={isLoading}
          currentPage={currentPage}
          totalCount={totalCount}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
      </Box>
    </AdminLayout>
  );
}
