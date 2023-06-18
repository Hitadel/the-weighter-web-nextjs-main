/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, module: false };

    return config;
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
      {
        source: "/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_IP}/:path*`,
      },
      {
        source: "/:path*",
        destination: `${process.env.NEXT_PUBLIC_PRODUCT_URL}/:path*`,
      },
      {
        source: "/:path*",
        destination: `${process.env.NEXT_PUBLIC_OPENAPI_URL}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
