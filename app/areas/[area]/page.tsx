'use client';

import React, { useContext } from 'react';
import { Header, LanguageContext } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { Language } from '@/app/lib/translations';
import { MapPin, Star, Clock, Shield } from 'lucide-react';
import { useParams } from 'next/navigation';

interface Service {
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  price: number;
  icon: 'laundry' | 'home' | 'car';
  color: string;
}

const services: Service[] = [
  {
    nameEn: 'Laundry & Dry Cleaning',
    nameAr: 'الغسيل والتنظيف الجاف',
    descriptionEn: 'Professional laundry and dry cleaning with pickup & delivery',
    descriptionAr: 'غسيل احترافي وتنظيف جاف مع الاستلام والتوصيل',
    price: 30,
    icon: 'laundry',
    color: '#3B82F6',
  },
  {
    nameEn: 'Home Cleaning',
    nameAr: 'تنظيف المنزل',
    descriptionEn: 'Professional home cleaning with trusted cleaners',
    descriptionAr: 'تنظيف احترافي للمنزل مع عمال موثوقين',
    price: 69,
    icon: 'home',
    color: '#10B981',
  },
  {
    nameEn: 'Car Wash',
    nameAr: 'غسيل السيارات',
    descriptionEn: 'Mobile car wash at your location',
    descriptionAr: 'غسيل سيارات متنقل في مكانك',
    price: 40,
    icon: 'car',
    color: '#F59E0B',
  },
];

const benefits = [
  {
    titleEn: 'Verified Providers',
    titleAr: 'مزودو خدمات معتمدون',
    descEn: 'All service providers are licensed and vetted',
    descAr: 'جميع مزودي الخدمات مرخصون ومفحوصون',
    icon: 'star',
  },
  {
    titleEn: 'Instant Booking',
    titleAr: 'الحجز الفوري',
    descEn: 'Book your service in minutes',
    descAr: 'احجز خدمتك في دقائق',
    icon: 'clock',
  },
  {
    titleEn: 'Quality Guarantee',
    titleAr: 'ضمان الجودة',
    descEn: 'Satisfaction guaranteed or money back',
    descAr: 'الرضا مضمون أو استرجاع أموالك',
    icon: 'shield',
  },
];

function getServiceIcon(type: 'laundry' | 'home' | 'car') {
  switch (type) {
    case 'laundry':
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      );
    case 'home':
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      );
    case 'car':
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
          <path d="M18 8h1a4 4 0 0 1 4 4v10H1V12a4 4 0 0 1 4-4h1M6 4h12v4H6z"></path>
          <circle cx="7" cy="18" r="2"></circle>
          <circle cx="17" cy="18" r="2"></circle>
        </svg>
      );
  }
}

function getMunicipalityName(areaName: string): { en: string; ar: string } {
  const areaMunicipalityMap: Record<string, { en: string; ar: string }> = {
    'Al Dafna': { en: 'Doha Municipality', ar: 'بلدية الدوحة' },
    'Al Bidda': { en: 'Doha Municipality', ar: 'بلدية الدوحة' },
    'Al Khor Corniche': { en: 'Doha Municipality', ar: 'بلدية الدوحة' },
    'Onaiza': { en: 'Doha Municipality', ar: 'بلدية الدوحة' },
    'Umm Ghuwailina': { en: 'Doha Municipality', ar: 'بلدية الدوحة' },
    'Umm Lekhba': { en: 'Doha Municipality', ar: 'بلدية الدوحة' },
    'Al Rayyan': { en: 'Al Rayyan Municipality', ar: 'بلدية الريان' },
    'Al Waab': { en: 'Al Rayyan Municipality', ar: 'بلدية الريان' },
    'Lusail': { en: 'Lusail City', ar: 'مدينة لوسيل' },
    'Lusail Marina': { en: 'Lusail City', ar: 'مدينة لوسيل' },
    'Al Khor': { en: 'Al Khor Municipality', ar: 'بلدية الخور' },
    'Al Ruwais': { en: 'Al Shamal Municipality', ar: 'بلدية الشمال' },
    'Al Daayen': { en: 'Al Daayen Municipality', ar: 'بلدية الدعيان' },
    'Umm Salal': { en: 'Umm Salal Municipality', ar: 'بلدية أم صلال' },
    'Al Wakrah': { en: 'Al Wakrah Municipality', ar: 'بلدية الوكرة' },
  };

  // Find matching municipality or default to first match
  for (const [area, municipality] of Object.entries(areaMunicipalityMap)) {
    if (areaName.includes(area) || area.includes(areaName)) {
      return municipality;
    }
  }

  // Default fallback
  return { en: 'Qatar', ar: 'قطر' };
}

function getIcon(iconType: string) {
  switch (iconType) {
    case 'star':
      return <Star size={32} color="#8B5CF6" />;
    case 'clock':
      return <Clock size={32} color="#8B5CF6" />;
    case 'shield':
      return <Shield size={32} color="#8B5CF6" />;
    default:
      return null;
  }
}

