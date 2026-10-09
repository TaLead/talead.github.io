import type { Metadata } from 'next';
import { site } from '@/config/site';
import { ar } from '@/content/ar';
import { en, type Dictionary } from '@/content/en';

export const locales = ['en', 'ar'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

const dictionaries: Record<Locale, Dictionary> = { en, ar };

export const isLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

export const dirOf = (locale: Locale) => (locale === 'ar' ? 'rtl' : 'ltr');

export const getDictionary = (locale: Locale) => dictionaries[locale];

export const localeParams = () => locales.map((locale) => ({ locale }));

/**
 * Prefixes an internal path with the locale and a trailing slash:
 * ('ar', '/solutions/cybersecurity#soc') -> '/ar/solutions/cybersecurity/#soc'
 */
export function localize(locale: Locale, path: string) {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  const [pathname, hash] = path.split('#');
  const clean = pathname.replace(/^\/+|\/+$/g, '');
  const url = clean ? `/${locale}/${clean}/` : `/${locale}/`;
  return hash ? `${url}#${hash}` : url;
}

/** Same page in the other language: '/en/about/' -> '/ar/about/'. */
export function switchLocale(pathname: string, to: Locale) {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length && isLocale(parts[0])) parts.shift();
  return parts.length ? `/${to}/${parts.join('/')}/` : `/${to}/`;
}

/** Page metadata with canonical URL, hreflang alternates and Open Graph. */
export function pageMetadata(
  locale: Locale,
  path: string,
  { title, description }: { title: string; description: string },
  { absoluteTitle = false } = {},
): Metadata {
  const dict = getDictionary(locale);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: localize(locale, path),
      languages: {
        en: localize('en', path),
        ar: localize('ar', path),
        'x-default': localize(defaultLocale, path),
      },
    },
    openGraph: {
      type: 'website',
      siteName: dict.meta.siteName,
      title,
      description,
      url: localize(locale, path),
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      images: [{ url: '/brand/og.png', width: 1200, height: 630, alt: site.name }],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/brand/og.png'] },
  };
}
