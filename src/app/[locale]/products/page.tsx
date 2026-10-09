import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageIntro, ProductCard } from '@/components/pages/Common';
import { CtaBand } from '@/components/pillar/Sections';
import { getDictionary, isLocale, pageMetadata } from '@/lib/i18n';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, '/products', getDictionary(locale).products.meta);
}

export default async function ProductsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const p = dict.products;

  return (
    <>
      <PageIntro eyebrow={p.hero.eyebrow} title={p.hero.title} text={p.hero.text} />
      <section className="listing">
        <div className="container">
          <h2 className="listing__title">{p.allTitle}</h2>
          <div className="post-grid">
            {p.items.map((product) => (
              <ProductCard key={product.name} product={product} locale={locale} common={dict.common} />
            ))}
          </div>
        </div>
      </section>
      <CtaBand locale={locale} data={p.cta} />
    </>
  );
}
