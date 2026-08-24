import React from 'react';
import { Box, Typography } from '@mui/material';
import AdminLayout from '../components/AdminLayout';
import TicketsDashboardClient from '../components/TicketsDashboardClient';

export default function TicketsDashboard() {
  return (
    <AdminLayout>
      <Box suppressHydrationWarning sx={{ maxWidth: 1400, mx: 'auto', py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
            Support Tickets
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Manage and respond to customer support tickets from both the customer app and branch admins.
          </Typography>
        </Box>

        {/* Client Component */}
        <TicketsDashboardClient />
      </Box>
    </AdminLayout>
  );
}
