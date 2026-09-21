'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Calendar, Clock, ArrowLeft, Check } from 'lucide-react';

type Language = 'en' | 'ar';

interface BookingData {
  name: string;
  email: string;
  phone: string;
  address: string;
  date: string;
  time: string;
  specialRequests: string;
}

interface ContentType {
  pageTitle: string;
  backButton: string;
  en: string;
  ar: string;
  step1Title: string;
  step1Subtitle: string;
  step2Title: string;
  step2Subtitle: string;
  stepIndicator: (current: number) => string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  addressLabel: string;
  addressPlaceholder: string;
  dateLabel: string;
  timeLabel: string;
  specialRequestsLabel: string;
  specialRequestsPlaceholder: string;
  continueButton: string;
  backButtonText: string;
  bookNow: string;
  bookingSummary: string;
  serviceType: string;
  homeCleaningService: string;
  startingPrice: string;
  duration: string;
  hours: string;
  whatIncluded: string;
  included: string[];
  successTitle: string;
  successMessage: string;
  confirmationNumber: string;
  bookingDetails: string;
  nextSteps: string;
  nextStepsItems: string[];
  viewBookings: string;
  bookAnother: string;
  requiredField: string;
  invalidEmail: string;
  invalidPhone: string;
}

const content: Record<Language, ContentType> = {
  en: {
    pageTitle: 'Book Home Cleaning Service',
    backButton: 'Back',
    en: 'EN',
    ar: 'AR',
    step1Title: 'Personal Information',
    step1Subtitle: 'Tell us about yourself',
    step2Title: 'Service Details',
    step2Subtitle: 'Schedule your cleaning',
    stepIndicator: (current: number) => `Step ${current} of 2`,
    
    // Form fields - Step 1
    nameLabel: 'Full Name',
    namePlaceholder: 'Enter your name',
    emailLabel: 'Email Address',
    emailPlaceholder: 'your.email@example.com',
    phoneLabel: 'Phone Number',
    phonePlaceholder: '+974 30123456',
    
    // Form fields - Step 2
    addressLabel: 'Home Address',
    addressPlaceholder: 'Enter your complete address',
    dateLabel: 'Preferred Date',
    timeLabel: 'Preferred Time',
    specialRequestsLabel: 'Special Requests (Optional)',
    specialRequestsPlaceholder: 'Any specific requirements or preferences?',
    
    // Buttons
    continueButton: 'Continue',
    backButtonText: 'Back',
    bookNow: 'Confirm Booking',
    
    // Sidebar
    bookingSummary: 'Booking Summary',
    serviceType: 'Service Type',
    homeCleaningService: 'Professional Home Cleaning',
    startingPrice: 'Starting Price',
    duration: 'Duration',
    hours: '2-4 Hours',
    whatIncluded: "What's Included",
    included: [
      'Complete home inspection',
      'Dusting & vacuuming all areas',
      'Kitchen & bathroom deep clean',
      'Floor polishing & sanitization',
      'Professional-grade equipment',
      '24/7 customer support'
    ],
    
    // Success page
    successTitle: 'Booking Confirmed!',
    successMessage: 'Your home cleaning service has been successfully booked.',
    confirmationNumber: 'Confirmation Number',
    bookingDetails: 'Booking Details',
    nextSteps: 'What Happens Next',
    nextStepsItems: [
      'You will receive a confirmation email shortly',
      'Our team will contact you 24 hours before the appointment',
      'A professional cleaner will arrive at your scheduled time',
      'If you have any issues, our 24/7 support is here to help'
    ],
    viewBookings: 'View My Bookings',
    bookAnother: 'Book Another Service',
    
    // Validation
    requiredField: 'This field is required',
    invalidEmail: 'Please enter a valid email',
    invalidPhone: 'Please enter a valid phone number',
  },
  ar: {
    pageTitle: 'حجز خدمة تنظيف المنزل',
    backButton: 'رجوع',
    en: 'EN',
    ar: 'AR',
    step1Title: 'المعلومات الشخصية',
    step1Subtitle: 'أخبرنا عن نفسك',
    step2Title: 'تفاصيل الخدمة',
    step2Subtitle: 'جدول تنظيفك',
    stepIndicator: (current: number) => `خطوة ${current} من 2`,
    
    // Form fields - Step 1
    nameLabel: 'الاسم الكامل',
    namePlaceholder: 'أدخل اسمك',
    emailLabel: 'عنوان البريد الإلكتروني',
    emailPlaceholder: 'بريدك@مثال.com',
    phoneLabel: 'رقم الهاتف',
    phonePlaceholder: '+974 30123456',
    
    // Form fields - Step 2
    addressLabel: 'عنوان المنزل',
    addressPlaceholder: 'أدخل عنوانك الكامل',
    dateLabel: 'التاريخ المفضل',
    timeLabel: 'الوقت المفضل',
    specialRequestsLabel: 'طلبات خاصة (اختياري)',
    specialRequestsPlaceholder: 'أي متطلبات أو تفضيلات محددة؟',
    
    // Buttons
    continueButton: 'متابعة',
    backButtonText: 'رجوع',
    bookNow: 'تأكيد الحجز',
    
    // Sidebar
    bookingSummary: 'ملخص الحجز',
    serviceType: 'نوع الخدمة',
    homeCleaningService: 'خدمة تنظيف منزل احترافية',
    startingPrice: 'السعر الابتدائي',
    duration: 'المدة',
    hours: '2-4 ساعات',
    whatIncluded: 'ما هو مشمول',
    included: [
      'فحص المنزل الكامل',
      'مسح وتنظيف جميع المناطق',
      'تنظيف المطبخ والحمام بعمق',
      'تلميع الأرضيات والتعقيم',
      'معدات احترافية',
      'دعم 24/7'
    ],
    
    // Success page
    successTitle: 'تم تأكيد الحجز!',
    successMessage: 'تم حجز خدمة تنظيف منزلك بنجاح.',
    confirmationNumber: 'رقم التأكيد',
    bookingDetails: 'تفاصيل الحجز',
    nextSteps: 'ما يحدث بعده',
    nextStepsItems: [
      'ستتلقى رسالة تأكيد بريد إلكترونية قريباً',
      'سيتصل بك فريقنا قبل 24 ساعة من الموعد',
      'سيصل منظف احترافي في الوقت المحدد',
      'إذا كان لديك أي مشاكل، دعمنا 24/7 هنا للمساعدة'
    ],
    viewBookings: 'عرض حجوزاتي',
    bookAnother: 'حجز خدمة أخرى',
    
    // Validation
    requiredField: 'هذا الحقل مطلوب',
    invalidEmail: 'يرجى إدخال بريد إلكتروني صحيح',
    invalidPhone: 'يرجى إدخال رقم هاتف صحيح',
  }
};

