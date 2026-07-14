import type { NextConfig } from "next";

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
};

export default nextConfig;