export default function AreaPage() {
  const { language, setLanguage } = useContext(LanguageContext);
  const params = useParams();
  const areaName = (params.area as string)?.replace(/-/g, ' ') || 'Area';
  const isRTL = language === 'ar';

  const municipality = getMunicipalityName(areaName);

  return (
    <div style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      <Header language={language} setLanguage={setLanguage} />

      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
        padding: '60px 16px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {/* Municipality Badge */}
          <div style={{
            display: 'inline-flex',
            padding: '8px 16px',
            background: '#0052CC',
            color: 'white',
            borderRadius: '6px',
            marginBottom: '24px',
            fontSize: '14px',
            fontWeight: '600',
            alignItems: 'center',
            gap: '8px'
          }}>
            <MapPin size={16} />
            {language === 'en' ? municipality.en : municipality.ar}
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: '48px',
            fontWeight: '700',
            marginBottom: '16px',
            color: '#111827'
          }}>
            {language === 'en' ? `Cleaning Services in ${areaName}` : `خدمات التنظيف في ${areaName}`}
          </h1>

          {/* Description */}
          <p style={{
            fontSize: '18px',
            color: '#666',
            maxWidth: '700px',
            margin: '0 auto 32px',
            lineHeight: '1.6'
          }}>
            {language === 'en'
              ? `Book laundry, home cleaning, and car wash services from trusted providers in ${areaName}, Qatar.`
              : `احجز خدمات الغسيل والتنظيف والسيارات من مزودي خدمات موثوقين في ${areaName}، قطر.`}
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{
              padding: '14px 32px',
              background: '#7C3AED',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#6D28D9';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#7C3AED';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {language === 'en' ? '📱 Download App' : '📱 تحميل التطبيق'}
            </button>
            <button style={{
              padding: '14px 32px',
              background: 'white',
              color: '#111827',
              border: '2px solid #111827',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f3f4f6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'white';
              }}
              onClick={() => window.location.href = '/services'}
            >
              {language === 'en' ? 'Browse Services' : 'تصفح الخدمات'} →
            </button>
          </div>
        </div>
      </div>

      {/* Services Available Section */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', paddingLeft: '16px', paddingRight: '16px', paddingTop: '60px', paddingBottom: '60px' }}>
        
        {/* Services Header */}
        <h2 style={{
          fontSize: '32px',
          fontWeight: '700',
          color: '#111827',
          marginBottom: '48px',
          textAlign: 'center'
        }}>
          {language === 'en' ? `Services Available in ${areaName}` : `الخدمات المتاحة في ${areaName}`}
        </h2>

        {/* Services Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
          marginBottom: '60px'
        }}>
          {services.map((service, idx) => (
            <div key={idx} style={{
              background: 'white',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid #e5e7eb',
              transition: 'all 0.2s',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
              }}
            >
              {/* Service Header */}
              <div style={{
                background: service.color,
                color: 'white',
                padding: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {getServiceIcon(service.icon)}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', margin: 0 }}>
                  {language === 'en' ? service.nameEn : service.nameAr}
                </h3>
              </div>

              {/* Service Content */}
              <div style={{ padding: '24px' }}>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px', lineHeight: '1.6' }}>
                  {language === 'en' ? service.descriptionEn : service.descriptionAr}
                </p>

                {/* Price and CTA */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '16px',
                  borderTop: '1px solid #e5e7eb'
                }}>
                  <div>
                    <p style={{ fontSize: '12px', color: '#999', margin: '0 0 4px 0' }}>
                      {language === 'en' ? 'From' : 'من'}
                    </p>
                    <p style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: 0 }}>
                      QR {service.price}
                    </p>
                  </div>
                  <a href="#" style={{
                    fontSize: '14px',
                    color: service.color,
                    textDecoration: 'none',
                    fontWeight: '600',
                    transition: 'all 0.2s'
                  }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = service.color;
                      e.currentTarget.style.textDecoration = 'underline';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.textDecoration = 'none';
                    }}
                  >
                    {language === 'en' ? 'Learn More →' : 'تعرف أكثر →'}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Section */}
      <div style={{
        background: '#f9fafb',
        padding: '60px 16px'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#111827',
            marginBottom: '48px',
            textAlign: 'center'
          }}>
            {language === 'en' ? 'Why SKM Services?' : 'لماذا خدمات SKM؟'}
          </h2>

          {/* Benefits Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px'
          }}>
            {benefits.map((benefit, idx) => (
              <div key={idx} style={{
                textAlign: 'center',
                padding: '32px',
                background: 'white',
                borderRadius: '12px',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: '16px'
                }}>
                  {getIcon(benefit.icon)}
                </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#111827',
                  marginBottom: '8px'
                }}>
                  {language === 'en' ? benefit.titleEn : benefit.titleAr}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#666',
                  margin: 0,
                  lineHeight: '1.6'
                }}>
                  {language === 'en' ? benefit.descEn : benefit.descAr}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer language={language} />
    </div>
  );
}
