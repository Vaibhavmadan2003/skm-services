'use client';

import React, { useState } from 'react';
import { Branch } from '../lib/mock-branches';
import BranchStatusBadge from './BranchStatusBadge';
import { Eye, Download, MoreVertical, Pause, Trash2 } from 'lucide-react';

interface BranchesTableProps {
  branches: Branch[];
  onRowClick: (branch: Branch) => void;
  onViewBookings: (branch: Branch) => void;
  onDownloadReport: (branch: Branch) => void;
  onSuspend?: (branch: Branch) => void;
  onDelete?: (branch: Branch) => void;
}

export default function BranchesTable({
  branches,
  onRowClick,
  onViewBookings,
  onDownloadReport,
  onSuspend,
  onDelete,
}: BranchesTableProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  if (branches.length === 0) {
    return (
      <div
        style={{
          background: 'white',
          borderRadius: '12px',
          border: '1px solid #e5e7eb',
          padding: '60px 40px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }}>📭</div>
        <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>No branches found</p>
      </div>
    );
  }

  return (
    <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
      {/* Table Wrapper */}
      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '13px',
          }}
        >
          {/* Table Header */}
          <thead>
            <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Branch Name</th>
              <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Manager</th>
              <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>City</th>
              <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Phone</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '600', color: '#374151' }}>Today's Bookings</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '600', color: '#374151' }}>Monthly Bookings</th>
              <th style={{ padding: '16px', textAlign: 'right', fontWeight: '600', color: '#374151' }}>Monthly Revenue</th>
              <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>Settlement</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '600', color: '#374151' }}>Rating</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '600', color: '#374151' }}>Status</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: '600', color: '#374151' }}>Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {branches.map((branch, index) => {
              const settlementConfig = {
                pending: { bg: '#fef3c7', color: '#92400e', label: '⏳ Pending' },
                completed: { bg: '#dcfce7', color: '#166534', label: '✓ Completed' },
                partial: { bg: '#fce7f3', color: '#be185d', label: '○ Partial' },
              };
              const settlementColors = settlementConfig[branch.settlementStatus];

              return (
                <tr
                  key={branch.id}
                  onClick={() => onRowClick(branch)}
                  style={{
                    borderBottom: '1px solid #e5e7eb',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                    background: index % 2 === 0 ? 'white' : '#fafbfc',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f3f4f6';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = index % 2 === 0 ? 'white' : '#fafbfc';
                  }}
                >
                  {/* Branch Name */}
                  <td style={{ padding: '16px', color: '#111827', fontWeight: '500' }}>{branch.name}</td>

                  {/* Manager */}
                  <td style={{ padding: '16px', color: '#6b7280' }}>{branch.managerName}</td>

                  {/* City */}
                  <td style={{ padding: '16px', color: '#6b7280' }}>{branch.city}</td>

                  {/* Phone */}
                  <td style={{ padding: '16px', color: '#6b7280' }}>{branch.phone}</td>

                  {/* Today's Bookings */}
                  <td style={{ padding: '16px', textAlign: 'center', color: '#111827', fontWeight: '500' }}>
                    {branch.todaysBookings}
                  </td>

                  {/* Monthly Bookings */}
                  <td style={{ padding: '16px', textAlign: 'center', color: '#111827', fontWeight: '500' }}>
                    {branch.monthlyBookings}
                  </td>

                  {/* Monthly Revenue */}
                  <td style={{ padding: '16px', textAlign: 'right', color: '#059669', fontWeight: '600' }}>
                    QAR {branch.monthlyRevenue.toLocaleString()}
                  </td>

                  {/* Settlement Status */}
                  <td style={{ padding: '16px' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '6px 10px',
                        background: settlementColors.bg,
                        color: settlementColors.color,
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: '600',
                      }}
                    >
                      {settlementColors.label}
                    </span>
                  </td>

                  {/* Customer Rating */}
                  <td style={{ padding: '16px', textAlign: 'center', color: '#f59e0b', fontWeight: '600' }}>
                    ⭐ {branch.customerRating.toFixed(1)}
                  </td>

                  {/* Status */}
                  <td style={{ padding: '16px', textAlign: 'center' }}>
                    <BranchStatusBadge status={branch.status} />
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '16px', textAlign: 'center', position: 'relative' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(openMenuId === branch.id ? null : branch.id);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '32px',
                        height: '32px',
                        background: 'transparent',
                        border: 'none',
                        borderRadius: '6px',
                        color: '#6b7280',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#f3f4f6';
                        e.currentTarget.style.color = '#111827';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = '#6b7280';
                      }}
                      title="Actions"
                    >
                      <MoreVertical size={18} />
                    </button>

                    {/* Dropdown Menu */}
                    {openMenuId === branch.id && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '100%',
                          right: '0',
                          marginTop: '4px',
                          background: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                          zIndex: 100,
                          minWidth: '200px',
                          overflow: 'hidden',
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          onClick={() => {
                            onRowClick(branch);
                            setOpenMenuId(null);
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            width: '100%',
                            padding: '12px 16px',
                            background: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '13px',
                            color: '#111827',
                            textAlign: 'left',
                            transition: 'all 0.2s',
                            borderBottom: '1px solid #f3f4f6',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#f9fafb';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'white';
                          }}
                        >
                          <Eye size={16} style={{ color: '#0284c7' }} />
                          View Details
                        </button>

                        <button
                          onClick={() => {
                            onDownloadReport(branch);
                            setOpenMenuId(null);
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            width: '100%',
                            padding: '12px 16px',
                            background: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '13px',
                            color: '#111827',
                            textAlign: 'left',
                            transition: 'all 0.2s',
                            borderBottom: '1px solid #f3f4f6',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#f9fafb';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'white';
                          }}
                        >
                          <Download size={16} style={{ color: '#f59e0b' }} />
                          Download Report
                        </button>

                        {branch.status === 'active' && (
                          <button
                            onClick={() => {
                              if (onSuspend) {
                                onSuspend(branch);
                              }
                              setOpenMenuId(null);
                            }}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px',
                              width: '100%',
                              padding: '12px 16px',
                              background: 'white',
                              border: 'none',
                              cursor: 'pointer',
                              fontSize: '13px',
                              color: '#92400e',
                              textAlign: 'left',
                              transition: 'all 0.2s',
                              borderBottom: '1px solid #f3f4f6',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = '#fef3c7';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'white';
                            }}
                          >
                            <Pause size={16} />
                            Suspend Branch
                          </button>
                        )}

                        {branch.status === 'suspended' && (
                          <button
                            onClick={() => {
                              if (onSuspend) {
                                onSuspend(branch);
                              }
                              setOpenMenuId(null);
                            }}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px',
                              width: '100%',
                              padding: '12px 16px',
                              background: 'white',
                              border: 'none',
                              cursor: 'pointer',
                              fontSize: '13px',
                              color: '#059669',
                              textAlign: 'left',
                              transition: 'all 0.2s',
                              borderBottom: '1px solid #f3f4f6',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = '#dcfce7';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'white';
                            }}
                          >
                            <Pause size={16} />
                            Activate Branch
                          </button>
                        )}

                        <button
                          onClick={() => {
                            if (onDelete) {
                              onDelete(branch);
                            }
                            setOpenMenuId(null);
                          }}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            width: '100%',
                            padding: '12px 16px',
                            background: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '13px',
                            color: '#dc2626',
                            textAlign: 'left',
                            transition: 'all 0.2s',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#fee2e2';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'white';
                          }}
                        >
                          <Trash2 size={16} />
                          Delete Branch
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
