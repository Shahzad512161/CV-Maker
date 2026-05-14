import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 1. Enable SVG support
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",

    // 2. Use remotePatterns instead of domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        pathname: '/**',
      },
    ],
  },
  /* config options here */
  reactCompiler: true,
};

export default nextConfig;
