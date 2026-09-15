'use client';

import { useState } from 'react';
import { PrivacyPolicy } from '../components/PrivacyPolicy';
import { Language } from '@/app/lib/translations';

export default function PrivacyPolicyPage() {
  const [language, setLanguage] = useState<Language>('en');

  return (
    <div>
      {/* Language Toggle */}
      <div style={{ padding: '16px', background: '#f5f5f5', textAlign: 'center', borderBottom: '1px solid #e5e7eb' }}>
        <button 
          onClick={() => setLanguage('en')}
          style={{ 
            padding: '8px 16px', 
            marginRight: '8px', 
            background: language === 'en' ? '#0052CC' : '#e5e7eb',
            color: language === 'en' ? 'white' : '#111827',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600'
          }}
        >
          English
        </button>
        <button 
          onClick={() => setLanguage('ar')}
          style={{ 
            padding: '8px 16px', 
            background: language === 'ar' ? '#0052CC' : '#e5e7eb',
            color: language === 'ar' ? 'white' : '#111827',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600'
          }}
        >
          العربية
        </button>
      </div>

      {/* Privacy Policy Content */}
      <PrivacyPolicy language={language} />
    </div>
  );
}
