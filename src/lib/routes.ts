import { en } from '@/content/en';
import { pillarSlugs, sectorSlugs } from '@/content/types';

/** Every page of the site, without locale prefix. Used for the sitemap. */
export const sitePaths = [
  '/',
  '/solutions',
  ...pillarSlugs.map((slug) => `/solutions/${slug}`),
  ...sectorSlugs.map((slug) => `/sectors/${slug}`),
  '/products',
  '/about',
  '/careers',
  '/contact',
  '/media',
  ...en.media.articles.map((a) => `/media/${a.slug}`),
  '/privacy',
  '/terms',
];
