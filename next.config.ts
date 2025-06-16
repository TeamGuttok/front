import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    BASE_URL: process.env.BASE_URL,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
  webpack: (config: any) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '#app': path.resolve(__dirname, 'src/app'),
      '#apis': path.resolve(__dirname, 'src/apis'),
      '#components': path.resolve(__dirname, 'src/components'),
      '#hooks': path.resolve(__dirname, 'src/hooks'),
      '#constants': path.resolve(__dirname, 'src/constants'),
      '#context': path.resolve(__dirname, 'src/context'),
      '#utils': path.resolve(__dirname, 'src/utils'),
      '#store': path.resolve(__dirname, 'src/store'),
      '#types': path.resolve(__dirname, 'src/types'),
      '#schema': path.resolve(__dirname, 'src/schema'),
      '#style': path.relative(__dirname, 'src/style'),
      '#contexts': path.relative(__dirname, 'src/contests'),
    }
    return config
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:8080/api/:path*',
        },
      ]
    }
    if (process.env.API_BASE_URL) {
      return [
        {
          source: '/api/:path*',
          destination: `${process.env.API_BASE_URL}/api/:path*`,
        },
      ]
    }

    return []
  },
}

export default nextConfig
