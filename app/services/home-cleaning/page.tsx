'use client';

import Link from 'next/link';
import { Download, Check, Clock, User, Trophy } from 'lucide-react';
import { useState } from 'react';

export default function HomeCleaningPage() {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  const content = {
    en: {
      available: 'Available in Qatar',
      title: 'Home Cleaning',
      description: 'Get your home sparkling clean with our professional home cleaning service. Our vetted cleaners provide thorough cleaning with trusted, background-checked professionals.',
      downloadApp: 'Download App',
      bookNow: 'Book Now',
      price: 'From QR 69',
      priceLabel: 'Price',
      delivery: '24-48 hours',
      deliveryLabel: 'Delivery',
      sameCleaner: 'Same Cleaner',
      quality: 'Quality Assured',
    },
    ar: {
      available: 'متوفر في قطر',
      title: 'تنظيف المنزل',
      description: 'احصل على منزلك نظيفًا براقًا مع خدمة تنظيف المنزل الاحترافية. يوفر منظفونا المختبرون تنظيفًا شاملاً.',
      downloadApp: 'تحميل التطبيق',
      bookNow: 'احجز الآن',
      price: 'من QR 69',
      priceLabel: 'السعر',
      delivery: '24-48 ساعة',
      deliveryLabel: 'التسليم',
      sameCleaner: 'نفس المنظف',
      quality: 'جودة مضمونة',
    }
  };

  const t = content[language];

  return (
    <main className="min-h-screen bg-white">
      {/* Language Toggle */}
      <div className="bg-gray-100 px-4 py-3 text-center">
        <button onClick={() => setLanguage('en')} className={`px-4 py-1 mr-2 rounded ${language === 'en' ? 'bg-blue-600 text-white' : 'bg-white'}`}>EN</button>
        <button onClick={() => setLanguage('ar')} className={`px-4 py-1 rounded ${language === 'ar' ? 'bg-blue-600 text-white' : 'bg-white'}`}>AR</button>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-20 px-4" style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-white bg-opacity-20 px-4 py-2 rounded-full mb-6 text-sm font-semibold">
            {t.available}
          </div>
          <h1 className="text-5xl font-bold mb-6">{t.title}</h1>
          <p className="text-lg text-white text-opacity-90 mb-10 max-w-2xl mx-auto">
            {t.description}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition flex items-center gap-2">
              <Download size={20} />
              {t.downloadApp}
            </button>
            <Link href="/book-service/home-cleaning" className="bg-white bg-opacity-20 border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-emerald-600 transition">
              {t.bookNow}
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-2xl bg-gray-50">
              <div className="text-3xl mb-3">💰</div>
              <p className="text-sm text-gray-600 mb-2">{t.priceLabel}</p>
              <p className="text-xl font-bold text-emerald-600">{t.price}</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gray-50">
              <Clock size={32} className="mx-auto mb-3 text-blue-600" />
              <p className="text-sm text-gray-600 mb-2">{t.deliveryLabel}</p>
              <p className="text-xl font-bold text-gray-900">{t.delivery}</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gray-50">
              <User size={32} className="mx-auto mb-3 text-purple-600" />
              <p className="text-sm text-gray-600 mb-2">Cleaner</p>
              <p className="text-xl font-bold text-gray-900">{t.sameCleaner}</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-gray-50">
              <Check size={32} className="mx-auto mb-3 text-green-600" />
              <p className="text-sm text-gray-600 mb-2">Guarantee</p>
              <p className="text-xl font-bold text-gray-900">{t.quality}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
