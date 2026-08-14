'use client';

import React from 'react';
import { Language } from '@/app/lib/translations';

interface FooterProps {
  language: Language;
}

/**
 * Footer Component - Clean & Minimal like JustClean
 */
export const Footer: React.FC<FooterProps> = ({ language }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: '#f5f5f5', padding: '60px 0', direction: language === 'ar' ? 'rtl' : 'ltr' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', paddingLeft: '16px', paddingRight: '16px' }}>
        
        {/* Main Footer Content */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '40px', marginBottom: '48px' }}>
          
          {/* Services Column */}
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {language === 'en' ? 'Services' : 'الخدمات'}
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><a href="/services" style={{ fontSize: '14px', color: '#6b7280', textDecoration: 'none' }}>{language === 'en' ? 'Home Cleaning' : 'تنظيف المنزل'}</a></li>
              <li><a href="/services" style={{ fontSize: '14px', color: '#6b7280', textDecoration: 'none' }}>{language === 'en' ? 'Laundry' : 'الغسيل'}</a></li>
              <li><a href="/services" style={{ fontSize: '14px', color: '#6b7280', textDecoration: 'none' }}>{language === 'en' ? 'Car Wash' : 'غسيل السيارات'}</a></li>
              <li><a href="/services" style={{ fontSize: '14px', color: '#6b7280', textDecoration: 'none' }}>{language === 'en' ? 'Plumbing Work' : 'أعمال السباكة'}</a></li>
              <li><a href="/services" style={{ fontSize: '14px', color: '#6b7280', textDecoration: 'none' }}>{language === 'en' ? 'Carpentry Work' : 'أعمال النجارة'}</a></li>
              <li><a href="/services" style={{ fontSize: '14px', color: '#6b7280', textDecoration: 'none' }}>{language === 'en' ? 'Pest Control' : 'مكافحة الآفات'}</a></li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {language === 'en' ? 'Support' : 'الدعم'}
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><a href="/support" style={{ fontSize: '14px', color: '#6b7280', textDecoration: 'none' }}>{language === 'en' ? 'Contact Us' : 'اتصل بنا'}</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {language === 'en' ? 'Company' : 'الشركة'}
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><a href="/about" style={{ fontSize: '14px', color: '#6b7280', textDecoration: 'none' }}>{language === 'en' ? 'About Us' : 'عن نا'}</a></li>
              <li><a href="/team" style={{ fontSize: '14px', color: '#6b7280', textDecoration: 'none' }}>{language === 'en' ? 'The Team' : 'الفريق'}</a></li>
            </ul>
          </div>

          {/* Services in Qatar Column */}
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {language === 'en' ? 'Our Services in Qatar' : 'خدماتنا في قطر'}
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><a href="#" style={{ fontSize: '14px', color: '#6b7280', textDecoration: 'none' }}>Doha</a></li>
              <li><a href="#" style={{ fontSize: '14px', color: '#6b7280', textDecoration: 'none' }}>Al Wakrah</a></li>
              <li><a href="#" style={{ fontSize: '14px', color: '#6b7280', textDecoration: 'none' }}>Al Khor</a></li>
              <li><a href="#" style={{ fontSize: '14px', color: '#6b7280', textDecoration: 'none' }}>Lusail</a></li>
              <li><a href="/areas" style={{ fontSize: '14px', color: '#0052CC', textDecoration: 'none', fontWeight: '500' }}>{language === 'en' ? 'View all areas →' : 'عرض جميع المناطق →'}</a></li>
            </ul>
          </div>

          {/* Follow Us Column */}
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {language === 'en' ? 'Follow Us' : 'تابعنا'}
            </h3>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a href="#" style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }} title="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <circle cx="17.5" cy="6.5" r="1.5"></circle>
                </svg>
              </a>
              <a href="#" style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }} title="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: '#e5e7eb', marginBottom: '24px' }} />

        {/* Bottom Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>
            © {currentYear} SKM Services. {language === 'en' ? 'All rights reserved.' : 'جميع الحقوق محفوظة.'}
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="#" style={{ fontSize: '13px', color: '#9ca3af', textDecoration: 'none' }}>{language === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية'}</a>
            <a href="#" style={{ fontSize: '13px', color: '#9ca3af', textDecoration: 'none' }}>{language === 'en' ? 'Terms and Conditions' : 'الشروط والأحكام'}</a>
            <a href="#" style={{ fontSize: '13px', color: '#9ca3af', textDecoration: 'none' }}>{language === 'en' ? 'Cookie Settings' : 'إعدادات ملفات تعريف الارتباط'}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = 'Footer';
