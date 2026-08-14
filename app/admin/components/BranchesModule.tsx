'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Download, Plus } from 'lucide-react';
import BranchSummaryCards from './BranchSummaryCards';
import BranchFilters, { BranchFilterState } from './BranchFilters';
import BranchesTable from './BranchesTable';
import BranchDetailsDrawer from './BranchDetailsDrawer';
import { Branch } from '../lib/mock-branches';

interface BranchesModuleProps {
  onBranchSelect?: (branch: Branch) => void;
}

export default function BranchesModule({ onBranchSelect }: BranchesModuleProps) {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string | null>(null);
  const [filters, setFilters] = useState<BranchFilterState>({
    search: '',
    city: '',
    status: '',
    manager: '',
    sortBy: '',
  });

  // Fetch branches from Supabase
  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/branches');
      const result = await response.json();
      
      if (result.success) {
        setBranches(result.data);
      } else {
        console.error('Failed to fetch branches:', result.error);
      }
    } catch (error) {
      console.error('Error fetching branches:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter and sort branches
  const filteredBranches = useMemo(() => {
    let result = [...branches];

    // Search
    if (filters.search) {
      const search = filters.search.toLowerCase();
      result = result.filter(
        (branch) =>
          branch.name.toLowerCase().includes(search) ||
          branch.managerName.toLowerCase().includes(search) ||
          branch.email.toLowerCase().includes(search)
      );
    }

    // City filter
    if (filters.city) {
      result = result.filter((branch) => branch.city === filters.city);
    }

    // Status filter (from summary card or from dropdown)
    if (selectedStatusFilter) {
      result = result.filter((branch) => branch.status === selectedStatusFilter);
    }
    if (filters.status) {
      result = result.filter((branch) => branch.status === filters.status);
    }

    // Manager filter
    if (filters.manager) {
      result = result.filter((branch) => branch.managerId === filters.manager);
    }

    // Sort
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'revenue_high':
          result.sort((a, b) => b.monthlyRevenue - a.monthlyRevenue);
          break;
        case 'revenue_low':
          result.sort((a, b) => a.monthlyRevenue - b.monthlyRevenue);
          break;
        case 'bookings_high':
          result.sort((a, b) => b.monthlyBookings - a.monthlyBookings);
          break;
        case 'rating_high':
          result.sort((a, b) => b.customerRating - a.customerRating);
          break;
        case 'newest':
          result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        default:
          result.sort((a, b) => a.name.localeCompare(b.name));
      }
    } else {
      // Default sort by name
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [filters, selectedStatusFilter, branches]);

  const handleResetFilters = () => {
    setFilters({
      search: '',
      city: '',
      status: '',
      manager: '',
      sortBy: '',
    });
    setSelectedStatusFilter(null);
  };

  const handleSummaryCardClick = (filter: string | null) => {
    setSelectedStatusFilter(filter);
  };

  const handleBranchSelect = (branch: Branch) => {
    setSelectedBranch(branch);
    if (onBranchSelect) {
      onBranchSelect(branch);
    }
  };

  const handleEdit = (branch: Branch) => {
    alert(`Edit functionality for ${branch.name} will be implemented`);
  };

  const handleViewBookings = (branch: Branch) => {
    alert(`View bookings for ${branch.name} - redirecting to bookings view with filter`);
  };

  const handleDownloadReport = (branch: Branch) => {
    alert(`Downloading settlement report for ${branch.name}...`);
  };

  const handleSuspend = (branch: Branch) => {
    if (branch.status === 'active') {
      const confirmed = window.confirm(`Suspend branch ${branch.name}? This will prevent new bookings from being assigned.`);
      if (confirmed) {
        updateBranchStatus(branch.id, false);
      }
    } else {
      const confirmed = window.confirm(`Activate branch ${branch.name}? This will allow bookings to be assigned again.`);
      if (confirmed) {
        updateBranchStatus(branch.id, true);
      }
    }
  };

  const updateBranchStatus = async (branchId: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/branches/${branchId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: isActive }),
      });

      const result = await response.json();
      if (result.success) {
        // Update local state
        const newStatus: 'active' | 'suspended' = isActive ? 'active' : 'suspended';
        const updatedBranches = branches.map((b) =>
          b.id === branchId ? { ...b, status: newStatus } : b
        );
        setBranches(updatedBranches);
        setSelectedBranch(null);
        alert(`Branch has been ${isActive ? 'activated' : 'suspended'}.`);
      } else {
        alert(`Failed to update branch: ${result.error}`);
      }
    } catch (error) {
      console.error('Error updating branch status:', error);
      alert('Error updating branch status');
    }
  };

  const handleDelete = (branch: Branch) => {
    const confirmed = window.confirm(
      `Delete branch ${branch.name}? This action cannot be undone. All branch data will be permanently removed.`
    );
    if (confirmed) {
      deleteBranch(branch.id);
    }
  };

  const deleteBranch = async (branchId: string) => {
    try {
      const response = await fetch(`/api/branches/${branchId}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      if (result.success) {
        const updatedBranches = branches.filter((b) => b.id !== branchId);
        setBranches(updatedBranches);
        setSelectedBranch(null);
        alert('Branch has been deleted.');
      } else {
        alert(`Failed to delete branch: ${result.error}`);
      }
    } catch (error) {
      console.error('Error deleting branch:', error);
      alert('Error deleting branch');
    }
  };

  const handleCreateBranch = () => {
    alert('Create Branch modal will be implemented');
  };

  const handleExport = () => {
    alert('Export functionality will be implemented');
  };

  return (
    <div style={{ padding: '32px', background: '#f9fafb', minHeight: '100vh' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', margin: 0 }}>Branches</h1>
            <p style={{ fontSize: '14px', color: '#6b7280', margin: '8px 0 0 0' }}>
              Manage all company branches from one centralized dashboard
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={handleExport}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                background: '#f3f4f6',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600',
                color: '#374151',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#e5e7eb';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f3f4f6';
              }}
            >
              <Download size={16} />
              Export
            </button>
            <button
              onClick={handleCreateBranch}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                background: '#0052cc',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#0047b2';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#0052cc';
              }}
            >
              <Plus size={16} />
              Create Branch
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '60px 40px', textAlign: 'center' }}>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Loading branches...</div>
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <BranchSummaryCards branches={branches} selectedFilter={selectedStatusFilter} onFilterChange={handleSummaryCardClick} />

          {/* Filters */}
          <BranchFilters filters={filters} onFilterChange={setFilters} onReset={handleResetFilters} />

          {/* Branches Table */}
          <BranchesTable
            branches={filteredBranches}
            onRowClick={handleBranchSelect}
            onViewBookings={handleViewBookings}
            onDownloadReport={handleDownloadReport}
            onSuspend={handleSuspend}
            onDelete={handleDelete}
          />
        </>
      )}

      {/* Branch Details Drawer */}
      {selectedBranch && (
        <>
          <BranchDetailsDrawer branch={selectedBranch} onClose={() => setSelectedBranch(null)} />
          {/* Overlay */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              zIndex: 999,
            }}
            onClick={() => setSelectedBranch(null)}
          />
        </>
      )}
    </div>
  );
}
