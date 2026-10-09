'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { LogoLockup } from '@/components/brand/Logo';
import { Icon } from '@/components/ui/Icon';
import type { Dictionary } from '@/content/en';
import type { MenuFeatured, MenuItem } from '@/content/types';
import { localize, type Locale } from '@/lib/i18n';
import { LangSwitch } from './LangSwitch';

type MenuKey = 'solutions' | 'sectors' | 'company';
type Nav = Dictionary['nav'];

/** Pages whose first section is dark: the header starts transparent over them. */
const DARK_HERO = /^\/(en|ar)(\/solutions\/[^/]+)?\/?$/;

function Lines({ text }: { text: string }) {
  return (
    <>
      {text.split('\n').map((line, i) => (
        <span key={i} className="line">
          {line}
        </span>
      ))}
    </>
  );
}

function Featured({ data, art, href, onNavigate }: { data: MenuFeatured; art: React.ReactNode; href: string; onNavigate: () => void }) {
  return (
    <Link href={href} className="mega-feature" onClick={onNavigate}>
      <span className="mega-feature__art">{art}</span>
      <span className="mega-feature__eyebrow">{data.eyebrow}</span>
      <span className="mega-feature__title">
        <Lines text={data.title} />
      </span>
    </Link>
  );
}

function LinkList({ items, locale, onNavigate }: { items: MenuItem[]; locale: Locale; onNavigate: () => void }) {
  return (
    <ul className="mega-list">
      {items.map((item) => (
        <li key={item.href}>
          <Link href={localize(locale, item.href)} className="mega-link" onClick={onNavigate}>
            <span className="mega-link__title">{item.title}</span>
            <span className="mega-link__desc">{item.desc}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Header({ locale, nav, arts }: { locale: Locale; nav: Nav; arts: Record<MenuKey, React.ReactNode> }) {
  const pathname = usePathname() || `/${locale}/`;
  const [open, setOpen] = useState<MenuKey | null>(null);
  const [mobile, setMobile] = useState(false);
  const [expanded, setExpanded] = useState<MenuKey | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const timer = useRef<number | undefined>(undefined);
  const openedAt = useRef(0);

  const close = () => {
    setOpen(null);
    setMobile(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open && !mobile) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    const onPointer = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open, mobile]);

  useEffect(() => {
    document.documentElement.classList.toggle('is-locked', mobile);
    return () => document.documentElement.classList.remove('is-locked');
  }, [mobile]);

  const canHover = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const hoverOpen = (key: MenuKey) => {
    if (!canHover()) return;
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setOpen((current) => {
        if (current !== key) openedAt.current = Date.now();
        return key;
      });
    }, 90);
  };

  const hoverClose = () => {
    if (!canHover()) return;
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(null), 220);
  };

  const toggle = (key: MenuKey) => {
    window.clearTimeout(timer.current);
    // A click right after hover-open keeps the menu open instead of closing it again.
    if (open === key && Date.now() - openedAt.current < 450) return;
    openedAt.current = Date.now();
    setOpen(open === key ? null : key);
  };

  const L = (path: string) => localize(locale, path);
  const solid = !DARK_HERO.test(pathname) || scrolled || open !== null || mobile;

  const triggers: { key: MenuKey; label: string }[] = [
    { key: 'solutions', label: nav.solutions },
    { key: 'sectors', label: nav.sectors },
    { key: 'company', label: nav.company },
  ];

  const panels: Record<MenuKey, React.ReactNode> = {
    solutions: (
      <>
        <Featured data={nav.solutionsMenu.featured} art={arts.solutions} href={L(nav.solutionsMenu.featured.href)} onNavigate={close} />
        <div className="mega__cols">
          {nav.solutionsMenu.columns.map((col) => (
            <div key={col.href} className="mega-col">
              <Link href={L(col.href)} className="mega-col__title" onClick={close}>
                {col.title}
              </Link>
              <LinkList items={col.items} locale={locale} onNavigate={close} />
            </div>
          ))}
        </div>
      </>
    ),
    sectors: (
      <>
        <Featured data={nav.sectorsMenu.featured} art={arts.sectors} href={L(nav.sectorsMenu.featured.href)} onNavigate={close} />
        <div className="mega__cols mega__cols--single">
          <LinkList items={nav.sectorsMenu.items} locale={locale} onNavigate={close} />
        </div>
      </>
    ),
    company: (
      <>
        <Featured data={nav.companyMenu.featured} art={arts.company} href={L(nav.companyMenu.featured.href)} onNavigate={close} />
        <div className="mega__cols mega__cols--single">
          <LinkList items={nav.companyMenu.items} locale={locale} onNavigate={close} />
        </div>
      </>
    ),
  };

  const isActive = (path: string) => pathname.startsWith(L(path));

  return (
    <header
      ref={headerRef}
      className={`site-header ${solid ? 'is-solid' : 'is-overlay'} ${mobile ? 'is-mobile-open' : ''}`}
      onMouseLeave={hoverClose}
    >
      <div className="container site-header__bar">
        <Link href={L('/')} className="site-header__logo" aria-label={nav.home} onClick={close}>
          <LogoLockup locale={locale} />
        </Link>

        <nav className="site-nav" aria-label={nav.main}>
          <ul>
            {triggers.slice(0, 2).map((t) => (
              <li key={t.key} onMouseEnter={() => hoverOpen(t.key)}>
                <button
                  type="button"
                  className="site-nav__link"
                  aria-expanded={open === t.key}
                  aria-controls={`mega-${t.key}`}
                  onClick={() => toggle(t.key)}
                >
                  {t.label}
                  <Icon name="chevron-down" size={13} />
                </button>
              </li>
            ))}
            <li onMouseEnter={hoverClose}>
              <Link href={L('/products')} className="site-nav__link" aria-current={isActive('/products') ? 'page' : undefined}>
                {nav.products}
              </Link>
            </li>
            <li onMouseEnter={() => hoverOpen('company')}>
              <button
                type="button"
                className="site-nav__link"
                aria-expanded={open === 'company'}
                aria-controls="mega-company"
                onClick={() => toggle('company')}
              >
                {nav.company}
                <Icon name="chevron-down" size={13} />
              </button>
            </li>
            <li onMouseEnter={hoverClose}>
              <Link href={L('/media')} className="site-nav__link" aria-current={isActive('/media') ? 'page' : undefined}>
                {nav.media}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="site-header__actions">
          <LangSwitch locale={locale} label={nav.language} className="site-header__lang" />
          <Link href={L('/contact')} className="btn btn--primary btn--sm site-header__cta" onClick={close}>
            {nav.cta}
          </Link>
          <button
            type="button"
            className="burger"
            aria-expanded={mobile}
            aria-controls="mobile-nav"
            aria-label={mobile ? nav.closeMenu : nav.openMenu}
            onClick={() => {
              setOpen(null);
              setMobile((m) => !m);
            }}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {(Object.keys(panels) as MenuKey[]).map((key) => (
        <div
          key={key}
          id={`mega-${key}`}
          className={`mega ${open === key ? 'is-open' : ''}`}
          onMouseEnter={() => window.clearTimeout(timer.current)}
          inert={open !== key}
        >
          <div className="container">
            <div className="mega__inner">{panels[key]}</div>
          </div>
        </div>
      ))}

      <div id="mobile-nav" className={`mobile-nav ${mobile ? 'is-open' : ''}`} inert={!mobile}>
        <div className="mobile-nav__body">
          {(
            [
              {
                key: 'solutions' as const,
                label: nav.solutions,
                content: nav.solutionsMenu.columns.map((col) => (
                  <div key={col.href} className="mobile-nav__block">
                    <Link href={L(col.href)} className="mobile-nav__eyebrow" onClick={close}>
                      {col.title}
                    </Link>
                    {col.items.map((item) => (
                      <Link key={item.href} href={L(item.href)} className="mobile-nav__sublink" onClick={close}>
                        {item.title}
                      </Link>
                    ))}
                  </div>
                )),
              },
              {
                key: 'sectors' as const,
                label: nav.sectors,
                content: nav.sectorsMenu.items.map((item) => (
                  <Link key={item.href} href={L(item.href)} className="mobile-nav__sublink" onClick={close}>
                    {item.title}
                  </Link>
                )),
              },
            ] as const
          ).map((group) => (
            <div key={group.key} className={`mobile-nav__group ${expanded === group.key ? 'is-expanded' : ''}`}>
              <button
                type="button"
                className="mobile-nav__trigger"
                aria-expanded={expanded === group.key}
                onClick={() => setExpanded(expanded === group.key ? null : group.key)}
              >
                {group.label}
                <Icon name="chevron-down" size={18} />
              </button>
              <div className="mobile-nav__panel">
                <div>
                  <div className="mobile-nav__sub">{group.content}</div>
                </div>
              </div>
            </div>
          ))}
          <div className="mobile-nav__group">
            <Link href={L('/products')} className="mobile-nav__trigger" onClick={close}>
              {nav.products}
            </Link>
          </div>
          <div className={`mobile-nav__group ${expanded === 'company' ? 'is-expanded' : ''}`}>
            <button
              type="button"
              className="mobile-nav__trigger"
              aria-expanded={expanded === 'company'}
              onClick={() => setExpanded(expanded === 'company' ? null : 'company')}
            >
              {nav.company}
              <Icon name="chevron-down" size={18} />
            </button>
            <div className="mobile-nav__panel">
              <div>
                <div className="mobile-nav__sub">
                  {nav.companyMenu.items.map((item) => (
                    <Link key={item.href} href={L(item.href)} className="mobile-nav__sublink" onClick={close}>
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mobile-nav__group">
            <Link href={L('/media')} className="mobile-nav__trigger" onClick={close}>
              {nav.media}
            </Link>
          </div>
        </div>
        <div className="mobile-nav__foot">
          <LangSwitch locale={locale} label={nav.language} />
          <Link href={L('/contact')} className="btn btn--primary" onClick={close}>
            {nav.cta}
          </Link>
        </div>
      </div>
    </header>
  );
}
