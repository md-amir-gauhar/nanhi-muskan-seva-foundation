import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
