'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { LogoLockup } from '@/components/brand/Logo';
import { Icon } from '@/components/ui/Icon';
import type { Locale } from '@/lib/i18n';

export type Slide = { key: string; art: React.ReactNode; tag: string; title: string; href: string };

type Labels = { aria: string; readMore: string; previous: string; next: string; slide: string };

/**
 * Expanding-card carousel: the active story opens wide, the following ones
 * wait as narrow previews to its side.
 */
export function NewsCarousel({ slides, labels, locale }: { slides: Slide[]; labels: Labels; locale: Locale }) {
  const [active, setActive] = useState(0);
  const touchX = useRef<number | null>(null);
  const count = slides.length;
  const go = (i: number) => setActive(((i % count) + count) % count);
  const rtl = locale === 'ar';

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') go(active + (rtl ? -1 : 1));
    if (e.key === 'ArrowLeft') go(active + (rtl ? 1 : -1));
  };

  return (
    <section className="news" aria-roledescription="carousel" aria-label={labels.aria}>
      <div className="container">
        <div
          className="news__viewport"
          onKeyDown={onKeyDown}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (Math.abs(dx) < 40) return;
            const forward = dx < 0 !== rtl;
            go(active + (forward ? 1 : -1));
          }}
        >
          <ul className="news__track" style={{ '--active': active } as React.CSSProperties}>
            {slides.map((slide, i) => {
              const current = i === active;
              return (
                <li
                  key={slide.key}
                  className={`news-card${current ? ' is-active' : ''}`}
                  aria-roledescription="slide"
                  aria-label={`${labels.slide} ${i + 1} / ${count}`}
                  aria-hidden={!current}
                  onClick={() => !current && go(i)}
                >
                  <div className="news-card__art">{slide.art}</div>
                  <div className="news-card__frame" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                  <div className="news-card__content">
                    <span className="news-card__brand">
                      <LogoLockup locale={locale} />
                    </span>
                    <div className="news-card__text">
                      <p className="news-card__tag">{slide.tag}</p>
                      <h3 className="news-card__title">{slide.title}</h3>
                    </div>
                    <Link href={slide.href} className="btn btn--primary btn--sm news-card__cta" tabIndex={current ? 0 : -1}>
                      {labels.readMore}
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="news__controls">
          <button type="button" className="news__arrow" onClick={() => go(active - 1)} aria-label={labels.previous}>
            <Icon name="arrow-left" size={18} />
          </button>
          <div className="news__dots">
            {slides.map((slide, i) => (
              <button
                key={slide.key}
                type="button"
                className={`news__dot${i === active ? ' is-active' : ''}`}
                aria-label={`${labels.slide} ${i + 1}`}
                aria-current={i === active ? 'true' : undefined}
                onClick={() => go(i)}
              />
            ))}
          </div>
          <button type="button" className="news__arrow" onClick={() => go(active + 1)} aria-label={labels.next}>
            <Icon name="arrow-right" size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
