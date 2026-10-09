import { Art } from '@/components/art/Art';
import { MediaFrame, PageIntro, SimpleCta, delay } from '@/components/pages/Common';
import { RichText } from '@/components/ui/RichText';
import type { Sector } from '@/content/types';
import { localize, type Locale } from '@/lib/i18n';

export function SectorPage({ locale, data }: { locale: Locale; data: Sector }) {
  return (
    <>
      <PageIntro eyebrow={data.hero.eyebrow} title={data.hero.title} text={data.hero.text}>
        <MediaFrame art={data.hero.art} uid="sector-hero" className="media-frame--hero" onLoad />
      </PageIntro>

      <section className="section challenges">
        <div className="container">
          <header className="section-head">
            <p className="eyebrow" data-reveal>
              {data.challenges.eyebrow}
            </p>
            <h2 className="t-h2" data-reveal style={delay(1)}>
              <RichText text={data.challenges.title} />
            </h2>
            <p className="t-lead section-head__text" data-reveal style={delay(2)}>
              {data.challenges.text}
            </p>
          </header>
          <div className="cards3">
            {data.challenges.cards.map((card, i) => (
              <article key={card.title} className="ccard" data-reveal style={delay(i)}>
                <span className="ccard__num">0{i + 1}</span>
                <h3 className="ccard__title">{card.title}</h3>
                <p className="ccard__text">{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section solcards-section">
        <div className="container">
          <header className="section-head">
            <p className="eyebrow" data-reveal>
              {data.solutions.eyebrow}
            </p>
            <h2 className="t-h2" data-reveal style={delay(1)}>
              <RichText text={data.solutions.title} />
            </h2>
          </header>
          <div className="solcards">
            {data.solutions.cards.map((card, i) => (
              <article key={card.title} className="solcard" data-reveal style={delay(i)}>
                <div className="solcard__media">
                  <Art name={card.art} uid={`sol-${i}`} />
                </div>
                <div className="solcard__body">
                  <h3 className="solcard__title">{card.title}</h3>
                  <p className="solcard__text">{card.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--gray impact">
        <div className="container">
          <header className="section-head">
            <p className="eyebrow" data-reveal>
              {data.impact.eyebrow}
            </p>
            <h2 className="t-h2" data-reveal style={delay(1)}>
              <RichText text={data.impact.title} />
            </h2>
            <p className="t-lead section-head__text" data-reveal style={delay(2)}>
              {data.impact.text}
            </p>
          </header>
          {data.impact.chips.length > 0 && (
            <ul className="chips" data-reveal style={delay(2)}>
              {data.impact.chips.map((chip) => (
                <li key={chip}>{chip}</li>
              ))}
            </ul>
          )}
          <MediaFrame art={data.impact.art} uid="sector-impact" className="media-frame--wide" />
        </div>
      </section>

      <SimpleCta title={data.cta.title} text={data.cta.text} button={data.cta.button} href={localize(locale, '/contact')} />
    </>
  );
}
