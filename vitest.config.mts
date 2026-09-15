import react from '@vitejs/plugin-react';
import { basename } from 'node:path';
import { defineConfig, type Plugin } from 'vitest/config';

// Extensions NextJS hands back as a static image object rather than a plain URL.
const STATIC_IMAGE = /\.(png|jpe?g|gif|svg|webp|avif)$/;

/**
 * Stand in for the image loader of NextJS.
 *
 * Importing a picture from a component gives back a 'StaticImageData' object under NextJS, where
 * Vite would hand back the URL as a string. Components read '.src' off that object, so without
 * this the icons and the pictures would resolve to undefined once under test.
 * @returns The plugin, to sit ahead of the React one.
 */
function staticImages(): Plugin {
  return {
    name: 'next-static-images',
    enforce: 'pre',
    load(id) {
      const path = id.split('?')[0];
      if (!path || !STATIC_IMAGE.test(path)) return null;

      const src = `/_next/static/media/${basename(path)}`;
      return `export default ${JSON.stringify({ src, width: 100, height: 100, blurDataURL: src })};`;
    },
  };
}

/**
 * Stand in for the 'server-only' marker package.
 *
 * NextJS resolves that import itself, to a module that throws the moment a client bundle pulls it
 * in. Nothing resolves it outside a NextJS build, so the API layer and the actions that guard
 * themselves with it would fail to import at all under test. An empty module keeps them loadable.
 * @returns The plugin, resolving the marker to nothing.
 */
function serverOnly(): Plugin {
  const MARKER = 'server-only';
  return {
    name: 'next-server-only',
    enforce: 'pre',
    resolveId: (id) => (id === MARKER ? `\0${MARKER}` : null),
    load: (id) => (id === `\0${MARKER}` ? 'export {};' : null),
  };
}

export default defineConfig({
  plugins: [staticImages(), serverOnly(), react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    env: { API_MOCK: 'true' },

    include: ['**/*.test.{ts,tsx}'],
    exclude: ['node_modules/**', '.next/**'],

    coverage: {
      provider: 'v8',
      include: ['actions/**', 'app/**', 'components/**', 'middleware/**', 'models/**', 'utils/**'],
      exclude: ['**/*.d.ts'],
    },
  },
});
