import { LogoWordmark, LogoWordmarkAr } from '@/components/brand/Logo';
import { RichText } from '@/components/ui/RichText';
import type { Dictionary } from '@/content/en';
import type { Locale } from '@/lib/i18n';
import { FilmButton } from './FilmButton';
import { HeroPanels } from './HeroPanels';

export function HomeHero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const hero = dict.home.hero;
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__bg" />
      <HeroPanels />
      <div className="hero__shade" />
      <div className="container hero__inner">
        <div className="hero__content">
          <p className="hero__brand">
            {locale === 'ar' ? (
              <LogoWordmarkAr className="hero__wordmark hero__wordmark--ar" title="تليد" />
            ) : (
              <LogoWordmark className="hero__wordmark" title="TALEAD" />
            )}
            <span className="hero__brand-word">{hero.brandWord}</span>
          </p>
          <h1 id="hero-title" className="hero__title">
            <RichText text={hero.title} />
          </h1>
          <p className="hero__text">{hero.text}</p>
          <div className="hero__actions">
            <FilmButton label={dict.common.watchNow} closeLabel={dict.common.close} film={dict.film} locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}
