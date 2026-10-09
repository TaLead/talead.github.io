import { LogoSprite } from '@/components/brand/LogoSprite';
import type { Metadata } from 'next';
import { LogoLockup } from '@/components/brand/Logo';
import { ar } from '@/content/ar';
import { en } from '@/content/en';
import { chakra, reem } from '@/lib/fonts';
import '@/styles/base.css';
import '@/styles/pages.css';

export const metadata: Metadata = {
  title: '404 | TALEAD',
  robots: { index: false },
};

/** Shown for any URL that matches no page, in both languages. */
export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${chakra.variable} ${reem.variable}`}>
      <body>
        <LogoSprite />
        <main className="nf">
          <a href="/en/" className="nf__logo" aria-label="TALEAD">
            <LogoLockup locale="en" />
          </a>
          <p className="nf__code">404</p>
          <div className="nf__langs">
            <div>
              <h1>{en.notFound.title}</h1>
              <p>{en.notFound.text}</p>
              <a className="btn btn--primary" href="/en/">
                {en.notFound.button}
              </a>
            </div>
            <div lang="ar" dir="rtl">
              <h2>{ar.notFound.title}</h2>
              <p>{ar.notFound.text}</p>
              <a className="btn btn--outline" href="/ar/">
                {ar.notFound.button}
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
