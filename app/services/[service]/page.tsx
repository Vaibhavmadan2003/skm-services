'use client';

import React, { useContext } from 'react';
import { Header, LanguageContext } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { Language } from '@/app/lib/translations';
import { useParams } from 'next/navigation';

interface ServiceDetail {
  slugEn: string;
  slugAr: string;
  nameEn: string;
  nameAr: string;
  taglineEn: string;
  taglineAr: string;
  descriptionEn: string;
  descriptionAr: string;
  color: string;
  highlights: { titleEn: string; titleAr: string; valueEn: string; valueAr: string; icon: string }[];
}

const services: Record<string, ServiceDetail> = {
  'home-cleaning': {
    slugEn: 'home-cleaning',
    slugAr: 'تنظيف-المنزل',
    nameEn: 'Home Cleaning',
    nameAr: 'تنظيف المنزل',
    taglineEn: 'Professional Home Cleaning Service',
    taglineAr: 'خدمة التنظيف المنزلي الاحترافي',
    descriptionEn: 'Get your home sparkling clean with our professional home cleaning service. Our vetted cleaners provide thorough cleaning with trusted, background-checked professionals.',
    descriptionAr: 'احصل على منزلك نظيفًا براقًا من خلال خدمة التنظيف المنزلي الاحترافية. يوفر منظفونا المفحوصون تنظيفًا شاملاً.',
    color: '#10B981',
    highlights: [
      { titleEn: 'Price', titleAr: 'السعر', valueEn: 'From QR 69', valueAr: 'من 69 ريال', icon: '💰' },
      { titleEn: 'Delivery', titleAr: 'التسليم', valueEn: '24-48 hours', valueAr: '24-48 ساعة', icon: '⏱️' },
      { titleEn: 'Service', titleAr: 'الخدمة', valueEn: 'Same Cleaner', valueAr: 'نفس العامل', icon: '👤' },
      { titleEn: 'Guarantee', titleAr: 'الضمان', valueEn: 'Quality Assured', valueAr: 'مضمون الجودة', icon: '✓' }
    ]
  },
  'laundry': {
    slugEn: 'laundry',
    slugAr: 'الغسيل',
    nameEn: 'Laundry & Dry Cleaning',
    nameAr: 'الغسيل والتنظيف الجاف',
    taglineEn: 'Fast, Affordable Laundry',
    taglineAr: 'غسيل سريع وبأسعار معقولة',
    descriptionEn: 'Professional laundry and dry cleaning with free pickup and delivery. Choose from top-rated providers in your city.',
    descriptionAr: 'غسيل احترافي وتنظيف جاف مع استلام وتوصيل مجاني. اختر من مزودي الخدمات الموثوقين في مدينتك.',
    color: '#3B82F6',
    highlights: [
      { titleEn: 'Price', titleAr: 'السعر', valueEn: 'From QR 30', valueAr: 'من 30 ريال', icon: '💰' },
      { titleEn: 'Delivery', titleAr: 'التسليم', valueEn: '24-48 hours', valueAr: '24-48 ساعة', icon: '⏱️' },
      { titleEn: 'Delivery', titleAr: 'التوصيل', valueEn: 'FREE', valueAr: 'مجاني', icon: '🚚' },
      { titleEn: 'Guarantee', titleAr: 'الضمان', valueEn: 'Rewash', valueAr: 'إعادة الغسيل', icon: '✓' }
    ]
  },
  'car-wash': {
    slugEn: 'car-wash',
    slugAr: 'غسيل-السيارات',
    nameEn: 'Mobile Car Wash',
    nameAr: 'غسيل السيارات المتنقل',
    taglineEn: 'Professional Car Washing Service',
    taglineAr: 'خدمة غسيل السيارات الاحترافية',
    descriptionEn: 'Premium mobile car wash service. We come to you! Professional detailing at your preferred location and time.',
    descriptionAr: 'خدمة غسيل السيارات المتنقلة المتميزة. نأتي إليك! التفاصيل الاحترافية في الموقع والوقت الذي تفضله.',
    color: '#F59E0B',
    highlights: [
      { titleEn: 'Price', titleAr: 'السعر', valueEn: 'From QR 40', valueAr: 'من 40 ريال', icon: '💰' },
      { titleEn: 'Service', titleAr: 'الخدمة', valueEn: 'Mobile Service', valueAr: 'خدمة متنقلة', icon: '🚗' },
      { titleEn: 'Time', titleAr: 'الوقت', valueEn: 'Anytime', valueAr: 'أي وقت', icon: '⏰' },
      { titleEn: 'Guarantee', titleAr: 'الضمان', valueEn: 'Satisfaction', valueAr: 'الرضا مضمون', icon: '✓' }
    ]
  },
  'plumbing': {
    slugEn: 'plumbing',
    slugAr: 'السباكة',
    nameEn: 'Plumbing Work',
    nameAr: 'أعمال السباكة',
    taglineEn: 'Professional Plumbing Services',
    taglineAr: 'خدمات السباكة الاحترافية',
    descriptionEn: 'Expert plumbing services for all your needs. Pipe repairs, installations, leaks, and emergency fixes by licensed professionals.',
    descriptionAr: 'خدمات السباكة المتخصصة لجميع احتياجاتك. إصلاح الأنابيب والتركيب والتسريبات والإصلاحات الطارئة من قبل محترفين مرخصين.',
    color: '#8B5CF6',
    highlights: [
      { titleEn: 'Price', titleAr: 'السعر', valueEn: 'From QR 45', valueAr: 'من 45 ريال', icon: '💰' },
      { titleEn: 'Experience', titleAr: 'الخبرة', valueEn: '10+ Years', valueAr: '10+ سنوات', icon: '⭐' },
      { titleEn: 'Emergency', titleAr: 'الطوارئ', valueEn: '24/7 Available', valueAr: 'متاح 24/7', icon: '🚨' },
      { titleEn: 'Quality', titleAr: 'الجودة', valueEn: '100% Guaranteed', valueAr: '100% مضمون', icon: '✓' }
    ]
  },
  'carpentry': {
    slugEn: 'carpentry',
    slugAr: 'النجارة',
    nameEn: 'Carpentry Work',
    nameAr: 'أعمال النجارة',
    taglineEn: 'Expert Carpentry Services',
    taglineAr: 'خدمات النجارة المتخصصة',
    descriptionEn: 'Professional carpentry services including furniture, doors, cabinets, and custom woodwork by experienced carpenters.',
    descriptionAr: 'خدمات النجارة الاحترافية بما في ذلك الأثاث والأبواب والخزائن والأعمال الخشبية المخصصة من قبل نجارين ذوي خبرة.',
    color: '#DC2626',
    highlights: [
      { titleEn: 'Price', titleAr: 'السعر', valueEn: 'From QR 50', valueAr: 'من 50 ريال', icon: '💰' },
      { titleEn: 'Materials', titleAr: 'المواد', valueEn: 'Premium Quality', valueAr: 'جودة عالية', icon: '🏗️' },
      { titleEn: 'Warranty', titleAr: 'الضمان', valueEn: '1 Year', valueAr: 'سنة واحدة', icon: '📋' },
      { titleEn: 'Expertise', titleAr: 'الخبرة', valueEn: 'Custom Work', valueAr: 'أعمال مخصصة', icon: '✓' }
    ]
  },
  'pest-control': {
    slugEn: 'pest-control',
    slugAr: 'مكافحة-الآفات',
    nameEn: 'Pest Control',
    nameAr: 'مكافحة الآفات',
    taglineEn: 'Professional Pest Control Service',
    taglineAr: 'خدمة مكافحة الآفات الاحترافية',
    descriptionEn: 'Comprehensive pest control and disinfection services. Safe, eco-friendly treatments for insects, rodents, and disease control.',
    descriptionAr: 'خدمات مكافحة الآفات والتطهير الشاملة. معالجات آمنة وصديقة للبيئة للحشرات والقوارض ومكافحة الأمراض.',
    color: '#14B8A6',
    highlights: [
      { titleEn: 'Price', titleAr: 'السعر', valueEn: 'From QR 35', valueAr: 'من 35 ريال', icon: '💰' },
      { titleEn: 'Safety', titleAr: 'الأمان', valueEn: 'Eco-Friendly', valueAr: 'آمن وصديق للبيئة', icon: '🌿' },
      { titleEn: 'Coverage', titleAr: 'التغطية', valueEn: 'Full House', valueAr: 'المنزل بالكامل', icon: '🏠' },
      { titleEn: 'Guarantee', titleAr: 'الضمان', valueEn: '30-Day', valueAr: 'ضمان 30 يوم', icon: '✓' }
    ]
  }
};

