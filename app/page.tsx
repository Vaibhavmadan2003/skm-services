'use client';

import { useState } from 'react';
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";
import { Language } from './lib/translations';

export default function Home() {
  const [language, setLanguage] = useState<Language>('en');

  return (
    <main style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}>
      <Header language={language} setLanguage={setLanguage} />
      <Hero language={language} />
      <Footer language={language} />
    </main>
  );
}

