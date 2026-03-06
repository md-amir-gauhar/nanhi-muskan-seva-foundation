import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return {
      beforeFiles: [
        // Admin subdomain routing
        {
          source: "/:path*",
          has: [
            {
              type: "host",
              value: "admin.localhost",
            },
          ],
          destination: "/admin/:path*",
        },
      ],
    };
  },
  async redirects() {
    return [
      // Block direct /admin access on main domain
      {
        source: "/admin/:path*",
        has: [
          {
            type: "host",
            value: "localhost:3000",
          },
        ],
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
