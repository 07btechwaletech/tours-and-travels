import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    imageSizes: [32, 64, 96, 128, 256, 384, 480, 560],
  },
  // Tailwind output is small, so inlining it removes the render-blocking CSS request.
  experimental: {
    inlineCss: true,
  },
};

export default nextConfig;
