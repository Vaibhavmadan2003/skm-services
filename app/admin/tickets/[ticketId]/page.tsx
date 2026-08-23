'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Button,
  Stack,
} from '@mui/material';
import { useRouter, useParams } from 'next/navigation';
import AdminLayout from '../../components/AdminLayout';
import TicketDetail from '../../components/TicketDetail';
import { supabase } from '@/lib/supabase';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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

export default function TicketDetailPage() {
  const router = useRouter();
  const params = useParams();
  const ticketId = (params?.ticketId as string) || '';

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  /**
   * Check auth and user role on mount
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
   * Load ticket details
   */
  useEffect(() => {
    if (!userRole || !ticketId) return;

    const loadTicket = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`/api/support/tickets/${ticketId}`);

        if (!response.ok) {
          if (response.status === 404) {
            setError('Ticket not found');
          } else {
            setError('Failed to load ticket');
          }
          setTicket(null);
          return;
        }

        const ticketData = await response.json();
        setTicket(ticketData);
      } catch (err) {
        console.error('Load ticket error:', err);
        setError('Failed to load ticket');
      } finally {
        setIsLoading(false);
      }
    };

    loadTicket();
  }, [ticketId, userRole]);

  const handleSave = async (updates: { status: string; admin_notes?: string }) => {
    if (!ticketId) return;

    try {
      const response = await fetch(`/api/support/tickets/${ticketId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save ticket');
      }

      const updatedTicket = await response.json();
      setTicket(updatedTicket.ticket);
    } catch (err) {
      console.error('Save ticket error:', err);
      throw err;
    }
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

  if (isLoading) {
    return (
      <AdminLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <CircularProgress />
        </Box>
      </AdminLayout>
    );
  }

  if (error || !ticket) {
    return (
      <AdminLayout>
        <Box sx={{ maxWidth: 900, mx: 'auto', py: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => router.push('/admin/tickets')}
            sx={{ mb: 3, textTransform: 'none' }}
          >
            Back to Tickets
          </Button>

          <Alert severity="error" sx={{ mb: 3 }}>
            {error || 'Ticket not found'}
          </Alert>

          <Button
            variant="contained"
            onClick={() => router.push('/admin/tickets')}
          >
            Return to Tickets List
          </Button>
        </Box>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Box sx={{ maxWidth: 900, mx: 'auto', py: 4 }}>
        {/* Back Button */}
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push('/admin/tickets')}
          sx={{ mb: 3, textTransform: 'none' }}
        >
          Back to Tickets
        </Button>

        {/* Ticket Detail */}
        <TicketDetail ticket={ticket} onSave={handleSave} />
      </Box>
    </AdminLayout>
  );
}
