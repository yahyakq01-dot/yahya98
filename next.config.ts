import type { NextConfig } from "next";

// A pragmatic Content-Security-Policy tuned to what this site actually loads:
// Next.js (inline bootstrap script + Framer Motion inline styles), Supabase
// (data + realtime), next/image, and the remote image hosts. 'unsafe-inline'
// is required for Next's inline scripts/styles without a nonce pipeline.
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "img-src 'self' data: blob: https://*.supabase.co https://app.powerbi.com https://img.youtube.com https://fiverr-res.cloudinary.com https://yahya-kq.odoo.com",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline'",
  "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
  "frame-src 'self' https://app.powerbi.com https://www.youtube.com https://www.youtube-nocookie.com",
].join("; ");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "yahya-kq.odoo.com" },
      { protocol: "https", hostname: "app.powerbi.com" },
      { protocol: "https", hostname: "fiverr-res.cloudinary.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      // Supabase Storage public URLs (uploaded profile photo, images, etc.)
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: contentSecurityPolicy,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
