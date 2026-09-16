'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check } from 'lucide-react';

export default function BookServicePage() {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    date: '',
    time: '',
    notes: ''
  });

  const content = {
    en: {
      back: 'Back',
      bookService: 'Book Home Cleaning',
      yourInfo: 'Your Information',
      name: 'Full Name',
      email: 'Email',
      phone: 'Phone',
      serviceDetails: 'Service Details',
      address: 'Service Address',
      date: 'Preferred Date',
      time: 'Preferred Time',
      notes: 'Special Requests',
      summary: 'Booking Summary',
      service: 'Service',
      price: 'From QR 69',
      duration: '2-4 Hours',
      features: 'What\'s Included',
      continuePayment: 'Continue to Payment',
      submit: 'Book Service'
    },
    ar: {
      back: 'رجوع',
      bookService: 'احجز تنظيف المنزل',
      yourInfo: 'معلوماتك',
      name: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      phone: 'الهاتف',
      serviceDetails: 'تفاصيل الخدمة',
      address: 'عنوان الخدمة',
      date: 'التاريخ المفضل',
      time: 'الوقت المفضل',
      notes: 'طلبات خاصة',
      summary: 'ملخص الحجز',
      service: 'الخدمة',
      price: 'من QR 69',
      duration: '2-4 ساعات',
      features: 'ما هو مشمول',
      continuePayment: 'المتابعة للدفع',
      submit: 'احجز الخدمة'
    }
  };

  const t = content[language];

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    window.location.href = '/booking-success';
  };

  return (
    <main className="min-h-screen bg-gray-50" style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/services/home-cleaning" className="p-2 hover:bg-gray-100 rounded">
              <ArrowLeft size={24} className="text-gray-700" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">{t.bookService}</h1>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setLanguage('en')} className={`px-3 py-1 rounded ${language === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>EN</button>
            <button onClick={() => setLanguage('ar')} className={`px-3 py-1 rounded ${language === 'ar' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>AR</button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Form */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg space-y-8">
              {/* Your Info */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">{t.yourInfo}</h2>
                <div className="space-y-4">
                  <input type="text" name="name" placeholder={t.name} value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  <input type="email" name="email" placeholder={t.email} value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  <input type="tel" name="phone" placeholder={t.phone} value={formData.phone} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
              </div>

              {/* Service Details */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6">{t.serviceDetails}</h2>
                <div className="space-y-4">
                  <input type="text" name="address" placeholder={t.address} value={formData.address} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  <input type="time" name="time" value={formData.time} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                  <textarea name="notes" placeholder={t.notes} value={formData.notes} onChange={handleChange} rows={3} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
              </div>

              <button type="submit" className="w-full bg-emerald-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-emerald-700 transition">
                {t.submit}
              </button>
            </form>
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">{t.summary}</h2>
              
              <div className="pb-6 border-b border-gray-200 mb-6">
                <p className="text-sm text-gray-600 mb-2">{t.service}</p>
                <p className="text-lg font-bold text-gray-900">Home Cleaning</p>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600">{t.duration}</p>
                  <p className="font-bold text-gray-900">2-4 Hours</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Price</p>
                  <p className="text-2xl font-bold text-emerald-600">{t.price}</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="font-bold text-gray-900 mb-3">{t.features}</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm text-gray-700"><Check size={16} className="text-emerald-600" /> Professional Team</li>
                  <li className="flex items-center gap-2 text-sm text-gray-700"><Check size={16} className="text-emerald-600" /> Eco-Friendly</li>
                  <li className="flex items-center gap-2 text-sm text-gray-700"><Check size={16} className="text-emerald-600" /> 100% Insured</li>
                  <li className="flex items-center gap-2 text-sm text-gray-700"><Check size={16} className="text-emerald-600" /> 24/7 Support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