export default function ServiceDetailPage() {
  const { language, setLanguage } = useContext(LanguageContext);
  const params = useParams();
  const serviceSlug = (params.service as string)?.toLowerCase() || '';
  const service = services[serviceSlug];
  const isRTL = language === 'ar';

  if (!service) {
    return (
      <div style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
        <Header language={language} setLanguage={setLanguage} />
        <div style={{ textAlign: 'center', padding: '60px 16px', minHeight: '400px' }}>
          <h1>{language === 'en' ? 'Service Not Found' : 'الخدمة غير موجودة'}</h1>
          <p><a href="/services">← {language === 'en' ? 'Back to Services' : 'العودة إلى الخدمات'}</a></p>
        </div>
        <Footer language={language} />
      </div>
    );
  }

  return (
    <div style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      <Header language={language} setLanguage={setLanguage} />

      {/* Hero Section */}
      <div style={{ background: `linear-gradient(135deg, ${service.color} 0%, ${service.color}dd 100%)`, padding: '60px 16px', textAlign: 'center', color: 'white' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'inline-block', padding: '8px 16px', background: 'rgba(255,255,255,0.2)', borderRadius: '6px', marginBottom: '24px', fontSize: '14px', fontWeight: '600' }}>
            {language === 'en' ? 'Available in Qatar' : 'متاح في قطر'}
          </div>
          <h1 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '16px' }}>
            {language === 'en' ? service.nameEn : service.nameAr}
          </h1>
          <p style={{ fontSize: '18px', opacity: 0.95, maxWidth: '700px', margin: '0 auto 32px' }}>
            {language === 'en' ? service.descriptionEn : service.descriptionAr}
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{ padding: '12px 28px', background: 'white', color: service.color, border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>
              {language === 'en' ? '📱 Download App' : '📱 تحميل التطبيق'}
            </button>
            <button style={{ padding: '12px 28px', background: 'rgba(255,255,255,0.2)', color: 'white', border: '2px solid white', borderRadius: '6px', fontSize: '16px', fontWeight: '600', cursor: 'pointer' }}>
              {language === 'en' ? 'Book Now' : 'احجز الآن'}
            </button>
          </div>
        </div>
      </div>

      {/* Highlights Section */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', paddingLeft: '16px', paddingRight: '16px', paddingTop: '60px', paddingBottom: '60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          {service.highlights.map((h, idx) => (
            <div key={idx} style={{ padding: '24px', background: '#f9fafb', borderRadius: '12px', textAlign: 'center', border: '1px solid #e5e7eb' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{h.icon}</div>
              <p style={{ fontSize: '12px', color: '#999', margin: '0 0 8px 0' }}>{language === 'en' ? h.titleEn : h.titleAr}</p>
              <p style={{ fontSize: '20px', fontWeight: '700', color: service.color, margin: 0 }}>{language === 'en' ? h.valueEn : h.valueAr}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer language={language} />
    </div>
  );
}
