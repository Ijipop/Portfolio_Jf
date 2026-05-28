import type { Metadata } from 'next'
import CreationSiteWebMontrealJsonLd from '@/components/seo/CreationSiteWebMontrealJsonLd'
import { SEO_LANDING_PATH } from '@/content/creation-site-web-montreal.fr'

export const metadata: Metadata = {
  title: {
    absolute: 'Création de sites web à Montréal et partout au Québec',
  },
  description:
    'Basé à Montréal, ijipop crée des sites vitrines, refontes et portfolios pour travailleurs autonomes et PME partout au Québec. Responsive, SEO de base, maintenance.',
  alternates: { canonical: SEO_LANDING_PATH },
  openGraph: {
    title: 'Création de sites web à Montréal et au Québec | Ijipop',
    description:
      'Sites vitrines, refontes et portfolios pour PME et travailleurs autonomes — Montréal et mandats partout au Québec.',
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
      'Sites vitrines, refontes et portfolios pour PME et travailleurs autonomes — Montréal et Québec.',
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
