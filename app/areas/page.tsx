'use client';

import React, { useState, useContext } from 'react';
import { Header, LanguageContext } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { Language, getTranslation } from '@/app/lib/translations';
import { MapPin } from 'lucide-react';

interface Municipality {
  name: string;
  nameAr: string;
  areas: string[];
  areasAr: string[];
  count: number;
}

const municipalities: Municipality[] = [
  {
    name: 'Doha Municipality',
    nameAr: 'بلدية الدوحة',
    areas: ['Al Dafna', 'Al Bidda', 'Al Khor Corniche', 'Onaiza', 'Umm Ghuwailina', 'Umm Lekhba', 'Bin Omran', 'Abu Hamour', 'Al Khor Corniche', 'Onaiza', 'Al Mansoura', 'Al Rawdat Al Khail', 'Al Najma', 'Al Hitmi', 'Umm Al Seneem', 'Umm Al Khair', 'Umm Salal Ali', 'Umm Salal Mohammed', 'Al Duhail', 'Al Duhail North', 'Fareej Bin Omran', 'Fareej Bin Mahmoud', 'Al Sadd', 'Najma', 'Madinat Khalifa', 'Madinat Khalifa North', 'Madinat Khalifa South', 'The Pearl Qatar', 'West Bay', 'West Bay Lagoon', 'Al Corniche', 'Al Souq', 'Al Luqta', 'Al Rayyan', 'Al Gharrafa', 'Al Shahaniya', 'Al Thumama'],
    areasAr: ['الدفنة', 'البدع', 'الخور كورنيش', 'العنيزة', 'أم غويلينة', 'أم ليخبة', 'بن عمران', 'أبو حمور', 'الخور كورنيش', 'العنيزة', 'المنصورة', 'الروضة الخيل', 'النجمة', 'الحتمي', 'أم الصنيع', 'أم الخير', 'أم صلال علي', 'أم صلال محمد', 'الدحيل', 'الدحيل شمال', 'فريج بن عمران', 'فريج بن محمود', 'الساد', 'النجمة', 'مدينة خليفة', 'مدينة خليفة شمال', 'مدينة خليفة جنوب', 'لؤلؤة قطر', 'ويست باي', 'ويست باي لاجون', 'الكورنيش', 'السوق', 'اللقطة', 'الريان', 'الغرافة', 'الشحانية', 'الثمامة'],
    count: 38,
  },
  {
    name: 'Al Rayyan Municipality',
    nameAr: 'بلدية الريان',
    areas: ['Al Rayyan', 'Al Waab', 'Al Muraikhi', 'Al Luqta', 'Al Markhiya', 'Al Waiba', 'Al Aziziya', 'Ain Khaled', 'Baaya', 'Izghawa', 'Fereej Al Amir', 'Fereej Al Manaseer', 'Fereej Al Nasr', 'Fereej Al Sudan', 'Hamad Medical City', 'Muaither', 'Abu Hamour', 'Al Messila', 'Al Waab Street'],
    areasAr: ['الريان', 'الواب', 'المريخي', 'اللقطة', 'المرخية', 'الويبة', 'العزيزية', 'عين خالد', 'بعيا', 'إزغاوة', 'فريج الأمير', 'فريج المنصير', 'فريج الناصر', 'فريج السودان', 'مدينة حمد الطبية', 'المعيثر', 'أبو حمور', 'المسيلة', 'شارع الواب'],
    count: 19,
  },
  {
    name: 'Lusail City',
    nameAr: 'مدينة لوسيل',
    areas: ['Lusail', 'Lusail Marina', 'Fox Hills', 'Waterfront', 'Entertainment City', 'Energy City', 'Al Erkyah', 'Al Kharaiij', 'Qetaifan Islands'],
    areasAr: ['لوسيل', 'لوسيل مارينا', 'فوكس هيلز', 'ووترفرونت', 'إنترتينمنت سيتي', 'إنرجي سيتي', 'الإركية', 'الخراريج', 'جزر قطيفان'],
    count: 9,
  },
  {
    name: 'Al Khor Municipality',
    nameAr: 'بلدية الخور',
    areas: ['Al Khor', 'Al Thakhira', 'Ras Laffan', 'Simaisma', 'Al Khor Community'],
    areasAr: ['الخور', 'الثاخرة', 'رأس لفان', 'سميسمة', 'مجتمع الخور'],
    count: 5,
  },
  {
    name: 'Al Shamal Municipality',
    nameAr: 'بلدية الشمال',
    areas: ['Al Ruwais', 'Al Shamal', 'Madinat Al Shamal', 'Al Zubara', 'Fuwayrit'],
    areasAr: ['الروايس', 'الشمال', 'مدينة الشمال', 'الزبارة', 'فويرت'],
    count: 5,
  },
  {
    name: 'Al Daayen Municipality',
    nameAr: 'بلدية الدعيان',
    areas: ['Al Daayen', 'Umm Salal Mohammed', 'Umm Salal Ali', 'Al Kheesa', 'Al Sakhama', 'Lusail City North'],
    areasAr: ['الدعيان', 'أم صلال محمد', 'أم صلال علي', 'الخيسة', 'الصخامة', 'شمال مدينة لوسيل'],
    count: 6,
  },
  {
    name: 'Umm Salal Municipality',
    nameAr: 'بلدية أم صلال',
    areas: ['Umm Salal', 'Umm Salal Mohammed', 'Umm Salal Ali', 'Al Charaiyat', 'Umm Al Amad', 'Al Eqia'],
    areasAr: ['أم صلال', 'أم صلال محمد', 'أم صلال علي', 'الخريطيات', 'أم الامد', 'العقية'],
    count: 6,
  },
  {
    name: 'Al Wakrah Municipality',
    nameAr: 'بلدية الوكرة',
    areas: ['Al Wakrah', 'Mesaieed', 'Abu Samra', 'New Al Wakrah', 'Al Marjan', 'Al Mansoura', 'Al Jemaiya'],
    areasAr: ['الوكرة', 'مسيعيد', 'أبو ثمرة', 'الوكرة الجديدة', 'المرجان', 'المنصورة', 'الجميعية'],
    count: 7,
  },
];

