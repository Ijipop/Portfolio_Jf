import type { Metadata } from 'next'
import { Outfit, Source_Sans_3 } from 'next/font/google'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-dd-display',
  display: 'swap',
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-dd-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'DeskDot — Lanceur radial pour Windows',
  description:
    'Lanceur radial ultra-rapide pour Windows : survol, clic, c’est lancé. Personnalisable, auto-hide, local. Par Ijipop.',
  alternates: { canonical: '/deskdot' },
  openGraph: {
    title: 'DeskDot — Lanceur radial pour Windows',
    description: 'Survole, clique, c’est lancé. Lanceur radial personnalisable pour Windows.',
    url: '/deskdot',
  },
}

export default function DeskDotLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${outfit.variable} ${sourceSans.variable}`}>{children}</div>
}
