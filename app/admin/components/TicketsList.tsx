'use client';

import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  CircularProgress,
  Typography,
  Button,
  Pagination,
  Skeleton,
} from '@mui/material';
import { useRouter } from 'next/navigation';

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

interface TicketsListProps {
  tickets: Ticket[];
  isLoading: boolean;
  currentPage: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const getStatusColor = (status: string): 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' => {
  switch (status) {
    case 'open':
      return 'error';
    case 'in_progress':
      return 'warning';
    case 'resolved':
      return 'success';
    case 'closed':
      return 'default';
    default:
      return 'default';
  }
};

const getSourceLabel = (source: string) => {
  return source === 'customer_app' ? 'Customer App' : 'Branch Admin';
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default function TicketsList({
  tickets,
  isLoading,
  currentPage,
  totalCount,
  pageSize,
  onPageChange,
}: TicketsListProps) {
  const router = useRouter();

  const totalPages = Math.ceil(totalCount / pageSize);

  const handleTicketClick = (ticketId: string) => {
    router.push(`/admin/tickets/${ticketId}`);
  };

  if (isLoading) {
    return (
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} height={60} variant="rectangular" />
          ))}
        </Box>
      </Paper>
    );
  }

  if (tickets.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="textSecondary">
          No tickets found
        </Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          Try adjusting your filters or check back later
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Ticket #</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Customer</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Source</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Created</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow
                key={ticket.id}
                hover
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#f9f9f9',
                  },
                }}
              >
                <TableCell sx={{ fontWeight: 600, color: '#1976d2' }}>
                  {ticket.ticket_number}
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {ticket.user_name}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {ticket.user_email}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                    {ticket.issue_category.replace('_', ' ')}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={getSourceLabel(ticket.source)}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={ticket.status.replace('_', ' ').toUpperCase()}
                    size="small"
                    color={getStatusColor(ticket.status)}
                    variant="filled"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="caption">
                    {formatDate(ticket.created_at)}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleTicketClick(ticket.id)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(_, page) => onPageChange(page)}
          color="primary"
        />
      </Box>
    </Box>
  );
}
