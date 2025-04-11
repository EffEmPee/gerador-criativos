/* eslint-disable @typescript-eslint/no-explicit-any */
// next.config.js
const nextConfig = {
  webpack: (config:any) => {
    config.module.rules.push(
      {
        test: /\.node$/,
        use: [
          {
            loader: 'nextjs-node-loader',
          },
        ],
      },
    );

    return config;
  },
  serverExternalPackages: ["@resvg/resvg-js"],
};

module.exports = nextConfig;
