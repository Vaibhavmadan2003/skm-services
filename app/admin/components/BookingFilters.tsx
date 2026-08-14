'use client';

import React, { useState } from 'react';
import { Search, X, ChevronDown } from 'lucide-react';
import { useFilterData } from '../hooks/useFilterData';

export interface FilterState {
  search: string;
  bookingId: string;
  customerName: string;
  phoneNumber: string;
  branch: string;
  service: string;
  bookingStatus: string;
  paymentStatus: string;
  city: string;
  dateFrom: string;
  dateTo: string;
  sortBy: string;
}

interface BookingFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
}

export default function BookingFilters({ filters, onFilterChange, onReset }: BookingFiltersProps) {
  const [showDateRange, setShowDateRange] = useState(false);
  const { branches, services, cities, bookingStatuses, paymentStatuses, loading } = useFilterData();

  const handleChange = (key: keyof FilterState, value: string) => {
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
          placeholder="Search bookings by ID, customer name, or phone..."
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
        {/* Booking ID */}
        <input
          type="text"
          placeholder="Booking ID"
          value={filters.bookingId}
          onChange={(e) => handleChange('bookingId', e.target.value)}
          style={{
            padding: '10px 12px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '13px',
            outline: 'none',
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#0052cc')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e7eb')}
        />

        {/* Customer Name */}
        <input
          type="text"
          placeholder="Customer Name"
          value={filters.customerName}
          onChange={(e) => handleChange('customerName', e.target.value)}
          style={{
            padding: '10px 12px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '13px',
            outline: 'none',
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#0052cc')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e7eb')}
        />

        {/* Phone Number */}
        <input
          type="text"
          placeholder="Phone Number"
          value={filters.phoneNumber}
          onChange={(e) => handleChange('phoneNumber', e.target.value)}
          style={{
            padding: '10px 12px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '13px',
            outline: 'none',
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#0052cc')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e7eb')}
        />

        {/* Branch */}
        <select
          value={filters.branch}
          onChange={(e) => handleChange('branch', e.target.value)}
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
          <option value="">All Branches</option>
          {branches.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>

        {/* Service */}
        <select
          value={filters.service}
          onChange={(e) => handleChange('service', e.target.value)}
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
          <option value="">All Services</option>
          {services.map((s) => (
            <option key={s.id} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>

        {/* Booking Status */}
        <select
          value={filters.bookingStatus}
          onChange={(e) => handleChange('bookingStatus', e.target.value)}
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
          <option value="">All Booking Status</option>
          {bookingStatuses.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>

        {/* Payment Status */}
        <select
          value={filters.paymentStatus}
          onChange={(e) => handleChange('paymentStatus', e.target.value)}
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
          <option value="">All Payment Status</option>
          {paymentStatuses.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>

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
          <option value="">Sort By: Newest</option>
          <option value="oldest">Oldest</option>
          <option value="amount_high">Amount: High to Low</option>
          <option value="amount_low">Amount: Low to High</option>
        </select>
      </div>

      {/* Date range (optional) */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
        <input
          type="date"
          value={filters.dateFrom}
          onChange={(e) => handleChange('dateFrom', e.target.value)}
          style={{
            padding: '10px 12px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '13px',
            outline: 'none',
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#0052cc')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e7eb')}
        />
        <span style={{ color: '#9ca3af' }}>to</span>
        <input
          type="date"
          value={filters.dateTo}
          onChange={(e) => handleChange('dateTo', e.target.value)}
          style={{
            padding: '10px 12px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '13px',
            outline: 'none',
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#0052cc')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e7eb')}
        />

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
