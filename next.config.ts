import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "", // Set to empty string for root path

  // Reduce JavaScript bundle size
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Optimize CSS
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
