import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Capabilities, Comparison, CtaBand, Faq, PillarHero, Proof, SuiteTiles } from '@/components/pillar/Sections';
import { pillarSlugs, type PillarSlug } from '@/content/types';
import { getDictionary, isLocale, pageMetadata } from '@/lib/i18n';

type Props = { params: Promise<{ locale: string; pillar: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return pillarSlugs.map((pillar) => ({ pillar }));
}

const isPillar = (value: string): value is PillarSlug => (pillarSlugs as readonly string[]).includes(value);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, pillar } = await params;
  if (!isLocale(locale) || !isPillar(pillar)) return {};
  return pageMetadata(locale, `/solutions/${pillar}`, getDictionary(locale).pillars[pillar].meta);
}

export default async function PillarPage({ params }: Props) {
  const { locale, pillar } = await params;
  if (!isLocale(locale) || !isPillar(pillar)) notFound();
  const dict = getDictionary(locale);
  const data = dict.pillars[pillar];

  return (
    <>
      <PillarHero locale={locale} pillar={data} />
      <SuiteTiles locale={locale} pillar={data} common={dict.common} />
      <Capabilities data={data.capabilities} />
      <Proof data={data.proof} />
      <Comparison locale={locale} data={data.comparison} />
      <Faq data={data.faq} />
      <CtaBand locale={locale} data={data.cta} />
    </>
  );
}
