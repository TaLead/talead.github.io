import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Art } from '@/components/art/Art';
import { Statement } from '@/components/home/Sections';
import { PageIntro, delay } from '@/components/pages/Common';
import { CtaBand } from '@/components/pillar/Sections';
import { Icon } from '@/components/ui/Icon';
import { getDictionary, isLocale, localize, pageMetadata } from '@/lib/i18n';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, '/solutions', getDictionary(locale).solutions.meta);
}

export default async function SolutionsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const s = dict.solutions;
  const columns = dict.nav.solutionsMenu.columns;

  return (
    <>
      <PageIntro eyebrow={s.hero.eyebrow} title={s.hero.title} text={s.hero.text} />
      <section className="pillars">
        <div className="container pillars__grid">
          {s.pillarCards.map((card, i) => (
            <article key={card.slug} className="pcard" data-reveal style={delay(i)}>
              <div className="pcard__media">
                <Art name={card.art} uid={`pcard-${i}`} />
              </div>
              <div className="pcard__body">
                <span className="pill pill--glass">{card.tag}</span>
                <h2 className="pcard__title">{card.title}</h2>
                <p className="pcard__text">{card.text}</p>
                <p className="pcard__label">{s.includes}</p>
                <ul className="pcard__list">
                  {columns[i].items.map((item) => (
                    <li key={item.href}>
                      <Link href={localize(locale, item.href)}>
                        {item.title}
                        <Icon name="arrow-right" size={13} />
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href={localize(locale, `/solutions/${card.slug}`)} className="btn btn--light pcard__btn">
                  {dict.common.explore}
                  <Icon name="chevron-right" size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <Statement dict={dict} />
      <CtaBand locale={locale} data={s.cta} />
    </>
  );
}