export default function BookHomeCleaningPage() {
  const [language, setLanguage] = useState<Language>('en');
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmationNumber, setConfirmationNumber] = useState('');
  const [formData, setFormData] = useState<BookingData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    date: '',
    time: '',
    specialRequests: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const t: ContentType = content[language];
  const isRTL = language === 'ar';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = t.requiredField;
    }

    if (!formData.email.trim()) {
      newErrors.email = t.requiredField;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.invalidEmail;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t.requiredField;
    } else if (!/^[+]?[\d\s\-()]{10,}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = t.invalidPhone;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.address.trim()) {
      newErrors.address = t.requiredField;
    }

    if (!formData.date) {
      newErrors.date = t.requiredField;
    }

    if (!formData.time) {
      newErrors.time = t.requiredField;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (currentStep === 1) {
      if (validateStep1()) {
        setCurrentStep(2);
      }
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleSubmit = () => {
    if (validateStep2()) {
      const confirmation = `SKM-${Date.now().toString().slice(-8).toUpperCase()}`;
      setConfirmationNumber(confirmation);
      setIsSubmitted(true);
    }
  };

  const handleNewBooking = () => {
    setCurrentStep(1);
    setIsSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      date: '',
      time: '',
      specialRequests: '',
    });
    setErrors({});
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-white" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white py-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link href="/services/home-cleaning" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
              <ArrowLeft size={24} />
              <span className="font-semibold">{t.backButton}</span>
            </Link>
            <h1 className="text-2xl font-bold">{t.pageTitle}</h1>
            <div className="flex gap-2 bg-white bg-opacity-20 rounded-full p-1">
              <button
                onClick={() => setLanguage('en')}
                className={`px-4 py-2 rounded-full font-semibold transition-all ${language === 'en' ? 'bg-white text-emerald-600' : 'text-white hover:bg-white hover:bg-opacity-10'}`}
              >
                {t.en}
              </button>
              <button
                onClick={() => setLanguage('ar')}
                className={`px-4 py-2 rounded-full font-semibold transition-all ${language === 'ar' ? 'bg-white text-emerald-600' : 'text-white hover:bg-white hover:bg-opacity-10'}`}
              >
                {t.ar}
              </button>
            </div>
          </div>
        </div>

        {/* Success Content */}
        <div className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center animate-pulse">
                  <Check size={40} className="text-emerald-600" />
                </div>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.successTitle}</h2>
              <p className="text-xl text-gray-600 mb-8">{t.successMessage}</p>

              {/* Confirmation Number */}
              <div className="bg-emerald-50 rounded-xl p-8 mb-8 border-2 border-emerald-200">
                <p className="text-gray-600 mb-2">{t.confirmationNumber}</p>
                <p className="text-3xl font-bold text-emerald-600 font-mono">{confirmationNumber}</p>
              </div>

              {/* Booking Details */}
              <div className="bg-white rounded-xl p-8 mb-8 border-2 border-gray-200 text-left">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.bookingDetails}</h3>
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">{t.nameLabel}:</span>
                    <span className="font-semibold text-gray-900">{formData.name}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">{t.emailLabel}:</span>
                    <span className="font-semibold text-gray-900">{formData.email}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">{t.phoneLabel}:</span>
                    <span className="font-semibold text-gray-900">{formData.phone}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">{t.addressLabel}:</span>
                    <span className="font-semibold text-gray-900">{formData.address}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">{t.dateLabel}:</span>
                    <span className="font-semibold text-gray-900">{formData.date}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">{t.timeLabel}:</span>
                    <span className="font-semibold text-gray-900">{formData.time}</span>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-white rounded-xl p-8 mb-8 border-2 border-gray-200 text-left">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.nextSteps}</h3>
                <ul className="space-y-4">
                  {t.nextStepsItems.map((item, idx) => (
                    <li key={idx} className="flex gap-4">
                      <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                        <Check size={16} className="text-emerald-600" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 flex-col sm:flex-row">
                <Link
                  href="/user/bookings"
                  className="flex-1 bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl text-center"
                >
                  {t.viewBookings}
                </Link>
                <button
                  onClick={handleNewBooking}
                  className="flex-1 border-2 border-emerald-600 text-emerald-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-emerald-50 transition-all"
                >
                  {t.bookAnother}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white" style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white py-4 px-4 sm:px-6 lg:px-8 sticky top-0 z-40 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/services/home-cleaning" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <ArrowLeft size={24} />
            <span className="font-semibold">{t.backButton}</span>
          </Link>
          <h1 className="text-2xl font-bold hidden sm:block">{t.pageTitle}</h1>
          <div className="flex gap-2 bg-white bg-opacity-20 rounded-full p-1">
            <button
              onClick={() => setLanguage('en')}
              className={`px-4 py-2 rounded-full font-semibold transition-all ${language === 'en' ? 'bg-white text-emerald-600' : 'text-white hover:bg-white hover:bg-opacity-10'}`}
            >
              {t.en}
            </button>
            <button
              onClick={() => setLanguage('ar')}
              className={`px-4 py-2 rounded-full font-semibold transition-all ${language === 'ar' ? 'bg-white text-emerald-600' : 'text-white hover:bg-white hover:bg-opacity-10'}`}
            >
              {t.ar}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              {/* Step Indicator */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-1">
                      {currentStep === 1 ? t.step1Title : t.step2Title}
                    </h2>
                    <p className="text-gray-600">
                      {currentStep === 1 ? t.step1Subtitle : t.step2Subtitle}
                    </p>
                  </div>
                  <div className="text-sm font-semibold text-gray-600">
                    {t.stepIndicator(currentStep)}
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / 2) * 100}%` }}
                  />
                </div>
              </div>

              {/* Form Content */}
              <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 shadow-sm">
                {currentStep === 1 ? (
                  // Step 1: Personal Information
                  <div className="space-y-6">
                    {/* Name Field */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t.nameLabel}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder={t.namePlaceholder}
                          className={`w-full px-4 py-3 pl-12 rounded-lg border-2 transition-all focus:outline-none ${
                            errors.name
                              ? 'border-red-500 focus:border-red-600'
                              : 'border-gray-200 focus:border-emerald-500'
                          }`}
                        />
                        <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
                      </div>
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t.emailLabel}
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder={t.emailPlaceholder}
                          className={`w-full px-4 py-3 pl-12 rounded-lg border-2 transition-all focus:outline-none ${
                            errors.email
                              ? 'border-red-500 focus:border-red-600'
                              : 'border-gray-200 focus:border-emerald-500'
                          }`}
                        />
                        <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
                      </div>
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    {/* Phone Field */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t.phoneLabel}
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder={t.phonePlaceholder}
                          className={`w-full px-4 py-3 pl-12 rounded-lg border-2 transition-all focus:outline-none ${
                            errors.phone
                              ? 'border-red-500 focus:border-red-600'
                              : 'border-gray-200 focus:border-emerald-500'
                          }`}
                        />
                        <Phone className="absolute left-4 top-3.5 text-gray-400" size={20} />
                      </div>
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    {/* Continue Button */}
                    <div className="pt-6">
                      <button
                        onClick={handleContinue}
                        className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                          formData.name && formData.email && formData.phone
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg hover:shadow-xl'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                        disabled={!formData.name || !formData.email || !formData.phone}
                      >
                        {t.continueButton}
                      </button>
                    </div>
                  </div>
                ) : (
                  // Step 2: Service Details
                  <div className="space-y-6">
                    {/* Address Field */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t.addressLabel}
                      </label>
                      <div className="relative">
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder={t.addressPlaceholder}
                          rows={3}
                          className={`w-full px-4 py-3 pl-12 rounded-lg border-2 transition-all focus:outline-none resize-none ${
                            errors.address
                              ? 'border-red-500 focus:border-red-600'
                              : 'border-gray-200 focus:border-emerald-500'
                          }`}
                        />
                        <MapPin className="absolute left-4 top-3.5 text-gray-400" size={20} />
                      </div>
                      {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                    </div>

                    {/* Date and Time Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Date Field */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {t.dateLabel}
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 pl-12 rounded-lg border-2 transition-all focus:outline-none ${
                              errors.date
                                ? 'border-red-500 focus:border-red-600'
                                : 'border-gray-200 focus:border-emerald-500'
                            }`}
                          />
                          <Calendar className="absolute left-4 top-3.5 text-gray-400 pointer-events-none" size={20} />
                        </div>
                        {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                      </div>

                      {/* Time Field */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {t.timeLabel}
                        </label>
                        <div className="relative">
                          <input
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleInputChange}
                            className={`w-full px-4 py-3 pl-12 rounded-lg border-2 transition-all focus:outline-none ${
                              errors.time
                                ? 'border-red-500 focus:border-red-600'
                                : 'border-gray-200 focus:border-emerald-500'
                            }`}
                          />
                          <Clock className="absolute left-4 top-3.5 text-gray-400 pointer-events-none" size={20} />
                        </div>
                        {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
                      </div>
                    </div>

                    {/* Special Requests Field */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        {t.specialRequestsLabel}
                      </label>
                      <textarea
                        name="specialRequests"
                        value={formData.specialRequests}
                        onChange={handleInputChange}
                        placeholder={t.specialRequestsPlaceholder}
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-emerald-500 focus:outline-none transition-all resize-none"
                      />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 pt-6">
                      <button
                        onClick={handleBack}
                        className="flex-1 py-4 rounded-lg font-bold text-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
                      >
                        {t.backButtonText}
                      </button>
                      <button
                        onClick={handleSubmit}
                        className={`flex-1 py-4 rounded-lg font-bold text-lg transition-all ${
                          formData.address && formData.date && formData.time
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg hover:shadow-xl'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                        disabled={!formData.address || !formData.date || !formData.time}
                      >
                        {t.bookNow}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar: Booking Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border-2 border-emerald-200 sticky top-24">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.bookingSummary}</h3>

                {/* Service Type */}
                <div className="mb-6 pb-6 border-b-2 border-emerald-200">
                  <p className="text-sm text-gray-600 mb-1">{t.serviceType}</p>
                  <p className="text-lg font-bold text-gray-900">{t.homeCleaningService}</p>
                </div>

                {/* Price and Duration */}
                <div className="mb-6 pb-6 border-b-2 border-emerald-200">
                  <div className="flex justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{t.startingPrice}</p>
                      <p className="text-2xl font-bold text-emerald-600">QR 69</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-1">{t.duration}</p>
                      <p className="font-semibold text-gray-900">{t.hours}</p>
                    </div>
                  </div>
                </div>

                {/* What's Included */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-4">{t.whatIncluded}</h4>
                  <ul className="space-y-3">
                    {t.included.map((item, idx) => (
                      <li key={idx} className="flex gap-3">
                        <Check size={20} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
