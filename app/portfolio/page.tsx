import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import HomeClient from '../HomeClient'

const INTRO_COOKIE_KEY = 'portfolio-intro-seen'

export const metadata: Metadata = {
  title: {
    absolute:
      'Jean-François Lefebvre | Ijipop — sites web & logiciels pour PME au Québec',
  },
  description:
    'Ijipop — développement web pour PME et indépendants : sites vitrine, refonte et maintenance. Réalisations et prise de contact — Montréal et télétravail.',
  openGraph: {
    title: 'Jean-François Lefebvre | Ijipop — sites web pour PME au Québec',
    description:
      'Création de sites web, refonte et petite maintenance pour petites entreprises — aperçu des mandats et contact.',
    url: '/portfolio',
    locale: 'fr_CA',
    siteName: 'Jean-François Lefebvre — Ijipop',
  },
}

export default async function PortfolioHomePage() {
  const cookieStore = await cookies()
  const introSeen = cookieStore.get(INTRO_COOKIE_KEY)
  // Intro (rideau avec le nom) désactivée pour l'instant — remettre `!introSeen` pour réactiver
  const initialShowIntro = false

  return <HomeClient initialShowIntro={initialShowIntro} />
}
