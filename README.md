# TALEAD website · موقع تليد

Bilingual (English / Arabic) corporate website for TALEAD, modelled on the structure and interactions of humain.com and styled with the TALEAD brand identity (logo, Primary Blue `#2563EB`, Ink `#0B0D10`, Slate Gray `#A7ADB5`, White, plus the logo's circuit blue `#0070FF`; Chakra Petch and Reem Kufi).

## تشغيل سريع

```bash
npm install
npm run dev        # http://localhost:3210/en/  و  http://localhost:3210/ar/
npm run build      # يُنتج موقعاً ثابتاً في مجلد out/
npm run preview    # معاينة نسخة out/ على http://localhost:4321
```

لتعديل النصوص: `src/content/en.ts` (الإنجليزية) و `src/content/ar.ts` (العربية).
لتعديل البريد والهاتف وروابط التواصل: `src/config/site.ts`.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload at http://localhost:3210 |
| `npm run build` | Static export to `out/` (plain HTML/CSS/JS) |
| `npm run preview` | Serves `out/` at http://localhost:4321 (set `PORT` to change) |
| `npm run typecheck` | TypeScript check |

## Pages

Every page exists in both languages: `/en/...` and `/ar/...` (Arabic is fully right-to-left). The root `/` sends visitors to the language they chose before, otherwise to their browser language.

| Page | Path | Modelled on |
| --- | --- | --- |
| Home | `/` | humain.com home: video-style hero, insights carousel, scroll-tinted statement, areas of focus |
| Solutions overview | `/solutions` | Products › Portfolio overview |
| AI · Cybersecurity · IT | `/solutions/artificial-intelligence`, `/solutions/cybersecurity`, `/solutions/information-technology` | humain.com/eye (suite tiles with product screens, capabilities, commitments, comparison, FAQ) |
| Government · Private sector | `/sectors/government`, `/sectors/private-sector` | humain.com/government |
| Products | `/products` | Marketplace |
| About · Careers · Contact | `/about`, `/careers`, `/contact` | Company menu |
| Media + articles | `/media`, `/media/<slug>` | humain.com/media-press |
| Privacy · Terms | `/privacy`, `/terms` | Footer links |

## Where things live

```
src/content/en.ts, ar.ts    All copy: menus, pages, product screens, articles (same shape in both files)
src/config/site.ts          Email, phone, social links, contact-form endpoint, optional hero video
src/components/brand/       Logo paths extracted from the Figma brand file + logo components
src/components/art/         Generated vector illustrations (no stock photos)
src/components/home/        Hero (CSS 3D glass panels), brand film, carousel, sections
src/components/pillar/      Solution-page sections and product screen mockups
src/styles/                 Design tokens and styles (logical CSS properties, so RTL just works)
public/brand/               Logo SVGs and the social sharing image
```

To add an article, append an object to `media.articles` in **both** content files (same `slug`). It appears on the Media page, in the home carousel (first five) and gets its own page.

## Before going live

- **Review all copy.** Product names (TALEAD Shield, Comply, Mind, Vision, Insight, Connect), the solution portfolio, commitments such as "24/7" and "In-Kingdom", the frameworks strip (Vision 2030, NCA ECC, SAMA CSF, PDPL, DGA, ISO 27001, NIST CSF) and the six articles are placeholder content written for this build. Keep only what TALEAD actually offers and can stand behind.
- **Legal pages** contain template text: replace with legally reviewed versions.
- **Contact form:** with `contactEndpoint` empty, submitting opens the visitor's email app addressed to `info@taleadtech.com`. Set `contactEndpoint` in `src/config/site.ts` to any service that accepts a JSON POST (your API, Formspree, etc.) to receive submissions directly.
- **Social links** are `#` placeholders in `src/config/site.ts`; set the real URLs or empty them to hide the icons. Add a phone number there to show it on the contact page.
- **Hero video:** "Watch now" plays an animated brand film. To show a real video instead, put the MP4 in `public/` and set `filmUrl` (for example `/brand/film.mp4`).
- **Domain:** `url` in `src/config/site.ts` is used for canonical links and the sitemap.

## Deploying

`npm run build` produces a static site in `out/`. Upload it to any static host (Vercel, Netlify, Cloudflare Pages, S3 + CloudFront, Nginx). The export uses trailing slashes (`/en/about/index.html`), so no rewrites are needed; configure the host to serve `404.html` for unknown paths.

### GitHub Pages (set up in this repo)

`.github/workflows/deploy.yml` builds the site and publishes it on every push to `main`.

1. **Enable Pages:** repository **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. **Verify the domain** (prevents domain takeover): account **Settings → Pages → Add a domain**, then add the TXT record GitHub shows to your DNS.
3. **Add the custom domain:** repository **Settings → Pages → Custom domain** → `www.taleadtech.com` → Save. No `CNAME` file is needed with Actions deployments.
4. **DNS records** at your domain registrar:

   | Type | Name | Value |
   | --- | --- | --- |
   | CNAME | `www` | `talead.github.io` |
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | AAAA (optional) | `@` | `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153` |

5. When the DNS check passes (up to 24 hours), tick **Enforce HTTPS**.

If the domain changes, also update `url` in `src/config/site.ts`.
