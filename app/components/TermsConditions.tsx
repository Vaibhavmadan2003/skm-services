'use client';

import React from 'react';
import { Language } from '@/app/lib/translations';

interface TermsConditionsProps {
  language: Language;
}

export const TermsConditions: React.FC<TermsConditionsProps> = ({ language }) => {
  return (
    <div style={{ background: '#ffffff', padding: '60px 20px', direction: language === 'ar' ? 'rtl' : 'ltr' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Header */}
        <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#111827', marginBottom: '12px', textAlign: 'center' }}>
          {language === 'en' ? 'Terms and Conditions' : 'الشروط والأحكام'}
        </h1>
        <p style={{ fontSize: '14px', color: '#6b7280', textAlign: 'center', marginBottom: '40px' }}>
          {language === 'en' ? 'Last Updated: 2024' : 'آخر تحديث: 2024'}
        </p>

        {/* Cancellation Policy */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0052CC', marginBottom: '16px' }}>
            {language === 'en' ? 'Cancellation Policy' : 'سياسة الإلغاء'}
          </h2>
          <div style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '12px' }}>
              {language === 'en' 
                ? 'Before Pickup: You can cancel for a full refund if done before the driver arrives or before the service begins.' 
                : 'قبل الاستلام: يمكنك الإلغاء للحصول على استرجاع كامل إذا تم قبل وصول السائق أو قبل بدء الخدمة.'}
            </p>
          </div>
        </section>

        {/* Refund Methods & Timelines */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0052CC', marginBottom: '16px' }}>
            {language === 'en' ? 'Refund Methods & Timelines' : 'طرق واستحقاق المبالغ المستردة'}
          </h2>
          <div style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '12px' }}>
              <strong>{language === 'en' ? 'SKM SERVICE Wallet: ' : 'محفظة SKM SERVICE: '}</strong>
              {language === 'en' 
                ? 'Credits are issued instantly to your app wallet for future bookings.' 
                : 'يتم إصدار الأرصدة فوراً إلى محفظتك في التطبيق للحجوزات المستقبلية.'}
            </p>
            <p style={{ marginBottom: '12px' }}>
              <strong>{language === 'en' ? 'Original Payment Method: ' : 'طريقة الدفع الأصلية: '}</strong>
              {language === 'en' 
                ? 'Card or bank refunds take 7 to 14 business days to reflect in your account.' 
                : 'استغرق استرجاع بطاقة أو بنك 7 إلى 14 يوم عمل ليظهر في حسابك.'}
            </p>
          </div>
        </section>

        {/* Pricing & Adjustments */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0052CC', marginBottom: '16px' }}>
            {language === 'en' ? 'Pricing & Adjustments' : 'التسعير والتعديلات'}
          </h2>
          <div style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '12px' }}>
              {language === 'en' 
                ? 'Final prices are confirmed after items are picked up, counted, and inspected by the processing laundry. Any discrepancy in item count or required special care will update your bill in the app before cleaning.' 
                : 'يتم تأكيد الأسعار النهائية بعد التقاط العناصر وحسابها وفحصها بواسطة غسيل المعالجة. أي تناقض في عدد العناصر أو الرعاية الخاصة المطلوبة سيقوم بتحديث فاتورتك في التطبيق قبل التنظيف.'}
            </p>
          </div>
        </section>

        {/* Pickup & Delivery */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0052CC', marginBottom: '16px' }}>
            {language === 'en' ? 'Pickup & Delivery' : 'الاستلام والتسليم'}
          </h2>
          <div style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '12px' }}>
              {language === 'en' 
                ? 'You or an authorized representative must be present at the specified location during the chosen time slot. Unannounced missed pickups or failed delivery attempts may incur re-routing or redelivery fees.' 
                : 'يجب أن تكون أنت أو ممثل مفوض حاضراً في الموقع المحدد خلال فترة زمنية محددة. قد تؤدي عمليات الاستلام المفقودة غير المعلن عنها أو محاولات التسليم الفاشلة إلى رسوم إعادة التوجيه أو إعادة التسليم.'}
            </p>
          </div>
        </section>

        {/* Damaged or Lost Items */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0052CC', marginBottom: '16px' }}>
            {language === 'en' ? 'Damaged or Lost Items' : 'العناصر التالفة أو المفقودة'}
          </h2>
          <div style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '12px' }}>
              {language === 'en' 
                ? 'Compensation for damaged or lost garments is generally provided up to 10 times the cleaning cost of the specific item. Any missing or damaged item claims must be reported through the app within 24 to 48 hours of delivery.' 
                : 'يتم تقديم تعويض عن الملابس التالفة أو المفقودة عموماً حتى 10 أضعاف تكلفة تنظيف العنصر المحدد. يجب الإبلاغ عن أي مطالبات بعناصر مفقودة أو تالفة من خلال التطبيق في غضون 24 إلى 48 ساعة من التسليم.'}
            </p>
          </div>
        </section>

        {/* Quality Issues */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0052CC', marginBottom: '16px' }}>
            {language === 'en' ? 'Quality Issues' : 'مشاكل الجودة'}
          </h2>
          <div style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '12px' }}>
              {language === 'en' 
                ? 'If you are unsatisfied with the service, you can request a complimentary re-cleaning or partial credit by reporting the issue.' 
                : 'إذا كنت غير راضٍ عن الخدمة، يمكنك طلب إعادة تنظيف مجانية أو رصيد جزئي بالإبلاغ عن المشكلة.'}
            </p>
          </div>
        </section>

        {/* Garment Care & Liability */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0052CC', marginBottom: '16px' }}>
            {language === 'en' ? 'Garment Care & Liability' : 'رعاية الملابس والمسؤولية'}
          </h2>
          <div style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '12px' }}>
              <strong>{language === 'en' ? 'Care Labels: ' : 'علامات الرعاية: '}</strong>
              {language === 'en' 
                ? 'Items are processed following standard manufacturer care instructions.' 
                : 'يتم معالجة العناصر وفقاً لتعليمات رعاية الشركة المصنعة القياسية.'}
            </p>
            <p style={{ marginBottom: '12px' }}>
              <strong>{language === 'en' ? 'Pre-existing Damage: ' : 'الضرر السابق: '}</strong>
              {language === 'en' 
                ? 'SKM and its partner laundries are not liable for pre-existing wear and tear, shrinkage, color bleeding, or damaged delicate trims (buttons, sequins, zippers).' 
                : 'SKM ومحاله الغسيل الشريكة غير مسؤولة عن الآثار والتآكل السابق والانكماش والنزيف اللوني أو الخيوط الحساسة التالفة (الأزرار والنثار والسحابات).'}
            </p>
            <p style={{ marginBottom: '12px' }}>
              <strong>{language === 'en' ? 'Liability Cap: ' : 'حد المسؤولية: '}</strong>
              {language === 'en' 
                ? 'In proven cases of lost or damaged items, maximum financial compensation is capped at 10 times the cleaning charge for that specific item.' 
                : 'في الحالات المثبتة للعناصر المفقودة أو التالفة، يكون الحد الأقصى للتعويض المالي محدوداً بـ 10 أضعاف رسم التنظيف لهذا العنصر المحدد.'}
            </p>
          </div>
        </section>

        {/* Account & Service Suspension */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#0052CC', marginBottom: '16px' }}>
            {language === 'en' ? 'Account & Service Suspension' : 'تعليق الحساب والخدمة'}
          </h2>
          <div style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '12px' }}>
              {language === 'en' 
                ? 'Accounts may be suspended for non-payment, repeated false bookings, or abusive behavior toward delivery drivers or support staff.' 
                : 'قد يتم تعليق الحسابات بسبب عدم الدفع أو الحجوزات الكاذبة المتكررة أو السلوك المسيء تجاه سائقي التوصيل أو موظفي الدعم.'}
            </p>
          </div>
        </section>

        {/* Contact */}
        <section style={{ background: '#f3f4f6', padding: '24px', borderRadius: '8px', marginTop: '40px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', marginBottom: '12px' }}>
            {language === 'en' ? 'Questions?' : 'أسئلة؟'}
          </h2>
          <p style={{ fontSize: '14px', color: '#4b5563', marginBottom: '12px' }}>
            {language === 'en' 
              ? 'If you have any questions about our Terms and Conditions, please contact us:' 
              : 'إذا كان لديك أي أسئلة حول شروطنا وأحكامنا، يرجى التواصل معنا:'}
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

TermsConditions.displayName = 'TermsConditions';
