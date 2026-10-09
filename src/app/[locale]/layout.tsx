import { LogoSprite } from '@/components/brand/LogoSprite';
import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { Art } from '@/components/art/Art';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { RevealObserver } from '@/components/layout/RevealObserver';
import { site } from '@/config/site';
import { chakra, reem } from '@/lib/fonts';
import { dirOf, getDictionary, isLocale, localeParams } from '@/lib/i18n';
import '@/styles/base.css';
import '@/styles/layout.css';
import '@/styles/art.css';
import '@/styles/home.css';
import '@/styles/pillar.css';
import '@/styles/pages.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return localeParams();
}

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Omit<Props, 'children'>): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL(site.url),
    title: { default: dict.meta.title, template: `%s | ${dict.meta.siteName}` },
    description: dict.meta.description,
    applicationName: site.name,
    formatDetection: { telephone: false, email: false, address: false },
  };
}

export const viewport: Viewport = {
  themeColor: '#0B0D10',
  width: 'device-width',
  initialScale: 1,
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <html
      lang={locale}
      dir={dirOf(locale)}
      className={`${chakra.variable} ${reem.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Lets CSS hide scroll-reveal elements only when JavaScript runs */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <LogoSprite />
        <a className="skip-link" href="#main">
          {dict.nav.skip}
        </a>
        <Header
          locale={locale}
          nav={dict.nav}
          arts={{
            solutions: <Art name="keys" uid="menu" />,
            sectors: <Art name="network" uid="menu" />,
            company: <Art name="team" uid="menu" />,
          }}
        />
        <main id="main">{children}</main>
        <Footer locale={locale} dict={dict} />
        <RevealObserver />
      </body>
    </html>
  );
}
