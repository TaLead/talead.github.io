'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { LogoLockup, LogoWordmark, LogoWordmarkAr } from '@/components/brand/Logo';
import { BOX, CIRCUIT, MONOGRAM } from '@/components/brand/paths';
import { Icon } from '@/components/ui/Icon';
import { site } from '@/config/site';
import type { Dictionary } from '@/content/en';
import type { Locale } from '@/lib/i18n';

type Film = Dictionary['film'];

/** Animated brand intro played in the "Watch now" dialog when no video is configured. */
function BrandFilm({ film, locale }: { film: Film; locale: Locale }) {
  return (
    <div className="film" aria-hidden="true">
      <div className="film__glow" />
      <div className="film__scene film__scene--logo">
        <svg className="film__mark" viewBox={BOX.mark}>
          <path className="film__mono" d={MONOGRAM} fill="#fff" fillRule="evenodd" />
          <path className="film__circuit" d={CIRCUIT} fill="#0070FF" fillRule="evenodd" />
        </svg>
        {locale === 'ar' ? <LogoWordmarkAr className="film__word film__word--ar" /> : <LogoWordmark className="film__word" />}
      </div>
      {film.words.map((word, i) => (
        <p key={word} className="film__line" style={{ '--i': i } as React.CSSProperties}>
          {word}
        </p>
      ))}
      <div className="film__scene film__scene--final">
        <LogoLockup locale={locale} className="film__lockup" />
        <p className="film__final">{film.final}</p>
      </div>
    </div>
  );
}

function FilmDialog({ film, locale, closeLabel, onClose }: { film: Film; locale: Locale; closeLabel: string; onClose: () => void }) {
  const [run, setRun] = useState(0);
  const dialog = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeBtn.current?.focus();
    const root = document.documentElement;
    root.classList.add('is-locked');
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key !== 'Tab' || !dialog.current) return;
      const focusable = dialog.current.querySelectorAll<HTMLElement>('button, video');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      root.classList.remove('is-locked');
    };
  }, [onClose]);

  return createPortal(
    <div className="film-modal" role="dialog" aria-modal="true" aria-label={film.label} onClick={onClose}>
      <div className="film-modal__frame" ref={dialog} onClick={(e) => e.stopPropagation()}>
        {site.filmUrl ? (
          <video className="film-modal__video" src={site.filmUrl} controls autoPlay playsInline />
        ) : (
          <BrandFilm key={run} film={film} locale={locale} />
        )}
        <button ref={closeBtn} type="button" className="film-modal__close" onClick={onClose} aria-label={closeLabel}>
          <Icon name="close" size={20} />
        </button>
        {!site.filmUrl && (
          <button type="button" className="film-modal__replay" onClick={() => setRun((r) => r + 1)}>
            <Icon name="replay" size={14} />
            {film.replay}
          </button>
        )}
      </div>
    </div>,
    document.body,
  );
}

export function FilmButton({ label, closeLabel, film, locale }: { label: string; closeLabel: string; film: Film; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => {
    setOpen(false);
    trigger.current?.focus();
  }, []);

  return (
    <>
      <button ref={trigger} type="button" className="btn btn--light" aria-haspopup="dialog" onClick={() => setOpen(true)}>
        <Icon name="play" size={12} />
        {label}
      </button>
      {open && <FilmDialog film={film} locale={locale} closeLabel={closeLabel} onClose={close} />}
    </>
  );
}
