import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { HomeHero } from '@/components/home/HomeHero';
import { Closing, FocusAreas, InsightsCarousel, Statement } from '@/components/home/Sections';
import { getDictionary, isLocale, pageMetadata } from '@/lib/i18n';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, '/', getDictionary(locale).home.meta, { absoluteTitle: true });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <HomeHero locale={locale} dict={dict} />
      <InsightsCarousel locale={locale} dict={dict} />
      <Statement dict={dict} />
      <FocusAreas locale={locale} dict={dict} />
      <Closing locale={locale} dict={dict} />
    </>
  );
}
