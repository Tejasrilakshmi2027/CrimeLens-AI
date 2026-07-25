import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<string, string>> = {
  en: {
    dashboard: 'Dashboard',
    analytics: 'Analytics',
    cases: 'Cases',
    chat: 'Chat',
    settings: 'Settings',
    logout: 'Logout',
    welcome: 'Welcome',
    totalCases: 'Total Cases',
    solvedCases: 'Solved Cases',
    pendingCases: 'Pending Cases',
  },
  kn: {
    dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    analytics: 'ವಿಶ್ಲೇಷಣೆ',
    cases: 'ಪ್ರಕರಣಗಳು',
    chat: 'ಚಾಟ್',
    settings: 'ಸೆಟ್ಟಿಂಗ್‌ಗಳು',
    logout: 'ಲಾಗ್ ಔಟ್',
    welcome: 'ಸ್ವಾಗತ',
    totalCases: 'ಒಟ್ಟು ಪ್ರಕರಣಗಳು',
    solvedCases: 'ಪರಿಹರಿಸಿದ ಪ್ರಕರಣಗಳು',
    pendingCases: 'ಬಾಕಿ ಇರುವ ಪ್ರಕರಣಗಳು',
  },
  hi: {
    dashboard: 'डैशबोर्ड',
    analytics: 'विश्लेषण',
    cases: 'मामले',
    chat: 'चैट',
    settings: 'सेटिंग्स',
    logout: 'लॉग आउट',
    welcome: 'स्वागत',
    totalCases: 'कुल मामले',
    solvedCases: 'हल किए गए मामले',
    pendingCases: 'लंबित मामले',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<string>(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (newLanguage: string) => {
    setLanguageState(newLanguage);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
