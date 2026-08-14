'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/app/lib/utils';

interface FormData {
  step: number;
  businessName: string;
  managerName: string;
  serviceType: string;
  email: string;
  phone: string;
  city: string;
  yearsInBusiness: string;
  website: string;
  additionalInfo: string;
  termsAccepted: boolean;
}

const SERVICE_TYPES = [
  { id: 'laundry', label: 'Laundry', icon: '🧺' },
  { id: 'home_cleaning', label: 'Home Cleaning', icon: '✨' },
  { id: 'car_wash', label: 'Car Wash', icon: '🚗' },
  { id: 'spa_services', label: 'Spa Services', icon: '💆' },
  { id: 'barber_services', label: 'Barber Services', icon: '✂️' },
];

const YEARS_OPTIONS = [
  '0-1 years',
  '1-3 years',
  '3-5 years',
  '5-10 years',
  '10+ years',
];

export function BecomePartnerForm() {
  const [formData, setFormData] = useState<FormData>({
    step: 1,
    businessName: '',
    managerName: '',
    serviceType: '',
    email: '',
    phone: '',
    city: '',
    yearsInBusiness: '',
    website: '',
    additionalInfo: '',
    termsAccepted: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleServiceTypeSelect = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      serviceType: prev.serviceType === serviceId ? '' : serviceId,
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.businessName.trim()) {
          setError('Business name is required');
          return false;
        }
        if (!formData.managerName.trim()) {
          setError('Manager name is required');
          return false;
        }
        if (!formData.serviceType) {
          setError('Please select a service type');
          return false;
        }
        if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          setError('Valid email is required');
          return false;
        }
        if (!formData.phone.trim()) {
          setError('Phone number is required');
          return false;
        }
        return true;
      case 2:
        if (!formData.city.trim()) {
          setError('City is required');
          return false;
        }
        return true;
      case 3:
        if (!formData.termsAccepted) {
          setError('You must agree to Terms and Conditions');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    setError('');
    if (validateStep(formData.step)) {
      setFormData(prev => ({ ...prev, step: prev.step + 1 }));
    }
  };

  const handleBack = () => {
    setError('');
    setFormData(prev => ({ ...prev, step: Math.max(1, prev.step - 1) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateStep(3)) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/partner-applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          business_name: formData.businessName,
          manager_name: formData.managerName,
          service_type: formData.serviceType,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          years_in_business: formData.yearsInBusiness ? parseInt(formData.yearsInBusiness.split('-')[0]) : null,
          website: formData.website || null,
          additional_info: formData.additionalInfo || null,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to submit application');
      }

      setSuccess(true);
      // Reset form
      setFormData({
        step: 1,
        businessName: '',
        managerName: '',
        serviceType: '',
        email: '',
        phone: '',
        city: '',
        yearsInBusiness: '',
        website: '',
        additionalInfo: '',
        termsAccepted: false,
      });

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="partner-form-container">
        <div className="form-card success-state">
          <div className="success-icon">✅</div>
          <h2>Application Submitted Successfully!</h2>
          <p>Thank you for your interest in becoming a SKM Services Qatar partner.</p>
          <p>We have received your application and will review it shortly. You'll receive an email with the decision and next steps.</p>
          <p className="text-muted">Application Reference: {new Date().toISOString().slice(0, 10)}</p>
          <Link href="/">
            <button onClick={() => window.location.href = '/'} className="btn btn-primary">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="partner-form-container">
      <div className="form-card">
        {/* Header */}
        <div className="form-header">
          <h1>Become a SKM Services Qatar Partner</h1>
          <p>Join the Middle East's largest on-demand services network</p>
        </div>

        {/* Progress Steps */}
        <div className="progress-steps">
          {[1, 2, 3].map(step => (
            <div key={step} className={`step ${step === formData.step ? 'active' : ''} ${step < formData.step ? 'completed' : ''}`}>
              {step}
            </div>
          ))}
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit}>
          {/* Step 1: Business Information */}
          {formData.step === 1 && (
            <div className="form-step">
              <div className="form-group">
                <label htmlFor="businessName">
                  Business Name <span className="required">*</span>
                </label>
                <div className="input-with-icon">
                  <span className="icon">🏢</span>
                  <input
                    type="text"
                    id="businessName"
                    name="businessName"
                    placeholder="Enter your business name"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="managerName">
                  Manager Name <span className="required">*</span>
                </label>
                <div className="input-with-icon">
                  <span className="icon">👤</span>
                  <input
                    type="text"
                    id="managerName"
                    name="managerName"
                    placeholder="Enter branch manager name"
                    value={formData.managerName}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>
                  Service Type <span className="required">*</span>
                </label>
                <div className="service-grid">
                  {SERVICE_TYPES.map(service => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => handleServiceTypeSelect(service.id)}
                      className={`service-option ${formData.serviceType === service.id ? 'selected' : ''}`}
                    >
                      <span className="service-icon">{service.icon}</span>
                      <span className="service-label">{service.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  Email Address <span className="required">*</span>
                </label>
                <div className="input-with-icon">
                  <span className="icon">✉️</span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="business@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="phone">
                  Phone Number <span className="required">*</span>
                </label>
                <div className="input-with-icon">
                  <span className="icon">📱</span>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="+974 XXXX XXXX"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Location & Experience */}
          {formData.step === 2 && (
            <div className="form-step">
              <div className="form-group">
                <label htmlFor="city">
                  City <span className="required">*</span>
                </label>
                <div className="input-with-icon">
                  <span className="icon">📍</span>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="Enter your city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="yearsInBusiness">
                  Years in Business
                </label>
                <select
                  id="yearsInBusiness"
                  name="yearsInBusiness"
                  value={formData.yearsInBusiness}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="">Select years</option>
                  {YEARS_OPTIONS.map(year => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="website">
                  Website (optional)
                </label>
                <div className="input-with-icon">
                  <span className="icon">🌐</span>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    placeholder="https://www.yourwebsite.com"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review & Confirm */}
          {formData.step === 3 && (
            <div className="form-step">
              <div className="form-group">
                <label htmlFor="additionalInfo">
                  Additional Information (optional)
                </label>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  placeholder="Tell us more about your business, services offered, or any questions you have"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  className="form-textarea"
                  rows={4}
                />
              </div>

              {/* Application Summary */}
              <div className="summary-section">
                <h3>Application Summary</h3>
                <div className="summary-item">
                  <span className="summary-label">Business Name:</span>
                  <span className="summary-value">{formData.businessName}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Manager Name:</span>
                  <span className="summary-value">{formData.managerName}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Service Type:</span>
                  <span className="summary-value">
                    {SERVICE_TYPES.find(s => s.id === formData.serviceType)?.label}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Email Address:</span>
                  <span className="summary-value">{formData.email}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Phone Number:</span>
                  <span className="summary-value">{formData.phone}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">City:</span>
                  <span className="summary-value">{formData.city}</span>
                </div>
                {formData.yearsInBusiness && (
                  <div className="summary-item">
                    <span className="summary-label">Years in Business:</span>
                    <span className="summary-value">{formData.yearsInBusiness}</span>
                  </div>
                )}
              </div>

              {/* Terms & Conditions */}
              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="termsAccepted"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleInputChange}
                  className="form-checkbox"
                />
                <label htmlFor="termsAccepted" className="checkbox-label">
                  I agree to the{' '}
                  <Link href="/terms-and-conditions" target="_blank" className="link">
                    Terms and Conditions
                  </Link>
                  {' '}and{' '}
                  <Link href="/privacy-policy" target="_blank" className="link">
                    Privacy Policy
                  </Link>
                  {' '}
                  <span className="required">*</span>
                </label>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="error-message">
              ❌ {error}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="form-actions">
            {formData.step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="btn btn-secondary"
                disabled={loading}
              >
                Back
              </button>
            )}

            {formData.step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="btn btn-primary"
                disabled={loading}
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            )}
          </div>
        </form>
      </div>

      <style jsx>{`
        .partner-form-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
          padding: 40px 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .form-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
          max-width: 700px;
          width: 100%;
          padding: 48px;
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .form-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .form-header h1 {
          font-size: 32px;
          font-weight: 900;
          margin-bottom: 12px;
          color: #111827;
          line-height: 1.2;
        }

        .form-header p {
          font-size: 16px;
          color: #6b7280;
          line-height: 1.6;
        }

        .progress-steps {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 24px;
          margin-bottom: 48px;
        }

        .step {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: #6b7280;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-size: 14px;
        }

        .step.active {
          background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
          color: white;
          box-shadow: 0 12px 24px rgba(124, 58, 237, 0.3);
        }

        .step.completed {
          background: #10b981;
          color: white;
        }

        .form-step {
          margin-bottom: 32px;
        }

        .form-group {
          margin-bottom: 24px;
        }

        .form-group label {
          display: block;
          font-weight: 700;
          margin-bottom: 8px;
          color: #111827;
          font-size: 14px;
          letter-spacing: -0.3px;
        }

        .required {
          color: #ef4444;
          margin-left: 2px;
        }

        .input-with-icon {
          position: relative;
          display: flex;
          align-items: center;
        }

        .icon {
          position: absolute;
          left: 14px;
          font-size: 18px;
          pointer-events: none;
          opacity: 0.7;
        }

        .form-input,
        .form-textarea,
        select {
          width: 100%;
          padding: 12px 12px 12px 44px;
          border: 2px solid #e5e7eb;
          border-radius: 10px;
          font-size: 14px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          font-family: inherit;
          background: white;
          color: #111827;
        }

        .form-input::placeholder,
        .form-textarea::placeholder,
        select::placeholder {
          color: #9ca3af;
        }

        .form-input:focus,
        .form-textarea:focus,
        select:focus {
          outline: none;
          border-color: #7c3aed;
          box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.1);
          background: #fafbff;
        }

        .form-textarea {
          padding-left: 14px;
          resize: vertical;
          min-height: 120px;
          line-height: 1.5;
        }

        .service-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
          gap: 12px;
          margin-top: 12px;
        }

        .service-option {
          border: 2px solid #e5e7eb;
          border-radius: 10px;
          padding: 16px;
          background: white;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 600;
          color: #4b5563;
          text-align: center;
        }

        .service-option:hover {
          border-color: #7c3aed;
          background: #f8f5ff;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.15);
        }

        .service-option.selected {
          border-color: #7c3aed;
          background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
          color: white;
          box-shadow: 0 8px 20px rgba(124, 58, 237, 0.25);
        }

        .service-icon {
          font-size: 32px;
          line-height: 1;
        }

        .summary-section {
          background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 24px;
          border: 1px solid #e5e7eb;
        }

        .summary-section h3 {
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 16px;
          color: #111827;
          letter-spacing: -0.3px;
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          font-size: 13px;
          border-bottom: 1px solid #e5e7eb;
        }

        .summary-item:last-child {
          border-bottom: none;
        }

        .summary-label {
          color: #6b7280;
          font-weight: 600;
        }

        .summary-value {
          color: #111827;
          font-weight: 700;
          text-align: right;
        }

        .checkbox-group {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          padding: 16px;
          background: #f9fafb;
          border-radius: 10px;
          border: 1px solid #e5e7eb;
        }

        .form-checkbox {
          width: 20px;
          height: 20px;
          margin-top: 2px;
          cursor: pointer;
          accent-color: #7c3aed;
          flex-shrink: 0;
        }

        .checkbox-label {
          font-size: 13px;
          color: #4b5563;
          margin: 0;
          cursor: pointer;
          line-height: 1.6;
        }

        .link {
          color: #7c3aed;
          text-decoration: none;
          font-weight: 700;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .link:hover {
          color: #6d28d9;
          text-decoration: underline;
        }

        .error-message {
          background: #fee2e2;
          border: 2px solid #fca5a5;
          color: #991b1b;
          padding: 14px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .form-actions {
          display: flex;
          gap: 12px;
          justify-content: space-between;
          margin-top: 32px;
        }

        .btn {
          padding: 12px 24px;
          border-radius: 10px;
          border: none;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          flex: 1;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          letter-spacing: -0.3px;
        }

        .btn-primary {
          background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
          color: white;
          box-shadow: 0 12px 24px rgba(124, 58, 237, 0.25);
        }

        .btn-primary:hover:not(:disabled) {
          background: linear-gradient(135deg, #6d28d9 0%, #5b21b6 100%);
          box-shadow: 0 16px 32px rgba(124, 58, 237, 0.35);
          transform: translateY(-2px);
        }

        .btn-primary:active:not(:disabled) {
          transform: translateY(0);
          box-shadow: 0 8px 16px rgba(124, 58, 237, 0.25);
        }

        .btn-secondary {
          background: #e5e7eb;
          color: #111827;
          font-weight: 700;
        }

        .btn-secondary:hover:not(:disabled) {
          background: #d1d5db;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .success-state {
          text-align: center;
          padding: 60px 40px;
        }

        .success-icon {
          font-size: 64px;
          margin-bottom: 24px;
          line-height: 1;
        }

        .success-state h2 {
          font-size: 28px;
          font-weight: 900;
          margin-bottom: 16px;
          color: #111827;
          line-height: 1.2;
        }

        .success-state p {
          font-size: 14px;
          color: #4b5563;
          margin-bottom: 12px;
          line-height: 1.6;
        }

        .text-muted {
          color: #9ca3af;
          font-size: 12px;
          margin-top: 20px;
        }

        @media (max-width: 640px) {
          .partner-form-container {
            padding: 24px 16px;
          }

          .form-card {
            padding: 32px 20px;
          }

          .form-header h1 {
            font-size: 24px;
          }

          .form-header p {
            font-size: 14px;
          }

          .progress-steps {
            gap: 16px;
            margin-bottom: 32px;
          }

          .step {
            width: 36px;
            height: 36px;
            font-size: 13px;
          }

          .form-step {
            margin-bottom: 24px;
          }

          .form-group {
            margin-bottom: 18px;
          }

          .service-grid {
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          }

          .form-actions {
            flex-direction: column;
          }

          .btn {
            width: 100%;
            flex: none;
          }

          .summary-section {
            padding: 16px;
          }

          .checkbox-group {
            flex-direction: column;
            gap: 8px;
          }

          .success-state {
            padding: 48px 24px;
          }

          .success-state h2 {
            font-size: 22px;
          }
        }

        @media (max-width: 768px) {
          .form-card {
            max-width: 100%;
          }

          .service-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
}

export default BecomePartnerForm;
