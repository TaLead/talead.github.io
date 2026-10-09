import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArticleCard, CardVisual } from '@/components/pages/Common';
import { Icon } from '@/components/ui/Icon';
import { en } from '@/content/en';
import { getDictionary, isLocale, localize, pageMetadata } from '@/lib/i18n';

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return en.media.articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const article = getDictionary(locale).media.articles.find((a) => a.slug === slug);
  if (!article) return {};
  return pageMetadata(locale, `/media/${slug}`, { title: article.title, description: article.excerpt });
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const article = dict.media.articles.find((a) => a.slug === slug);
  if (!article) notFound();
  const related = dict.media.articles.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <>
      <article className="article">
        <div className="container article__head">
          <Link href={localize(locale, '/media')} className="link-arrow article__back">
            <Icon name="arrow-left" size={14} />
            {dict.common.backToMedia}
          </Link>
          <p className="post-card__meta">
            <span className="pill pill--blue">{article.tag}</span>
            <span>
              {article.readTime} {dict.common.minRead}
            </span>
          </p>
          <h1 className="article__title">{article.title}</h1>
          <p className="article__excerpt">{article.excerpt}</p>
        </div>
        <div className="container">
          <div className="article__media">
            <CardVisual art={article.art} uid="article" topic={article.topic} locale={locale} />
          </div>
        </div>
        <div className="container article__body">
          {article.body.map((block, i) =>
            block.startsWith('## ') ? <h2 key={i}>{block.slice(3)}</h2> : <p key={i}>{block}</p>,
          )}
        </div>
      </article>
      <section className="listing listing--last related">
        <div className="container">
          <h2 className="listing__title">{dict.common.related}</h2>
          <div className="post-grid">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} locale={locale} common={dict.common} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
