'use client';

import { usePathname } from 'next/navigation';
import { switchLocale, type Locale } from '@/lib/i18n';

const remember = (locale: Locale) => {
  try {
    localStorage.setItem('talead-lang', locale);
  } catch {
    // storage unavailable (private mode): the choice simply isn't remembered
  }
};

/** "EN | عربي". Uses plain links so the document reloads with the new lang/dir. */
export function LangSwitch({ locale, label, className = '' }: { locale: Locale; label: string; className?: string }) {
  const pathname = usePathname() || `/${locale}/`;
  return (
    <div className={`lang ${className}`} role="group" aria-label={label}>
      <a
        href={switchLocale(pathname, 'en')}
        hrefLang="en"
        lang="en"
        aria-current={locale === 'en' ? 'true' : undefined}
        onClick={() => remember('en')}
      >
        EN
      </a>
      <span aria-hidden="true">|</span>
      <a
        href={switchLocale(pathname, 'ar')}
        hrefLang="ar"
        lang="ar"
        aria-current={locale === 'ar' ? 'true' : undefined}
        onClick={() => remember('ar')}
      >
        عربي
      </a>
    </div>
  );
}
