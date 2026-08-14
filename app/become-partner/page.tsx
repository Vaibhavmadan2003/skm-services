'use client';

import { BecomePartnerForm } from '@/app/components/PartnerOnboarding/BecomePartnerForm';

export default function BecomePartnerPage() {
  return (
    <div className="become-partner-page">
      {/* Header Section */}
      <section className="become-partner-header">
        <div className="header-content">
          <div className="breadcrumb">
            <a href="/">Home</a>
            <span className="separator">/</span>
            <span className="current">Become Partner</span>
          </div>
          <h1 className="header-title">Grow Your Business with SKM Services</h1>
          <p className="header-subtitle">Join thousands of successful partners earning consistent income through our platform</p>
        </div>
      </section>

      {/* Form Section */}
      <section className="form-section">
        <BecomePartnerForm />
      </section>

      <style jsx>{`
        .become-partner-page {
          min-height: 100vh;
          background: #ffffff;
        }

        .become-partner-header {
          background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
          padding: 48px 20px;
          border-bottom: 1px solid #e5e7eb;
        }

        .header-content {
          max-width: 1280px;
          margin: 0 auto;
          text-align: center;
        }

        .breadcrumb {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 24px;
          font-size: 13px;
        }

        .breadcrumb a {
          color: #6b7280;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .breadcrumb a:hover {
          color: #7c3aed;
        }

        .breadcrumb .separator {
          color: #d1d5db;
          margin: 0 4px;
        }

        .breadcrumb .current {
          color: #7c3aed;
          font-weight: 700;
        }

        .header-title {
          font-size: 36px;
          font-weight: 900;
          color: #111827;
          margin-bottom: 12px;
          line-height: 1.2;
          letter-spacing: -1px;
        }

        .header-subtitle {
          font-size: 16px;
          color: #6b7280;
          max-width: 620px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .form-section {
          padding: 20px;
        }

        @media (max-width: 768px) {
          .become-partner-header {
            padding: 32px 16px;
          }

          .header-title {
            font-size: 28px;
          }

          .header-subtitle {
            font-size: 14px;
          }

          .breadcrumb {
            font-size: 12px;
            gap: 6px;
          }
        }

        @media (max-width: 640px) {
          .become-partner-header {
            padding: 24px 16px;
          }

          .header-title {
            font-size: 24px;
            margin-bottom: 8px;
          }

          .header-subtitle {
            font-size: 13px;
          }

          .breadcrumb {
            font-size: 11px;
            margin-bottom: 16px;
          }
        }
      `}</style>
    </div>
  );
}
