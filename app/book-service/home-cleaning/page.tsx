'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, MapPin, Calendar, Clock, Phone, Mail, ChevronRight } from 'lucide-react';

export default function BookHomeCleaningPage() {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    date: '',
    time: '',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const translations = {
    en: {
      bookService: 'Book Home Cleaning',
      step: 'Step',
      of: '/',
      yourDetails: 'Your Details',
      serviceInfo: 'Service Information',
      fullName: 'Full Name',
      namePlaceholder: 'John Doe',
      email: 'Email Address',
      emailPlaceholder: 'john@example.com',
      phone: 'Phone Number',
      phonePlaceholder: '+974 XXXX XXXX',
      address: 'Service Address',
      addressPlaceholder: 'Enter full address in Doha',
      date: 'Preferred Date',
      time: 'Preferred Time',
      specialRequests: 'Special Requests',
      requestsPlaceholder: 'Tell us about any special areas or preferences...',
      next: 'Next',
      back: 'Back',
      book: 'Complete Booking',
      summary: 'Booking Summary',
      service: 'Home Cleaning Service',
      estimatedTime: '2-4 Hours',
      price: 'QR 69',
      included: 'Included',
      professional: 'Professional Team',
      eco: 'Eco-Friendly Products',
      insured: '100% Insured',
      support: '24/7 Support',
      success: 'Booking Confirmed',
      successMsg: 'Your cleaning service has been booked! We will contact you within 2 hours to confirm.',
      confirmEmail: 'Confirmation sent to:',
      viewDetails: 'View Booking',
      bookAnother: 'Book Another'
    },
    ar: {
      bookService: 'احجز خدمة التنظيف',
      step: 'الخطوة',
      of: '/',
      yourDetails: 'بيانات شخصية',
      serviceInfo: 'معلومات الخدمة',
      fullName: 'الاسم الكامل',
      namePlaceholder: 'أحمد محمد',
      email: 'البريد الإلكتروني',
      emailPlaceholder: 'ahmed@example.com',
      phone: 'رقم الهاتف',
      phonePlaceholder: '+974 XXXX XXXX',
      address: 'عنوان الخدمة',
      addressPlaceholder: 'أدخل العنوان الكامل في الدوحة',
      date: 'التاريخ المفضل',
      time: 'الوقت المفضل',
      specialRequests: 'طلبات خاصة',
      requestsPlaceholder: 'أخبرنا عن أي متطلبات خاصة...',
      next: 'التالي',
      back: 'رجوع',
      book: 'تأكيد الحجز',
      summary: 'ملخص الحجز',
      service: 'خدمة تنظيف المنزل',
      estimatedTime: '2-4 ساعات',
      price: 'ر.ق 69',
      included: 'المشمول',
      professional: 'فريق احترافي',
      eco: 'منتجات صديقة للبيئة',
      insured: 'مؤمن 100%',
      support: 'دعم 24/7',
      success: 'تم تأكيد الحجز',
      successMsg: 'تم حجز خدمة التنظيف بنجاح! سنتصل بك خلال ساعتين.',
      confirmEmail: 'التأكيد مرسل إلى:',
      viewDetails: 'عرض التفاصيل',
      bookAnother: 'حجز آخر'
    }
  };

  const t = translations[language];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const canProceed = step === 1 ? (formData.name.trim() && formData.email.trim() && formData.phone.trim()) : (formData.address.trim() && formData.date && formData.time);

  const handleNext = () => {
    if (canProceed && step === 1) setStep(2);
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canProceed) setSubmitted(true);
  };

  if (submitted) {
    return (
      <main style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }} className="min-h-screen bg-white">
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <Link href="/services/home-cleaning" className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition">
              <ArrowLeft size={24} className="text-gray-900" />
            </Link>
            <div className="flex gap-2">
              <button onClick={() => setLanguage('en')} className={`px-3 py-1 rounded text-sm font-semibold transition ${language === 'en' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700'}`}>EN</button>
              <button onClick={() => setLanguage('ar')} className={`px-3 py-1 rounded text-sm font-semibold transition ${language === 'ar' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700'}`}>AR</button>
            </div>
          </div>
        </header>

        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-emerald-50 to-teal-50">
          <div className="w-full max-w-2xl">
            {/* Success Icon */}
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
                <Check size={40} className="text-emerald-600" strokeWidth={3} />
              </div>
            </div>

            {/* Success Title */}
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 text-center mb-4">{t.success}</h1>

            {/* Success Message */}
            <p className="text-lg text-gray-700 text-center mb-10 leading-relaxed">{t.successMsg}</p>

            {/* Email Confirmation */}
            <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 sm:p-8 mb-10">
              <p className="text-sm text-gray-600 font-semibold mb-2">{t.confirmEmail}</p>
              <p className="text-xl text-emerald-600 font-bold">{formData.email}</p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Link href="/services/home-cleaning" className="block w-full bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-emerald-700 transition text-center">
                {t.viewDetails}
              </Link>
              <button onClick={() => { setStep(1); setSubmitted(false); setFormData({ name: '', email: '', phone: '', address: '', date: '', time: '', notes: '' }); }} className="block w-full border-2 border-emerald-600 text-emerald-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-emerald-50 transition">
                {t.bookAnother}
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }} className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/services/home-cleaning" className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition">
            <ArrowLeft size={24} className="text-gray-900" />
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{t.bookService}</h1>
          <div className="flex gap-2">
            <button onClick={() => setLanguage('en')} className={`px-3 py-1 rounded text-sm font-semibold transition ${language === 'en' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700'}`}>EN</button>
            <button onClick={() => setLanguage('ar')} className={`px-3 py-1 rounded text-sm font-semibold transition ${language === 'ar' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-700'}`}>AR</button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Step Indicator */}
        <div className="mb-12">
          <div className="flex items-center gap-6 mb-8">
            {/* Step 1 */}
            <div className="flex items-center gap-4 flex-1">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition ${step >= 1 ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
                1
              </div>
              <div className="flex-1 hidden sm:block">
                <p className={`text-sm font-semibold ${step >= 1 ? 'text-emerald-600' : 'text-gray-400'}`}>{t.yourDetails}</p>
              </div>
            </div>

            {/* Divider */}
            <div className={`h-1 w-12 transition ${step >= 2 ? 'bg-emerald-600' : 'bg-gray-200'}`}></div>

            {/* Step 2 */}
            <div className="flex items-center gap-4 flex-1">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition ${step >= 2 ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
                2
              </div>
              <div className="flex-1 hidden sm:block">
                <p className={`text-sm font-semibold ${step >= 2 ? 'text-emerald-600' : 'text-gray-400'}`}>{t.serviceInfo}</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 font-semibold text-center sm:text-left">{t.step} {step} {t.of} 2</p>
        </div>

        {/* Form Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 border border-gray-200">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Step 1: Your Details */}
                {step === 1 && (
                  <>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-8">{t.yourDetails}</h2>
                      <div className="space-y-6">
                        {/* Name */}
                        <div>
                          <label className="block text-base font-semibold text-gray-900 mb-3">{t.fullName}</label>
                          <input
                            type="text"
                            name="name"
                            placeholder={t.namePlaceholder}
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-600 text-base transition"
                          />
                        </div>

                        {/* Email */}
                        <div>
                          <label className="block text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <Mail size={20} className="text-emerald-600" />
                            {t.email}
                          </label>
                          <input
                            type="email"
                            name="email"
                            placeholder={t.emailPlaceholder}
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-600 text-base transition"
                          />
                        </div>

                        {/* Phone */}
                        <div>
                          <label className="block text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <Phone size={20} className="text-emerald-600" />
                            {t.phone}
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            placeholder={t.phonePlaceholder}
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-600 text-base transition"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Step 2: Service Information */}
                {step === 2 && (
                  <>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-8">{t.serviceInfo}</h2>
                      <div className="space-y-6">
                        {/* Address */}
                        <div>
                          <label className="block text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <MapPin size={20} className="text-emerald-600" />
                            {t.address}
                          </label>
                          <input
                            type="text"
                            name="address"
                            placeholder={t.addressPlaceholder}
                            value={formData.address}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-600 text-base transition"
                          />
                        </div>

                        {/* Date and Time */}
                        <div className="grid sm:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                              <Calendar size={20} className="text-emerald-600" />
                              {t.date}
                            </label>
                            <input
                              type="date"
                              name="date"
                              value={formData.date}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-600 text-base transition"
                            />
                          </div>
                          <div>
                            <label className="block text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                              <Clock size={20} className="text-emerald-600" />
                              {t.time}
                            </label>
                            <input
                              type="time"
                              name="time"
                              value={formData.time}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-600 text-base transition"
                            />
                          </div>
                        </div>

                        {/* Special Requests */}
                        <div>
                          <label className="block text-base font-semibold text-gray-900 mb-3">{t.specialRequests}</label>
                          <textarea
                            name="notes"
                            placeholder={t.requestsPlaceholder}
                            value={formData.notes}
                            onChange={handleInputChange}
                            rows={4}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-600 text-base transition resize-none"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  {step === 2 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-900 font-semibold rounded-lg hover:bg-gray-50 transition text-lg"
                    >
                      {t.back}
                    </button>
                  )}
                  {step === 1 && (
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={!canProceed}
                      className="flex-1 px-6 py-4 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition text-lg flex items-center justify-center gap-2"
                    >
                      {t.next} <ChevronRight size={20} />
                    </button>
                  )}
                  {step === 2 && (
                    <button
                      type="submit"
                      disabled={!canProceed}
                      className="flex-1 px-6 py-4 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition text-lg flex items-center justify-center gap-2"
                    >
                      <Check size={20} /> {t.book}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border-2 border-emerald-200 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-8">{t.summary}</h3>

              {/* Service Details */}
              <div className="mb-8 pb-8 border-b-2 border-emerald-200">
                <p className="text-sm text-gray-600 font-semibold mb-2">Service</p>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">{t.service}</h4>
                <div className="flex items-center gap-2 text-gray-700">
                  <Clock size={18} className="text-emerald-600" />
                  <span className="font-semibold">{t.estimatedTime}</span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-8">
                <p className="text-sm text-gray-600 font-semibold mb-2">Starting Price</p>
                <p className="text-4xl font-bold text-emerald-600">{t.price}</p>
              </div>

              {/* Included */}
              <div className="bg-white rounded-xl p-6 border-2 border-emerald-100">
                <p className="font-bold text-gray-900 mb-4">{t.included}</p>
                <ul className="space-y-3">
                  {[
                    { icon: '👨‍💼', text: t.professional },
                    { icon: '🌿', text: t.eco },
                    { icon: '🛡️', text: t.insured },
                    { icon: '☎️', text: t.support }
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-gray-900">
                      <span className="text-lg mt-0.5">{item.icon}</span>
                      <span className="font-medium">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
