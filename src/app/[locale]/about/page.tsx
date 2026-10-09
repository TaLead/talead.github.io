import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Art } from '@/components/art/Art';
import { LogoWordmark, LogoWordmarkAr } from '@/components/brand/Logo';
import { InsightsCarousel, Statement } from '@/components/home/Sections';
import { delay } from '@/components/pages/Common';
import { getDictionary, isLocale, localize, pageMetadata } from '@/lib/i18n';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, '/about', getDictionary(locale).about.meta);
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const a = dict.about;

  return (
    <>
      <section className="ahero">
        <div className="container ahero__inner">
          <h1 className="ahero__word">
            {locale === 'ar' ? (
              <LogoWordmarkAr className="ahero__svg ahero__svg--ar" title="تليد" />
            ) : (
              <LogoWordmark className="ahero__svg" title="TALEAD" />
            )}
          </h1>
          <p className="ahero__tagline">{a.hero.tagline}</p>
          <p className="ahero__text">{a.hero.text}</p>
        </div>
      </section>

      <section className="section section--gray">
        <div className="container section-head">
          <p className="eyebrow" data-reveal>
            {a.mission.eyebrow}
          </p>
          <h2 className="t-h2" data-reveal style={delay(1)}>
            {a.mission.title}
          </h2>
          {a.mission.paragraphs.map((text, i) => (
            <p key={i} className="t-lead section-head__text mission__p" data-reveal style={delay(2 + i)}>
              {text}
            </p>
          ))}
        </div>
      </section>

      <section className="section values">
        <div className="container">
          <header className="section-head">
            <p className="eyebrow" data-reveal>
              {a.values.eyebrow}
            </p>
            <h2 className="t-h2" data-reveal style={delay(1)}>
              {a.values.title}
            </h2>
          </header>
          <div className="values__grid">
            {a.values.items.map((value, i) => (
              <article key={value.title} className="value-card" data-reveal style={delay(i)}>
                <span className="value-card__num">0{i + 1}</span>
                <h3 className="value-card__title">{value.title}</h3>
                <p className="value-card__text">{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="people-section">
        <div className="container">
          <div className="people" data-reveal>
            <div className="people__body">
              <h2 className="people__title">{a.people.title}</h2>
              <p className="people__text">{a.people.text}</p>
              <Link href={localize(locale, '/careers')} className="btn btn--primary">
                {a.people.button}
              </Link>
            </div>
            <div className="people__media">
              <Art name="team" uid="people" />
            </div>
          </div>
        </div>
      </section>

      <Statement dict={dict} />
      <InsightsCarousel locale={locale} dict={dict} />
    </>
  );
}
