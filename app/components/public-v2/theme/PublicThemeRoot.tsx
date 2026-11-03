import type { CSSProperties, ReactNode } from 'react'
import { fraunces, outfitV2 } from '@/fonts'
import type { PublicV2MotionOverrides } from '@/lib/public-v2/motion'
import { publicV2MotionStyle } from '@/lib/public-v2/motion'
import '@/styles/public-v2/tokens.css'
import '@/styles/public-v2/base.css'
import '@/styles/public-v2/motion.css'

const THEME = 'pop-atelier' as const

export type PublicThemeRootProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
  /** Optional motion knobs → CSS variables on this root only. */
  motion?: PublicV2MotionOverrides
}

/**
 * Isolates Pop Atelier tokens/fonts under `data-public-theme="pop-atelier"`.
 * Do not mount from `(public)/layout` until a later phase — preview page only for now.
 */
export default function PublicThemeRoot({
  children,
  className,
  style,
  motion,
}: PublicThemeRootProps) {
  const motionStyle = publicV2MotionStyle(motion)
  const classes = [fraunces.variable, outfitV2.variable, className].filter(Boolean).join(' ')

  return (
    <div
      data-public-theme={THEME}
      data-testid="public-theme-root"
      className={classes}
      style={{ ...motionStyle, ...style }}
    >
      {children}
    </div>
  )
}

export const PUBLIC_THEME_ATTR = THEME
