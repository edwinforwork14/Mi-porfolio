import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // Transpile Three.js modules for server-side rendering compatibility
  transpilePackages: ["three"],
};

export default nextConfig;
