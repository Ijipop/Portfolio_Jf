import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Message envoyé',
  robots: { index: false, follow: false },
}

export default function ContactMerciLayout({ children }: { children: React.ReactNode }) {
  return children
}
