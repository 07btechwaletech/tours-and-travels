import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Tailwind output is small, so inlining it removes the render-blocking CSS request.
  experimental: {
    inlineCss: true,
  },
};

export default nextConfig;
