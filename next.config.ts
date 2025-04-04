import type { NextConfig } from 'next'
import path from 'path';

const nextConfig: NextConfig = {
  webpack: (config: any) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '#apis': path.resolve(__dirname, 'src/apis'),
      '#components': path.resolve(__dirname, 'src/components'),
      '#hooks': path.resolve(__dirname, 'src/hooks'),
      '#constants': path.resolve(__dirname, 'src/constants'),
      '#context': path.resolve(__dirname, 'src/context'),
      '#utils': path.resolve(__dirname, 'src/utils'),
      '#store': path.resolve(__dirname, 'src/store'),
      '#types': path.resolve(__dirname, 'src/types'),
    };
    return config;
  },
}

export default nextConfig