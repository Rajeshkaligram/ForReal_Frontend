import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow cross-origin access from network IP in development
  allowedDevOrigins: ["192.168.31.173"],

  // ── Proxy backend requests through /rent-api/* to avoid Next.js /api conflict ──
  // /api/* is reserved by Next.js for API routes — use a different prefix
  async rewrites() {
    return [
      {
        source: "/rent-api/:path*",
        // destination: "https://rentasuit.ca/api/v1.0/:path*",
        // destination: "http://localhost:8000/api/v1.0/:path*",
        destination: "https://rentasuit-backend.onrender.com/api/v1.0/:path*",
        // destination: "https://web-production-e30fd9.up.railway.app/api/v1.0/:path*",
      },
      {
        source: "/uploads/:path*",
        // destination: "http://localhost:8000/uploads/:path*",
        destination: "https://rentasuit-backend.onrender.com/uploads/:path*",
        // destination: "https://web-production-e30fd9.up.railway.app/uploads/:path*",
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rentasuit.ca",
      },
      {
        protocol: "https",
        hostname: "**.rentasuit.ca",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
};

export default nextConfig;
