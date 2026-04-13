/** Snippet affiché en mode Créa : code qui « construit » le bonhomme ASCII. */
export const ASCII_BUILD_CODE = [
  '// figure ASCII',
  'const figure = [',
  "  ' o ',",
  "  '/|\\',",
  "  '/ \\',",
  "].join('\\n')",
].join('\n')

/** Deuxième acte : « spawn » d’une épée (décoratif). */
export const ASCII_SWORD_CODE = [
  '// arme',
  'const blade = dropSword({',
  "  glyph: ['|','|','═'],",
  '  from: "sky",',
  '})',
].join('\n')

/** Invocation de monstres (hero). */
export const ASCII_SPAWN_MONSTERS = [
  '// vague',
  'spawnEnemies({',
  '  count: 2,',
  '  flavor: "slime",',
  '  zone: "aboveCard",',
  '})',
].join('\n')

/** Code affiché avant l’explosion du héros. */
export const ASCII_EXPLODE_CODE = [
  '// fin de combat',
  'hero.explode({',
  '  style: "stardust",',
  '  resetFigure: true,',
  '})',
].join('\n')
