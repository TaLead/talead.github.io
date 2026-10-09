export const pillarSlugs = ['artificial-intelligence', 'cybersecurity', 'information-technology'] as const;
export type PillarSlug = (typeof pillarSlugs)[number];

export const sectorSlugs = ['government', 'private-sector'] as const;
export type SectorSlug = (typeof sectorSlugs)[number];

export type ArtName =
  | 'keys'
  | 'glassT'
  | 'neural'
  | 'shield'
  | 'grid'
  | 'circuit'
  | 'waves'
  | 'government'
  | 'datacenter'
  | 'city'
  | 'control'
  | 'network'
  | 'enterprise'
  | 'mosaic'
  | 'team';

export type FocusIcon = 'ai' | 'shield' | 'cloud' | 'layers';

export type Tone = 'blue' | 'sky' | 'red' | 'amber' | 'green' | 'gray';

export interface Meta {
  title: string;
  description: string;
}

export interface MenuItem {
  title: string;
  desc: string;
  href: string;
}

export interface MenuFeatured {
  eyebrow: string;
  title: string;
  href: string;
}

export interface MenuColumn {
  title: string;
  href: string;
  items: MenuItem[];
}

/** Content of a product screen illustration. Every block is optional. */
export interface MockupSpec {
  title: string;
  subtitle: string;
  tabs?: string[];
  kpis?: { label: string; value: string; tone?: Tone }[];
  chart?: { kind: 'bars' | 'line'; label: string };
  donut?: { value: number; label: string; items: { name: string; value: number }[] };
  chat?: { user: string; agent: string; sources: string[]; input: string };
  camera?: { labels: string[]; caption: string };
  flow?: { hub: string; nodes: string[] };
  rows?: { title: string; meta: string; pill: string; tone: Tone }[];
}

export interface Pillar {
  meta: Meta;
  hero: { label: string; title: string; primary: string; secondary: string; art: ArtName };
  tiles: { id: string; tag: string; title: string; text: string; mockup: MockupSpec }[];
  capabilities: {
    eyebrow: string;
    titleA: string;
    titleB: string;
    quote: string;
    items: { cat: string; text: string }[];
  };
  proof: {
    eyebrow: string;
    titleA: string;
    titleB: string;
    subtitle: string;
    stats: { tag: string; value: string; label: string }[];
  };
  comparison: {
    left: { title: string; items: string[] };
    right: { title: string; items: string[] };
  };
  faq: { title: string; items: { q: string; a: string }[] };
  cta: { titleA: string; titleB: string; text: string; button: string };
}

export interface Sector {
  meta: Meta;
  hero: { eyebrow: string; title: string; text: string; art: ArtName };
  challenges: { eyebrow: string; title: string; text: string; cards: { title: string; text: string }[] };
  solutions: { eyebrow: string; title: string; cards: { title: string; text: string; art: ArtName }[] };
  impact: { eyebrow: string; title: string; text: string; art: ArtName; chips: string[] };
  cta: { title: string; text: string; button: string };
}

export interface Article {
  slug: string;
  tag: string;
  readTime: number;
  title: string;
  excerpt: string;
  art: ArtName;
  /** Short word shown in the card lockup, e.g. "TALEAD · AI". */
  topic: string;
  /** Paragraphs. A paragraph starting with "## " renders as a sub-heading. */
  body: string[];
}

export interface Product {
  name: string;
  tag: string;
  text: string;
  art: ArtName;
  href: string;
}
