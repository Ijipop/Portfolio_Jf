'use client'

import { usePathname } from 'next/navigation'
import { usePresentationMode } from '@/contexts/PresentationModeContext'
import { useBeigeDark } from '@/hooks/useBeigeDark'
import { isTimelendrRoute } from '@/utils/isTimelendrRoute'

/** Mode Site sombre V2 actif (chrome glass) — exclut Timelendr et mode Créa. */
export function useSiteDarkChrome(): boolean {
  const pathname = usePathname()
  const { mode: presentationMode } = usePresentationMode()
  const { beigeDark } = useBeigeDark()
  return presentationMode === 'beige' && beigeDark && !isTimelendrRoute(pathname)
}
