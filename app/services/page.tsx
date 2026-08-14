'use client';

import { useState, useEffect } from 'react';
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { Language, getTranslation } from '@/app/lib/translations';
import { Zap } from 'lucide-react';

export default function ServicesPage() {
  const [language, setLanguage] = useState<Language>('en');

  // Add shiny animation to globals
  useEffect((): (() => void) => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes shiny-move {
        0% {
          background-position: -1000px 0;
        }
        100% {
          background-position: 1000px 0;
        }
      }
      
      .price-badge-shiny {
        background: linear-gradient(
          90deg,
          rgba(0, 0, 0, 0.6) 0%,
          rgba(0, 0, 0, 0.6) 20%,
          rgba(255, 255, 255, 0.3) 50%,
          rgba(0, 0, 0, 0.6) 80%,
          rgba(0, 0, 0, 0.6) 100%
        );
        background-size: 1000px 100%;
        animation: shiny-move 3s infinite;
        backdrop-filter: blur(4px);
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const services = [
    {
      slug: 'home-cleaning',
      name: language === 'en' ? 'Home Cleaning' : 'تنظيف المنزل',
      description: language === 'en'
        ? 'Deep cleaning, regular cleaning & specialized home care services'
        : 'التنظيف العميق والتنظيف المنتظم وخدمات العناية بالمنزل المتخصصة',
      price: 'QR 69.00',
      image: '/service-images/home-cleaning.jpg',
      icon: '🏠',
    },
    {
      slug: 'laundry',
      name: language === 'en' ? 'Laundry' : 'الغسيل',
      description: language === 'en' 
        ? 'Professional laundry, dry cleaning & ironing services with free pickup and delivery'
        : 'خدمات الغسيل الاحترافي والتنظيف الجاف والكي مع الاستلام والتوصيل المجاني',
      price: 'QR 30.00',
      image: '/service-images/laundry.jpg',
      icon: '👔',
    },
    {
      slug: 'car-wash',
      name: language === 'en' ? 'Mobile Car Wash' : 'غسيل السيارات المتنقل',
      description: language === 'en'
        ? 'Premium car wash & detailing services at your doorstep'
        : 'خدمات غسيل السيارات المتميزة والتفاصيل في منزلك',
      price: 'QR 40.00',
      image: '/service-images/car-wash.jpg',
      icon: '🚗',
    },
    {
      slug: 'plumbing',
      name: language === 'en' ? 'Plumbing Work' : 'أعمال السباكة',
      description: language === 'en'
        ? 'Expert plumbing repairs, installations & maintenance services'
        : 'خدمات إصلاح السباكة والتركيب والصيانة المتخصصة',
      price: 'QR 45.00',
      image: '/service-images/plumbing.jpg',
      icon: '🔧',
    },
    {
      slug: 'carpentry',
      name: language === 'en' ? 'Carpentry Work' : 'أعمال النجارة',
      description: language === 'en'
        ? 'Custom carpentry, furniture repair & wood restoration services'
        : 'خدمات النجارة المخصصة وإصلاح الأثاث واستعادة الخشب',
      price: 'QR 50.00',
      image: '/service-images/carpentry.jpg',
      icon: '🪛',
    },
    {
      slug: 'pest-control',
      name: language === 'en' ? 'Pest Control' : 'مكافحة الآفات',
      description: language === 'en'
        ? 'Safe & effective pest control, disinfection & prevention services'
        : 'خدمات مكافحة الآفات والتطهير والوقاية الآمنة والفعالة',
      price: 'QR 35.00',
      image: '/service-images/pest-control.jpg',
      icon: '🐛',
    },
  ];

  return (
    <main style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}>
      <Header language={language} setLanguage={setLanguage} />
      
      {/* Services Hero Section */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px', display: 'flex', justifyContent: 'center', background: '#f9fafb' }}>
        <div style={{ width: '100%', maxWidth: '1280px', paddingLeft: '16px', paddingRight: '16px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h1 style={{ fontSize: '36px', fontWeight: '900', color: '#111827', marginBottom: '24px' }}>
              {language === 'en' ? 'Our Services in Qatar' : 'خدماتنا في قطر'}
            </h1>
            <p style={{ fontSize: '18px', color: '#4b5563', maxWidth: '620px', margin: '0 auto' }}>
              {language === 'en'
                ? 'Professional cleaning, grooming, and wellness services delivered to your doorstep in Qatar'
                : 'خدمات التنظيف والعناية والصحة والعافية المهنية المقدمة إلى باب منزلك في قطر'}
            </p>
          </div>

          {/* Services Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', width: '100%' }}>
            {services.map((service, idx) => (
              <a
                key={idx}
                href={`/services/${service.slug}`}
                style={{
                  position: 'relative',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  backgroundImage: `url(${service.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: '400px',
                  cursor: 'pointer',
                  transition: 'all 300ms ease-out',
                  textDecoration: 'none',
                  display: 'block'
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = 'translateY(-8px)';
                  el.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = 'translateY(0)';
                  el.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                }}
              >
                {/* Dark Overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%)',
                  zIndex: 1,
                }} />

                {/* Price Badge */}
                <div 
                  className="price-badge-shiny"
                  style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: '600',
                    zIndex: 3,
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '10px', opacity: 0.8, marginBottom: '4px' }}>
                    {language === 'en' ? 'STARTING FROM' : 'ابدأ من'}
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: '700' }}>{service.price}</div>
                </div>

                {/* Content */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '32px 24px',
                  zIndex: 2,
                  color: 'white',
                }}>
                  {/* Service Name */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <span style={{ fontSize: '24px' }}>{service.icon}</span>
                    <h3 style={{ fontSize: '20px', fontWeight: '700', margin: 0 }}>{service.name}</h3>
                  </div>

                  {/* Description */}
                  <p style={{ fontSize: '14px', opacity: 0.9, margin: 0, lineHeight: '1.5' }}>
                    {service.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px', display: 'flex', justifyContent: 'center', background: 'linear-gradient(135deg, #f3e8ff 0%, #f0f4ff 100%)' }}>
        <div style={{ width: '100%', maxWidth: '1280px', paddingLeft: '16px', paddingRight: '16px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#111827', marginBottom: '16px' }}>
            {language === 'en' ? 'Ready to book?' : 'هل أنت مستعد للحجز؟'}
          </h2>
          <p style={{ fontSize: '18px', color: '#4b5563', marginBottom: '32px' }}>
            {language === 'en'
              ? 'Choose your service and schedule it today. We offer same-day service across Qatar.'
              : 'اختر خدمتك وحددها اليوم. نحن نقدم خدمة في نفس اليوم في جميع أنحاء قطر.'}
          </p>
          <button
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              paddingLeft: '32px',
              paddingRight: '32px',
              paddingTop: '16px',
              paddingBottom: '16px',
              height: '56px',
              background: 'linear-gradient(135deg, #0052CC 0%, #003D99 100%)',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '16px',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 10px 25px rgba(0, 82, 204, 0.3)',
              transition: 'all 300ms ease-out',
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.transform = 'translateY(-2px)';
              btn.style.boxShadow = '0 15px 35px rgba(0, 82, 204, 0.4)';
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.transform = 'translateY(0)';
              btn.style.boxShadow = '0 10px 25px rgba(0, 82, 204, 0.3)';
            }}
          >
            <Zap size={20} />
            {language === 'en' ? 'Book a Service Now' : 'احجز خدمة الآن'}
          </button>
        </div>
      </section>
      
      <Footer language={language} />
    </main>
  );
}
