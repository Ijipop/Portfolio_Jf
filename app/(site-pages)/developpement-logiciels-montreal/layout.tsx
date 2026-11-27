import type { Metadata } from 'next'
import { SOFTWARE_LANDING_PATH } from '@/lib/public-v2/softwareEditorialContent'
import DeveloppementLogicielsMontrealJsonLd from '@/components/seo/DeveloppementLogicielsMontrealJsonLd'

export const metadata: Metadata = {
  title: {
    absolute: 'Développement de logiciels à Montréal',
  },
  description:
    'Applications sur mesure, automatisation et outils de travail. Développement logiciel à Montréal et partout au Québec.',
  alternates: { canonical: SOFTWARE_LANDING_PATH },
  openGraph: {
    title: 'Développement de logiciels à Montréal | IJIPOP',
    description:
      'Des logiciels qui vous simplifient la vie — applications sur mesure, automatisation, outils de travail.',
    url: SOFTWARE_LANDING_PATH,
    locale: 'fr_CA',
    siteName: 'Jean-François Lefebvre - Ijipop',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Développement de logiciels à Montréal - IJIPOP',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Développement de logiciels à Montréal | IJIPOP',
    description: 'Applications sur mesure, automatisation et outils de travail.',
    images: ['/og-default.png'],
  },
}

export default function DeveloppementLogicielsMontrealLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <DeveloppementLogicielsMontrealJsonLd />
      {children}
    </>
  )
}
