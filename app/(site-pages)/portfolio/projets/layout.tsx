import type { Metadata } from 'next'

/** Métadonnées reportées depuis l’ancien `app/(public)/portfolio/projets/layout.tsx`. */
export const metadata: Metadata = {
  title: 'Projets',
  description:
    'Réalisations : sites vitrine, refonte web et petits logiciels pour PME et indépendants. Filtrez par technologie — Grand Montréal et mandats à distance.',
  alternates: {
    canonical: '/portfolio/projets',
  },
  openGraph: {
    title: 'Projets | Jean-François Lefebvre',
    description:
      'Portfolio développeur web : création de sites, refonte et applications légères pour petites entreprises et travailleurs autonomes.',
    url: '/portfolio/projets',
  },
}

export default function ProjetsV2Layout({ children }: { children: React.ReactNode }) {
  return children
}
