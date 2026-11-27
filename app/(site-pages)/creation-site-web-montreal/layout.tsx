import type { Metadata } from 'next'
import { WEB_LANDING_PATH } from '@/lib/public-v2/webEditorialContent'
import CreationSiteWebMontrealJsonLd from '@/components/seo/CreationSiteWebMontrealJsonLd'

export const metadata: Metadata = {
  title: {
    absolute: 'Création de sites web à Montréal',
  },
  description:
    'Sites web modernes, rapides et faciles à utiliser. Création ou refonte — Montréal et partout au Québec.',
  alternates: { canonical: WEB_LANDING_PATH },
  openGraph: {
    title: 'Création de sites web à Montréal | IJIPOP',
    description:
      'Je crée des sites web modernes, rapides et faciles à utiliser. Création ou refonte, comme du monde.',
    url: WEB_LANDING_PATH,
    locale: 'fr_CA',
    siteName: 'Jean-François Lefebvre - Ijipop',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Création de sites web à Montréal - IJIPOP',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Création de sites web à Montréal | IJIPOP',
    description: 'Sites modernes, rapides et faciles à utiliser — création ou refonte.',
    images: ['/og-default.png'],
  },
}

export default function CreationSiteWebMontrealLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Boot PLAN : script head dans app/layout.tsx (WEB_BUILD_BOOT_SCRIPT) */}
      <CreationSiteWebMontrealJsonLd />
      {children}
    </>
  )
}
