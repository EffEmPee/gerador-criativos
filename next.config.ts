import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config, { isServer }) {
    if (isServer) {
      config.externals.push('@napi-rs/image');
    }
    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ['@napi-rs/image'],
  },
};

export default nextConfig;
