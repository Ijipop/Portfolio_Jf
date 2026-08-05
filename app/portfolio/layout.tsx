import { outfit, plusJakarta, instrumentSans } from '@/fonts'

/** Polices funnel vendeur sur toutes les pages /portfolio/*. */
export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${outfit.variable} ${plusJakarta.variable} ${instrumentSans.variable}`}>
      {children}
    </div>
  )
}
