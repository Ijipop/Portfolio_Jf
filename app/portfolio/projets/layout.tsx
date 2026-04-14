import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projets',
  description:
    'Réalisations web sites vitrine et refonte, petits outils et mandats pour PME. Filtrez par technologie — Montréal et projets à distance.',
  openGraph: {
    title: 'Projets | Jean-François Lefebvre',
    description:
      'Portfolio développeur web : sites web, refonte et logiciels pour indépendants et petites entreprises.',
    url: '/portfolio/projets',
  },
}

export default function ProjetsLayout({ children }: { children: React.ReactNode }) {
  return children
}
