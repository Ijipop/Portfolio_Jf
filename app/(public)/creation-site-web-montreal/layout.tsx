import type { Metadata } from 'next'
import CreationSiteWebMontrealJsonLd from '@/components/seo/CreationSiteWebMontrealJsonLd'
import { SEO_LANDING_PATH } from '@/content/creation-site-web-montreal.fr'

export const metadata: Metadata = {
  title: {
    absolute: 'Création de sites web à Montréal et partout au Québec',
  },
  description:
    'Création et refonte de sites web à Montréal et au Québec — PME et professionnels. Sites clairs, crédibles, orientés demandes clients. Audit dès 299 $, site dès 1 200 $.',
  alternates: { canonical: SEO_LANDING_PATH },
  openGraph: {
    title: 'Création de sites web à Montréal et au Québec | Ijipop',
    description:
      'Sites clairs et crédibles pour PME du Québec — Montréal et mandats partout au Québec. Prêts à recevoir des demandes sérieuses.',
    url: SEO_LANDING_PATH,
    locale: 'fr_CA',
    siteName: 'Jean-François Lefebvre — Ijipop',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Création de sites web à Montréal et au Québec — Ijipop',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Création de sites web à Montréal et au Québec | Ijipop',
    description:
      'Sites clairs et crédibles pour PME du Québec — Montréal et mandats partout au Québec. Prêts à recevoir des demandes sérieuses.',
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
      <CreationSiteWebMontrealJsonLd />
      {children}
    </>
  )
}
