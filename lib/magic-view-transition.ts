import { flushSync } from "react-dom"

export type TransitionVariant =
  | "circle"
  | "square"
  | "triangle"
  | "diamond"
  | "hexagon"
  | "rectangle"
  | "star"

function polygonCollapsed(cx: number, cy: number, vertexCount: number): string {
  const pairs = Array.from({ length: vertexCount }, () => `${cx}px ${cy}px`).join(", ")
  return `polygon(${pairs})`
}

export function getThemeTransitionClipPaths(
  variant: TransitionVariant,
  cx: number,
  cy: number,
  maxRadius: number,
  viewportWidth: number,
  viewportHeight: number
): [string, string] {
  switch (variant) {
    case "circle":
      return [
        `circle(0px at ${cx}px ${cy}px)`,
        `circle(${maxRadius}px at ${cx}px ${cy}px)`,
      ]
    case "square": {
      const halfW = Math.max(cx, viewportWidth - cx)
      const halfH = Math.max(cy, viewportHeight - cy)
      const halfSide = Math.max(halfW, halfH) * 1.05
      const end = [
        `${cx - halfSide}px ${cy - halfSide}px`,
        `${cx + halfSide}px ${cy - halfSide}px`,
        `${cx + halfSide}px ${cy + halfSide}px`,
        `${cx - halfSide}px ${cy + halfSide}px`,
      ].join(", ")
      return [polygonCollapsed(cx, cy, 4), `polygon(${end})`]
    }
    case "triangle": {
      const scale = maxRadius * 2.2
      const dx = (Math.sqrt(3) / 2) * scale
      const verts = [
        `${cx}px ${cy - scale}px`,
        `${cx + dx}px ${cy + 0.5 * scale}px`,
        `${cx - dx}px ${cy + 0.5 * scale}px`,
      ].join(", ")
      return [polygonCollapsed(cx, cy, 3), `polygon(${verts})`]
    }
    case "diamond": {
      const R = maxRadius * Math.SQRT2
      const end = [
        `${cx}px ${cy - R}px`,
        `${cx + R}px ${cy}px`,
        `${cx}px ${cy + R}px`,
        `${cx - R}px ${cy}px`,
      ].join(", ")
      return [polygonCollapsed(cx, cy, 4), `polygon(${end})`]
    }
    case "hexagon": {
      const R = maxRadius * Math.SQRT2
      const verts: string[] = []
      for (let i = 0; i < 6; i++) {
        const a = -Math.PI / 2 + (i * Math.PI) / 3
        verts.push(`${cx + R * Math.cos(a)}px ${cy + R * Math.sin(a)}px`)
      }
      return [polygonCollapsed(cx, cy, 6), `polygon(${verts.join(", ")})`]
    }
    case "rectangle": {
      const halfW = Math.max(cx, viewportWidth - cx)
      const halfH = Math.max(cy, viewportHeight - cy)
      const end = [
        `${cx - halfW}px ${cy - halfH}px`,
        `${cx + halfW}px ${cy - halfH}px`,
        `${cx + halfW}px ${cy + halfH}px`,
        `${cx - halfW}px ${cy + halfH}px`,
      ].join(", ")
      return [polygonCollapsed(cx, cy, 4), `polygon(${end})`]
    }
    case "star": {
      const R = maxRadius * Math.SQRT2 * 1.03
      const innerRatio = 0.42
      const starPolygon = (radius: number) => {
        const verts: string[] = []
        for (let i = 0; i < 5; i++) {
          const outerA = -Math.PI / 2 + (i * 2 * Math.PI) / 5
          verts.push(`${cx + radius * Math.cos(outerA)}px ${cy + radius * Math.sin(outerA)}px`)
          const innerA = outerA + Math.PI / 5
          verts.push(
            `${cx + radius * innerRatio * Math.cos(innerA)}px ${cy + radius * innerRatio * Math.sin(innerA)}px`
          )
        }
        return `polygon(${verts.join(", ")})`
      }
      const startR = Math.max(2, R * 0.025)
      return [starPolygon(startR), starPolygon(R)]
    }
    default:
      return [
        `circle(0px at ${cx}px ${cy}px)`,
        `circle(${maxRadius}px at ${cx}px ${cy}px)`,
      ]
  }
}

export type RunRootViewTransitionOptions = {
  duration?: number
  variant?: TransitionVariant
  /** Si true, le clip part du centre de la fenêtre. */
  fromCenter?: boolean
  /** Centre du clip = milieu de cet élément (ex. bouton ou groupe). */
  anchorElement?: HTMLElement | null
  /**
   * Si true (défaut), pas de view transition quand prefers-reduced-motion.
   */
  respectReducedMotion?: boolean
}

/**
 * Même mécanique que Magic UI `AnimatedThemeToggler` : `startViewTransition` + clip sur `::view-transition-new(root)`.
 * À utiliser pour tout changement d’état « plein écran » (thème clair/sombre, mode Site/Créa, etc.).
 */
export function runRootViewTransition(
  apply: () => void,
  options: RunRootViewTransitionOptions = {}
): void {
  const {
    duration = 400,
    variant = "circle",
    fromCenter = false,
    anchorElement = null,
    respectReducedMotion = true,
  } = options

  if (typeof document === "undefined") {
    return
  }

  if (
    respectReducedMotion &&
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    apply()
    return
  }

  if (typeof document.startViewTransition !== "function") {
    apply()
    return
  }

  const viewportWidth = window.visualViewport?.width ?? window.innerWidth
  const viewportHeight = window.visualViewport?.height ?? window.innerHeight

  let x: number
  let y: number
  if (fromCenter) {
    x = viewportWidth / 2
    y = viewportHeight / 2
  } else if (anchorElement) {
    const { top, left, width, height } = anchorElement.getBoundingClientRect()
    x = left + width / 2
    y = top + height / 2
  } else {
    x = viewportWidth / 2
    y = viewportHeight / 2
  }

  const maxRadius = Math.hypot(Math.max(x, viewportWidth - x), Math.max(y, viewportHeight - y))

  const root = document.documentElement
  root.dataset.magicuiThemeVt = "active"
  root.style.setProperty("--magicui-theme-toggle-vt-duration", `${duration}ms`)
  const cleanup = () => {
    delete root.dataset.magicuiThemeVt
    root.style.removeProperty("--magicui-theme-toggle-vt-duration")
  }

  const transition = document.startViewTransition(() => {
    flushSync(apply)
  })
  if (typeof transition?.finished?.finally === "function") {
    transition.finished.finally(cleanup)
  } else {
    cleanup()
  }

  const ready = transition?.ready
  if (ready && typeof ready.then === "function") {
    const clipPath = getThemeTransitionClipPaths(variant, x, y, maxRadius, viewportWidth, viewportHeight)
    ready.then(() => {
      document.documentElement.animate(
        { clipPath },
        {
          duration,
          easing: variant === "star" ? "linear" : "ease-in-out",
          fill: "forwards",
          pseudoElement: "::view-transition-new(root)",
        }
      )
    })
  }
}
