'use client';

import { useState } from 'react';
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { Language, getTranslation } from '@/app/lib/translations';
import { Users, Target, Heart, Award } from 'lucide-react';

export default function AboutPage() {
  const [language, setLanguage] = useState<Language>('en');

  const stats = [
    {
      icon: <Users size={32} />,
      value: '10,000+',
      label: language === 'en' ? 'Happy Customers' : 'عملاء سعداء',
    },
    {
      icon: <Target size={32} />,
      value: '500+',
      label: language === 'en' ? 'Professionals' : 'متخصصون',
    },
    {
      icon: <Heart size={32} />,
      value: '98%',
      label: language === 'en' ? 'Satisfaction Rate' : 'معدل الرضا',
    },
    {
      icon: <Award size={32} />,
      value: '5+',
      label: language === 'en' ? 'Years in Business' : 'سنوات في العمل',
    },
  ];

  const values = [
    {
      title: language === 'en' ? 'Quality First' : 'الجودة أولاً',
      description: language === 'en'
        ? 'We ensure every service meets our highest standards'
        : 'نضمن أن كل خدمة تلبي أعلى معاييرنا',
      icon: '✨',
    },
    {
      title: language === 'en' ? 'Customer Care' : 'رعاية العملاء',
      description: language === 'en'
        ? 'Your satisfaction is our top priority'
        : 'رضاك هو أولويتنا الأولى',
      icon: '💝',
    },
    {
      title: language === 'en' ? 'Trust & Safety' : 'الثقة والأمان',
      description: language === 'en'
        ? 'All professionals are thoroughly screened and insured'
        : 'جميع المتخصصين تم فحصهم بعناية وسيتم تأمينهم',
      icon: '🛡️',
    },
    {
      title: language === 'en' ? 'Innovation' : 'الابتكار',
      description: language === 'en'
        ? 'Continuously improving our services for you'
        : 'تحسين خدماتنا باستمرار لك',
      icon: '🚀',
    },
  ];

  return (
    <main style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}>
      <Header language={language} setLanguage={setLanguage} />
      
      {/* Hero Section */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px', display: 'flex', justifyContent: 'center', background: 'linear-gradient(135deg, #f3e8ff 0%, #f0f4ff 100%)' }}>
        <div style={{ width: '100%', maxWidth: '1280px', paddingLeft: '16px', paddingRight: '16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '900', color: '#111827', marginBottom: '24px' }}>
            {language === 'en' ? 'About SKM Services' : 'عن خدمات SKM'}
          </h1>
          <p style={{ fontSize: '18px', color: '#4b5563', maxWidth: '620px', margin: '0 auto' }}>
            {language === 'en'
              ? 'Transforming the way Qatar experiences premium home services through innovation, quality, and trust'
              : 'تحويل طريقة تجربة قطر للخدمات المنزلية المتميزة من خلال الابتكار والجودة والثقة'}
          </p>
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

      {/* Story Section */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px', display: 'flex', justifyContent: 'center', background: '#f9fafb' }}>
        <div style={{ width: '100%', maxWidth: '1280px', paddingLeft: '16px', paddingRight: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            {/* Left: Image */}
            <div>
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop"
                alt="About SKM Services"
                style={{ width: '100%', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' }}
              />
            </div>

            {/* Right: Story */}
            <div>
              <h2 style={{ fontSize: '36px', fontWeight: '900', color: '#111827', marginBottom: '24px' }}>
                {language === 'en' ? 'Our Story' : 'قصتنا'}
              </h2>
              <p style={{ fontSize: '16px', color: '#4b5563', lineHeight: '1.8', marginBottom: '16px' }}>
                {language === 'en'
                  ? 'SKM Services was founded with a simple mission: to bring professional, reliable, and affordable home services to everyone in Qatar. We started with a small team of passionate professionals and have grown to serve over 10,000 satisfied customers.'
                  : 'تم تأسيس خدمات SKM برسالة بسيطة: توفير خدمات منزلية احترافية وموثوقة وبأسعار معقولة للجميع في قطر. بدأنا بفريق صغير من المتخصصين الشغوفين وقد نمونا لخدمة أكثر من 10000 عميل راضٍ.'}
              </p>
              <p style={{ fontSize: '16px', color: '#4b5563', lineHeight: '1.8' }}>
                {language === 'en'
                  ? 'Today, we are proud to be one of Qatar\'s most trusted home service platforms, known for our quality, reliability, and customer-first approach.'
                  : 'اليوم، يشرفنا أن نكون منصة خدمات منزلية موثوقة في قطر، معروفة بجودتنا وموثوقيتنا وأسلوبنا المركز على العملاء.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px', display: 'flex', justifyContent: 'center', background: 'white' }}>
        <div style={{ width: '100%', maxWidth: '1280px', paddingLeft: '16px', paddingRight: '16px' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: '900', color: '#111827', marginBottom: '16px' }}>
              {language === 'en' ? 'Our Core Values' : 'قيمنا الأساسية'}
            </h2>
            <p style={{ fontSize: '16px', color: '#4b5563' }}>
              {language === 'en'
                ? 'What drives us every single day'
                : 'ما يحفزنا كل يوم'}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', width: '100%' }}>
            {values.map((value, idx) => (
              <div
                key={idx}
                style={{
                  padding: '32px',
                  background: 'white',
                  borderRadius: '16px',
                  border: '1px solid #e5e7eb',
                  textAlign: 'center',
                  transition: 'all 300ms ease-out',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.1)';
                  el.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = 'none';
                  el.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>{value.icon}</div>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', marginBottom: '12px' }}>
                  {value.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.6' }}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section with Icons */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px', display: 'flex', justifyContent: 'center', background: 'linear-gradient(135deg, #f3e8ff 0%, #f0f4ff 100%)' }}>
        <div style={{ width: '100%', maxWidth: '1280px', paddingLeft: '16px', paddingRight: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            {/* Left: Icons Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
              {[
                { icon: '⚡', title: language === 'en' ? 'Modern Tech' : 'تقنية حديثة', description: '' },
                { icon: '🛡️', title: language === 'en' ? 'Safe & Trusted' : 'آمن وموثوق', description: '' },
                { icon: '⏰', title: language === 'en' ? 'Time Saving' : 'توفير الوقت', description: '' },
                { icon: '👥', title: language === 'en' ? 'Local Support' : 'دعم محلي', description: '' },
              ].map((item, idx) => (
                <div key={idx} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>{item.icon}</div>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>{item.title}</div>
                </div>
              ))}
            </div>

            {/* Right: Text Content */}
            <div>
              <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#111827', marginBottom: '24px' }}>
                {language === 'en' 
                  ? 'Introducing Tech to Qatar\'s Local Businesses'
                  : 'تقديم التكنولوجيا للشركات المحلية في قطر'}
              </h2>
              <p style={{ fontSize: '16px', color: '#4b5563', lineHeight: '1.8', marginBottom: '32px' }}>
                {language === 'en'
                  ? 'By introducing technology into Qatar\'s cleaning sector, we\'re creating an ecosystem where customers, service providers, and SKM work together to build the country\'s leading online home services platform.'
                  : 'من خلال إدخال التكنولوجيا إلى قطاع التنظيف في قطر، نقوم بإنشاء نظام بيئي حيث يعمل العملاء وموفرو الخدمات و SKM معًا لبناء منصة الخدمات المنزلية الرائدة عبر الإنترنت في الدولة.'}
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => window.location.href = '/services'}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    paddingLeft: '24px',
                    paddingRight: '24px',
                    paddingTop: '12px',
                    paddingBottom: '12px',
                    height: '48px',
                    background: '#6366f1',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 300ms ease-out',
                  }}
                  onMouseEnter={(e) => {
                    const btn = e.currentTarget as HTMLButtonElement;
                    btn.style.transform = 'translateY(-2px)';
                    btn.style.boxShadow = '0 10px 20px rgba(99, 102, 241, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    const btn = e.currentTarget as HTMLButtonElement;
                    btn.style.transform = 'translateY(0)';
                    btn.style.boxShadow = 'none';
                  }}
                >
                  {language === 'en' ? 'View Services' : 'عرض الخدمات'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section style={{ paddingTop: '80px', paddingBottom: '80px', display: 'flex', justifyContent: 'center', background: 'white' }}>
        <div style={{ width: '100%', maxWidth: '1280px', paddingLeft: '16px', paddingRight: '16px' }}>
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: '900', color: '#111827', marginBottom: '16px' }}>
              {language === 'en' ? 'Meet Our Founder' : 'تعرف على مؤسسنا'}
            </h2>
            <p style={{ fontSize: '16px', color: '#4b5563' }}>
              {language === 'en'
                ? 'The visionary behind SKM Services'
                : 'صاحب الرؤية خلف خدمات SKM'}
            </p>
          </div>

          {/* Founder Card */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            {/* Left: Photo */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '100%',
                maxWidth: '400px',
                margin: '0 auto',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
              }}>
                <img
                  src="/founders/poshan-kumar.jpg"
                  alt="Poshan Kumar Sahage"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    aspectRatio: '1',
                    objectFit: 'cover',
                  }}
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.style.display = 'none';
                    const parent = img.parentElement;
                    if (parent) {
                      parent.innerHTML = `
                        <div style="width: 100%; height: 400px; background: linear-gradient(135deg, #0052CC 0%, #003D99 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; font-weight: bold;">
                          PK
                        </div>
                      `;
                    }
                  }}
                />
              </div>
            </div>

            {/* Right: Bio */}
            <div>
              <h3 style={{ fontSize: '28px', fontWeight: '900', color: '#111827', marginBottom: '8px' }}>
                Poshan Kumar Sah
              </h3>
              <p style={{ fontSize: '14px', color: '#0052CC', fontWeight: '600', marginBottom: '24px' }}>
                {language === 'en' ? 'Founder & CEO' : 'المؤسس والرئيس التنفيذي'} • 32 {language === 'en' ? 'years' : 'سنة'}
              </p>

              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', marginBottom: '12px' }}>
                  {language === 'en' ? 'About Poshan' : 'عن بوشان'}
                </h4>
                <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.8', marginBottom: '16px' }}>
                  {language === 'en'
                    ? 'Poshan Kumar Sah is a visionary entrepreneur with over 10 years of experience in the service industry. With a passion for innovation and customer satisfaction, he founded SKM Services to revolutionize how Qatar experiences premium home services.'
                    : 'بوشان كومار ساه رائد أعمال رؤيته مع أكثر من 10 سنوات من الخبرة في صناعة الخدمات. بدافع من الابتكار ورضا العملاء، أسس خدمات SKM لإحداث ثورة في طريقة تجربة قطر للخدمات المنزلية المتميزة.'}
                </p>

                <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', marginBottom: '12px' }}>
                  {language === 'en' ? 'Vision' : 'الرؤية'}
                </h4>
                <p style={{ fontSize: '14 px', color: '#4b5563', lineHeight: '1.8', marginBottom: '16px' }}>
                  {language === 'en'
                    ? '"To build Qatar\'s most trusted and innovative home services platform that connects quality professionals with customers who deserve excellence."'
                    : '"بناء منصة الخدمات المنزلية الأكثر موثوقية وابتكارًا في قطر التي تربط المتخصصين الذين يتمتعون بجودة عالية مع العملاء الذين يستحقون التميز."'}
                </p>

                <div style={{ marginTop: '24px', padding: '16px', background: '#f3e8ff', borderRadius: '12px' }}>
                  <p style={{ fontSize: '13px', color: '#4b5563', margin: 0 }}>
                    {language === 'en'
                      ? '💡 "Excellence isn\'t just a goal, it\'s a commitment we make to every customer."'
                      : '💡 "التميز ليس مجرد هدف، بل هو التزام نقدمه لكل عميل."'}
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
            {language === 'en' ? 'Ready to Experience Excellence?' : 'هل أنت مستعد لتجربة التميز؟'}
          </h2>
          <p style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '32px' }}>
            {language === 'en'
              ? 'Join thousands of satisfied customers who trust SKM Services for their home care needs.'
              : 'انضم إلى آلاف العملاء الراضين الذين يثقون بخدمات SKM لاحتياجات منزلهم.'}
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
            {language === 'en' ? 'Book a Service Today' : 'احجز خدمة اليوم'}
          </button>
        </div>
      </section>

      <Footer language={language} />
    </main>
  );
}
