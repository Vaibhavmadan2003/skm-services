'use client';

import { SettingsProvider } from '../context/SettingsContextWithDB';
import TestLogoContent from './content';

export default function TestLogoPage() {
  return (
    <SettingsProvider>
      <TestLogoContent />
    </SettingsProvider>
  );
}
