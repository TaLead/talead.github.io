import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SectorPage } from '@/components/sector/Sections';
import { sectorSlugs, type SectorSlug } from '@/content/types';
import { getDictionary, isLocale, pageMetadata } from '@/lib/i18n';

type Props = { params: Promise<{ locale: string; sector: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return sectorSlugs.map((sector) => ({ sector }));
}

const isSector = (value: string): value is SectorSlug => (sectorSlugs as readonly string[]).includes(value);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, sector } = await params;
  if (!isLocale(locale) || !isSector(sector)) return {};
  return pageMetadata(locale, `/sectors/${sector}`, getDictionary(locale).sectors[sector].meta);
}

export default async function SectorRoute({ params }: Props) {
  const { locale, sector } = await params;
  if (!isLocale(locale) || !isSector(sector)) notFound();
  return <SectorPage locale={locale} data={getDictionary(locale).sectors[sector]} />;
}
