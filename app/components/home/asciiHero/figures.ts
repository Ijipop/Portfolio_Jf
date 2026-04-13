const LINE_HEAD = ' o '
const LINE_BODY = '/|\\'
const LINE_LEGS = ['/ \\', '\\ /'] as const

export function walkingFigure(legFrame: 0 | 1): string {
  return [LINE_HEAD, LINE_BODY, LINE_LEGS[legFrame]].join('\n')
}

export const greetFigure = [' \\o/ ', '  |  ', ' / \\ '].join('\n')

export const sitFigure = [' o ', '/|\\', ' ¯¯¯ '].join('\n')

/** Bonhomme avec épée (main droite). */
export const figureWithSword = [' o/', '/|=', '/ \\'].join('\n')

/**
 * Petite épée verticale, calque qui tombe (ASCII sûr monospace).
 */
export const swordGlyph = ['  ^ ', '  | ', '  | ', ' ==='].join('\n')

/** Slimes ASCII (2 lignes, sans « jambes »). */
export const slimeMonsterA = ['  ◠  ', ' (o_o)'].join('\n')
export const slimeMonsterB = ['  ·  ', '(˘▾˘)'].join('\n')
export const slimeMonsterC = [' ~°~ ', ' (◕‿◕)'].join('\n')

export const MONSTER_FIGURES = [slimeMonsterA, slimeMonsterB, slimeMonsterC] as const

/** Poussière / éclat après explosion du bonhomme. */
export const explodedHeroFigure = [' * · * ', '· *!* ·', ' * · * '].join('\n')
