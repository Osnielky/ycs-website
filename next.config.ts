import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

import { googleWriteReviewUrl } from './src/data/reviews';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 80, 90],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
  compress: true,
  poweredByHeader: false,
  // The platform's http→https redirect is a temporary 302; HSTS tells browsers
  // (and signals to crawlers) that the site is https-only from then on.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "Strict-Transport-Security", value: "max-age=31536000" }],
      },
    ];
  },
  // Short address for staff to share: ycosmeticsurgery.com/review opens the
  // Google review form. Temporary (307) so the destination can change.
  async redirects() {
    return ["/review", "/es/review", "/resena", "/es/resena"].map((source) => ({
      source,
      destination: googleWriteReviewUrl,
      permanent: false,
    }));
  },
  // Tree-shake barrel imports so unused icons / helpers never reach the bundle.
  experimental: {
    optimizePackageImports: ["lucide-react", "next-intl"],
  },
};

export default withNextIntl(nextConfig);
