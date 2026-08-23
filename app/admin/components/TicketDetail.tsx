'use client';

import React, { useState } from 'react';
import {
  Box,
  Card,
  Button,
  TextField,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Stack,
  Typography,
  Divider,
  FormHelperText,
} from '@mui/material';
import { format } from 'date-fns';
import TicketStatusBadge from './TicketStatusBadge';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface Ticket {
  id: string;
  ticket_number: string;
  user_name: string;
  user_email: string;
  user_phone: string;
  source: 'customer_app' | 'branch_admin';
  issue_category: string;
  issue_description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  created_at: string;
  updated_at: string;
  admin_notes?: string;
}

interface TicketDetailProps {
  ticket: Ticket;
  onSave: (updates: { status: string; admin_notes?: string }) => Promise<void>;
  isSaving?: boolean;
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

export default function TicketDetail({ ticket, onSave, isSaving = false }: TicketDetailProps) {
  const [status, setStatus] = useState(ticket.status);
  const [adminNotes, setAdminNotes] = useState(ticket.admin_notes || '');
  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus as 'open' | 'in_progress' | 'resolved' | 'closed');
    setHasChanges(true);
    setSuccessMessage('');
  };

  const handleNotesChange = (newNotes: string) => {
    setAdminNotes(newNotes);
    setHasChanges(true);
    setSuccessMessage('');
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      await onSave({
        status,
        admin_notes: adminNotes,
      });

      setHasChanges(false);
      setSuccessMessage('Ticket updated successfully!');

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to save changes');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkResolved = async () => {
    setStatus('resolved');
    setHasChanges(true);

    try {
      setIsLoading(true);
      setErrorMessage('');

      await onSave({
        status: 'resolved',
        admin_notes: adminNotes,
      });

      setHasChanges(false);
      setSuccessMessage('Ticket marked as resolved!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to mark as resolved');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Card sx={{ p: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                {ticket.ticket_number}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Created: {format(new Date(ticket.created_at), 'MMM dd, yyyy HH:mm')}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Updated: {format(new Date(ticket.updated_at), 'MMM dd, yyyy HH:mm')}
              </Typography>
            </Box>
            <TicketStatusBadge status={ticket.status} size="medium" />
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Messages */}
        {successMessage && (
          <Alert severity="success" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
            <CheckCircleIcon sx={{ fontSize: 20 }} />
            {successMessage}
          </Alert>
        )}
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errorMessage}
          </Alert>
        )}

        {/* Customer Information */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          Customer Information
        </Typography>
        <Stack spacing={2} sx={{ mb: 4 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
            <Box sx={{ backgroundColor: '#f9fafb', p: 2, borderRadius: '8px' }}>
              <Typography variant="caption" color="textSecondary">
                Name
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: '500' }}>
                {ticket.user_name}
              </Typography>
            </Box>
            <Box sx={{ backgroundColor: '#f9fafb', p: 2, borderRadius: '8px' }}>
              <Typography variant="caption" color="textSecondary">
                Email
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: '500' }}>
                {ticket.user_email}
              </Typography>
            </Box>
            <Box sx={{ backgroundColor: '#f9fafb', p: 2, borderRadius: '8px' }}>
              <Typography variant="caption" color="textSecondary">
                Phone
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: '500' }}>
                {ticket.user_phone}
              </Typography>
            </Box>
            <Box sx={{ backgroundColor: '#f9fafb', p: 2, borderRadius: '8px' }}>
              <Typography variant="caption" color="textSecondary">
                Source
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: '500' }}>
                {sourceLabels[ticket.source]}
              </Typography>
            </Box>
          </Box>
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* Issue Information */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          Issue Information
        </Typography>
        <Stack spacing={2} sx={{ mb: 4 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
            <Box sx={{ backgroundColor: '#f9fafb', p: 2, borderRadius: '8px' }}>
              <Typography variant="caption" color="textSecondary">
                Category
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: '500' }}>
                {categoryLabels[ticket.issue_category]}
              </Typography>
            </Box>
          </Box>
        </Stack>

        <Box sx={{ backgroundColor: '#f9fafb', p: 2, borderRadius: '8px', mb: 4 }}>
          <Typography variant="caption" color="textSecondary">
            Issue Description
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {ticket.issue_description}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Admin Actions */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          Admin Actions
        </Typography>

        <Stack spacing={2} sx={{ mb: 3 }}>
          {/* Status */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: '600' }}>
              Status
            </Typography>
            <Select
              value={status}
              onChange={(e) => handleStatusChange(e.target.value)}
              disabled={isLoading}
              fullWidth
              size="small"
            >
              <MenuItem value="open">Open</MenuItem>
              <MenuItem value="in_progress">In Progress</MenuItem>
              <MenuItem value="resolved">Resolved</MenuItem>
              <MenuItem value="closed">Closed</MenuItem>
            </Select>
          </Box>

          {/* Admin Notes */}
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: '600' }}>
              Admin Notes
            </Typography>
            <TextField
              value={adminNotes}
              onChange={(e) => handleNotesChange(e.target.value)}
              disabled={isLoading}
              multiline
              rows={4}
              fullWidth
              placeholder="Add internal notes about this ticket..."
              size="small"
            />
            <FormHelperText>{adminNotes.length}/500</FormHelperText>
          </Box>
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* Action Buttons */}
        <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            disabled={isLoading || !hasChanges}
            onClick={() => {
              setStatus(ticket.status);
              setAdminNotes(ticket.admin_notes || '');
              setHasChanges(false);
            }}
            sx={{ textTransform: 'none' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            disabled={isLoading || !hasChanges}
            onClick={handleMarkResolved}
            startIcon={isLoading ? <CircularProgress size={20} /> : <CheckCircleIcon />}
            sx={{ textTransform: 'none' }}
          >
            {isLoading ? 'Saving...' : 'Mark Resolved'}
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={isLoading || !hasChanges}
            onClick={handleSave}
            startIcon={isLoading ? <CircularProgress size={20} /> : undefined}
            sx={{ textTransform: 'none' }}
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </Stack>

        {hasChanges && (
          <Alert severity="info" sx={{ mt: 3 }}>
            You have unsaved changes. Please save them before navigating away.
          </Alert>
        )}
      </Card>
    </Box>
  );
}
