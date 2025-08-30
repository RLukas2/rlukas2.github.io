import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,

  // Image optimization
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },

  // Performance optimizations
  compiler: {
    // Remove console logs in production
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"],
          }
        : false,
  },

  // Experimental features for performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  // Security headers
  // async headers() {
  //   return [
  //     {
  //       source: "/(.*)",
  //       headers: [
  //         {
  //           key: "X-Frame-Options",
  //           value: "DENY",
  //         },
  //         {
  //           key: "X-Content-Type-Options",
  //           value: "nosniff",
  //         },
  //         {
  //           key: "Referrer-Policy",
  //           value: "strict-origin-when-cross-origin",
  //         },
  //       ],
  //     },
  //   ];
  // },

  // TurboPack configuration
  turbopack: {
    // Configure module resolution aliases
    resolveAlias: {
      // Add any aliases you need here
      "@": "./src",
    },

    // Configure file extensions to resolve
    resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"],

    // Configure loaders for special file types
    rules: {
      // Example: SVG as React components
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
      // Add other custom loaders here if needed
    },
  },

  // Power pack for GitHub Pages
  assetPrefix: process.env.NODE_ENV === "production" ? "" : "",
  basePath: "",
};

export default nextConfig;
