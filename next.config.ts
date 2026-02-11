import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'www.rohsguide.com',
      },
      {
        protocol: 'https',
        hostname: 'www.fillezy.com',
      },
      {
        protocol: 'https',
        hostname: 'rohsguide.com',
      },
    ],
  },
};


export default nextConfig;
