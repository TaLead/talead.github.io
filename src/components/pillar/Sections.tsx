import Link from 'next/link';
import { Art } from '@/components/art/Art';
import { LogoWordmark, LogoWordmarkAr } from '@/components/brand/Logo';
import { Icon } from '@/components/ui/Icon';
import type { Dictionary } from '@/content/en';
import type { Pillar } from '@/content/types';
import { localize, type Locale } from '@/lib/i18n';
import { AppMockup } from './AppMockup';

const delay = (d: number) => ({ '--d': d }) as React.CSSProperties;

function BrandWord({ locale, className }: { locale: Locale; className: string }) {
  return locale === 'ar' ? (
    <LogoWordmarkAr className={`${className} ${className}--ar`} title="تليد" />
  ) : (
    <LogoWordmark className={className} title="TALEAD" />
  );
}

export function PillarHero({ locale, pillar }: { locale: Locale; pillar: Pillar }) {
  const h = pillar.hero;
  return (
    <section className="phero">
      <div className="phero__art">
        <Art name={h.art} uid="hero" />
      </div>
      <div className="container phero__inner">
        <p className="phero__label">
          <BrandWord locale={locale} className="phero__word" />
          <span className="phero__label-word">{h.label}</span>
        </p>
        <h1 className="phero__title">{h.title}</h1>
        <div className="phero__actions">
          <Link href={localize(locale, '/contact')} className="btn btn--grad">
            {h.primary}
            <Icon name="chevron-right" size={14} />
          </Link>
          <a href="#suite" className="btn btn--ghost">
            {h.secondary}
            <Icon name="chevron-right" size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

export function SuiteTiles({ locale, pillar, common }: { locale: Locale; pillar: Pillar; common: Dictionary['common'] }) {
  return (
    <section id="suite" className="suite">
      <div className="suite__grid">
        {pillar.tiles.map((tile, i) => (
          <article key={tile.id} id={tile.id} className={`suite-tile suite-tile--${i + 1}`}>
            <div className="suite-tile__head" data-reveal>
              <span className="pill pill--glass">{tile.tag}</span>
              <h2 className="suite-tile__title">{tile.title}</h2>
              <p className="suite-tile__text">{tile.text}</p>
              <div className="suite-tile__actions">
                <Link href={localize(locale, '/contact')} className="btn btn--dark btn--sm">
                  {common.requestDemo}
                </Link>
                <Link href={localize(locale, '/contact')} className="btn btn--ghost btn--sm">
                  {common.learnMore}
                </Link>
              </div>
            </div>
            <div className="suite-tile__shot" data-reveal style={delay(2)}>
              <AppMockup spec={tile.mockup} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

const DOTS = ['#2F7BFF', '#22C3EE', '#A78BFA', '#F59E0B', '#34D399', '#F472B6', '#7CB4FF', '#FB7185'];

export function Capabilities({ data }: { data: Pillar['capabilities'] }) {
  const categories = [...new Set(data.items.map((item) => item.cat))];
  const items = [...data.items, ...data.items];
  return (
    <section className="caps section">
      <div className="container">
        <p className="eyebrow eyebrow--blue" data-reveal>
          {data.eyebrow}
        </p>
        <h2 className="t-h2 caps__title" data-reveal style={delay(1)}>
          {data.titleA} <span className="accent">{data.titleB}</span>
        </h2>
        <p className="caps__quote" data-reveal style={delay(2)}>
          {data.quote}
        </p>
        <div className="marquee" data-motion style={{ '--duration': `${data.items.length * 6}s` } as React.CSSProperties}>
          <ul className="marquee__track">
            {items.map((item, i) => (
              <li key={i} className="cap-card" aria-hidden={i >= data.items.length || undefined}>
                <span className="cap-card__cat">
                  <i style={{ background: DOTS[categories.indexOf(item.cat) % DOTS.length] }} />
                  {item.cat}
                </span>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const TONES = ['blue', 'sky', 'violet', 'amber', 'green', 'rose'];

export function Proof({ data }: { data: Pillar['proof'] }) {
  const items = [...data.stats, ...data.stats];
  return (
    <section className="proof section">
      <div className="container">
        <p className="eyebrow eyebrow--blue" data-reveal>
          {data.eyebrow}
        </p>
        <h2 className="t-h2 caps__title" data-reveal style={delay(1)}>
          {data.titleA} <span className="accent">{data.titleB}</span>
        </h2>
        <p className="caps__quote" data-reveal style={delay(2)}>
          {data.subtitle}
        </p>
        <div className="marquee marquee--reverse" data-motion style={{ '--duration': `${data.stats.length * 7}s` } as React.CSSProperties}>
          <ul className="marquee__track">
            {items.map((stat, i) => (
              <li key={i} className={`stat-card tone-card--${TONES[i % data.stats.length % TONES.length]}`} aria-hidden={i >= data.stats.length || undefined}>
                <span className="stat-card__tag">{stat.tag}</span>
                <b className="stat-card__value">{stat.value}</b>
                <span className="stat-card__label">{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Loose grey tiles: the fragmented "before" state. */
function ScatterVisual() {
  const tiles = [
    [40, 70], [96, 52], [150, 84], [64, 118], [124, 132], [182, 120], [30, 160], [100, 176], [160, 168],
  ];
  return (
    <svg className="compare__svg" viewBox="0 0 220 220" aria-hidden="true">
      {tiles.map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${(i % 3) * 7 - 7})`}>
          <path d="M0 -10 18 0 0 10 -18 0Z" fill="#E4E8EE" stroke="#C9CFD8" />
          <path d="M-18 0 0 10v6l-18-10Z" fill="#CDD3DC" />
          <path d="M18 0 0 10v6l18-10Z" fill="#BCC3CE" />
          {i % 4 === 0 && <circle cx="0" cy="-1" r="3" fill="none" stroke="#9AA3B0" />}
        </g>
      ))}
    </svg>
  );
}

/** Stacked glowing layers: the integrated "after" state. */
function StackVisual() {
  const layers = [0, 1, 2, 3, 4];
  return (
    <svg className="compare__svg" viewBox="0 0 220 220" aria-hidden="true">
      <defs>
        <linearGradient id="cmp-layer" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#CFE2FF" />
          <stop offset="1" stopColor="#2F7BFF" />
        </linearGradient>
        <radialGradient id="cmp-glow">
          <stop offset="0" stopColor="#2F7BFF" stopOpacity="0.55" />
          <stop offset="1" stopColor="#2F7BFF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="110" cy="118" rx="90" ry="70" fill="url(#cmp-glow)" />
      <path d="M110 150 186 188 110 226 34 188Z" transform="translate(0 -26)" fill="#0B0D10" />
      <path d="M34 162v10l76 38v-10Z" fill="#05070A" />
      <path d="M186 162v10l-76 38v-10Z" fill="#14181F" />
      {layers.map((l) => {
        const y = 150 - l * 22;
        return (
          <g key={l} opacity={0.55 + l * 0.1}>
            <path d={`M110 ${y - 28} 160 ${y - 3} 110 ${y + 22} 60 ${y - 3}Z`} fill="url(#cmp-layer)" stroke="#E6F0FF" strokeWidth="0.8" />
            <path d={`M60 ${y - 3}v5l50 25v-5Z`} fill="#1D4ED8" />
            <path d={`M160 ${y - 3}v5l-50 25v-5Z`} fill="#2563EB" />
          </g>
        );
      })}
    </svg>
  );
}

export function Comparison({ locale, data }: { locale: Locale; data: Pillar['comparison'] }) {
  return (
    <section className="compare-section">
      <div className="container compare">
        <div className="compare__card compare__card--before" data-reveal>
          <h3 className="compare__title">{data.left.title}</h3>
          <div className="compare__body">
            <div className="compare__visual">
              <ScatterVisual />
            </div>
            <ul className="compare__list">
              {data.left.items.map((item) => (
                <li key={item}>
                  <i className="compare__x">
                    <Icon name="cross" size={11} />
                  </i>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <span className="compare__arrow" aria-hidden="true">
          <Icon name="arrow-right" size={18} />
        </span>
        <div className="compare__card compare__card--after" data-reveal style={delay(1)}>
          <p className="compare__title compare__brand">
            <BrandWord locale={locale} className="compare__word" />
            <span>{data.right.title}</span>
          </p>
          <div className="compare__body">
            <div className="compare__visual">
              <StackVisual />
            </div>
            <ul className="compare__list compare__list--good">
              {data.right.items.map((item) => (
                <li key={item}>
                  <i className="compare__check">
                    <Icon name="check" size={11} />
                  </i>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Faq({ data }: { data: Pillar['faq'] }) {
  return (
    <section className="faq section">
      <div className="container faq__grid">
        <h2 className="faq__title" data-reveal>
          {data.title}
        </h2>
        <div className="faq__list" data-reveal style={delay(1)}>
          {data.items.map((item, i) => (
            <details key={item.q} open={i === 0}>
              <summary>
                {item.q}
                <Icon name="chevron-down" size={16} />
              </summary>
              <p className="faq__answer">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaBand({ locale, data, href = '/contact' }: { locale: Locale; data: Pillar['cta']; href?: string }) {
  return (
    <section className="cta-band">
      <div className="container section-head">
        <h2 className="cta-band__title" data-reveal>
          {data.titleA}
          <br />
          <span className="accent">{data.titleB}</span>
        </h2>
        <p className="cta-band__text" data-reveal style={delay(1)}>
          {data.text}
        </p>
        <div data-reveal style={delay(2)}>
          <Link href={localize(locale, href)} className="btn btn--grad cta-band__btn">
            {data.button}
            <Icon name="chevron-right" size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
