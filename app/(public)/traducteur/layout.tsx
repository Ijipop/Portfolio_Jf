import type { Metadata } from 'next'
import { Fraunces, Nunito_Sans } from 'next/font/google'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-tr-display',
  display: 'swap',
})

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-tr-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Le Traducteur — Espagnol vers français, sur Windows',
  description:
    'Utilitaire Windows gratuit : traduisez Word, PDF et images localement. Par Ijipop.',
  alternates: { canonical: '/traducteur' },
  openGraph: {
    title: 'Le Traducteur — Espagnol vers français',
    description: 'Traduisez vos documents sur votre ordinateur, sans abonnement.',
    url: '/traducteur',
  },
}

export default function TraducteurLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${fraunces.variable} ${nunitoSans.variable}`}>{children}</div>
}
