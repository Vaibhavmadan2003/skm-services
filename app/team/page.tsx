'use client';

import { useState } from 'react';
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { Language, getTranslation } from '@/app/lib/translations';
import { Star, Award, Users, Heart } from 'lucide-react';

export default function TeamPage() {
  const [language, setLanguage] = useState<Language>('en');

  const teamMembers = [
    {
      name: 'Ahmed Al-Mansouri',
      position: language === 'en' ? 'Operations Manager' : 'مدير العمليات',
      image: '/team/worker1.jpg',
      bio: language === 'en'
        ? 'Ahmed brings 15 years of experience in service management. His dedication ensures every team member performs at their best.'
        : 'أحمد يجلب 15 سنة من الخبرة في إدارة الخدمات. تفانيه يضمن أن يقدم كل فرد في الفريق أفضل ما لديه.',
      rating: 4.9,
      reviews: '500+',
    },
    {
      name: 'Fatima Al-Thani',
      position: language === 'en' ? 'Quality Assurance Lead' : 'رئيسة ضمان الجودة',
      image: '/team/worker2.jpg',
      bio: language === 'en'
        ? 'Fatima maintains our high quality standards with meticulous attention to detail. Her commitment ensures customer satisfaction.'
        : 'فاطمة تحافظ على معايير جودتنا العالية برعاية دقيقة للتفاصيل. التزامها يضمن رضا العملاء.',
      rating: 4.95,
      reviews: '450+',
    },
    {
      name: 'Mohammed Al-Dosari',
      position: language === 'en' ? 'Chief Coordinator' : 'رئيس المنسقين',
      image: '/team/worker3.jpg',
      bio: language === 'en'
        ? 'Mohammed coordinates seamless service delivery across Qatar. His expertise ensures timely and efficient service execution.'
        : 'محمد ينسق تقديم الخدمات بسلاسة عبر قطر. خبرته تضمن تنفيذ الخدمة في الوقت المناسب وبكفاءة.',
      rating: 4.85,
      reviews: '480+',
    },
    {
      name: 'Layla Al-Kuwari',
      position: language === 'en' ? 'Customer Care Manager' : 'مدير رعاية العملاء',
      image: '/team/worker4.jpg',
      bio: language === 'en'
        ? 'Layla leads our customer support team with compassion and professionalism. She ensures every customer query is resolved promptly.'
        : 'ليلى تقود فريق دعم العملاء لدينا برحمة واحترافية. تضمن أن يتم حل كل استفسار عميل بسرعة.',
      rating: 4.92,
      reviews: '520+',
    },
  ];

  const stats = [
    {
      icon: <Users size={32} />,
      value: language === 'en' ? '50+' : '50+',
      label: language === 'en' ? 'Team Members' : 'أعضاء الفريق',
    },
    {
      icon: <Star size={32} />,
      value: language === 'en' ? '4.9' : '4.9',
      label: language === 'en' ? 'Average Rating' : 'متوسط التقييم',
    },
    {
      icon: <Award size={32} />,
      value: language === 'en' ? '10k+' : '10k+',
      label: language === 'en' ? 'Services Delivered' : 'الخدمات المقدمة',
    },
    {
      icon: <Heart size={32} />,
      value: language === 'en' ? '98%' : '98%',
      label: language === 'en' ? 'Satisfaction' : 'معدل الرضا',
    },
  ];

  return (
    <main style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}>
      <Header language={language} setLanguage={setLanguage} />

      {/* Hero Section */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px', display: 'flex', justifyContent: 'center', background: 'linear-gradient(135deg, #f3e8ff 0%, #f0f4ff 100%)' }} className="team-hero-section">
        <div style={{ width: '100%', maxWidth: '1280px', paddingLeft: '16px', paddingRight: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
          
          {/* Bottom: Text - Left Aligned */}
          <div style={{ maxWidth: '700px' }}>
            <h1 style={{ fontSize: '48px', fontWeight: '900', color: '#111827', marginBottom: '24px' }}>
              {language === 'en' ? 'Meet Our Team' : 'تعرف على فريقنا'}
            </h1>
            <p style={{ fontSize: '18px', color: '#4b5563' }}>
              {language === 'en'
                ? 'Dedicated professionals committed to delivering excellence in every service'
                : 'متخصصون مكرسون لتقديم التميز في كل خدمة'}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px', display: 'flex', justifyContent: 'center', background: 'white' }}>
        <div style={{ width: '100%', maxWidth: '1280px', paddingLeft: '16px', paddingRight: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px', width: '100%' }}>
            {stats.map((stat, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                <div style={{ color: '#0052CC', marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
                  {stat.icon}
                </div>
                <div style={{ fontSize: '36px', fontWeight: '900', color: '#111827', marginBottom: '8px' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '16px', color: '#6b7280' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Members - Photo Collage Section */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px', display: 'flex', justifyContent: 'center', background: '#f9fafb' }}>
        <div style={{ width: '100%', maxWidth: '1280px', paddingLeft: '16px', paddingRight: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            {/* Left: Photo Grid/Collage */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {teamMembers.map((member, idx) => (
                <div
                  key={idx}
                  style={{
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12)',
                    height: '280px',
                    background: 'linear-gradient(135deg, #f3e8ff 0%, #f0f4ff 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src={member.image}
                    alt="Team Member"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.style.display = 'none';
                      const parent = img.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #0052CC 0%, #003D99 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 48px; font-weight: bold;">
                            SKM
                          </div>
                        `;
                      }
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Right: Team Description */}
            <div>
              <h2 style={{ fontSize: '36px', fontWeight: '900', color: '#111827', marginBottom: '24px' }}>
                {language === 'en' ? 'Our Professional Team' : 'فريقنا المحترف'}
              </h2>
              <p style={{ fontSize: '16px', color: '#4b5563', lineHeight: '1.8', marginBottom: '24px' }}>
                {language === 'en'
                  ? 'At SKM Services, we believe that our team is our greatest asset. Each member brings unique expertise and a shared commitment to excellence. We foster a culture of collaboration, continuous learning, and customer-first thinking.'
                  : 'في خدمات SKM، نعتقد أن فريقنا هو أعظم أصولنا. يجلب كل عضو خبرة فريدة والتزاماً مشتركاً بالتميز. نعزز ثقافة التعاون والتعلم المستمر والتفكير الموجه نحو العملاء.'}
              </p>
              <p style={{ fontSize: '16px', color: '#4b5563', lineHeight: '1.8', marginBottom: '32px' }}>
                {language === 'en'
                  ? 'Our team members are trained professionals who are passionate about delivering exceptional service. They go beyond expectations to ensure every customer experience is memorable and satisfactory.'
                  : 'أعضاء فريقنا هم متخصصون مدربون متحمسون لتقديم خدمة استثنائية. يتجاوزون التوقعات لضمان أن كل تجربة عميل لا تُنسى ومرضية.'}
              </p>

              {/* Key Values */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: '#0052CC', marginBottom: '8px' }}>
                    ✓ {language === 'en' ? 'Professional' : 'متخصصون'}
                  </div>
                  <p style={{ fontSize: '14px', color: '#6b7280' }}>
                    {language === 'en' ? 'Fully trained & certified' : 'مدربون بالكامل ومعتمدون'}
                  </p>
                </div>
                <div>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: '#0052CC', marginBottom: '8px' }}>
                    ✓ {language === 'en' ? 'Reliable' : 'موثوقون'}
                  </div>
                  <p style={{ fontSize: '14px', color: '#6b7280' }}>
                    {language === 'en' ? 'Consistent quality' : 'جودة ثابتة'}
                  </p>
                </div>
                <div>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: '#0052CC', marginBottom: '8px' }}>
                    ✓ {language === 'en' ? 'Courteous' : 'مهذبون'}
                  </div>
                  <p style={{ fontSize: '14px', color: '#6b7280' }}>
                    {language === 'en' ? 'Respectful service' : 'خدمة محترمة'}
                  </p>
                </div>
                <div>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: '#0052CC', marginBottom: '8px' }}>
                    ✓ {language === 'en' ? 'Trustworthy' : 'جديرون بالثقة'}
                  </div>
                  <p style={{ fontSize: '14px', color: '#6b7280' }}>
                    {language === 'en' ? 'Fully background checked' : 'تم فحص الخلفية بالكامل'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px', display: 'flex', justifyContent: 'center', background: 'linear-gradient(135deg, #0052CC 0%, #003D99 100%)' }}>
        <div style={{ width: '100%', maxWidth: '1280px', paddingLeft: '16px', paddingRight: '16px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '900', color: 'white', marginBottom: '24px' }}>
            {language === 'en' ? 'Experience Excellence Today' : 'جرب التميز اليوم'}
          </h2>
          <p style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '32px' }}>
            {language === 'en'
              ? 'Book a service with our professional team and discover the difference quality makes.'
              : 'احجز خدمة مع فريقنا المحترف واكتشف الفرق الذي تحدثه الجودة.'}
          </p>
          <button
            onClick={() => window.location.href = '/services'}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              paddingLeft: '32px',
              paddingRight: '32px',
              paddingTop: '16px',
              paddingBottom: '16px',
              height: '56px',
              background: 'white',
              color: '#0052CC',
              fontWeight: 'bold',
              fontSize: '16px',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 300ms ease-out',
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.transform = 'translateY(-2px)';
              btn.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.2)';
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.transform = 'translateY(0)';
              btn.style.boxShadow = 'none';
            }}
          >
            {language === 'en' ? 'View Our Services' : 'عرض خدماتنا'}
          </button>
        </div>
      </section>

      <Footer language={language} />
    </main>
  );
}
