'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Star, 
  Clock, 
  CheckCircle2, 
  Download,
  ArrowRight,
  Zap,
  Shield
} from 'lucide-react';
import { Button } from '@/app/components/ui/Button';
import { cn } from '@/app/lib/utils';
import { Language, getTranslation } from '@/app/lib/translations';

/**
 * HERO COMPONENT - Professional Premium Quality
 * 
 * DESIGN PRINCIPLES:
 * - Full-screen hero with premium background imagery
 * - Image carousel with smooth transitions
 * - Professional content layout with strong typography
 * - Trust signals and statistics displayed elegantly
 * - Professional button hierarchy
 * - Subtle animations and visual depth
 * - Floating design elements for visual interest
 * - Multilingual support (English & Arabic)
 */

interface HeroProps {
  onBookClick?: () => void;
  language: Language;
}

/**
 * Hero Images - Premium professional photography
 */
const heroImages = [
  '/hero-images/hero-1.jpg',
  '/hero-images/hero-2.jpg',
];

/**
 * Trust Badge Component
 */
const TrustBadge: React.FC<{ language: Language }> = ({ language }) => (
  <div className="inline-flex items-center gap-md px-lg py-md bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-2xl">
    <div className="flex items-center gap-sm">
      <CheckCircle2 size={16} className="text-emerald-400" />
      <span className="text-sm font-semibold text-white">{getTranslation('trustedByCustomers', language)}</span>
    </div>
  </div>
);

/**
 * Stat Card Component
 */
interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, label }) => (
  <div className="flex flex-col gap-md">
    <div className="flex items-center gap-3">
      <div className="flex-shrink-0 w-12 h-12 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/20">
        {icon}
      </div>
      <div className="flex flex-col justify-center gap-1">
        <span className="text-2xl font-bold text-white leading-tight">{value}</span>
        <span className="text-sm text-white/80 leading-tight">{label}</span>
      </div>
    </div>
  </div>
);

/**
 * Trust Section Component - Screened and Trusted Partners
 */
const TrustSection: React.FC<{ language: Language }> = ({ language }) => (
  <section className="w-full bg-gray-50" style={{ paddingTop: '80px', paddingBottom: '80px', display: 'flex', justifyContent: 'center' }}>
    <div style={{ width: '100%', maxWidth: '1280px', paddingLeft: '16px', paddingRight: '16px' }}>
      <div className="trust-container">
        {/* LEFT COLUMN: Heading and Description */}
        <div className="trust-left">
          <h2 className="trust-heading">{getTranslation('screenedAndTrusted', language)}</h2>
          <p className="trust-description">
            {getTranslation('thoroughlyVet', language)}
          </p>
          
          {/* Satisfaction Stat with Icon */}
          <div className="trust-stat">
            <div className="trust-stat-icon">
              <Shield size={32} className="text-brand-blue" />
            </div>
            <div>
              <div className="trust-stat-value">98%</div>
              <div className="trust-stat-label">{getTranslation('customerSatisfaction', language)}</div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Trust Features Grid (2x2) */}
        <div className="trust-features-grid">
          {/* Feature 1: Verified Partners */}
          <div className="trust-feature-card">
            <div className="trust-feature-icon">
              <CheckCircle2 size={28} className="text-brand-blue" />
            </div>
            <h3 className="trust-feature-title">{getTranslation('verifiedPartners', language)}</h3>
            <p className="trust-feature-text">{getTranslation('backgroundCheckedIdentity', language)}</p>
          </div>

          {/* Feature 2: Quality Guarantee */}
          <div className="trust-feature-card">
            <div className="trust-feature-icon">
              <Star size={28} className="text-brand-blue" />
            </div>
            <h3 className="trust-feature-title">{getTranslation('qualityGuarantee', language)}</h3>
            <p className="trust-feature-text">{getTranslation('satisfactionGuaranteed', language)}</p>
          </div>

          {/* Feature 3: 24/7 Support */}
          <div className="trust-feature-card">
            <div className="trust-feature-icon">
              <Clock size={28} className="text-brand-blue" />
            </div>
            <h3 className="trust-feature-title">{getTranslation('support247', language)}</h3>
            <p className="trust-feature-text">{getTranslation('roundTheClock', language)}</p>
          </div>

          {/* Feature 4: Insured Services */}
          <div className="trust-feature-card">
            <div className="trust-feature-icon">
              <Shield size={28} className="text-brand-blue" />
            </div>
            <h3 className="trust-feature-title">{getTranslation('insuredServices', language)}</h3>
            <p className="trust-feature-text">{getTranslation('fullInsuranceCoverage', language)}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/**
 * Services Section Component
 */
