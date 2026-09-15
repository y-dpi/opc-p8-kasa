// Public address the next app is served from.
export const SITE_URL = (process.env.SITE_URL ?? 'http://localhost:3001').replace(/\/+$/, '');

/**
 * Build the full, absolute URL of a page from its path.
 * @param path Root-relative path of the page, leading slash included.
 * @returns The same page, addressed from outside the site.
 */
export function siteUrl(path: string): string {
  return `${SITE_URL}${path === '/' ? '' : path}`;
}
