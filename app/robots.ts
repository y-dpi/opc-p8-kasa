import type { MetadataRoute } from 'next';

import { siteUrl } from '../utils/site';

// Private paths that robots should ignore.
const PRIVATE_PATHS = ['/favorites', '/messages', '/properties/new'];

// Robots file of the site, pointing crawlers at the sitemap and away from the signed-in pages.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: PRIVATE_PATHS,
    },
    sitemap: siteUrl('/sitemap.xml'),
    host: siteUrl('/'),
  };
}
