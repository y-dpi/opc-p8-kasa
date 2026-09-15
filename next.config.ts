import type { NextConfig } from 'next';

// Base URL of the backend REST API, which also serves the images it stores.
const API_URL = (process.env.API_URL ?? 'http://localhost:3000').replace(/\/+$/, '');

const nextConfig: NextConfig = {
  htmlLimitedBots: /.*/,

  images: {
    // Hosts the API points its property and profile pictures at.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3-eu-west-1.amazonaws.com',
        pathname: '/course.oc-static.com/**',
      },
    ],
  },

  // The API returns its uploads as root-relative '/uploads/…' URLs, which would otherwise be
  // looked up on the frontend. Proxy them so they reach the API and stay same-origin for images.
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: `${API_URL}/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;
