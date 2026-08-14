'use client';

import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useFilterData } from '../hooks/useFilterData';

export interface BranchFilterState {
  search: string;
  city: string;
  status: string;
  manager: string;
  sortBy: string;
}

interface BranchFiltersProps {
  filters: BranchFilterState;
  onFilterChange: (filters: BranchFilterState) => void;
  onReset: () => void;
}

function BranchFilters({ filters, onFilterChange, onReset }: BranchFiltersProps) {
  const { cities, managers, loading } = useFilterData();

  const handleChange = (key: keyof BranchFilterState, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const hasActiveFilters = Object.values(filters).some((v) => v !== '');

  return (
    <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '20px', marginBottom: '24px' }}>
      {/* Search bar */}
      <div style={{ marginBottom: '16px', position: 'relative' }}>
        <Search size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#9ca3af' }} />
        <input
          type="text"
          placeholder="Search branches by name, manager, or email..."
          value={filters.search}
          onChange={(e) => handleChange('search', e.target.value)}
          style={{
            width: '100%',
            padding: '10px 16px 10px 40px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '14px',
            outline: 'none',
            transition: 'all 0.2s',
            boxSizing: 'border-box',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = '#0052cc';
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0, 82, 204, 0.1)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = '#e5e7eb';
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
      </div>

      {/* Filter grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '16px' }}>
        {/* City */}
        <select
          value={filters.city}
          onChange={(e) => handleChange('city', e.target.value)}
          disabled={loading}
          style={{
            padding: '10px 12px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '13px',
            outline: 'none',
            background: 'white',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.5 : 1,
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#0052cc')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e7eb')}
        >
          <option value="">All Cities</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {/* Status */}
        <select
          value={filters.status}
          onChange={(e) => handleChange('status', e.target.value)}
          style={{
            padding: '10px 12px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '13px',
            outline: 'none',
            background: 'white',
            cursor: 'pointer',
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#0052cc')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e7eb')}
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
        </select>

        {/* Manager */}
        <select
          value={filters.manager}
          onChange={(e) => handleChange('manager', e.target.value)}
          disabled={loading}
          style={{
            padding: '10px 12px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '13px',
            outline: 'none',
            background: 'white',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.5 : 1,
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#0052cc')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e7eb')}
        >
          <option value="">All Managers</option>
          {managers.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>

        {/* Sort By */}
        <select
          value={filters.sortBy}
          onChange={(e) => handleChange('sortBy', e.target.value)}
          style={{
            padding: '10px 12px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '13px',
            outline: 'none',
            background: 'white',
            cursor: 'pointer',
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#0052cc')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e7eb')}
        >
          <option value="">Sort By: Name A-Z</option>
          <option value="revenue_high">Revenue: High to Low</option>
          <option value="revenue_low">Revenue: Low to High</option>
          <option value="bookings_high">Bookings: High to Low</option>
          <option value="rating_high">Rating: High to Low</option>
          <option value="newest">Newest First</option>
        </select>

        {/* Reset button */}
        {hasActiveFilters && (
          <button
            onClick={onReset}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '10px 16px',
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '8px',
              color: '#dc2626',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '500',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#fee2e2')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#fef2f2')}
          >
            <X size={16} />
            Reset Filters
          </button>
        )}
      </div>
    </div>
  );
}

export default BranchFilters;
