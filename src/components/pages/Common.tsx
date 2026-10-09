import Link from 'next/link';
import { Art } from '@/components/art/Art';
import { LogoLockup } from '@/components/brand/Logo';
import { Icon } from '@/components/ui/Icon';
import { RichText } from '@/components/ui/RichText';
import type { Dictionary } from '@/content/en';
import type { ArtName, Article, Product } from '@/content/types';
import { localize, type Locale } from '@/lib/i18n';

export const delay = (d: number) => ({ '--d': d }) as React.CSSProperties;

/** Centered white page introduction (eyebrow, title, text), optionally followed by media. */
export function PageIntro({
  eyebrow,
  title,
  text,
  children,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  children?: React.ReactNode;
}) {
  // Top-of-page content animates with CSS on load instead of waiting for the scroll observer.
  return (
    <section className="intro">
      <div className="container">
        <div className="section-head">
          {eyebrow && (
            <p className="eyebrow rise" style={delay(0)}>
              {eyebrow}
            </p>
          )}
          <h1 className="t-display rise" style={delay(1)}>
            <RichText text={title} />
          </h1>
          {text && (
            <p className="t-lead section-head__text intro__text rise" style={delay(2)}>
              {text}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

/** Large rounded illustration panel. `onLoad` animates immediately (for page tops). */
export function MediaFrame({
  art,
  uid,
  className = '',
  onLoad = false,
}: {
  art: ArtName;
  uid?: string;
  className?: string;
  onLoad?: boolean;
}) {
  return onLoad ? (
    <div className={`media-frame rise ${className}`} style={delay(3)}>
      <Art name={art} uid={uid} />
    </div>
  ) : (
    <div className={`media-frame ${className}`} data-reveal style={delay(2)}>
      <Art name={art} uid={uid} />
    </div>
  );
}

/** Card visual with the "TALEAD · topic" lockup and thin guide lines. */
export function CardVisual({ art, uid, topic, locale }: { art: ArtName; uid: string; topic: string; locale: Locale }) {
  return (
    <div className="card-visual">
      <Art name={art} uid={uid} />
      <span className="card-visual__lines" aria-hidden="true">
        <i />
        <i />
      </span>
      <span className="card-visual__lockup" aria-hidden="true">
        <LogoLockup locale={locale} />
        <b>·</b>
        <span>{topic}</span>
      </span>
    </div>
  );
}

export function ArticleCard({
  article,
  locale,
  common,
  headingLevel = 'h3',
}: {
  article: Article;
  locale: Locale;
  common: Dictionary['common'];
  headingLevel?: 'h2' | 'h3';
}) {
  const href = localize(locale, `/media/${article.slug}`);
  const Heading = headingLevel;
  return (
    <article className="post-card" data-reveal>
      <Link href={href} className="post-card__media" tabIndex={-1} aria-hidden="true">
        <CardVisual art={article.art} uid={`card-${article.slug}`} topic={article.topic} locale={locale} />
      </Link>
      <p className="post-card__meta">
        <span className="pill pill--blue">{article.tag}</span>
        <span>
          {article.readTime} {common.minRead}
        </span>
      </p>
      <Heading className="post-card__title">
        <Link href={href}>{article.title}</Link>
      </Heading>
      <Link href={href} className="link-arrow post-card__more">
        {common.readMore}
        <Icon name="arrow-right" size={14} />
      </Link>
    </article>
  );
}

export function ProductCard({ product, locale, common }: { product: Product; locale: Locale; common: Dictionary['common'] }) {
  const href = localize(locale, product.href);
  const shortName = product.name.replace(/^TALEAD\s+/i, '').toUpperCase();
  return (
    <article className="post-card" data-reveal>
      <Link href={href} className="post-card__media" tabIndex={-1} aria-hidden="true">
        <CardVisual art={product.art} uid={`product-${shortName.toLowerCase()}`} topic={shortName} locale={locale} />
      </Link>
      <p className="post-card__meta">
        <span className="pill pill--soft">{product.tag}</span>
      </p>
      <h3 className="post-card__title post-card__title--lg">
        <Link href={href}>{product.name}</Link>
      </h3>
      <p className="post-card__text">{product.text}</p>
      <Link href={href} className="link-arrow post-card__more">
        {common.learnMore}
        <Icon name="arrow-right" size={14} />
      </Link>
    </article>
  );
}

/** Centered closing call to action on white. */
export function SimpleCta({ title, text, button, href }: { title: string; text: string; button: string; href: string }) {
  return (
    <section className="simple-cta section">
      <div className="container section-head">
        <h2 className="t-h2" data-reveal>
          <RichText text={title} />
        </h2>
        <p className="t-lead section-head__text" data-reveal style={delay(1)}>
          {text}
        </p>
        <div data-reveal style={delay(2)}>
          {/^(mailto:|https?:)/.test(href) ? (
            <a href={href} className="btn btn--primary simple-cta__btn">
              {button}
            </a>
          ) : (
            <Link href={href} className="btn btn--primary simple-cta__btn">
              {button}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
