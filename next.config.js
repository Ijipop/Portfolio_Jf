const path = require('path')

/**
 * Réduit le traçage des fichiers serverless (limite Vercel : 250 Mo décompressés par fonction).
 * Sur la build Linux, npm n’installe qu’un sous-ensemble de sharp ; en cas de traçage trop large,
 * on exclut explicitement les variantes non pertinentes pour Vercel (glibc x64).
 * @see https://vercel.com/guides/troubleshooting-function-250mb-limit
 */
const outputFileTracingExcludesSharp = [
  'node_modules/@img/sharp-darwin-arm64/**/*',
  'node_modules/@img/sharp-darwin-x64/**/*',
  'node_modules/@img/sharp-libvips-darwin-arm64/**/*',
  'node_modules/@img/sharp-libvips-darwin-x64/**/*',
  'node_modules/@img/sharp-linux-arm/**/*',
  'node_modules/@img/sharp-linux-arm64/**/*',
  'node_modules/@img/sharp-linux-ppc64/**/*',
  'node_modules/@img/sharp-linux-riscv64/**/*',
  'node_modules/@img/sharp-linux-s390x/**/*',
  'node_modules/@img/sharp-linuxmusl-arm64/**/*',
  'node_modules/@img/sharp-linuxmusl-x64/**/*',
  'node_modules/@img/sharp-libvips-linux-arm/**/*',
  'node_modules/@img/sharp-libvips-linux-arm64/**/*',
  'node_modules/@img/sharp-libvips-linux-ppc64/**/*',
  'node_modules/@img/sharp-libvips-linux-riscv64/**/*',
  'node_modules/@img/sharp-libvips-linux-s390x/**/*',
  'node_modules/@img/sharp-libvips-linuxmusl-arm64/**/*',
  'node_modules/@img/sharp-libvips-linuxmusl-x64/**/*',
  'node_modules/@img/sharp-wasm32/**/*',
  'node_modules/@img/sharp-win32-arm64/**/*',
  'node_modules/@img/sharp-win32-ia32/**/*',
  'node_modules/@img/sharp-win32-x64/**/*',
]

/** Évite d’embarquer des outils dev / E2E dans le traçage serverless si npm les a présents localement. */
const outputFileTracingExcludesTooling = [
  'node_modules/@playwright/test/**/*',
  'node_modules/playwright/**/*',
  'node_modules/playwright-core/**/*',
  'node_modules/vitest/**/*',
  'node_modules/@vitest/**/*',
  'node_modules/jsdom/**/*',
  'node_modules/typescript/**/*',
]

/**
 * Le traçage suit `path.join(process.cwd(), 'public', …)` utilisé dans /api/upload : sans exclusion,
 * tout `public/` (centaines de Mo en assets) peut être copié dans chaque fonction — dépassement 250 Mo Vercel.
 */
const outputFileTracingExcludesPublic = ['public/**/*']

const outputFileTracingExcludesServer = [
  ...outputFileTracingExcludesSharp,
  ...outputFileTracingExcludesTooling,
  ...outputFileTracingExcludesPublic,
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Dev : ouverture du site via l’IP LAN (ex. http://192.168.x.x:3000) sans cette liste,
   * Next bloque les WebSockets `/_next/webpack-hmr` (sécurité cross-origin) → hot reload cassé.
   * Motifs type image remote : segments séparés par des points.
   * @see https://nextjs.org/docs/app/api-reference/config/next-config-js/allowedDevOrigins
   */
  allowedDevOrigins: ['192.168.*.*', '10.*.*.*'],

  serverExternalPackages: ['@prisma/client', 'prisma', 'sharp', 'bcryptjs', 'openai'],
  outputFileTracingExcludes: {
    // Picomatch « contains » : couvre les routes App Router normalisées (/, /api/…, etc.)
    '**': outputFileTracingExcludesServer,
    '/': outputFileTracingExcludesServer,
  },

  // Évite l’avertissement « multiple lockfiles » quand un package-lock existe au-dessus de Portfolio/.
  turbopack: {
    root: path.join(__dirname),
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
    // Moins de code MUI / icônes importé par barrel (serveur + client).
    optimizePackageImports: ['@mui/material', '@mui/icons-material', '@mui/material-nextjs', 'lucide-react'],
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
      {
        source: '/logiciel/timelendar/merci',
        destination: '/logiciel/timelendr/merci',
        permanent: true,
      },
      { source: '/api/timelendar/:path*', destination: '/api/timelendr/:path*', permanent: true },
      { source: '/pageweb', destination: '/creation-site-web-montreal', permanent: true },
      {
        source: '/portfolio/pageweb',
        destination: '/creation-site-web-montreal',
        permanent: true,
      },
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