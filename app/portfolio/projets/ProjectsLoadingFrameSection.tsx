'use client'

import IjipopDarkLoader from '@/components/shared/IjipopDarkLoader'

type ProjectsLoadingFrameSectionProps = {
  /** Texte optionnel sous le marqueur (sinon animation seule). */
  message?: string
}

/**
 * Écran de chargement Projets — marque ijipop adaptée au design sombre.
 * (Anciennes vidéos / frames gears trop sombres → illisibles sur fond dark.)
 */
export default function ProjectsLoadingFrameSection({ message = '' }: ProjectsLoadingFrameSectionProps) {
  return <IjipopDarkLoader message={message} />
}
