import type { Metadata } from 'next'
import HomeGatewayClient from '@/components/home/HomeGatewayClient'

/** Titre absolu : ignore le template du layout racine. */
export const metadata: Metadata = {
  title: {
    absolute:
      'Ijipop Solutions — sites web, soutien tech & logiciels · Montréal',
  },
  description:
    'Ijipop Solutions : sites web, soutien informatique et logiciels sur mesure à Montréal. PME et indépendants au Québec.',
  openGraph: {
    title: 'Ijipop Solutions — sites web, soutien tech & logiciels · Montréal',
    description:
      'Sites web, soutien technique et logiciels pour PME — Montréal et mandats à distance.',
    url: '/',
    locale: 'fr_CA',
    siteName: 'Jean-François Lefebvre — Ijipop',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Ijipop Solutions — sites web et soutien technique',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ijipop Solutions — sites web, soutien tech & logiciels · Montréal',
    description:
      'Sites web, soutien technique et logiciels — choisissez comment Ijipop peut vous aider.',
    images: ['/og-default.png'],
  },
}

export default function HomePage() {
  return <HomeGatewayClient />
}
