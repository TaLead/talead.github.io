import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArticleCard, PageIntro } from '@/components/pages/Common';
import { getDictionary, isLocale, pageMetadata } from '@/lib/i18n';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, '/media', getDictionary(locale).media.meta);
}

export default async function MediaPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <PageIntro title={dict.media.title} text={dict.media.text} />
      <section className="listing listing--last">
        <div className="container">
          <h2 className="listing__title">{dict.media.allNews}</h2>
          <div className="post-grid">
            {dict.media.articles.map((article) => (
              <ArticleCard key={article.slug} article={article} locale={locale} common={dict.common} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
