'use client';

import React, { useState, useEffect } from 'react';
import { Box, Alert } from '@mui/material';
import TicketFilters from './TicketFilters';
import TicketsList from './TicketsList';

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

export default function TicketsDashboardClient() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const pageSize = 20;

  useEffect(() => {
    const loadTickets = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const params = new URLSearchParams();
        params.set('page', currentPage.toString());

        if (filters.status?.length) {
          filters.status.forEach((s) => params.append('status', s));
        }
        if (filters.source?.length) {
          filters.source.forEach((s) => params.append('source', s));
        }
        if (filters.search) {
          params.set('search', filters.search);
        }

        const response = await fetch(`/api/support/tickets?${params.toString()}`);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || 'Failed to fetch tickets');
        }

        const data = await response.json();
        setTickets(data.tickets || []);
        setTotalCount(data.total_count || 0);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load tickets');
      } finally {
        setIsLoading(false);
      }
    };

    loadTickets();
  }, [filters, currentPage]);

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box>
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      <TicketFilters filters={filters} onFilterChange={handleFilterChange} />
      <TicketsList
        tickets={tickets}
        isLoading={isLoading}
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </Box>
  );
}
