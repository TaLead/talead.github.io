'use client';

import { useRef, useState } from 'react';
import { site } from '@/config/site';
import type { Dictionary } from '@/content/en';
import type { Locale } from '@/lib/i18n';

type Copy = Dictionary['contact'];

const DIAL_CODES = [
  { code: '+966', flag: '🇸🇦' },
  { code: '+971', flag: '🇦🇪' },
  { code: '+965', flag: '🇰🇼' },
  { code: '+974', flag: '🇶🇦' },
  { code: '+973', flag: '🇧🇭' },
  { code: '+968', flag: '🇴🇲' },
  { code: '+20', flag: '🇪🇬' },
  { code: '+962', flag: '🇯🇴' },
  { code: '+44', flag: '🇬🇧' },
  { code: '+1', flag: '🇺🇸' },
];

const initial = {
  firstName: '',
  lastName: '',
  dial: '+966',
  phone: '',
  email: '',
  company: '',
  sector: '',
  interest: '',
  country: '',
  message: '',
  consent: false,
};

type Values = typeof initial;
type Key = keyof Values;
type Status = 'idle' | 'sending' | 'sent' | 'mail' | 'error';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[0-9\s-]{7,15}$/;

export function ContactForm({ t, locale }: { t: Copy; locale: Locale }) {
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<Partial<Record<Key, string>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const form = useRef<HTMLFormElement>(null);
  const f = t.fields;

  const set = (key: Key) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target instanceof HTMLInputElement && e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((err) => ({ ...err, [key]: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<Key, string>> = {};
    if (!values.firstName.trim()) next.firstName = t.errors.required;
    if (!values.lastName.trim()) next.lastName = t.errors.required;
    if (!values.phone.trim()) next.phone = t.errors.required;
    else if (!PHONE.test(values.phone.trim())) next.phone = t.errors.phone;
    if (!values.email.trim()) next.email = t.errors.required;
    else if (!EMAIL.test(values.email.trim())) next.email = t.errors.email;
    if (!values.consent) next.consent = t.errors.consent;
    return next;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    if (site.contactEndpoint) {
      setStatus('sending');
      try {
        const res = await fetch(site.contactEndpoint, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ ...values, locale }),
        });
        if (!res.ok) throw new Error(String(res.status));
        setStatus('sent');
      } catch {
        setStatus('error');
      }
      return;
    }

    // No endpoint configured: hand the message to the visitor's email app.
    const lines = [
      `${f.firstName.label}: ${values.firstName}`,
      `${f.lastName.label}: ${values.lastName}`,
      `${f.phone.label}: ${values.dial} ${values.phone}`,
      `${f.email.label}: ${values.email}`,
      `${f.company.label}: ${values.company}`,
      `${f.sector.label}: ${values.sector}`,
      `${f.interest.label}: ${values.interest}`,
      `${f.country.label}: ${values.country}`,
      '',
      values.message,
    ];
    const subject = values.company ? `${t.mailSubject} — ${values.company}` : t.mailSubject;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
    setStatus('mail');
  };

  if (status === 'sent' || status === 'mail') {
    return (
      <div className="form-done" role="status">
        <h2 className="form-done__title">{t.success.title}</h2>
        <p className="form-done__text">
          {status === 'sent' ? (
            t.success.sent
          ) : (
            <>
              {t.success.mail} <a href={`mailto:${site.email}`}>{site.email}</a>
            </>
          )}
        </p>
        <button
          type="button"
          className="btn btn--outline"
          onClick={() => {
            setValues(initial);
            setStatus('idle');
          }}
        >
          {t.success.again}
        </button>
      </div>
    );
  }

  const field = (key: Key, label: string, required: boolean, control: React.ReactNode) => (
    <div className={`field${errors[key] ? ' has-error' : ''}`}>
      <label htmlFor={`cf-${key}`} className="field__label">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {control}
      {errors[key] && (
        <p id={`cf-${key}-error`} className="field__error">
          {errors[key]}
        </p>
      )}
    </div>
  );

  const aria = (key: Key, required = false) => ({
    id: `cf-${key}`,
    name: key,
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `cf-${key}-error` : undefined,
    'aria-required': required || undefined,
  });

  const select = (key: 'sector' | 'interest' | 'country', copy: { label: string; placeholder: string; options: string[] }) =>
    field(
      key,
      copy.label,
      false,
      <div className="field__select">
        <select {...aria(key)} value={values[key]} onChange={set(key)}>
          <option value="">{copy.placeholder}</option>
          {copy.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>,
    );

  return (
    <form ref={form} className="contact-form" noValidate onSubmit={onSubmit}>
      {field('firstName', f.firstName.label, true, (
        <input {...aria('firstName', true)} type="text" autoComplete="given-name" placeholder={f.firstName.placeholder} value={values.firstName} onChange={set('firstName')} />
      ))}
      {field('lastName', f.lastName.label, true, (
        <input {...aria('lastName', true)} type="text" autoComplete="family-name" placeholder={f.lastName.placeholder} value={values.lastName} onChange={set('lastName')} />
      ))}
      {field('phone', f.phone.label, true, (
        <div className="field__phone" dir="ltr">
          <select aria-label={t.dialCode} name="dial" value={values.dial} onChange={set('dial')}>
            {DIAL_CODES.map((d) => (
              <option key={d.code} value={d.code}>
                {d.flag} {d.code}
              </option>
            ))}
          </select>
          <input {...aria('phone', true)} type="tel" inputMode="tel" autoComplete="tel-national" placeholder={f.phone.placeholder} value={values.phone} onChange={set('phone')} dir="auto" />
        </div>
      ))}
      {field('email', f.email.label, true, (
        <input {...aria('email', true)} type="email" autoComplete="email" placeholder={f.email.placeholder} value={values.email} onChange={set('email')} dir="auto" />
      ))}
      {field('company', f.company.label, false, (
        <input {...aria('company')} type="text" autoComplete="organization" placeholder={f.company.placeholder} value={values.company} onChange={set('company')} />
      ))}
      {select('sector', f.sector)}
      {select('interest', f.interest)}
      {select('country', f.country)}
      {field('message', f.message.label, false, (
        <textarea {...aria('message')} rows={4} placeholder={f.message.placeholder} value={values.message} onChange={set('message')} />
      ))}
      <div className={`field field--check${errors.consent ? ' has-error' : ''}`}>
        <label className="check">
          <input {...aria('consent', true)} type="checkbox" checked={values.consent} onChange={set('consent')} />
          <span>{t.consent}</span>
        </label>
        {errors.consent && (
          <p id="cf-consent-error" className="field__error">
            {errors.consent}
          </p>
        )}
      </div>
      {status === 'error' && (
        <p className="form-error" role="alert">
          {t.errors.failed}
        </p>
      )}
      <div className="contact-form__submit">
        <button type="submit" className="btn btn--primary" disabled={status === 'sending'}>
          {status === 'sending' ? t.sending : t.submit}
        </button>
      </div>
    </form>
  );
}
