'use client';

import React, { useState, useEffect } from 'react';
import { Branch } from '../../lib/mock-branches';

interface BranchOverviewTabProps {
  branch: Branch;
}

interface BranchStats {
  branchId: string;
  servicesCount: number;
  staffCount: number;
  driversCount: number;
  staffRatingAvg: number;
  driverRatingAvg: number;
  branchStatus: string;
  branchName: string;
  monthlyRevenue: number;
}

interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: string;
  availability: string;
}

export default function BranchOverviewTab({ branch }: BranchOverviewTabProps) {
  const [stats, setStats] = useState<BranchStats | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch stats
        const statsResponse = await fetch(`/api/admin/branches/stats?branch_id=${branch.id}`);
        if (!statsResponse.ok) throw new Error('Failed to fetch stats');
        const statsData = await statsResponse.json();
        setStats(statsData);

        // Fetch services
        const servicesResponse = await fetch(`/api/branch/services?branch_id=${branch.id}`);
        if (!servicesResponse.ok) throw new Error('Failed to fetch services');
        const servicesData = await servicesResponse.json();
        setServices(servicesData.services || []);
      } catch (err) {
        console.error('Error fetching branch data:', err);
        setError('Failed to load branch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [branch.id]);

  return (
    <div>
      {/* Branch Information */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', marginBottom: '16px', margin: '0 0 16px 0' }}>
          Branch Information
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <p style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '600', margin: 0, marginBottom: '4px' }}>BRANCH NAME</p>
            <p style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: 0 }}>{branch.name}</p>
          </div>
          <div>
            <p style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '600', margin: 0, marginBottom: '4px' }}>CREATED</p>
            <p style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: 0 }}>{new Date(branch.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', marginBottom: '16px', margin: '0 0 16px 0' }}>
          Contact Information
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <p style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '600', margin: 0, marginBottom: '4px' }}>EMAIL</p>
            <p style={{ fontSize: '14px', fontWeight: '600', color: '#0052cc', margin: 0 }}>{branch.email}</p>
          </div>
          <div>
            <p style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '600', margin: 0, marginBottom: '4px' }}>PHONE</p>
            <p style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: 0 }}>{branch.phone}</p>
          </div>
        </div>
      </div>

      {/* Address */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', marginBottom: '16px', margin: '0 0 16px 0' }}>
          Address
        </h3>
        <p style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: 0, lineHeight: '1.6' }}>
          {branch.address}
          <br />
          {branch.city}
        </p>
      </div>

      {/* Working Hours */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', marginBottom: '16px', margin: '0 0 16px 0' }}>
          Working Hours
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <p style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '600', margin: 0, marginBottom: '4px' }}>START TIME</p>
            <p style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: 0 }}>{branch.workingHoursStart}</p>
          </div>
          <div>
            <p style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '600', margin: 0, marginBottom: '4px' }}>END TIME</p>
            <p style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: 0 }}>{branch.workingHoursEnd}</p>
          </div>
        </div>
      </div>

      {/* Manager Information */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', marginBottom: '16px', margin: '0 0 16px 0' }}>
          Manager Information
        </h3>
        <div>
          <p style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '600', margin: 0, marginBottom: '4px' }}>MANAGER NAME</p>
          <p style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: 0 }}>{branch.managerName}</p>
        </div>
      </div>

      {/* Quick Statistics */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', marginBottom: '16px', margin: '0 0 16px 0' }}>
          Module Statistics (From Branch Dashboard)
        </h3>
        {loading ? (
          <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>Loading statistics...</p>
        ) : error ? (
          <p style={{ fontSize: '13px', color: '#ef4444', margin: 0 }}>{error}</p>
        ) : stats ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <p style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '600', margin: 0, marginBottom: '4px' }}>SERVICES</p>
              <p style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: 0 }}>{stats.servicesCount}</p>
            </div>
            <div>
              <p style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '600', margin: 0, marginBottom: '4px' }}>STAFF MEMBERS</p>
              <p style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: 0 }}>{stats.staffCount}</p>
            </div>
            <div>
              <p style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '600', margin: 0, marginBottom: '4px' }}>DRIVERS</p>
              <p style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: 0 }}>{stats.driversCount}</p>
            </div>
            <div>
              <p style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '600', margin: 0, marginBottom: '4px' }}>AVG STAFF RATING</p>
              <p style={{ fontSize: '16px', fontWeight: '700', color: '#f59e0b', margin: 0 }}>⭐ {stats.staffRatingAvg.toFixed(1)}</p>
            </div>
            <div>
              <p style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '600', margin: 0, marginBottom: '4px' }}>AVG DRIVER RATING</p>
              <p style={{ fontSize: '16px', fontWeight: '700', color: '#f59e0b', margin: 0 }}>⭐ {stats.driverRatingAvg.toFixed(1)}</p>
            </div>
            <div>
              <p style={{ fontSize: '11px', color: '#9ca3af', fontWeight: '600', margin: 0, marginBottom: '4px' }}>MONTHLY REVENUE</p>
              <p style={{ fontSize: '16px', fontWeight: '700', color: '#059669', margin: 0 }}>QAR {stats.monthlyRevenue.toLocaleString()}</p>
            </div>
          </div>
        ) : null}
      </div>

      {/* Services Offered */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '12px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', marginBottom: '16px', margin: '0 0 16px 0' }}>
          Services Offered
        </h3>
        {loading ? (
          <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>Loading services...</p>
        ) : services.length === 0 ? (
          <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>No services added yet</p>
        ) : (
          <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                  <th style={{ textAlign: 'left', padding: '12px', fontSize: '11px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                    Service Name
                  </th>
                  <th style={{ textAlign: 'left', padding: '12px', fontSize: '11px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                    Category
                  </th>
                  <th style={{ textAlign: 'left', padding: '12px', fontSize: '11px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                    Price
                  </th>
                  <th style={{ textAlign: 'left', padding: '12px', fontSize: '11px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                    Duration
                  </th>
                  <th style={{ textAlign: 'left', padding: '12px', fontSize: '11px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {services.map((service, idx) => (
                  <tr key={service.id} style={{ borderBottom: idx < services.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                    <td style={{ padding: '12px', fontSize: '13px', fontWeight: '600', color: '#111827' }}>
                      {service.name}
                    </td>
                    <td style={{ padding: '12px', fontSize: '13px', color: '#6b7280' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        background: '#f0f4ff',
                        color: '#0052cc',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        {service.category}
                      </span>
                    </td>
                    <td style={{ padding: '12px', fontSize: '13px', fontWeight: '600', color: '#059669' }}>
                      QAR {service.price}
                    </td>
                    <td style={{ padding: '12px', fontSize: '13px', color: '#6b7280' }}>
                      {service.duration}
                    </td>
                    <td style={{ padding: '12px', fontSize: '13px' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        background: service.availability === 'available' ? '#d1fae5' : '#fee2e2',
                        color: service.availability === 'available' ? '#065f46' : '#991b1b',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        {service.availability === 'available' ? '✓ Available' : '✗ Unavailable'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