export default function AreasPage() {
  const { language, setLanguage } = useContext(LanguageContext);
  const isRTL = language === 'ar';

  return (
    <div style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      <Header language={language} setLanguage={setLanguage} />

      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #0052CC 0%, #003a96 100%)',
        padding: '60px 16px',
        textAlign: 'center',
        color: 'white'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-block',
            padding: '8px 16px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '20px',
            marginBottom: '24px',
            fontSize: '14px',
            fontWeight: '600'
          }}>
            {language === 'en' ? '100+ Areas' : '100+ منطقة'}
          </div>
          <h1 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '16px' }}>
            {getTranslation('areasInQatar', language)}
          </h1>
          <p style={{ fontSize: '18px', opacity: 0.9, maxWidth: '700px', margin: '0 auto' }}>
            {getTranslation('serve8Governorates', language)}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', paddingLeft: '16px', paddingRight: '16px', paddingTop: '60px', paddingBottom: '60px' }}>
        
        {/* Municipalities Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {municipalities.map((municipality, idx) => (
            <div key={idx}>
              {/* Municipality Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px',
                paddingBottom: '16px',
                borderBottom: '2px solid #f3f4f6'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: '#0052CC',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '16px'
                  }}>
                    <MapPin size={18} />
                  </div>
                  <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', margin: 0 }}>
                    {language === 'en' ? municipality.name : municipality.nameAr}
                  </h2>
                </div>
                <div style={{
                  padding: '6px 16px',
                  background: '#0052CC',
                  color: 'white',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: '600'
                }}>
                  {municipality.count} {language === 'en' ? 'areas' : 'مناطق'}
                </div>
              </div>

              {/* Areas Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '16px'
              }}>
                {(language === 'en' ? municipality.areas : municipality.areasAr).map((area, areaIdx) => (
                  <a
                    key={areaIdx}
                    href={`/areas/${area.toLowerCase().replace(/\s+/g, '-')}`}
                    style={{
                      padding: '16px',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      background: '#f9fafb',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      fontSize: '14px',
                      color: '#374151',
                      fontWeight: '500',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#0052CC';
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.borderColor = '#0052CC';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#f9fafb';
                      e.currentTarget.style.color = '#374151';
                      e.currentTarget.style.borderColor = '#e5e7eb';
                    }}
                  >
                    <MapPin size={16} style={{ flexShrink: 0 }} />
                    <span>{area}</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer language={language} />
    </div>
  );
}
