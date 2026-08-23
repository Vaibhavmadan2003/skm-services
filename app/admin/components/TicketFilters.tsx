'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Chip,
  TextField,
  Paper,
  Typography,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

interface TicketFiltersProps {
  filters: {
    status?: string[];
    source?: string[];
    search?: string;
  };
  onFilterChange: (filters: any) => void;
}

const STATUS_OPTIONS = [
  { label: 'Open', value: 'open' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Resolved', value: 'resolved' },
  { label: 'Closed', value: 'closed' },
];

const SOURCE_OPTIONS = [
  { label: 'Customer App', value: 'customer_app' },
  { label: 'Branch Admin', value: 'branch_admin' },
];

export default function TicketFilters({ filters, onFilterChange }: TicketFiltersProps) {
  const [search, setSearch] = useState(filters.search || '');
  const [selectedStatus, setSelectedStatus] = useState<string[]>(filters.status || []);
  const [selectedSource, setSelectedSource] = useState<string[]>(filters.source || []);

  const handleStatusToggle = (status: string) => {
    const updated = selectedStatus.includes(status)
      ? selectedStatus.filter((s) => s !== status)
      : [...selectedStatus, status];
    setSelectedStatus(updated);
    onFilterChange({
      ...filters,
      status: updated,
    });
  };

  const handleSourceToggle = (source: string) => {
    const updated = selectedSource.includes(source)
      ? selectedSource.filter((s) => s !== source)
      : [...selectedSource, source];
    setSelectedSource(updated);
    onFilterChange({
      ...filters,
      source: updated,
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onFilterChange({
      ...filters,
      search: value,
    });
  };

  const handleReset = () => {
    setSearch('');
    setSelectedStatus([]);
    setSelectedSource([]);
    onFilterChange({
      status: [],
      source: [],
      search: '',
    });
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      {/* Search */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Search by ticket number, name, or email..."
          value={search}
          onChange={handleSearchChange}
          variant="outlined"
          size="small"
        />
      </Box>

      {/* Status and Source Filters */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mb: 3 }}>
        {/* Status Filter */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
            Status
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {STATUS_OPTIONS.map((status) => (
              <Chip
                key={status.value}
                label={status.label}
                onClick={() => handleStatusToggle(status.value)}
                color={selectedStatus.includes(status.value) ? 'primary' : 'default'}
                variant={selectedStatus.includes(status.value) ? 'filled' : 'outlined'}
              />
            ))}
          </Box>
        </Box>

        {/* Source Filter */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
            Source
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {SOURCE_OPTIONS.map((source) => (
              <Chip
                key={source.value}
                label={source.label}
                onClick={() => handleSourceToggle(source.value)}
                color={selectedSource.includes(source.value) ? 'primary' : 'default'}
                variant={selectedSource.includes(source.value) ? 'filled' : 'outlined'}
              />
            ))}
          </Box>
        </Box>
      </Box>

      {/* Reset Button */}
      <Button
        startIcon={<ClearIcon />}
        onClick={handleReset}
        variant="outlined"
        color="inherit"
      >
        Clear Filters
      </Button>
    </Paper>
  );
}
