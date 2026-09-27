/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { formats: ["image/avif", "image/webp"] },
  webpack: (config) => {
    // Avoid bundling native three.js WASM issues on the server.
    config.externals = config.externals || [];
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      type: "asset/resource",
    });
    return config;
  },
};

module.exports = nextConfig;
