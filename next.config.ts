import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // 启用独立输出模式
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
  },
  images: {
    domains: ['image.xukucha.cn'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'image.xukucha.cn'
      },
    ],
  }
};

export default nextConfig;
