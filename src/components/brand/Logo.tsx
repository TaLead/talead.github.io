import type { Locale } from '@/lib/i18n';
import { BOX } from './paths';

type Props = { className?: string; title?: string };

/** Accessible name when `title` is given, otherwise decorative. */
const a11y = (title?: string) =>
  title ? ({ role: 'img', 'aria-label': title } as const) : ({ 'aria-hidden': true } as const);

/*
 * The shapes come from <LogoSprite />, rendered once in each root layout.
 * The symbols carry the artboard offsets, so each outer viewBox starts at 0 0.
 */
const box = (b: string) => `0 0 ${b.split(' ')[2]} ${b.split(' ')[3]}`;

/** The "T" monogram with its circuit. The bar takes `currentColor`, the circuit `--logo-accent`. */
export function LogoMark({ className, title }: Props) {
  return (
    <svg className={className} viewBox={box(BOX.mark)} {...a11y(title)}>
      <use href="#tl-mark" />
    </svg>
  );
}

export function LogoWordmark({ className, title }: Props) {
  return (
    <svg className={className} viewBox={box(BOX.wordmark)} {...a11y(title)}>
      <use href="#tl-word" />
    </svg>
  );
}

export function LogoWordmarkAr({ className, title }: Props) {
  return (
    <svg className={className} viewBox={box(BOX.wordmarkAr)} {...a11y(title)}>
      <use href="#tl-word-ar" />
    </svg>
  );
}

/** Horizontal lockup. In Arabic the mark sits on the right, next to تليد. */
export function LogoLockup({ locale, className = '' }: { locale: Locale; className?: string }) {
  return (
    <span className={`logo-lockup ${className}`}>
      <LogoMark className="logo-lockup__mark" />
      {locale === 'ar' ? (
        <LogoWordmarkAr className="logo-lockup__word logo-lockup__word--ar" />
      ) : (
        <LogoWordmark className="logo-lockup__word" />
      )}
    </span>
  );
}
