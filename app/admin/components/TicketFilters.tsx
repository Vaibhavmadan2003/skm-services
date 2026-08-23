'use client';

import React from 'react';
import {
  Box,
  Chip,
  Button,
  TextField,
  Stack,
  Typography,
  Paper,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

interface Filters {
  status?: string[];
  source?: string[];
  search?: string;
}

interface TicketFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
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
  const [searchValue, setSearchValue] = React.useState(filters.search || '');

  const handleStatusToggle = (status: string) => {
    const currentStatuses = filters.status || [];
    const newStatuses = currentStatuses.includes(status)
      ? currentStatuses.filter(s => s !== status)
      : [...currentStatuses, status];

    onFilterChange({
      ...filters,
      status: newStatuses.length > 0 ? newStatuses : undefined,
    });
  };

  const handleSourceToggle = (source: string) => {
    const currentSources = filters.source || [];
    const newSources = currentSources.includes(source)
      ? currentSources.filter(s => s !== source)
      : [...currentSources, source];

    onFilterChange({
      ...filters,
      source: newSources.length > 0 ? newSources : undefined,
    });
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
    onFilterChange({
      ...filters,
      search: value || undefined,
    });
  };

  const handleResetFilters = () => {
    setSearchValue('');
    onFilterChange({
      status: undefined,
      source: undefined,
      search: undefined,
    });
  };

  const hasActiveFilters = (filters.status?.length || 0) > 0 || 
                           (filters.source?.length || 0) > 0 || 
                           !!filters.search;

  return (
    <Paper sx={{ p: 3, mb: 3, backgroundColor: '#fafafa' }}>
      <Stack spacing={3}>
        {/* Search */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: '600' }}>
            Search
          </Typography>
          <TextField
            placeholder="Search by ticket #, name, or email..."
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            size="small"
            fullWidth
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'white',
              },
            }}
          />
        </Box>

        {/* Status Filter */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: '600' }}>
            Status
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {STATUS_OPTIONS.map((status) => (
              <Chip
                key={status.value}
                label={status.label}
                onClick={() => handleStatusToggle(status.value)}
                variant={(filters.status?.includes(status.value)) ? 'filled' : 'outlined'}
                color={(filters.status?.includes(status.value)) ? 'primary' : 'default'}
                size="small"
              />
            ))}
          </Box>
        </Box>

        {/* Source Filter */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: '600' }}>
            Source
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {SOURCE_OPTIONS.map((source) => (
              <Chip
                key={source.value}
                label={source.label}
                onClick={() => handleSourceToggle(source.value)}
                variant={(filters.source?.includes(source.value)) ? 'filled' : 'outlined'}
                color={(filters.source?.includes(source.value)) ? 'primary' : 'default'}
                size="small"
              />
            ))}
          </Box>
        </Box>

        {/* Reset Button */}
        {hasActiveFilters && (
          <Box>
            <Button
              variant="outlined"
              size="small"
              startIcon={<ClearIcon />}
              onClick={handleResetFilters}
              sx={{ textTransform: 'none' }}
            >
              Reset Filters
            </Button>
          </Box>
        )}
      </Stack>
    </Paper>
  );
}
