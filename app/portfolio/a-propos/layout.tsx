import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'À propos',
  description:
    'Parcours, compétences techniques et humaines : qui je suis et comment je peux vous accompagner sur un site web ou un outil sur mesure.',
  openGraph: {
    title: 'À propos | Jean-François Lefebvre',
    description:
      'Développeur web et logiciels — formation, expérience et approche pour vos projets.',
    url: '/portfolio/a-propos',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}
