import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: 'en' | 'ar';
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    'nav.dashboard': 'Dashboard',
    'nav.projects': 'Projects',
    'nav.map': 'Project Map',
    'nav.marketplace': 'Data Marketplace',
    'nav.toolkit': 'Consulting Toolkit',
    'nav.pricing': 'Pricing',
    'welcome.title': 'South Sudan Development Solutions',
    'welcome.subtitle': 'Empowering development through technology and partnership',
    'role.client': 'Client Portal',
    'role.employee': 'Employee Portal',
    'role.partner': 'Partner Portal',
    'project.status.active': 'Active',
    'project.status.completed': 'Completed',
    'project.status.planning': 'Planning',
    'subscription.basic': 'Basic',
    'subscription.pro': 'Professional',
    'subscription.enterprise': 'Enterprise',
    'kpi.tracker': 'KPI Tracker',
    'gender.audit': 'Gender Audit',
    'co.design': 'Co-Design Workspace',
    'risk.low': 'Low Risk',
    'risk.medium': 'Medium Risk',
    'risk.high': 'High Risk',
  },
  ar: {
    'nav.dashboard': 'لوحة القيادة',
    'nav.projects': 'المشاريع',
    'nav.map': 'خريطة المشاريع',
    'nav.marketplace': 'سوق البيانات',
    'nav.toolkit': 'أدوات الاستشارة',
    'nav.pricing': 'التسعير',
    'welcome.title': 'حلول تنمية جنوب السودان',
    'welcome.subtitle': 'تمكين التنمية من خلال التكنولوجيا والشراكة',
    'role.client': 'بوابة العميل',
    'role.employee': 'بوابة الموظف',
    'role.partner': 'بوابة الشريك',
    'project.status.active': 'نشط',
    'project.status.completed': 'مكتمل',
    'project.status.planning': 'تخطيط',
    'subscription.basic': 'أساسي',
    'subscription.pro': 'محترف',
    'subscription.enterprise': 'مؤسسة',
    'kpi.tracker': 'متتبع مؤشرات الأداء',
    'gender.audit': 'مراجعة النوع الاجتماعي',
    'co.design': 'مساحة التصميم المشترك',
    'risk.low': 'مخاطر منخفضة',
    'risk.medium': 'مخاطر متوسطة',
    'risk.high': 'مخاطر عالية',
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      <div className={language === 'ar' ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};