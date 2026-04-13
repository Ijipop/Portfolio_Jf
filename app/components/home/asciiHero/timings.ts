/** Fréquence frappe code (intro + épée). */
export const CHAR_MS = 34

/** Effacement du premier snippet (plus rapide). */
export const CHAR_MS_CLEAR = 18

/** Durée ping-pong marche « interactive » (boucle). */
export const PING_DURATION_S = 3.2

/** Chute du bonhomme après le typing initial. */
export const FALL_DURATION_S = 0.65
export const FALL_FROM_Y = -62

/** Marche courte (ciné) avant effacement du code. */
export const WALK_SHORT_DURATION_S = 1.35
export const WALK_SHORT_RATIO = 0.32

/** Chute de l’épée (calque ASCII). */
export const SWORD_DROP_DURATION_S = 0.75
export const SWORD_START_Y = -68
/** Position Y (px) une fois l’épée arrivée près de la main (bonhomme agrandi). */
export const SWORD_LAND_Y = 24

/** Approche vers l’épée + pose. */
export const PICKUP_MOVE_DURATION_S = 0.85
export const PICKUP_PAUSE_S = 0.2

export const IDLE_MS = 15_000
export const IDLE_POSE_MS = 1600
export const TILT_MAX_DEG = 7
export const SCROLL_DELTA_THRESHOLD = 16
