'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Phone, Mail, AlertCircle, CheckCircle, Upload } from 'lucide-react';

interface StaffMember {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  status: 'active' | 'inactive';
  specialization: string;
  rating: number;
  photo_url?: string;
}

export default function StaffPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [branchId, setBranchId] = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const [modalForm, setModalForm] = useState({
    name: '',
    role: '',
    phone: '',
    email: '',
    specialization: '',
    status: 'active' as 'active' | 'inactive',
    rating: '',
    photo_url: ''
  });

  // Get branch ID from session
  useEffect(() => {
    try {
      const branchData = sessionStorage.getItem('branchData');
      if (branchData) {
        const branch = JSON.parse(branchData);
        setBranchId(branch.id);
      }
    } catch (error) {
      console.error('Error getting branch data:', error);
    }
  }, []);

  // Fetch staff
  useEffect(() => {
    if (!branchId) return;
    
    const fetchStaff = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/branch/staff?branch_id=${branchId}`);
        
        if (!response.ok) throw new Error('Failed to fetch staff');
        
        const data = await response.json();
        setStaff(data.staff || []);
      } catch (error) {
        console.error('Fetch error:', error);
        setAlert({ type: 'error', message: 'Failed to load staff' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchStaff();
  }, [branchId]);

  const filteredStaff = staff.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.specialization?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClick = () => {
    setEditingStaff(null);
    setModalForm({ name: '', role: '', phone: '', email: '', specialization: '', status: 'active', rating: '', photo_url: '' });
    setPhotoPreview(null);
    setShowModal(true);
  };

  const handleEditClick = (member: StaffMember) => {
    setEditingStaff(member);
    setModalForm({
      name: member.name,
      role: member.role,
      phone: member.phone || '',
      email: member.email || '',
      specialization: member.specialization || '',
      status: member.status,
      rating: member.rating.toString(),
      photo_url: member.photo_url || ''
    });
    setPhotoPreview(member.photo_url || null);
    setShowModal(true);
  };

  const handleDeleteClick = (member: StaffMember) => {
    if (!window.confirm(`Are you sure you want to remove "${member.name}"?`)) return;
    handleDelete(member.id);
  };

  const handleDelete = async (staffId: string) => {
    try {
      const response = await fetch(`/api/branch/staff/${staffId}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete staff member');

      setStaff(staff.filter(s => s.id !== staffId));
      setAlert({ type: 'success', message: 'Staff member removed successfully' });
      setTimeout(() => setAlert(null), 3000);
    } catch (error) {
      console.error('Delete error:', error);
      setAlert({ type: 'error', message: 'Failed to remove staff member' });
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !branchId) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('branch_id', branchId);

      const response = await fetch('/api/partner/upload/staff', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      setModalForm({ ...modalForm, photo_url: data.url });
      setPhotoPreview(data.url);
    } catch (error) {
      console.error('Upload error:', error);
      setAlert({ type: 'error', message: 'Failed to upload photo' });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!branchId || !modalForm.name || !modalForm.role) {
      setAlert({ type: 'error', message: 'Please fill all required fields' });
      return;
    }

    try {
      if (editingStaff) {
        // Update
        const response = await fetch(`/api/branch/staff/${editingStaff.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: modalForm.name,
            role: modalForm.role,
            phone: modalForm.phone || null,
            email: modalForm.email || null,
            specialization: modalForm.specialization || null,
            status: modalForm.status,
            photo_url: modalForm.photo_url || null,
            rating: parseFloat(modalForm.rating) || 0
          })
        });

        if (!response.ok) throw new Error('Failed to update staff member');

        const { staff: updatedStaff } = await response.json();
        setStaff(staff.map(s => s.id === editingStaff.id ? updatedStaff : s));
        setAlert({ type: 'success', message: 'Staff member updated successfully' });
      } else {
        // Create
        const response = await fetch('/api/branch/staff', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            branch_id: branchId,
            name: modalForm.name,
            role: modalForm.role,
            phone: modalForm.phone || null,
            email: modalForm.email || null,
            specialization: modalForm.specialization || null,
            status: modalForm.status,
            photo_url: modalForm.photo_url || null,
            rating: parseFloat(modalForm.rating) || 0
          })
        });

        if (!response.ok) throw new Error('Failed to create staff member');

        const { staff: newStaff } = await response.json();
        setStaff([newStaff, ...staff]);
        setAlert({ type: 'success', message: 'Staff member added successfully' });
      }

      setShowModal(false);
      setTimeout(() => setAlert(null), 3000);
    } catch (error) {
      console.error('Submit error:', error);
      setAlert({ type: 'error', message: editingStaff ? 'Failed to update staff member' : 'Failed to add staff member' });
    }
  };

  if (!branchId || isLoading) {
    return (
      <div style={{ padding: '32px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', width: '48px', height: '48px', border: '4px solid #e5e7eb', borderTop: '4px solid #0052CC', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <p style={{ marginTop: '16px', color: '#6b7280' }}>Loading staff...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '32px' }}>
      {/* Alerts */}
      {alert && (
        <div style={{
          marginBottom: '24px',
          padding: '12px 16px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: alert.type === 'success' ? '#d1fae5' : '#fee2e2',
          border: `1px solid ${alert.type === 'success' ? '#6ee7b7' : '#fecaca'}`
        }}>
          {alert.type === 'success' ? (
            <CheckCircle size={18} style={{ color: '#059669' }} />
          ) : (
            <AlertCircle size={18} style={{ color: '#dc2626' }} />
          )}
          <span style={{ color: alert.type === 'success' ? '#065f46' : '#991b1b', fontSize: '14px' }}>
            {alert.message}
          </span>
        </div>
      )}

      {/* Page Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#111827', margin: 0 }}>
          Staff
        </h1>
        <p style={{ fontSize: '14px', color: '#6b7280', margin: '8px 0 0 0' }}>
          Manage your team members and their assignments
        </p>
      </div>

      {/* Toolbar */}
      <div style={{
        display: 'flex',
        gap: '16px',
        marginBottom: '24px',
        alignItems: 'center'
      }}>
        {/* Search Box */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flex: '1 1 auto',
          minWidth: '200px',
          padding: '0 12px',
          borderRadius: '8px',
          border: '1px solid #e5e7eb',
          background: 'white'
        }}>
          <Search size={18} style={{ color: '#9ca3af' }} />
          <input
            type="text"
            placeholder="Search staff..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              padding: '10px 0',
              fontSize: '14px',
              fontFamily: 'inherit'
            }}
          />
        </div>

        {/* Add Staff Button */}
        <button
          onClick={handleAddClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            background: 'linear-gradient(135deg, #0052CC 0%, #003D99 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 82, 204, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <Plus size={18} />
          <span>Add Staff Member</span>
        </button>
      </div>

      {/* Staff Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '20px'
      }}>
        {filteredStaff.length > 0 ? (
          filteredStaff.map((member) => (
            <div
              key={member.id}
              style={{
                background: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {/* Profile Photo */}
              <div style={{
                width: '100%',
                height: '200px',
                background: member.photo_url ? 'transparent' : 'linear-gradient(135deg, #0052CC 0%, #003D99 100%)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
                overflow: 'hidden'
              }}>
                {member.photo_url ? (
                  <img 
                    src={member.photo_url} 
                    alt={member.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center'
                    }}
                  />
                ) : (
                  <span style={{ fontSize: '48px', fontWeight: 'bold', color: 'white' }}>
                    {member.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              {/* Profile Header */}
              <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'start', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: 0 }}>
                    {member.name}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#6b7280', margin: '4px 0 0 0' }}>
                    {member.role}
                  </p>
                </div>
                <span style={{
                  display: 'inline-block',
                  padding: '4px 12px',
                  background: member.status === 'active' ? '#d1fae5' : '#fee2e2',
                  color: member.status === 'active' ? '#065f46' : '#991b1b',
                  borderRadius: '6px',
                  fontSize: '11px',
                  fontWeight: '600',
                  textTransform: 'capitalize'
                }}>
                  {member.status}
                </span>
              </div>

              {/* Specialization */}
              <div style={{
                padding: '12px',
                background: '#f0f6ff',
                border: '1px solid #dbeafe',
                borderRadius: '8px',
                marginBottom: '16px'
              }}>
                <p style={{ fontSize: '12px', color: '#1e40af', fontWeight: '600', margin: 0 }}>
                  🎯 {member.specialization}
                </p>
              </div>

              {/* Contact Info */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                marginBottom: '16px',
                padding: '12px 0',
                borderTop: '1px solid #f3f4f6',
                borderBottom: '1px solid #f3f4f6'
              }}>
                {member.phone && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Phone size={16} style={{ color: '#6b7280' }} />
                    <span style={{ fontSize: '13px', color: '#6b7280' }}>{member.phone}</span>
                  </div>
                )}
                {member.email && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Mail size={16} style={{ color: '#6b7280' }} />
                    <span style={{ fontSize: '13px', color: '#6b7280' }}>{member.email}</span>
                  </div>
                )}
              </div>

              {/* Rating */}
              <div style={{
                background: '#fef3c7',
                border: '1px solid #fcd34d',
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '16px',
                textAlign: 'center'
              }}>
                <p style={{ fontSize: '13px', color: '#92400e', fontWeight: '600', margin: 0 }}>
                  ⭐ {member.rating} / 5.0
                </p>
              </div>

              {/* Actions */}
              <div style={{
                display: 'flex',
                gap: '8px'
              }}>
                <button
                  onClick={() => handleEditClick(member)}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '8px 12px',
                    border: '1px solid #e5e7eb',
                    background: 'white',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#0052CC',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f0f6ff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'white';
                  }}
                >
                  <Edit size={16} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDeleteClick(member)}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '8px 12px',
                    border: '1px solid #fecaca',
                    background: '#fef2f2',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#dc2626',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#fee2e2';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#fef2f2';
                  }}
                >
                  <Trash2 size={16} />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div style={{
            gridColumn: '1 / -1',
            padding: '48px 24px',
            textAlign: 'center',
            color: '#6b7280'
          }}>
            <p style={{ fontSize: '14px', margin: 0 }}>No staff members found</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          overflowY: 'auto'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '32px',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            margin: 'auto'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: '0 0 24px 0' }}>
              {editingStaff ? 'Edit Staff Member' : 'Add Staff Member'}
            </h2>

            <form onSubmit={handleSubmit}>
              {/* Photo Upload - Optional */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>
                  Photo (Optional)
                </label>
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'start'
                }}>
                  {/* Photo Preview */}
                  <div style={{
                    width: '100px',
                    height: '100px',
                    background: photoPreview ? 'transparent' : '#f3f4f6',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    flexShrink: 0,
                    border: '2px dashed #e5e7eb'
                  }}>
                    {photoPreview ? (
                      <img 
                        src={photoPreview} 
                        alt="Preview"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                    ) : (
                      <Upload size={32} style={{ color: '#9ca3af' }} />
                    )}
                  </div>

                  {/* Upload Button */}
                  <div style={{ flex: 1 }}>
                    <label style={{
                      display: 'inline-block',
                      padding: '10px 16px',
                      background: '#f3f4f6',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#374151',
                      cursor: uploading ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s ease',
                      opacity: uploading ? 0.5 : 1
                    }}>
                      {uploading ? 'Uploading...' : 'Upload Photo'}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        disabled={uploading}
                        style={{ display: 'none' }}
                      />
                    </label>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: '8px 0 0 0' }}>
                      JPG, PNG up to 5MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Name */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '6px' }}>
                  Name *
                </label>
                <input
                  type="text"
                  value={modalForm.name}
                  onChange={(e) => setModalForm({ ...modalForm, name: e.target.value })}
                  placeholder="e.g. Ahmed Hassan"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Role */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '6px' }}>
                  Role *
                </label>
                <input
                  type="text"
                  value={modalForm.role}
                  onChange={(e) => setModalForm({ ...modalForm, role: e.target.value })}
                  placeholder="e.g. Cleaner"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Phone and Email in Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '6px' }}>
                    Phone
                  </label>
                  <input
                    type="text"
                    value={modalForm.phone}
                    onChange={(e) => setModalForm({ ...modalForm, phone: e.target.value })}
                    placeholder="+974-..."
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '6px' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={modalForm.email}
                    onChange={(e) => setModalForm({ ...modalForm, email: e.target.value })}
                    placeholder="email@example.com"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              {/* Specialization */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '6px' }}>
                  Specialization
                </label>
                <input
                  type="text"
                  value={modalForm.specialization}
                  onChange={(e) => setModalForm({ ...modalForm, specialization: e.target.value })}
                  placeholder="e.g. Home Cleaning"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '6px',
                    fontSize: '14px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Status and Rating */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '6px' }}>
                    Status
                  </label>
                  <select
                    value={modalForm.status}
                    onChange={(e) => setModalForm({ ...modalForm, status: e.target.value as 'active' | 'inactive' })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '6px' }}>
                    Rating
                  </label>
                  <input
                    type="number"
                    value={modalForm.rating}
                    onChange={(e) => setModalForm({ ...modalForm, rating: e.target.value })}
                    placeholder="0"
                    min="0"
                    max="5"
                    step="0.1"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{
                    flex: 1,
                    padding: '10px 16px',
                    border: '1px solid #e5e7eb',
                    background: 'white',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#6b7280',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#f3f4f6';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'white';
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '10px 16px',
                    background: 'linear-gradient(135deg, #0052CC 0%, #003D99 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 82, 204, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {editingStaff ? 'Update Staff' : 'Add Staff'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
