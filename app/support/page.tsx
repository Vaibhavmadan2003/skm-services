'use client';

import React, { useState, useContext } from 'react';
import { Header, LanguageContext } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { Language, getTranslation } from '@/app/lib/translations';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';

export default function SupportPage() {
  const { language, setLanguage } = useContext(LanguageContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple email sending logic - in production this would be replaced with API
    if (formData.name && formData.email && formData.subject && formData.message) {
      // Log form data (in production, send to backend)
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setIsSubmitted(false);
      }, 3000);
    }
  };

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
          <h1 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '16px' }}>
            {getTranslation('support', language)}
          </h1>
          <p style={{ fontSize: '18px', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
            {getTranslation('needHelp', language)}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', paddingLeft: '16px', paddingRight: '16px', paddingTop: '60px', paddingBottom: '60px' }}>
        
        {/* Two Column Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', marginBottom: '60px' }}>
          
          {/* Left Column - Contact Details */}
          <div>
            {/* Company Details Section */}
            <div style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '32px', color: '#111827' }}>
                {getTranslation('companyDetails', language)}
              </h2>

              {/* Address */}
              <div style={{ marginBottom: '32px', display: 'flex', gap: '16px' }}>
                <div style={{ 
                  minWidth: '40px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  background: '#0052CC', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <MapPin size={20} color="white" />
                </div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: '#666', marginBottom: '8px' }}>
                    {language === 'en' ? 'Address' : 'العنوان'}
                  </p>
                  <p style={{ fontSize: '16px', color: '#111827', lineHeight: '1.6' }}>
                    Golden Tower Building
                    <br />
                    Office No. 702
                    <br />
                    Al Khalidiya Street
                    <br />
                    7th Floor, Doha
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div style={{ marginBottom: '32px', display: 'flex', gap: '16px' }}>
                <div style={{ 
                  minWidth: '40px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  background: '#0052CC', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Phone size={20} color="white" />
                </div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: '#666', marginBottom: '8px' }}>
                    {getTranslation('phone', language)}
                  </p>
                  <a href="tel:+97450878775" style={{ fontSize: '16px', color: '#0052CC', textDecoration: 'none', fontWeight: '600' }}>
                    +974 3087 8775
                  </a>
                </div>
              </div>

              {/* Email */}
              <div style={{ marginBottom: '32px', display: 'flex', gap: '16px' }}>
                <div style={{ 
                  minWidth: '40px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  background: '#0052CC', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Mail size={20} color="white" />
                </div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: '#666', marginBottom: '8px' }}>
                    {getTranslation('email', language)}
                  </p>
                  <a href="mailto:poshan023@gmail.com" style={{ fontSize: '16px', color: '#0052CC', textDecoration: 'none', fontWeight: '600' }}>
                    poshan023@gmail.com
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div style={{ display: 'flex', gap: '16px' }}>
                <div style={{ 
                  minWidth: '40px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  background: '#0052CC', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Clock size={20} color="white" />
                </div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: '#666', marginBottom: '8px' }}>
                    {getTranslation('hours', language)}
                  </p>
                  <p style={{ fontSize: '16px', color: '#111827', fontWeight: '600' }}>
                    {getTranslation('open24Hours', language)}
                  </p>
                </div>
              </div>
            </div>

            {/* Working Details Section */}
            <div style={{ background: '#f9fafb', padding: '32px', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', color: '#111827' }}>
                {getTranslation('workingDetails', language)}
              </h3>
              <ul style={{ 
                listStyle: 'none', 
                padding: 0, 
                margin: 0, 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '12px' 
              }}>
                <li style={{ fontSize: '14px', color: '#555', display: 'flex', gap: '8px' }}>
                  <span style={{ color: '#0052CC', fontWeight: '700' }}>✓</span>
                  <span>{language === 'en' ? 'Professional support team available 24/7' : 'فريق دعم احترافي متاح 24/7'}</span>
                </li>
                <li style={{ fontSize: '14px', color: '#555', display: 'flex', gap: '8px' }}>
                  <span style={{ color: '#0052CC', fontWeight: '700' }}>✓</span>
                  <span>{language === 'en' ? 'Quick response time to all inquiries' : 'وقت استجابة سريع لجميع الاستفسارات'}</span>
                </li>
                <li style={{ fontSize: '14px', color: '#555', display: 'flex', gap: '8px' }}>
                  <span style={{ color: '#0052CC', fontWeight: '700' }}>✓</span>
                  <span>{language === 'en' ? 'Multiple contact channels available' : 'قنوات اتصال متعددة متاحة'}</span>
                </li>
                <li style={{ fontSize: '14px', color: '#555', display: 'flex', gap: '8px' }}>
                  <span style={{ color: '#0052CC', fontWeight: '700' }}>✓</span>
                  <span>{language === 'en' ? 'Fluent in English and Arabic' : 'بطلاقة في اللغة الإنجليزية والعربية'}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '32px', color: '#111827' }}>
              {getTranslation('getInTouch', language)}
            </h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Name Field */}
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#111827' }}>
                  {getTranslation('yourName', language)}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder={language === 'en' ? 'Enter your name' : 'أدخل اسمك'}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#0052CC'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                />
              </div>

              {/* Email Field */}
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#111827' }}>
                  {getTranslation('yourEmail', language)}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder={language === 'en' ? 'Enter your email' : 'أدخل بريدك الإلكتروني'}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#0052CC'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                />
              </div>

              {/* Subject Field */}
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#111827' }}>
                  {getTranslation('subject', language)}
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  placeholder={language === 'en' ? 'Enter subject' : 'أدخل الموضوع'}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#0052CC'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                />
              </div>

              {/* Message Field */}
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#111827' }}>
                  {getTranslation('message', language)}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder={language === 'en' ? 'Enter your message' : 'أدخل رسالتك'}
                  rows={6}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box',
                    resize: 'vertical',
                    transition: 'border-color 0.2s'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#0052CC'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#e5e7eb'}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitted}
                style={{
                  padding: '14px 32px',
                  background: isSubmitted ? '#10b981' : '#0052CC',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: isSubmitted ? 'default' : 'pointer',
                  transition: 'all 0.2s',
                  marginTop: '12px'
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitted) {
                    e.currentTarget.style.background = '#003a96';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitted) {
                    e.currentTarget.style.background = '#0052CC';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                {isSubmitted ? (language === 'en' ? '✓ Message Sent!' : '✓ تم الإرسال!') : getTranslation('send', language)}
              </button>
            </form>

            {/* Success Message */}
            {isSubmitted && (
              <div style={{
                marginTop: '20px',
                padding: '16px',
                background: '#d1fae5',
                borderLeft: '4px solid #10b981',
                borderRadius: '4px',
                color: '#065f46',
                fontSize: '14px'
              }}>
                {language === 'en' 
                  ? '✓ Thank you! We\'ve received your message and will get back to you soon.' 
                  : '✓ شكراً لك! لقد تلقينا رسالتك وسنرد عليك قريباً.'}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer language={language} />
    </div>
  );
}
