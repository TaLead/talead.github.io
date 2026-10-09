import { BOX, CIRCUIT, MONOGRAM, WORDMARK, WORDMARK_AR } from './paths';

/**
 * Logo shapes defined once per page; every logo instance references them with <use>.
 * The bar and wordmarks take `currentColor`, the circuit takes `--logo-accent`.
 */
export function LogoSprite() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: 'absolute', overflow: 'hidden' }}>
      <symbol id="tl-mark" viewBox={BOX.mark}>
        <path d={MONOGRAM} fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
        <path d={CIRCUIT} style={{ fill: 'var(--logo-accent, #0070FF)' }} fillRule="evenodd" clipRule="evenodd" />
      </symbol>
      <symbol id="tl-word" viewBox={BOX.wordmark}>
        <path d={WORDMARK} fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
      </symbol>
      <symbol id="tl-word-ar" viewBox={BOX.wordmarkAr}>
        <path d={WORDMARK_AR} fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
      </symbol>
    </svg>
  );
}
