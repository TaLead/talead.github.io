import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
import { locales, localize } from '@/lib/i18n';
import { sitePaths } from '@/lib/routes';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return sitePaths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${site.url}${localize(locale, path)}`,
      alternates: {
        languages: {
          en: `${site.url}${localize('en', path)}`,
          ar: `${site.url}${localize('ar', path)}`,
        },
      },
    })),
  );
}
