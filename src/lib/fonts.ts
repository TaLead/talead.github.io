import { Chakra_Petch, Reem_Kufi } from 'next/font/google';

/** Brand headline typeface (Latin). */
export const chakra = Chakra_Petch({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-chakra',
  display: 'swap',
});

/** Brand Arabic typeface. */
export const reem = Reem_Kufi({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-reem',
  display: 'swap',
});
