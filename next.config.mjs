/** @type {import('next').NextConfig} */

import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable : false ,
  cacheOnFrontEndNav : true,
  reloadOnOnline : true,
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["192.168.8.102"],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
    swcMinify: true,
    experimental: {
      appDir: true,
    },
};


export default  withPWA(nextConfig);
