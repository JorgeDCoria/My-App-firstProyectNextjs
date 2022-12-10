/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // domains: ["www.reuters.com"],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "techcrunch.com",
      },
    ],
  },
};

module.exports = nextConfig;
