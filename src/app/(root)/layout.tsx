import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TALEAD | تليد',
  robots: { index: false, follow: true },
};

// Sends visitors to their language: the one they picked before, else the browser language.
const redirect = `(function(){var l='en';try{l=localStorage.getItem('talead-lang')||((navigator.language||'').toLowerCase().indexOf('ar')===0?'ar':'en')}catch(e){}location.replace('/'+(l==='ar'?'ar':'en')+'/')})()`;

export default function RootRedirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: redirect }} />
        <noscript>
          <meta httpEquiv="refresh" content="0; url=/en/" />
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
