import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ContactForm } from '@/components/pages/ContactForm';
import { Icon } from '@/components/ui/Icon';
import { site } from '@/config/site';
import { getDictionary, isLocale, pageMetadata } from '@/lib/i18n';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, '/contact', getDictionary(locale).contact.meta);
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale).contact;

  return (
    <section className="contact">
      <div className="container">
        <header className="section-head contact__head">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1 className="t-h2">{t.title}</h1>
          <p className="contact__subtitle">{t.subtitle}</p>
        </header>
        <ContactForm t={t} locale={locale} />
        <ul className="contact__details">
          <li>
            <Icon name="mail" size={18} />
            <span>
              <small>{t.details.emailLabel}</small>
              <a href={`mailto:${site.email}`} dir="ltr">
                {site.email}
              </a>
            </span>
          </li>
          {site.phone && (
            <li>
              <Icon name="phone" size={18} />
              <span>
                <small>{t.details.phoneLabel}</small>
                <a href={`tel:${site.phone.replace(/\s+/g, '')}`} dir="ltr">
                  {site.phone}
                </a>
              </span>
            </li>
          )}
          <li>
            <Icon name="pin" size={18} />
            <span>
              <small>{t.details.locationLabel}</small>
              {t.details.location}
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}
