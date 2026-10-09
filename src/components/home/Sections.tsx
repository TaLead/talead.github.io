import Link from 'next/link';
import { Art } from '@/components/art/Art';
import { FocusGlyph } from '@/components/ui/FocusGlyph';
import { Icon } from '@/components/ui/Icon';
import { RichText } from '@/components/ui/RichText';
import type { Dictionary } from '@/content/en';
import { localize, type Locale } from '@/lib/i18n';
import { NewsCarousel, type Slide } from './NewsCarousel';
import { ScrollTint } from './ScrollTint';

const delay = (d: number) => ({ '--d': d }) as React.CSSProperties;

/** Latest-insights carousel, fed from the media articles. */
export function InsightsCarousel({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const slides: Slide[] = dict.media.articles.slice(0, 5).map((a) => ({
    key: a.slug,
    art: <Art name={a.art} />,
    tag: a.tag,
    title: a.title,
    href: localize(locale, `/media/${a.slug}`),
  }));
  return (
    <NewsCarousel
      slides={slides}
      locale={locale}
      labels={{
        aria: dict.home.carouselLabel,
        readMore: dict.common.readMore,
        previous: dict.common.previous,
        next: dict.common.next,
        slide: dict.common.slide,
      }}
    />
  );
}

/** Full-width statement whose blue deepens and brightens as you scroll. */
export function Statement({ dict }: { dict: Dictionary }) {
  const s = dict.home.statement;
  return (
    <ScrollTint className="statement">
      <div className="container statement__inner">
        <p className="eyebrow" data-reveal>
          {s.eyebrow}
        </p>
        <h2 className="t-h2" data-reveal style={delay(1)}>
          <RichText text={s.title} />
        </h2>
        <p className="t-lead statement__text" data-reveal style={delay(2)}>
          <RichText text={s.text} />
        </p>
        <p className="eyebrow statement__allies-title" data-reveal>
          {s.alliesTitle}
        </p>
        <ul className="allies" data-reveal style={delay(1)}>
          {s.allies.map((ally) => (
            <li key={ally} className="ally">
              {ally}
            </li>
          ))}
        </ul>
      </div>
    </ScrollTint>
  );
}

export function FocusAreas({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const f = dict.home.focus;
  return (
    <section className="focus section">
      <div className="container">
        <header className="section-head">
          <p className="eyebrow" data-reveal>
            {f.eyebrow}
          </p>
          <h2 className="t-h2" data-reveal style={delay(1)}>
            <RichText text={f.title} />
          </h2>
          <p className="t-lead section-head__text" data-reveal style={delay(2)}>
            <RichText text={f.text} />
          </p>
        </header>
        <ol className="focus__list">
          {f.items.map((item, i) => (
            <li key={item.title} className={`focus-row${i % 2 ? ' focus-row--flip' : ''}`} data-reveal>
              <div className={`focus-tile focus-tile--${i + 1}`}>
                <FocusGlyph name={item.icon} />
              </div>
              <div className="focus-row__body">
                <p className="eyebrow eyebrow--sm">{item.eyebrow}</p>
                <h3 className="focus-row__title">
                  <Link href={localize(locale, item.href)}>{item.title}</Link>
                </h3>
                <p className="focus-row__text">
                  <RichText text={item.text} />
                </p>
                <Link href={localize(locale, item.href)} className="link-arrow">
                  {dict.common.learnMore}
                  <Icon name="arrow-right" size={14} />
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Closing({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const c = dict.home.closing;
  return (
    <section className="closing section">
      <div className="container section-head">
        <p className="eyebrow" data-reveal>
          {c.eyebrow}
        </p>
        <h2 className="t-h2" data-reveal style={delay(1)}>
          <RichText text={c.title} />
        </h2>
        <p className="t-lead section-head__text" data-reveal style={delay(2)}>
          <RichText text={c.text} />
        </p>
        <div data-reveal style={delay(3)}>
          <Link href={localize(locale, '/contact')} className="btn btn--primary closing__cta">
            {dict.common.contactCta}
          </Link>
        </div>
      </div>
    </section>
  );
}
