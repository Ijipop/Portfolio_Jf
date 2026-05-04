const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Évite l’avertissement « multiple lockfiles » quand un package-lock existe au-dessus de Portfolio/.
  turbopack: {
    root: path.join(__dirname),
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { protocol: 'https', hostname: '**', pathname: '/**' },
      { protocol: 'http', hostname: '**', pathname: '/**' },
    ],
  },

  // Compression
  compress: true,

  async redirects() {
    return [
      { source: '/logiciel/timelendar', destination: '/logiciel/timelendr', permanent: true },
      { source: '/api/timelendar/:path*', destination: '/api/timelendr/:path*', permanent: true },
      { source: '/pageweb', destination: '/portfolio/pageweb', permanent: true },
    ]
  },

  // Headers de sécurité et performance
  // Note : pas de `X-Content-Type-Options: nosniff` sur le catch-all — en dev (Turbopack), certains
  // chunks `.css` sous `/_next/static` peuvent recevoir `text/plain` ; avec nosniff le navigateur refuse
  // d’appliquer la feuille de style (MIME strict).
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ]
  },
}

module.exports = nextConfig