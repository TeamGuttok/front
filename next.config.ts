import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
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
}

export default nextConfig
