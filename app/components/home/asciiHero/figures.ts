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
