/**
 * Web configuration for Gestar com Trombofilia PWA
 * Otimizações para distribuição web
 */

module.exports = {
  // PWA Configuration
  pwa: {
    enabled: true,
    manifest: '/manifest.json',
    serviceWorker: '/sw.js',
  },

  // Web optimization
  optimization: {
    // Enable gzip compression
    compress: true,
    // Minimize bundle size
    minimize: true,
    // Split chunks for better caching
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10,
        },
        common: {
          minChunks: 2,
          priority: 5,
          reuseExistingChunk: true,
        },
      },
    },
  },

  // Performance hints
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
    hints: 'warning',
  },

  // Asset handling
  assets: {
    // Inline small assets
    inlineLimit: 8192,
    // Optimize images
    imageOptimization: true,
    // Generate WebP variants
    webp: true,
  },

  // Security headers (for deployment)
  headers: {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
  },

  // CORS configuration
  cors: {
    origin: ['https://gestar-trombofilia.com', 'http://localhost:3000'],
    credentials: true,
  },

  // Cache control
  cacheControl: {
    // Static assets: 1 year
    static: 'public, max-age=31536000, immutable',
    // HTML: no cache
    html: 'public, max-age=0, must-revalidate',
    // API: no cache
    api: 'no-cache, no-store, must-revalidate',
  },
};
