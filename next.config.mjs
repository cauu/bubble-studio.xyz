import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 字体优化
  optimizeFonts: true,

  // 静态文件优化
  compress: true,

  // ESLint 配置 - 忽略 build 时的 warning
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ['src']
  },

  // 实验性功能
  experimental: {
    optimizePackageImports: ['lucide-react']
  },

  // 图片优化
  images: {
    formats: ['image/webp', 'image/avif']
  },

  // 资源优化
  webpack: (config, { dev, isServer }) => {
    // 生产环境下的字体优化
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          fonts: {
            name: 'fonts',
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            chunks: 'all',
            priority: 10
          }
        }
      };
    }

    return config;
  }
};

export default withNextIntl(nextConfig);
