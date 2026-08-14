'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, AlertCircle, CheckCircle } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: string;
  availability: 'available' | 'unavailable';
}

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [branchId, setBranchId] = useState<string | null>(null);
  const [modalForm, setModalForm] = useState({
    name: '',
    category: '',
    price: '',
    duration: '',
    availability: 'available' as 'available' | 'unavailable'
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

  // Fetch services
  useEffect(() => {
    if (!branchId) return;
    
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/branch/services?branch_id=${branchId}`);
        
        if (!response.ok) throw new Error('Failed to fetch services');
        
        const data = await response.json();
        setServices(data.services || []);
      } catch (error) {
        console.error('Fetch error:', error);
        setAlert({ type: 'error', message: 'Failed to load services' });
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, [branchId]);

  const filteredServices = services.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClick = () => {
    setEditingService(null);
    setModalForm({ name: '', category: '', price: '', duration: '', availability: 'available' });
    setShowModal(true);
  };

  const handleEditClick = (service: Service) => {
    setEditingService(service);
    setModalForm({
      name: service.name,
      category: service.category,
      price: service.price.toString(),
      duration: service.duration,
      availability: service.availability
    });
    setShowModal(true);
  };

  const handleDeleteClick = (service: Service) => {
    if (!window.confirm(`Are you sure you want to delete "${service.name}"?`)) return;
    
    handleDelete(service.id);
  };

  const handleDelete = async (serviceId: string) => {
    try {
      const response = await fetch(`/api/branch/services/${serviceId}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete service');

      setServices(services.filter(s => s.id !== serviceId));
      setAlert({ type: 'success', message: 'Service deleted successfully' });
      setTimeout(() => setAlert(null), 3000);
    } catch (error) {
      console.error('Delete error:', error);
      setAlert({ type: 'error', message: 'Failed to delete service' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!branchId || !modalForm.name || !modalForm.category || !modalForm.price || !modalForm.duration) {
      setAlert({ type: 'error', message: 'Please fill all fields' });
      return;
    }

    try {
      if (editingService) {
        // Update
        const response = await fetch(`/api/branch/services/${editingService.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: modalForm.name,
            category: modalForm.category,
            price: parseFloat(modalForm.price),
            duration: modalForm.duration,
            availability: modalForm.availability
          })
        });

        if (!response.ok) throw new Error('Failed to update service');

        const { service: updatedService } = await response.json();
        setServices(services.map(s => s.id === editingService.id ? updatedService : s));
        setAlert({ type: 'success', message: 'Service updated successfully' });
      } else {
        // Create
        const response = await fetch('/api/branch/services', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            branch_id: branchId,
            name: modalForm.name,
            category: modalForm.category,
            price: parseFloat(modalForm.price),
            duration: modalForm.duration,
            availability: modalForm.availability
          })
        });

        if (!response.ok) throw new Error('Failed to create service');

        const { service: newService } = await response.json();
        setServices([newService, ...services]);
        setAlert({ type: 'success', message: 'Service added successfully' });
      }

      setShowModal(false);
      setTimeout(() => setAlert(null), 3000);
    } catch (error) {
      console.error('Submit error:', error);
      setAlert({ type: 'error', message: editingService ? 'Failed to update service' : 'Failed to create service' });
    }
  };

  if (!branchId || isLoading) {
    return (
      <div style={{ padding: '32px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', width: '48px', height: '48px', border: '4px solid #e5e7eb', borderTop: '4px solid #0052CC', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <p style={{ marginTop: '16px', color: '#6b7280' }}>Loading services...</p>
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
          Services
        </h1>
        <p style={{ fontSize: '14px', color: '#6b7280', margin: '8px 0 0 0' }}>
          Manage your service offerings and pricing
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
            placeholder="Search services..."
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

        {/* Add Service Button */}
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
          <span>Add Service</span>
        </button>
      </div>

      {/* Services Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <div
              key={service.id}
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
              {/* Header */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: 0 }}>
                    {service.name}
                  </h3>
                  <span style={{
                    display: 'inline-block',
                    padding: '2px 8px',
                    background: service.availability === 'available' ? '#d1fae5' : '#fee2e2',
                    color: service.availability === 'available' ? '#065f46' : '#991b1b',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: '600',
                    textTransform: 'capitalize'
                  }}>
                    {service.availability}
                  </span>
                </div>
                <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
                  {service.category}
                </p>
              </div>

              {/* Details */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                marginBottom: '16px',
                padding: '16px 0',
                borderTop: '1px solid #f3f4f6',
                borderBottom: '1px solid #f3f4f6'
              }}>
                <div>
                  <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 4px 0', textTransform: 'uppercase', fontWeight: '500' }}>
                    Price
                  </p>
                  <p style={{ fontSize: '18px', fontWeight: '700', color: '#0052CC', margin: 0 }}>
                    QAR {service.price}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 4px 0', textTransform: 'uppercase', fontWeight: '500' }}>
                    Duration
                  </p>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: '#111827', margin: 0 }}>
                    {service.duration}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div style={{
                display: 'flex',
                gap: '8px'
              }}>
                <button
                  onClick={() => handleEditClick(service)}
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
                  onClick={() => handleDeleteClick(service)}
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
                  <span>Delete</span>
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
            <p style={{ fontSize: '14px', margin: 0 }}>No services found</p>
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
          zIndex: 50
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '32px',
            maxWidth: '500px',
            width: '90%',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: '0 0 24px 0' }}>
              {editingService ? 'Edit Service' : 'Add New Service'}
            </h2>

            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '6px' }}>
                  Service Name
                </label>
                <input
                  type="text"
                  value={modalForm.name}
                  onChange={(e) => setModalForm({ ...modalForm, name: e.target.value })}
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

              {/* Category */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '6px' }}>
                  Category
                </label>
                <input
                  type="text"
                  value={modalForm.category}
                  onChange={(e) => setModalForm({ ...modalForm, category: e.target.value })}
                  placeholder="e.g. Cleaning"
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

              {/* Price and Duration in Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '6px' }}>
                    Price (QAR)
                  </label>
                  <input
                    type="number"
                    value={modalForm.price}
                    onChange={(e) => setModalForm({ ...modalForm, price: e.target.value })}
                    placeholder="0"
                    step="0.01"
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
                    Duration
                  </label>
                  <input
                    type="text"
                    value={modalForm.duration}
                    onChange={(e) => setModalForm({ ...modalForm, duration: e.target.value })}
                    placeholder="e.g. 2-3 hours"
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

              {/* Availability */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '6px' }}>
                  Availability
                </label>
                <select
                  value={modalForm.availability}
                  onChange={(e) => setModalForm({ ...modalForm, availability: e.target.value as 'available' | 'unavailable' })}
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
                  <option value="unavailable">Unavailable</option>
                </select>
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
                  {editingService ? 'Update Service' : 'Add Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
