import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    'localhost:3000',
    'td7j8s89-3000.inc1.devtunnels.ms'
  ],
  experimental: {
    serverActions: {
      bodySizeLimit: '100MB',
      allowedOrigins: [
        'localhost:3000',
        'td7j8s89-3000.inc1.devtunnels.ms'
      ],
    },
  },
};

export default nextConfig;