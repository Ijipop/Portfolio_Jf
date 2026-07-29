import type { Metadata } from 'next'
import { Outfit, Source_Sans_3 } from 'next/font/google'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-st-display',
  display: 'swap',
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-st-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Space Taker — Voir ce qui prend de la place | Disque',
  description:
    'Repérer rapidement les gros fichiers sur votre disque. Simple, clair, Windows et macOS. Par Ijipop.',
  alternates: { canonical: '/spacetaker' },
  openGraph: {
    title: 'Space Taker — Voir ce qui prend de la place',
    description: 'Repérer rapidement les gros fichiers sur votre disque.',
    url: '/spacetaker',
  },
}

export default function SpaceTakerLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${outfit.variable} ${sourceSans.variable}`}>{children}</div>
}
