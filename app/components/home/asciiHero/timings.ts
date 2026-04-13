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

/** Délai après l’épée avant la séquence spawn / combat (ms). */
export const SPAWN_SEQUENCE_DELAY_MS = 2200

/** Écart horizontal (px) entre silhouette héros et slime avant le coup (héros à gauche du slime). */
export const COMBAT_HERO_STANDOFF_PX = 10

/** Combat : retour au centre de l’arène avant le code explode. */
export const COMBAT_RETURN_CENTER_S = 0.55
export const COMBAT_PAUSE_AFTER_CENTER_MS = 240

/** Disparition du slime après le coup (court = combat plus serré). */
export const COMBAT_SLIME_SHRINK_S = 0.16
/** Pause entre deux slimes après disparition. */
export const COMBAT_KILL_GAP_MS = 55

/** Après l’anim d’explosion du héros ASCII, avant prose / promenade. */
export const HERO_EXPLODE_END_DELAY_MS = 480