const ServicesSection: React.FC<{ language: Language }> = ({ language }) => (
  <section className="w-full bg-white" style={{ paddingTop: '80px', paddingBottom: '80px', display: 'flex', justifyContent: 'center' }}>
    <div style={{ width: '100%', maxWidth: '1280px', paddingLeft: '16px', paddingRight: '16px' }}>
      {/* Section Header */}
      <div className="services-header">
        <h2>{getTranslation('topRatedServices', language)}</h2>
        <p>{getTranslation('professionalServices', language)}</p>
      </div>

      {/* Services Grid */}
      <div className="services-grid">
        {/* Service 1: Home Cleaning */}
        <div className="service-card">
          {/* Service Image */}
          <img
            src="/service-images/home-cleaning.jpg"
            alt={getTranslation('homeCleaning', language)}
            className="service-image"
          />

          {/* Service Content */}
          <div className="service-content">
            <h3>{getTranslation('homeCleaning', language)}</h3>
            <p>{getTranslation('sameCleanerSameDay', language)}</p>
            <div className="service-stats">
              <span>7500+ {getTranslation('cleaners', language)}</span>
              <span>•</span>
              <span>500+ {getTranslation('partners', language)}</span>
            </div>
          </div>
        </div>

        {/* Service 2: Laundry */}
        <div className="service-card">
          {/* Service Image */}
          <img
            src="/service-images/laundry.jpg"
            alt={getTranslation('laundry', language)}
            className="service-image"
          />

          {/* Service Content */}
          <div className="service-content">
            <h3>{getTranslation('laundry', language)}</h3>
            <p>{getTranslation('freePickupDelivery', language)}</p>
            <div className="service-stats">
              <span>500+ {getTranslation('facilities', language)}</span>
              <span>•</span>
              <span>400+ {getTranslation('partners', language)}</span>
            </div>
          </div>
        </div>

        {/* Service 3: Car Wash */}
        <div className="service-card">
          {/* Service Image */}
          <img
            src="/service-images/car-wash.jpg"
            alt={getTranslation('carWash', language)}
            className="service-image"
          />

          {/* Service Content */}
          <div className="service-content">
            <h3>{getTranslation('carWash', language)}</h3>
            <p>{getTranslation('anytimeAnywhere', language)}</p>
            <div className="service-stats">
              <span>800+ {getTranslation('detailers', language)}</span>
              <span>•</span>
              <span>300+ {getTranslation('partners', language)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/**
 * Partnership Section Component - Grow Your Business
 */
const PartnershipSection: React.FC<{ language: Language }> = ({ language }) => (
  <section className="w-full" style={{ paddingTop: '80px', paddingBottom: '80px', display: 'flex', justifyContent: 'center', background: 'linear-gradient(135deg, #f3e8ff 0%, #f0f4ff 100%)' }}>
    <div style={{ width: '100%', maxWidth: '1280px', paddingLeft: '16px', paddingRight: '16px' }}>
      <div style={{ textAlign: 'center' }}>
        {/* Heading */}
        <h2 style={{ margin: '0 0 24px 0', padding: '0', fontSize: '2.25rem', fontWeight: '900', color: '#111827', lineHeight: '1.2' }}>
          {getTranslation('growYourBusiness', language)}
        </h2>

        {/* Description */}
        <p style={{ margin: '0 0 64px 0', padding: '0', fontSize: '1.125rem', color: '#4b5563', lineHeight: '1.6', maxWidth: '620px', marginLeft: 'auto', marginRight: 'auto' }}>
          {getTranslation('join1500Partners', language)}
        </p>

        {/* Features Grid - 3 Columns */}
        <div className="partnership-features-grid">
          {/* Feature 1: Increase Sales */}
          <div className="partnership-feature-card">
            <div className="partnership-feature-icon" style={{ background: '#f3e8ff', color: '#a855f7' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 17"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
            </div>
            <h3 style={{ margin: '0 0 8px 0', padding: '0', fontSize: '1.125rem', fontWeight: '700', color: '#111827' }}>
              {getTranslation('increaseSales', language)}
            </h3>
            <p style={{ margin: '0', padding: '0', fontSize: '0.875rem', color: '#6b7280', lineHeight: '1.5' }}>
              {getTranslation('reachThousands', language)}
            </p>
          </div>

          {/* Feature 2: Organize Bookings */}
          <div className="partnership-feature-card">
            <div className="partnership-feature-icon" style={{ background: '#f3e8ff', color: '#a855f7' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <h3 style={{ margin: '0 0 8px 0', padding: '0', fontSize: '1.125rem', fontWeight: '700', color: '#111827' }}>
              {getTranslation('organizeBookings', language)}
            </h3>
            <p style={{ margin: '0', padding: '0', fontSize: '0.875rem', color: '#6b7280', lineHeight: '1.5' }}>
              {getTranslation('manageSchedule', language)}
            </p>
          </div>

          {/* Feature 3: Track Performance */}
          <div className="partnership-feature-card">
            <div className="partnership-feature-icon" style={{ background: '#f3e8ff', color: '#a855f7' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="2" x2="12" y2="22"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
            <h3 style={{ margin: '0 0 8px 0', padding: '0', fontSize: '1.125rem', fontWeight: '700', color: '#111827' }}>
              {getTranslation('trackPerformance', language)}
            </h3>
            <p style={{ margin: '0', padding: '0', fontSize: '0.875rem', color: '#6b7280', lineHeight: '1.5' }}>
              {getTranslation('monitorMetrics', language)}
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div style={{ marginTop: '64px' }}>
          <Link href="/become-partner">
            <button
              className={cn(
                'flex items-center justify-center gap-md',
                'px-2xl py-4 rounded-lg',
                'h-14',
                'bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold text-lg',
                'border-2 border-transparent',
                'hover:shadow-2xl hover:scale-105',
                'transition-all duration-300 ease-out',
                'shadow-xl drop-shadow-lg',
                'w-full'
              )}
            >
              <span>{getTranslation('becomePartner', language)}</span>
              <ArrowRight size={22} className="text-white" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  </section>
);

/**
 * Main Hero Component
 */
export const Hero: React.FC<HeroProps> = ({ onBookClick, language }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* FULL-SCREEN HERO */}
      <section className={cn(
        'relative w-full overflow-hidden',
        'flex items-center justify-center',
        'transition-opacity duration-700',
        isLoaded ? 'opacity-100' : 'opacity-0'
      )}
      style={{ minHeight: '700px' }}
      >

        {/* Background Image Carousel with Zoom Effect */}
        <div className="absolute inset-0">
          {heroImages.map((image, idx) => (
            <div
              key={idx}
              className={cn(
                'absolute inset-0',
                'bg-cover bg-center',
                'transition-all duration-1000 ease-in-out',
                idx === currentImageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              )}
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
        </div>

        {/* Premium Dark Overlay with Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/60" />
        
        {/* Subtle Accent Lights */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-brand-blue/10 rounded-full filter blur-3xl opacity-20" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-blue/5 rounded-full filter blur-3xl opacity-10" />

        {/* Carousel Indicators - Bottom */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              className={cn(
                'rounded-full transition-all duration-300 cursor-pointer',
                idx === currentImageIndex 
                  ? 'w-10 h-2.5 bg-white' 
                  : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/60'
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-lg lg:px-4xl flex flex-col justify-center">
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4xl lg:gap-6xl items-start">

            {/* LEFT COLUMN: Content with Strict Spacing */}
            <div className={cn(
              'flex flex-col',
              'transition-all duration-900 ease-out',
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            )}
            style={{ maxWidth: '620px' }}
            >

              {/* 1. Trust Badge - 24px gap below */}
              <div style={{ marginBottom: '24px' }}>
                <TrustBadge language={language} />
              </div>

              {/* 2. Main Heading - 24px gap below */}
              <h1 className={cn(
                'text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight',
                'drop-shadow-xl'
              )}
              style={{ marginBottom: '24px' }}
              >
                {getTranslation('professionalHomeCleaning', language)}
              </h1>

              {/* 3. Description - 24px gap below */}
              <p className={cn(
                'text-lg lg:text-xl text-white/90 leading-relaxed font-light',
                'drop-shadow-lg'
              )}
              style={{ marginBottom: '24px' }}
              >
                {getTranslation('yourTrustedPartner', language)}
              </p>

              {/* 4. Trust Points - 32px gap below */}
              <div className="flex flex-col gap-md" style={{ marginBottom: '32px' }}>
                {[
                  { icon: <CheckCircle2 size={20} />, key: 'verifiedProfessionals' },
                  { icon: <Zap size={20} />, key: 'sameDayService' },
                  { icon: <Shield size={20} />, key: 'transparentPricing' },
                ].map((point, idx) => (
                  <div key={idx} className="flex items-center gap-lg">
                    <div className="text-emerald-400 flex-shrink-0">{point.icon}</div>
                    <span className="text-white font-medium drop-shadow-md">{getTranslation(point.key as any, language)}</span>
                  </div>
                ))}
              </div>

              {/* 5. CTA Buttons - 40px gap below */}
              <div className="flex flex-col sm:flex-row gap-4" style={{ marginBottom: '40px' }}>
                <button
                  onClick={onBookClick}
                  className={cn(
                    'flex items-center justify-center gap-md',
                    'px-2xl py-4 rounded-lg',
                    'h-14 sm:h-14',
                    'bg-gradient-to-r from-brand-blue to-brand-blue-dark text-white font-bold text-lg',
                    'border-2 border-transparent',
                    'hover:shadow-2xl hover:scale-105',
                    'transition-all duration-300 ease-out',
                    'shadow-xl drop-shadow-lg flex-1 sm:flex-auto'
                  )}
                >
                  <Zap size={22} className="text-white" />
                  <span>{getTranslation('bookService', language)}</span>
                </button>
                <a
                  href="/services"
                  className={cn(
                    'flex items-center justify-center gap-md',
                    'px-2xl py-4 rounded-lg',
                    'h-14 sm:h-14',
                    'bg-white/95 text-brand-blue font-bold text-lg',
                    'border-2 border-white/95',
                    'hover:bg-white hover:shadow-2xl hover:scale-105',
                    'transition-all duration-300 ease-out',
                    'shadow-xl drop-shadow-lg backdrop-blur-sm flex-1 sm:flex-auto'
                  )}
                >
                  <ArrowRight size={22} />
                  <span>{getTranslation('exploreServices', language)}</span>
                </a>
              </div>

              {/* 6. Statistics Section - 3 Column Grid */}
              <div className="grid grid-cols-3 gap-8">
                <StatCard
                  icon={<Users size={24} className="text-emerald-400" />}
                  value="10,000+"
                  label={getTranslation('happyCustomers', language)}
                />
                <StatCard
                  icon={<Star size={24} className="text-amber-400" />}
                  value="4.9/5"
                  label={getTranslation('avgRating', language)}
                />
                <StatCard
                  icon={<Clock size={24} className="text-blue-400" />}
                  value="500+"
                  label={getTranslation('professionals', language)}
                />
              </div>

            </div>

            {/* RIGHT COLUMN: Visual Elements */}
            <div className="hidden lg:flex flex-col items-center justify-center">
              {/* Floating Card - Trust Indicator */}
              <div className={cn(
                'absolute right-0 top-20 w-80 bg-white/10 backdrop-blur-lg rounded-2xl p-6',
                'border border-white/20 shadow-2xl',
                'transform transition-all duration-1000',
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              )}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                    <CheckCircle2 size={24} className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{getTranslation('verifiedPartners', language)}</p>
                    <p className="text-white/70 text-xs">{getTranslation('backgroundCheckedIdentity', language)}</p>
                  </div>
                </div>
              </div>

              {/* Floating Card - Speed Indicator */}
              <div className={cn(
                'absolute right-0 top-40 w-80 bg-white/10 backdrop-blur-lg rounded-2xl p-6',
                'border border-white/20 shadow-2xl',
                'transform transition-all duration-1000 delay-300',
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              )}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Zap size={24} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">{getTranslation('sameDayService', language)}</p>
                    <p className="text-white/70 text-xs">{getTranslation('bookService', language)} & get served today</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </section>

      {/* SERVICES SECTION */}
      <ServicesSection language={language} />

      {/* TRUST SECTION */}
      <TrustSection language={language} />

      {/* PARTNERSHIP SECTION */}
      <PartnershipSection language={language} />
    </>
  );
};

Hero.displayName = 'Hero';
