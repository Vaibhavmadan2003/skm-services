'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
  Button,
  Stack,
  Typography,
  Skeleton,
} from '@mui/material';
import { format } from 'date-fns';
import TicketStatusBadge from './TicketStatusBadge';
import Link from 'next/link';

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
  onTicketClick?: (ticket: Ticket) => void;
  currentPage: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const sourceLabels: Record<string, string> = {
  customer_app: 'Customer App',
  branch_admin: 'Branch Admin',
};

const categoryLabels: Record<string, string> = {
  booking: 'Booking',
  payment: 'Payment',
  technical: 'Technical',
  other: 'Other',
};

export default function TicketsList({
  tickets,
  isLoading,
  onTicketClick,
  currentPage,
  totalCount,
  pageSize,
  onPageChange,
}: TicketsListProps) {
  const totalPages = Math.ceil(totalCount / pageSize);

  if (isLoading) {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f9fafb' }}>
              <TableCell sx={{ fontWeight: '600' }}>Ticket #</TableCell>
              <TableCell sx={{ fontWeight: '600' }}>User Name</TableCell>
              <TableCell sx={{ fontWeight: '600' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: '600' }}>Source</TableCell>
              <TableCell sx={{ fontWeight: '600' }}>Category</TableCell>
              <TableCell sx={{ fontWeight: '600' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: '600' }}>Created</TableCell>
              <TableCell sx={{ fontWeight: '600' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...Array(5)].map((_, idx) => (
              <TableRow key={idx}>
                <TableCell><Skeleton width="100px" /></TableCell>
                <TableCell><Skeleton width="150px" /></TableCell>
                <TableCell><Skeleton width="180px" /></TableCell>
                <TableCell><Skeleton width="120px" /></TableCell>
                <TableCell><Skeleton width="100px" /></TableCell>
                <TableCell><Skeleton width="100px" /></TableCell>
                <TableCell><Skeleton width="100px" /></TableCell>
                <TableCell><Skeleton width="80px" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  if (tickets.length === 0) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="body1" color="textSecondary">
          No support tickets found.
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f9fafb' }}>
              <TableCell sx={{ fontWeight: '600' }}>Ticket #</TableCell>
              <TableCell sx={{ fontWeight: '600' }}>User Name</TableCell>
              <TableCell sx={{ fontWeight: '600' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: '600' }}>Source</TableCell>
              <TableCell sx={{ fontWeight: '600' }}>Category</TableCell>
              <TableCell sx={{ fontWeight: '600' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: '600' }}>Created</TableCell>
              <TableCell sx={{ fontWeight: '600' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow
                key={ticket.id}
                sx={{
                  '&:hover': {
                    backgroundColor: '#f9fafb',
                  },
                  cursor: 'pointer',
                }}
              >
                <TableCell sx={{ fontWeight: '600', color: '#0052CC' }}>
                  {ticket.ticket_number}
                </TableCell>
                <TableCell>{ticket.user_name}</TableCell>
                <TableCell sx={{ maxWidth: '250px', wordBreak: 'break-word' }}>
                  {ticket.user_email}
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: 'inline-block',
                      px: 2,
                      py: 0.5,
                      backgroundColor:
                        ticket.source === 'customer_app' ? '#E3F2FD' : '#FFF3E0',
                      color:
                        ticket.source === 'customer_app' ? '#1565C0' : '#E65100',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500',
                    }}
                  >
                    {sourceLabels[ticket.source]}
                  </Box>
                </TableCell>
                <TableCell>{categoryLabels[ticket.issue_category]}</TableCell>
                <TableCell>
                  <TicketStatusBadge status={ticket.status} />
                </TableCell>
                <TableCell>{format(new Date(ticket.created_at), 'MMM dd, yyyy')}</TableCell>
                <TableCell>
                  <Link href={`/admin/tickets/${ticket.id}`}>
                    <Button
                      size="small"
                      variant="outlined"
                      sx={{ textTransform: 'none' }}
                    >
                      View
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
        <Typography variant="body2" color="textSecondary">
          Page {currentPage} of {totalPages} • {totalCount} total tickets
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            size="small"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            sx={{ textTransform: 'none' }}
          >
            ← Previous
          </Button>
          <Button
            variant="outlined"
            size="small"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            sx={{ textTransform: 'none' }}
          >
            Next →
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
