import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  allowedDevOrigins: [
    'localhost:3000',
    'localhost:3001'

  ],
  experimental: {
    serverActions: {
      bodySizeLimit: '100MB',
      allowedOrigins: [
        'localhost:3000',
        'localhost:3001'

      ],
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cloud.appwrite.io",
      },
    ],
  },
};

export default nextConfig;