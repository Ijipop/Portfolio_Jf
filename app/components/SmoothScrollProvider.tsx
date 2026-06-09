'use client'

import { type ReactNode } from 'react'

type SmoothScrollProviderProps = {
  children: ReactNode
}

/**
 * Provider neutre côté SSR/hydratation pour éliminer les divergences de structure.
 * Le scroll natif reste actif partout.
 */
export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  return children
}
