import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Fully static site: `next build` writes plain HTML/CSS/JS to ./out
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  experimental: {
    // One bilingual 404 page for URLs that match no route
    globalNotFound: true,
  },
};

export default nextConfig;
