'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, AlertCircle, CheckCircle, Upload } from 'lucide-react';

interface Driver {
  id: string;
  name: string;
  phone: string;
  vehicle_type: string;
  vehicle_registration?: string;
  license_number?: string;
  status: 'available' | 'on_duty' | 'off_duty';
  rating: number;
  photo_url?: string;
}

export default function DriversPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);
  const [branchId, setBranchId] = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const [modalForm, setModalForm] = useState({
    name: '',
    phone: '',
    vehicle_type: '',
    vehicle_registration: '',
    license_number: '',
    status: 'available' as 'available' | 'on_duty' | 'off_duty',
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

  // Fetch drivers
  useEffect(() => {
    if (!branchId) return;
    
    const fetchDrivers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/branch/drivers?branch_id=${branchId}`);
        
        if (!response.ok) throw new Error('Failed to fetch drivers');
        
        const data = await response.json();
        setDrivers(data.drivers || []);
      } catch (error) {
        console.error('Fetch error:', error);
        setAlert({ type: 'error', message: 'Failed to load drivers' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchDrivers();
  }, [branchId]);

  const filteredDrivers = drivers.filter(d =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.vehicle_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusColors = {
    on_duty: { bg: '#fecdd3', text: '#991b1b', label: 'On Duty' },
    available: { bg: '#d1fae5', text: '#065f46', label: 'Available' },
    off_duty: { bg: '#e0e7ff', text: '#3730a3', label: 'Off Duty' }
  };

  const handleAddClick = () => {
    setEditingDriver(null);
    setModalForm({ name: '', phone: '', vehicle_type: '', vehicle_registration: '', license_number: '', status: 'available', rating: '', photo_url: '' });
    setPhotoPreview(null);
    setShowModal(true);
  };

  const handleEditClick = (driver: Driver) => {
    setEditingDriver(driver);
    setModalForm({
      name: driver.name,
      phone: driver.phone,
      vehicle_type: driver.vehicle_type,
      vehicle_registration: driver.vehicle_registration || '',
      license_number: driver.license_number || '',
      status: driver.status,
      rating: driver.rating.toString(),
      photo_url: driver.photo_url || ''
    });
    setPhotoPreview(driver.photo_url || null);
    setShowModal(true);
  };

  const handleDeleteClick = (driver: Driver) => {
    if (!window.confirm(`Are you sure you want to remove "${driver.name}"?`)) return;
    handleDelete(driver.id);
  };

  const handleDelete = async (driverId: string) => {
    try {
      const response = await fetch(`/api/branch/drivers/${driverId}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete driver');

      setDrivers(drivers.filter(d => d.id !== driverId));
      setAlert({ type: 'success', message: 'Driver removed successfully' });
      setTimeout(() => setAlert(null), 3000);
    } catch (error) {
      console.error('Delete error:', error);
      setAlert({ type: 'error', message: 'Failed to remove driver' });
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

      const response = await fetch('/api/partner/upload/driver', {
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
    
    if (!branchId || !modalForm.name || !modalForm.phone || !modalForm.vehicle_type) {
      setAlert({ type: 'error', message: 'Please fill all required fields' });
      return;
    }

    try {
      if (editingDriver) {
        // Update
        const response = await fetch(`/api/branch/drivers/${editingDriver.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: modalForm.name,
            phone: modalForm.phone,
            vehicle_type: modalForm.vehicle_type,
            vehicle_registration: modalForm.vehicle_registration || null,
            license_number: modalForm.license_number || null,
            status: modalForm.status,
            photo_url: modalForm.photo_url || null,
            rating: parseFloat(modalForm.rating) || 0
          })
        });

        if (!response.ok) throw new Error('Failed to update driver');

        const { driver: updatedDriver } = await response.json();
        setDrivers(drivers.map(d => d.id === editingDriver.id ? updatedDriver : d));
        setAlert({ type: 'success', message: 'Driver updated successfully' });
      } else {
        // Create
        const response = await fetch('/api/branch/drivers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            branch_id: branchId,
            name: modalForm.name,
            phone: modalForm.phone,
            vehicle_type: modalForm.vehicle_type,
            vehicle_registration: modalForm.vehicle_registration || null,
            license_number: modalForm.license_number || null,
            status: modalForm.status,
            photo_url: modalForm.photo_url || null,
            rating: parseFloat(modalForm.rating) || 0
          })
        });

        if (!response.ok) throw new Error('Failed to create driver');

        const { driver: newDriver } = await response.json();
        setDrivers([newDriver, ...drivers]);
        setAlert({ type: 'success', message: 'Driver added successfully' });
      }

      setShowModal(false);
      setTimeout(() => setAlert(null), 3000);
    } catch (error) {
      console.error('Submit error:', error);
      setAlert({ type: 'error', message: editingDriver ? 'Failed to update driver' : 'Failed to add driver' });
    }
  };

  if (!branchId || isLoading) {
    return (
      <div style={{ padding: '32px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', width: '48px', height: '48px', border: '4px solid #e5e7eb', borderTop: '4px solid #0052CC', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <p style={{ marginTop: '16px', color: '#6b7280' }}>Loading drivers...</p>
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

      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#111827', margin: 0 }}>Drivers</h1>
        <p style={{ fontSize: '14px', color: '#6b7280', margin: '8px 0 0 0' }}>Manage delivery drivers and vehicles</p>
      </div>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '200px', padding: '0 12px', borderRadius: '8px', border: '1px solid #e5e7eb', background: 'white' }}>
          <Search size={18} style={{ color: '#9ca3af' }} />
          <input 
            type="text" 
            placeholder="Search drivers..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            style={{ flex: 1, border: 'none', outline: 'none', padding: '10px 0', fontSize: '14px', fontFamily: 'inherit' }} 
          />
        </div>
        <button 
          onClick={handleAddClick}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: 'linear-gradient(135deg, #0052CC 0%, #003D99 100%)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s ease' }}
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
          <span>Add Driver</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
        {filteredDrivers.length > 0 ? filteredDrivers.map(driver => {
          const statusInfo = statusColors[driver.status as keyof typeof statusColors];
          return (
            <div key={driver.id} style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', transition: 'all 0.3s ease' }}
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
                background: driver.photo_url ? 'transparent' : 'linear-gradient(135deg, #0052CC 0%, #003D99 100%)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
                overflow: 'hidden'
              }}>
                {driver.photo_url ? (
                  <img 
                    src={driver.photo_url} 
                    alt={driver.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center'
                    }}
                  />
                ) : (
                  <span style={{ fontSize: '48px', fontWeight: 'bold', color: 'white' }}>
                    {driver.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: 0 }}>{driver.name}</h3>
                  <p style={{ fontSize: '13px', color: '#6b7280', margin: '4px 0 0 0' }}>{driver.phone}</p>
                </div>
                <span style={{ padding: '4px 12px', background: statusInfo.bg, color: statusInfo.text, borderRadius: '6px', fontSize: '11px', fontWeight: '600', textTransform: 'capitalize' }}>{statusInfo.label}</span>
              </div>

              <div style={{ padding: '12px', background: '#f0f6ff', border: '1px solid #dbeafe', borderRadius: '8px', marginBottom: '16px', fontSize: '13px', fontWeight: '600', color: '#1e40af' }}>
                {driver.vehicle_type}
                {driver.vehicle_registration && ` - ${driver.vehicle_registration}`}
              </div>

              <div style={{ background: '#fef3c7', border: '1px solid #fcd34d', borderRadius: '8px', padding: '12px', marginBottom: '16px', textAlign: 'center' }}>
                <p style={{ fontSize: '13px', color: '#92400e', fontWeight: '600', margin: 0 }}>⭐ {driver.rating} / 5.0</p>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={() => handleEditClick(driver)}
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '8px 12px', border: '1px solid #e5e7eb', background: 'white', borderRadius: '6px', fontSize: '13px', fontWeight: '600', color: '#0052CC', cursor: 'pointer', transition: 'all 0.2s ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#f0f6ff'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'white'; }}
                >
                  <Edit size={16} />
                  <span>Edit</span>
                </button>
                <button 
                  onClick={() => handleDeleteClick(driver)}
                  style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '8px 12px', border: '1px solid #fecaca', background: '#fef2f2', borderRadius: '6px', fontSize: '13px', fontWeight: '600', color: '#dc2626', cursor: 'pointer', transition: 'all 0.2s ease' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#fee2e2'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#fef2f2'; }}
                >
                  <Trash2 size={16} />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          );
        }) : <div style={{ gridColumn: '1 / -1', padding: '48px', textAlign: 'center', color: '#6b7280' }}><p>No drivers found</p></div>}
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
              {editingDriver ? 'Edit Driver' : 'Add Driver'}
            </h2>

            <form onSubmit={handleSubmit}>
              {/* Photo Upload */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>
                  Photo (Optional)
                </label>
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'start'
                }}>
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
                  placeholder="e.g. Ali Ahmed"
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

              {/* Phone and Vehicle Type */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '6px' }}>
                    Phone *
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
                    Vehicle Type *
                  </label>
                  <input
                    type="text"
                    value={modalForm.vehicle_type}
                    onChange={(e) => setModalForm({ ...modalForm, vehicle_type: e.target.value })}
                    placeholder="e.g. Toyota Hiace"
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

              {/* Registration and License */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '6px' }}>
                    Vehicle Registration
                  </label>
                  <input
                    type="text"
                    value={modalForm.vehicle_registration}
                    onChange={(e) => setModalForm({ ...modalForm, vehicle_registration: e.target.value })}
                    placeholder="ABC 123"
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
                    License Number
                  </label>
                  <input
                    type="text"
                    value={modalForm.license_number}
                    onChange={(e) => setModalForm({ ...modalForm, license_number: e.target.value })}
                    placeholder="License #"
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

              {/* Status and Rating */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '6px' }}>
                    Status
                  </label>
                  <select
                    value={modalForm.status}
                    onChange={(e) => setModalForm({ ...modalForm, status: e.target.value as 'available' | 'on_duty' | 'off_duty' })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '6px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="available">Available</option>
                    <option value="on_duty">On Duty</option>
                    <option value="off_duty">Off Duty</option>
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
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#f3f4f6'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'white'; }}
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
                  {editingDriver ? 'Update Driver' : 'Add Driver'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
