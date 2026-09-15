'use client';

import React from 'react';
import { Language } from '@/app/lib/translations';

interface PrivacyPolicyProps {
  language: Language;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ language }) => {
  return (
    <div style={{ background: '#ffffff', padding: '60px 20px', direction: language === 'ar' ? 'rtl' : 'ltr' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Header */}
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#111827', marginBottom: '12px', textAlign: 'center' }}>
          {language === 'en' ? 'Privacy Policy' : 'سياسة الخصوصية'}
        </h1>
        <p style={{ fontSize: '14px', color: '#6b7280', textAlign: 'center', marginBottom: '40px' }}>
          {language === 'en' ? 'Last Updated: 2024' : 'آخر تحديث: 2024'}
        </p>

        {/* Introduction */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0052CC', marginBottom: '16px' }}>
            {language === 'en' ? 'Introduction' : 'المقدمة'}
          </h2>
          <div style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '12px' }}>
              {language === 'en' 
                ? 'SKM Services ("we", "us", "our", or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.' 
                : 'SKM Services ("نحن"، "لنا"، "خاصتنا"، أو "الشركة") ملتزمة بحماية خصوصيتك. توضح سياسة الخصوصية هذه كيفية جمع معلوماتك واستخدامها والإفصاح عنها وحمايتها عند استخدام خدمتنا.'}
            </p>
            <p>
              {language === 'en' 
                ? 'Please read this Privacy Policy carefully. If you do not agree with our policies and practices, please do not use our services.' 
                : 'يرجى قراءة سياسة الخصوصية هذه بعناية. إذا كنت لا توافق على سياساتنا وممارساتنا، يرجى عدم استخدام خدماتنا.'}
            </p>
          </div>
        </section>

        {/* Information We Collect */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0052CC', marginBottom: '16px' }}>
            {language === 'en' ? 'Information We Collect' : 'المعلومات التي نجمعها'}
          </h2>
          <div style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '16px', fontWeight: '600' }}>
              {language === 'en' ? 'Personal Information' : 'المعلومات الشخصية'}
            </p>
            <p style={{ marginBottom: '12px' }}>
              {language === 'en' 
                ? 'When you register for our services, we collect information such as:' 
                : 'عند التسجيل للحصول على خدماتنا، نجمع معلومات مثل:'}
            </p>
            <ul style={{ marginLeft: language === 'ar' ? 0 : '24px', marginRight: language === 'ar' ? '24px' : 0, marginBottom: '20px' }}>
              <li style={{ marginBottom: '8px' }}>{language === 'en' ? 'Full name' : 'الاسم الكامل'}</li>
              <li style={{ marginBottom: '8px' }}>{language === 'en' ? 'Email address' : 'عنوان البريد الإلكتروني'}</li>
              <li style={{ marginBottom: '8px' }}>{language === 'en' ? 'Phone number' : 'رقم الهاتف'}</li>
              <li style={{ marginBottom: '8px' }}>{language === 'en' ? 'Residential address' : 'عنوان الإقامة'}</li>
              <li style={{ marginBottom: '8px' }}>{language === 'en' ? 'Payment information' : 'معلومات الدفع'}</li>
              <li style={{ marginBottom: '8px' }}>{language === 'en' ? 'Date of birth' : 'تاريخ الميلاد'}</li>
            </ul>

            <p style={{ marginBottom: '16px', fontWeight: '600' }}>
              {language === 'en' ? 'Service Usage Information' : 'معلومات استخدام الخدمة'}
            </p>
            <p style={{ marginBottom: '12px' }}>
              {language === 'en' 
                ? 'We collect information about your interaction with our services, including:' 
                : 'نجمع معلومات حول تفاعلك مع خدماتنا، بما في ذلك:'}
            </p>
            <ul style={{ marginLeft: language === 'ar' ? 0 : '24px', marginRight: language === 'ar' ? '24px' : 0, marginBottom: '20px' }}>
              <li style={{ marginBottom: '8px' }}>{language === 'en' ? 'Booking history and service preferences' : 'سجل الحجوزات والتفضيلات'}</li>
              <li style={{ marginBottom: '8px' }}>{language === 'en' ? 'Service requests and ratings' : 'طلبات الخدمة والتقييمات'}</li>
              <li style={{ marginBottom: '8px' }}>{language === 'en' ? 'Communication logs and feedback' : 'سجلات الاتصالات والملاحظات'}</li>
            </ul>

            <p style={{ marginBottom: '16px', fontWeight: '600' }}>
              {language === 'en' ? 'Technical Information' : 'المعلومات التقنية'}
            </p>
            <p>
              {language === 'en' 
                ? 'When you use our platform, we automatically collect technical information such as IP address, browser type, device type, operating system, and usage patterns.' 
                : 'عند استخدام منصتنا، نجمع تلقائياً معلومات تقنية مثل عنوان IP ونوع المتصفح ونوع الجهاز ونظام التشغيل وأنماط الاستخدام.'}
            </p>
          </div>
        </section>

        {/* How We Use Information */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0052CC', marginBottom: '16px' }}>
            {language === 'en' ? 'How We Use Your Information' : 'كيف نستخدم معلوماتك'}
          </h2>
          <div style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '12px' }}>
              {language === 'en' 
                ? 'We use the information we collect for various purposes, including:' 
                : 'نستخدم المعلومات التي نجمعها لأغراض متعددة، بما في ذلك:'}
            </p>
            <ul style={{ marginLeft: language === 'ar' ? 0 : '24px', marginRight: language === 'ar' ? '24px' : 0, marginBottom: '0' }}>
              <li style={{ marginBottom: '8px' }}>{language === 'en' ? 'Providing and improving our services' : 'تقديم وتحسين خدماتنا'}</li>
              <li style={{ marginBottom: '8px' }}>{language === 'en' ? 'Processing bookings and payments' : 'معالجة الحجوزات والدفعات'}</li>
              <li style={{ marginBottom: '8px' }}>{language === 'en' ? 'Communicating with you about your account and services' : 'التواصل معك حول حسابك والخدمات'}</li>
              <li style={{ marginBottom: '8px' }}>{language === 'en' ? 'Sending promotional emails and newsletters' : 'إرسال رسائل البريد الإلكتروني والنشرات الإخبارية الترويجية'}</li>
              <li style={{ marginBottom: '8px' }}>{language === 'en' ? 'Personalizing your user experience' : 'تخصيص تجربة المستخدم الخاصة بك'}</li>
              <li style={{ marginBottom: '8px' }}>{language === 'en' ? 'Preventing fraud and ensuring security' : 'منع الاحتيال وضمان الأمان'}</li>
              <li style={{ marginBottom: '8px' }}>{language === 'en' ? 'Complying with legal obligations' : 'الامتثال للالتزامات القانونية'}</li>
            </ul>
          </div>
        </section>

        {/* Data Security */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0052CC', marginBottom: '16px' }}>
            {language === 'en' ? 'Data Security' : 'أمان البيانات'}
          </h2>
          <div style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '12px' }}>
              {language === 'en' 
                ? 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:' 
                : 'نطبق تدابير تقنية وتنظيمية مناسبة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو التعديل أو الكشف أو التدمير. تتضمن هذه التدابير:'}
            </p>
            <ul style={{ marginLeft: language === 'ar' ? 0 : '24px', marginRight: language === 'ar' ? '24px' : 0, marginBottom: '0' }}>
              <li style={{ marginBottom: '8px' }}>{language === 'en' ? 'Encryption of sensitive data' : 'تشفير البيانات الحساسة'}</li>
              <li style={{ marginBottom: '8px' }}>{language === 'en' ? 'Secure server infrastructure' : 'البنية التحتية للخادم الآمن'}</li>
              <li style={{ marginBottom: '8px' }}>{language === 'en' ? 'Regular security audits and updates' : 'تدقيق الأمان والتحديثات المنتظمة'}</li>
              <li style={{ marginBottom: '8px' }}>{language === 'en' ? 'Access controls and authentication' : 'ضوابط الوصول والمصادقة'}</li>
            </ul>
          </div>
        </section>

        {/* Information Sharing */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0052CC', marginBottom: '16px' }}>
            {language === 'en' ? 'Information Sharing' : 'مشاركة المعلومات'}
          </h2>
          <div style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '12px' }}>
              {language === 'en' 
                ? 'We do not sell, trade, or rent your personal information to third parties. However, we may share your information in the following circumstances:' 
                : 'لا نبيع أو نتاجر أو نؤجر معلوماتك الشخصية لأطراف ثالثة. ومع ذلك، قد نشارك معلوماتك في الظروف التالية:'}
            </p>
            <ul style={{ marginLeft: language === 'ar' ? 0 : '24px', marginRight: language === 'ar' ? '24px' : 0, marginBottom: '20px' }}>
              <li style={{ marginBottom: '8px' }}><strong>{language === 'en' ? 'Service Providers: ' : 'مقدمو الخدمات: '}</strong>{language === 'en' ? 'With trusted partners who assist in operating our platform and providing services' : 'مع الشركاء الموثوقين الذين يساعدون في تشغيل منصتنا وتقديم الخدمات'}</li>
              <li style={{ marginBottom: '8px' }}><strong>{language === 'en' ? 'Legal Requirements: ' : 'المتطلبات القانونية: '}</strong>{language === 'en' ? 'When required by law or to protect our rights and safety' : 'عند الضرورة بموجب القانون أو لحماية حقوقنا وسلامتنا'}</li>
              <li style={{ marginBottom: '8px' }}><strong>{language === 'en' ? 'Business Transfers: ' : 'تحويلات الأعمال: '}</strong>{language === 'en' ? 'In case of a merger, acquisition, or sale of assets' : 'في حالة الدمج أو الاستحواذ أو بيع الأصول'}</li>
            </ul>
          </div>
        </section>

        {/* Cookie Policy */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0052CC', marginBottom: '16px' }}>
            {language === 'en' ? 'Cookie Policy' : 'سياسة ملفات تعريف الارتباط'}
          </h2>
          <div style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '12px' }}>
              {language === 'en' 
                ? 'Our website uses cookies to enhance your experience. Cookies are small files stored on your device that help us remember your preferences and track usage patterns.' 
                : 'يستخدم موقعنا ملفات تعريف الارتباط لتحسين تجربتك. ملفات تعريف الارتباط عبارة عن ملفات صغيرة مخزنة على جهازك تساعدنا على تذكر تفضيلاتك وتتبع أنماط الاستخدام.'}
            </p>
            <p style={{ marginBottom: '12px' }}>
              {language === 'en' 
                ? 'You can control cookie settings in your browser. However, disabling cookies may limit the functionality of our services.' 
                : 'يمكنك التحكم في إعدادات ملفات تعريف الارتباط في متصفحك. ومع ذلك، قد يؤدي تعطيل ملفات تعريف الارتباط إلى تحديد وظائف خدماتنا.'}
            </p>
            <p>
              {language === 'en' 
                ? 'We use the following types of cookies: essential cookies for website functionality, analytical cookies for performance tracking, and marketing cookies for personalized advertising.' 
                : 'نستخدم الأنواع التالية من ملفات تعريف الارتباط: ملفات تعريف الارتباط الأساسية لوظائف الموقع والملفات التحليلية لتتبع الأداء وملفات تعريف الارتباط التسويقية للإعلانات الشخصية.'}
            </p>
          </div>
        </section>

        {/* Your Rights */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0052CC', marginBottom: '16px' }}>
            {language === 'en' ? 'Your Privacy Rights' : 'حقوق الخصوصية الخاصة بك'}
          </h2>
          <div style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '12px' }}>
              {language === 'en' 
                ? 'You have the following rights regarding your personal information:' 
                : 'لديك الحقوق التالية فيما يتعلق بمعلوماتك الشخصية:'}
            </p>
            <ul style={{ marginLeft: language === 'ar' ? 0 : '24px', marginRight: language === 'ar' ? '24px' : 0, marginBottom: '0' }}>
              <li style={{ marginBottom: '8px' }}><strong>{language === 'en' ? 'Right to Access: ' : 'حق الوصول: '}</strong>{language === 'en' ? 'You can request a copy of your personal data' : 'يمكنك طلب نسخة من بيانات شخصية'}</li>
              <li style={{ marginBottom: '8px' }}><strong>{language === 'en' ? 'Right to Correction: ' : 'حق التصحيح: '}</strong>{language === 'en' ? 'You can request correction of inaccurate information' : 'يمكنك طلب تصحيح المعلومات غير الدقيقة'}</li>
              <li style={{ marginBottom: '8px' }}><strong>{language === 'en' ? 'Right to Deletion: ' : 'حق الحذف: '}</strong>{language === 'en' ? 'You can request deletion of your personal data' : 'يمكنك طلب حذف بياناتك الشخصية'}</li>
              <li style={{ marginBottom: '8px' }}><strong>{language === 'en' ? 'Right to Opt-out: ' : 'حق الانسحاب: '}</strong>{language === 'en' ? 'You can opt-out of marketing communications' : 'يمكنك الانسحاب من الاتصالات التسويقية'}</li>
              <li style={{ marginBottom: '8px' }}><strong>{language === 'en' ? 'Right to Data Portability: ' : 'حق نقل البيانات: '}</strong>{language === 'en' ? 'You can request your data in a portable format' : 'يمكنك طلب بيانات بصيغة قابلة للنقل'}</li>
            </ul>
          </div>
        </section>

        {/* Changes to Privacy Policy */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0052CC', marginBottom: '16px' }}>
            {language === 'en' ? 'Changes to This Privacy Policy' : 'التغييرات على سياسة الخصوصية هذه'}
          </h2>
          <div style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.8' }}>
            <p>
              {language === 'en' 
                ? 'We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by posting the updated policy and updating the "Last Updated" date. Your continued use of our services after such modifications constitutes your acceptance of the updated Privacy Policy.' 
                : 'قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر لتعكس التغييرات في ممارساتنا والتكنولوجيا والمتطلبات القانونية أو عوامل أخرى. سيتم إخطارك بأي تغييرات جوهرية من خلال نشر السياسة المحدثة وتحديث تاريخ "آخر تحديث". يشكل استمرارك في استخدام خدماتنا بعد هذه التعديلات قبولاً منك لسياسة الخصوصية المحدثة.'}
            </p>
          </div>
        </section>

        {/* Contact */}
        <section style={{ background: '#f3f4f6', padding: '24px', borderRadius: '8px', marginTop: '40px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', marginBottom: '12px' }}>
            {language === 'en' ? 'Contact Us' : 'اتصل بنا'}
          </h2>
          <p style={{ fontSize: '14px', color: '#4b5563', marginBottom: '12px' }}>
            {language === 'en' 
              ? 'If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at:' 
              : 'إذا كان لديك أي أسئلة أو مخاوف أو طلبات بخصوص سياسة الخصوصية هذه أو ممارسات الخصوصية لدينا، يرجى التواصل معنا على:'}
          </p>
          <p style={{ fontSize: '14px', color: '#4b5563' }}>
            📧 {language === 'en' ? 'Email: ' : 'البريد الإلكتروني: '} skmcontracting2025@gmail.com<br/>
            📱 {language === 'en' ? 'Phone: ' : 'الهاتف: '} +974 30655464<br/>
            📍 {language === 'en' ? 'Location: ' : 'الموقع: '} Doha, Qatar
          </p>
        </section>

      </div>
    </div>
  );
};

PrivacyPolicy.displayName = 'PrivacyPolicy';
