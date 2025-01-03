import React, { createContext, useContext, useState, useCallback } from 'react';
import { IntlProvider } from 'react-intl';
import en from '../translations/en';
import tr from '../translations/tr';

type Language = 'en' | 'tr';
type Messages = {
  [K in keyof typeof en]: string;
};

interface LanguageContextType {
  locale: Language;
  setLocale: (locale: Language) => void;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: 'en',
  setLocale: () => {},
});

const messages: Record<Language, Messages> = {
  en,
  tr,
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Language>('en');

  const handleSetLocale = useCallback((newLocale: Language) => {
    setLocale(newLocale);
  }, []);

  return (
    <LanguageContext.Provider value={{ locale, setLocale: handleSetLocale }}>
      <IntlProvider messages={messages[locale]} locale={locale}>
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
