'use client'

import IjipopDarkLoader from '@/components/shared/IjipopDarkLoader'

interface LoadingSpinnerProps {
  message?: string
  /** Conservé pour compat — le loader marque a sa taille propre. */
  size?: number
}

export default function LoadingSpinner({ message = 'Chargement...' }: LoadingSpinnerProps) {
  return <IjipopDarkLoader message={message} />
}
