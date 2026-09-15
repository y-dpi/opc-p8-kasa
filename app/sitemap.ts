import type { MetadataRoute } from 'next';

import { listProperties } from '../actions/properties';
import { siteUrl } from '../utils/site';

// Public paths that robots should crawl.
const STATIC_PAGES: { path: string, changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'], priority: number }[] = [
  { path: '/', changeFrequency: 'daily', priority: 1 },
  { path: '/about', changeFrequency: 'yearly', priority: 0.5 },
  { path: '/login', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/register', changeFrequency: 'yearly', priority: 0.3 },
];

// Sitemap of the site.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticPages = STATIC_PAGES.map((page) => ({
    url: siteUrl(page.path),
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  // An unreachable API masks listings, not the page template.
  const { properties } = await listProperties();
  const propertyPages = properties.map((property) => ({
    url: siteUrl(`/properties/${property.id}`),
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
    images: property.cover ? [property.cover] : undefined,
  }));

  return [...staticPages, ...propertyPages];
}
