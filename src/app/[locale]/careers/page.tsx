import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MediaFrame, PageIntro, SimpleCta, delay } from '@/components/pages/Common';
import { site } from '@/config/site';
import { getDictionary, isLocale, pageMetadata } from '@/lib/i18n';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, '/careers', getDictionary(locale).careers.meta);
}

export default async function CareersPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = getDictionary(locale).careers;
  const mailto = `mailto:${site.careersEmail}?subject=${encodeURIComponent(c.cta.subject)}`;

  return (
    <>
      <PageIntro eyebrow={c.hero.eyebrow} title={c.hero.title} text={c.hero.text}>
        <MediaFrame art="team" uid="careers" className="media-frame--hero" onLoad />
      </PageIntro>

      <section className="section">
        <div className="container">
          <header className="section-head">
            <p className="eyebrow" data-reveal>
              {c.why.eyebrow}
            </p>
            <h2 className="t-h2" data-reveal style={delay(1)}>
              {c.why.title}
            </h2>
          </header>
          <div className="cards3">
            {c.why.cards.map((card, i) => (
              <article key={card.title} className="ccard" data-reveal style={delay(i)}>
                <span className="ccard__num">0{i + 1}</span>
                <h3 className="ccard__title">{card.title}</h3>
                <p className="ccard__text">{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--gray">
        <div className="container section-head">
          <p className="eyebrow" data-reveal>
            {c.teams.eyebrow}
          </p>
          <ul className="chips chips--lg" data-reveal style={delay(1)}>
            {c.teams.items.map((team) => (
              <li key={team}>{team}</li>
            ))}
          </ul>
        </div>
      </section>

      <SimpleCta title={c.cta.title} text={c.cta.text} button={c.cta.button} href={mailto} />
    </>
  );
}
