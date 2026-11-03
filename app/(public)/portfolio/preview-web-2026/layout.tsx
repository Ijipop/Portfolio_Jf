import type { Metadata } from 'next'
import { Manrope, Syne } from 'next/font/google'

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-preview-display',
  display: 'swap',
  weight: ['500', '600', '700', '800'],
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-preview-body',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Preview 2026 — Accueil web (non indexé)',
  robots: { index: false, follow: false },
}

export default function PreviewWeb2026Layout({ children }: { children: React.ReactNode }) {
  return <div className={`${syne.variable} ${manrope.variable}`}>{children}</div>
}
