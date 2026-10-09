import Link from 'next/link';
import { LogoMark } from '@/components/brand/Logo';
import { Icon, type IconName } from '@/components/ui/Icon';
import { site } from '@/config/site';
import type { Dictionary } from '@/content/en';
import { localize, type Locale } from '@/lib/i18n';
import { LangSwitch } from './LangSwitch';

const socials: { key: keyof typeof site.social; icon: IconName; label: string }[] = [
  { key: 'x', icon: 'x', label: 'X' },
  { key: 'linkedin', icon: 'linkedin', label: 'LinkedIn' },
  { key: 'instagram', icon: 'instagram', label: 'Instagram' },
];

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container site-footer__row">
        <Link href={localize(locale, '/')} className="site-footer__brand" aria-label={dict.nav.home}>
          <span className="site-footer__badge">
            <LogoMark />
          </span>
          <span className="site-footer__tagline">{dict.footer.tagline}</span>
        </Link>
        <nav className="site-footer__links" aria-label={dict.meta.siteName}>
          {dict.footer.links.map((link) => (
            <Link key={link.href} href={localize(locale, link.href)}>
              {link.label}
              <Icon name="arrow-up-right" size={11} />
            </Link>
          ))}
        </nav>
        <div className="site-footer__end">
          <ul className="site-footer__social">
            {socials
              .filter((s) => site.social[s.key])
              .map((s) => (
                <li key={s.key}>
                  <a
                    href={site.social[s.key]}
                    aria-label={`${dict.footer.social} ${s.label}`}
                    {...(site.social[s.key].startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <Icon name={s.icon} size={15} />
                  </a>
                </li>
              ))}
          </ul>
          <LangSwitch locale={locale} label={dict.nav.language} />
        </div>
      </div>
      <p className="site-footer__copy">
        © {year} {dict.footer.rights}
      </p>
    </footer>
  );
}
