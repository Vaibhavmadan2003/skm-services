'use client';

import React, { useState, useContext, createContext } from 'react';
import { Globe, ChevronDown, UserCircle2 } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/app/lib/utils';
import { Language, getTranslation } from '@/app/lib/translations';

/**
 * Language Context for global language management
 */
export const LanguageContext = createContext<{
  language: Language;
  setLanguage: (lang: Language) => void;
}>({
  language: 'en',
  setLanguage: () => {},
});

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

/**
 * Header Component - Professional Navigation with Logo, Language & Country Selection
 */
export const Header: React.FC<HeaderProps> = ({ language, setLanguage }) => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: getTranslation('services', language), href: '/services' },
    { label: getTranslation('team', language), href: '/team' },
    { label: getTranslation('about', language), href: '/about' },
    { label: getTranslation('support', language), href: '/support' },
  ];

  return (
    <header className={cn(
      'sticky top-0 z-50 w-full',
      'bg-white/95 backdrop-blur-md',
      'border-b border-gray-200',
      'shadow-sm'
    )}>
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between h-20">

          {/* LEFT: Brand Section - Logo + Name */}
          <a href="/" className="flex items-center gap-3 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
            {/* Logo Container - Fixed 48px */}
            <div 
              className="flex items-center justify-center overflow-hidden rounded-lg flex-shrink-0 bg-gradient-to-br from-brand-blue to-brand-blue-dark"
              style={{ 
                width: '48px', 
                height: '48px',
                minWidth: '48px',
                maxWidth: '48px'
              }}
            >
              <img
                src="/logos/logo.png"
                alt="SKM Services Logo"
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'contain',
                  padding: '3px',
                  display: 'block'
                }}
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.style.display = 'none';
                  const parent = img.parentElement;
                  if (parent) {
                    parent.innerHTML += '<span class="text-white font-bold text-lg">SKM</span>';
                  }
                }}
              />
            </div>
            
            {/* Brand Text */}
            <div className="flex flex-col justify-center">
              <span className="text-xl font-bold leading-tight" style={{ color: '#0052CC' }}>SKM SERVICES</span>
              <span className="text-xs text-gray-500 leading-tight">Qatar</span>
            </div>
          </a>

          {/* MIDDLE: Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  'text-sm font-semibold',
                  'text-gray-700 hover:text-brand-blue',
                  'transition-colors duration-200',
                  'relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5',
                  'after:bg-brand-blue after:transition-all after:duration-300',
                  'hover:after:w-full'
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* RIGHT: Language & Country Selector */}
          <div className="flex items-center gap-4 ml-auto">
            {/* Qatar Country Selector */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200">
              <span className="text-lg">🇶🇦</span>
              <span className="text-sm font-semibold text-gray-700">Qatar</span>
            </div>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className={cn(
                  'flex items-center gap-2 px-3 py-2',
                  'rounded-lg bg-gray-100 hover:bg-gray-200',
                  'transition-colors duration-200',
                  'text-sm font-semibold text-gray-700'
                )}
              >
                <Globe size={18} className="text-brand-blue" />
                <span>{language === 'en' ? 'English' : 'العربية'}</span>
                <ChevronDown
                  size={16}
                  className={cn(
                    'transition-transform duration-300',
                    isLanguageOpen ? 'rotate-180' : ''
                  )}
                />
              </button>

              {/* Dropdown Menu */}
              {isLanguageOpen && (
                <div className={cn(
                  'absolute right-0 mt-2 w-40',
                  'bg-white rounded-lg shadow-lg border border-gray-200',
                  'z-50 overflow-hidden'
                )}>
                  <button
                    onClick={() => {
                      setLanguage('en');
                      setIsLanguageOpen(false);
                    }}
                    className={cn(
                      'w-full px-4 py-3 text-left text-sm font-semibold',
                      'transition-colors duration-200',
                      language === 'en'
                        ? 'bg-brand-blue/10 text-brand-blue'
                        : 'text-gray-700 hover:bg-gray-100'
                    )}
                  >
                    English
                  </button>
                  <div className="h-px bg-gray-200" />
                  <button
                    onClick={() => {
                      setLanguage('ar');
                      setIsLanguageOpen(false);
                    }}
                    className={cn(
                      'w-full px-4 py-3 text-left text-sm font-semibold',
                      'transition-colors duration-200',
                      language === 'ar'
                        ? 'bg-brand-blue/10 text-brand-blue'
                        : 'text-gray-700 hover:bg-gray-100'
                    )}
                  >
                    العربية
                  </button>
                </div>
              )}
            </div>

            {/* Separator */}
            <div className="h-6 w-px bg-gray-300"></div>

            {/* Unified Login Button */}
            <Link href="/admin/login">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all duration-200 cursor-pointer group shadow-md hover:shadow-lg">
                <UserCircle2 size={18} className="text-white group-hover:text-blue-100 transition-colors" />
                <span className="text-sm font-semibold text-white group-hover:text-blue-50 transition-colors">Login</span>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
};

Header.displayName = 'Header';
