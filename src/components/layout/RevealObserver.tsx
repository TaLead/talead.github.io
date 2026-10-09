'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Adds `.is-in` to every `[data-reveal]` element as it scrolls into view, and
 * pauses the CSS animations of `[data-motion]` elements while they are off-screen.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in)'));
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
    );
    items.forEach((el) => io.observe(el));

    const motion = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) entry.target.setAttribute('data-motion', entry.isIntersecting ? 'on' : 'off');
      },
      { rootMargin: '120px 0px' },
    );
    document.querySelectorAll('[data-motion]').forEach((el) => motion.observe(el));

    return () => {
      io.disconnect();
      motion.disconnect();
    };
  }, [pathname]);

  return null;
}
