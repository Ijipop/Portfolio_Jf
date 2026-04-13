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
