'use client';

import Link from 'next/link';
import { Download, Check, Clock, Shield, Zap } from 'lucide-react';
import { useState } from 'react';

export default function HomeCleaningPage() {
  const [language, setLanguage] = useState('en');

  const content = {
    en: {
      available: 'Available in Qatar',
      title: 'Professional Home Cleaning',
      subtitle: 'Your home deserves expert care',
      description: 'Trusted cleaning service with background-checked professionals. Eco-friendly products, guaranteed satisfaction, same dedicated cleaner.',
      downloadApp: 'Download App',
      bookNow: 'Book Now',
      price: 'From QR 69',
      priceLabel: 'Starting Price',
      delivery: '24-48 hours',
      deliveryLabel: 'Booking to Delivery',
      sameCleaner: 'Same Professional',
      quality: 'Satisfaction Guaranteed',
      whyChoose: 'Why Choose Us',
      featured1: 'Vetted & Trusted',
      featured1Desc: 'Background-checked professionals you can trust',
      featured2: 'Eco-Friendly',
      featured2Desc: 'Safe, non-toxic cleaning products',
      featured3: 'Flexible Scheduling',
      featured3Desc: 'Book at your convenience, 24/7',
      featured4: 'Guaranteed Quality',
      featured4Desc: 'Not satisfied? We will redo it free',
      whatIncluded: 'What is Included',
      included1: 'Complete home inspection',
      included2: 'Dusting & vacuuming all areas',
      included3: 'Kitchen & bathroom deep clean',
      included4: 'Floor polishing & sanitization',
      included5: 'Professional-grade equipment',
      included6: '24/7 customer support',
    },
    ar: {
      available: '????? ?? ???',
      title: '????? ?????? ?????????',
      subtitle: '????? ????? ??????? ???????',
      description: '???? ????? ?????? ?? ??????? ??????? ??????. ?????? ????? ??????? ??? ?????? ??? ?????? ??????.',
      downloadApp: '????? ???????',
      bookNow: '???? ????',
      price: '?? QR 69',
      priceLabel: '????? ???????',
      delivery: '24-48 ????',
      deliveryLabel: '?? ????? ???????',
      sameCleaner: '??? ???????',
      quality: '??? ?????',
      whyChoose: '????? ???????',
      featured1: '????? ? ?????',
      featured1Desc: '??????? ??????? ?????? ????? ????? ???',
      featured2: '???? ??????',
      featured2Desc: '?????? ????? ???? ???? ????',
      featured3: '????? ????',
      featured3Desc: '???? ????? ???? 24/7',
      featured4: '???? ??????',
      featured4Desc: '??? ????? ?????? ??????',
      whatIncluded: '?? ???????',
      included1: '??? ???? ??????',
      included2: '????? ?????? ?????? ?? ???? ???????',
      included3: '????? ???? ?????? ???????',
      included4: '????? ???????? ????????',
      included5: '????? ????????',
      included6: '??? ????? 24/7',
    }
  };

  const t = content[language as keyof typeof content];

  return (
    <main className="min-h-screen bg-white" style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}>
      {/* Language Selector */}
      <div className="fixed top-0 right-0 z-50 p-4">
        <div className="flex gap-2 bg-white rounded-full shadow-md p-1">
          <button 
            onClick={() => setLanguage('en')} 
            className={`px-4 py-2 rounded-full font-semibold transition-all ${language === 'en' ? 'bg-emerald-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            EN
          </button>
          <button 
            onClick={() => setLanguage('ar')} 
            className={`px-4 py-2 rounded-full font-semibold transition-all ${language === 'ar' ? 'bg-emerald-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
          >
            AR
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500 text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-block bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 text-sm font-semibold border border-white border-opacity-30">
                ? {t.available}
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                {t.title}
              </h1>
              <p className="text-xl text-emerald-50 mb-3 font-medium">{t.subtitle}</p>
              <p className="text-lg text-emerald-100 mb-8 leading-relaxed max-w-xl">
                {t.description}
              </p>
              
              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-emerald-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-emerald-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2 group">
                  <Download size={22} className="group-hover:animate-bounce" />
                  {t.downloadApp}
                </button>
                <Link 
                  href="/book-service/home-cleaning" 
                  className="bg-emerald-700 border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-emerald-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 text-center"
                >
                  {t.bookNow}
                </Link>
              </div>
            </div>

            {/* Right Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white bg-opacity-15 backdrop-blur-md rounded-2xl p-6 border border-white border-opacity-20">
                <div className="text-4xl font-bold mb-2">{t.price}</div>
                <p className="text-emerald-100 text-sm font-medium">{t.priceLabel}</p>
              </div>
              <div className="bg-white bg-opacity-15 backdrop-blur-md rounded-2xl p-6 border border-white border-opacity-20">
                <div className="text-4xl font-bold mb-2">{t.delivery}</div>
                <p className="text-emerald-100 text-sm font-medium">{t.deliveryLabel}</p>
              </div>
              <div className="bg-white bg-opacity-15 backdrop-blur-md rounded-2xl p-6 border border-white border-opacity-20">
                <div className="text-4xl font-bold mb-2">?</div>
                <p className="text-emerald-100 text-sm font-medium">{t.sameCleaner}</p>
              </div>
              <div className="bg-white bg-opacity-15 backdrop-blur-md rounded-2xl p-6 border border-white border-opacity-20">
                <div className="text-4xl font-bold mb-2">?</div>
                <p className="text-emerald-100 text-sm font-medium">{t.quality}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.whyChoose}</h2>
            <div className="h-1 w-16 bg-emerald-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: t.featured1, desc: t.featured1Desc },
              { icon: Zap, title: t.featured2, desc: t.featured2Desc },
              { icon: Clock, title: t.featured3, desc: t.featured3Desc },
              { icon: Check, title: t.featured4, desc: t.featured4Desc },
            ].map((feature, idx) => {
              const IconComp = feature.icon;
              return (
                <div key={idx} className="group">
                  <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all hover:transform hover:-translate-y-2 border border-gray-200 h-full">
                    <div className="w-14 h-14 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-600 transition-colors">
                      <IconComp className="text-emerald-600 group-hover:text-white" size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What is Included */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.whatIncluded}</h2>
            <div className="h-1 w-16 bg-emerald-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              t.included1,
              t.included2,
              t.included3,
              t.included4,
              t.included5,
              t.included6,
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="text-emerald-600" size={20} />
                </div>
                <p className="text-gray-700 font-medium text-lg">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to book?</h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Schedule your professional cleaning service today. It takes just 2 minutes.
          </p>
          <Link 
            href="/book-service/home-cleaning"
            className="inline-block bg-white text-emerald-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-emerald-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Book Your Cleaning Service
          </Link>
        </div>
      </section>
    </main>
  );
}

