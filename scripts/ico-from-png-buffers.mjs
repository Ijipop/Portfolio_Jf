/**
 * Construit un fichier .ico multi-tailles (PNG embarqués, Vista+).
 * Évite to-ico / jimp / request (alertes npm audit sur la chaîne legacy).
 */

const PNG_SIG = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])

function assertPng(buf, label) {
  if (!buf || buf.length < 8 || !buf.subarray(0, 8).equals(PNG_SIG)) {
    throw new Error(`ico-from-png: ${label} n'est pas un PNG valide`)
  }
}

/**
 * @param {Buffer[]} pngBuffers PNG complets, typiquement 16×16, 32×32, 48×48
 * @param {number[]} widths largeurs correspondantes (hauteur = même valeur)
 */
export function buildIcoFromPngBuffers(pngBuffers, widths) {
  if (pngBuffers.length !== widths.length || pngBuffers.length === 0) {
    throw new Error('ico-from-png: pngBuffers et widths doivent avoir la même longueur non nulle')
  }
  for (let i = 0; i < pngBuffers.length; i++) {
    assertPng(pngBuffers[i], `image ${i}`)
  }

  const n = pngBuffers.length
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(n, 4)

  const entrySize = 16 * n
  let dataOffset = 6 + entrySize
  const entries = []

  for (let i = 0; i < n; i++) {
    const png = pngBuffers[i]
    const w = widths[i]
    const h = widths[i]
    const entry = Buffer.alloc(16)
    entry.writeUInt8(w >= 256 ? 0 : w, 0)
    entry.writeUInt8(h >= 256 ? 0 : h, 1)
    entry.writeUInt8(0, 2)
    entry.writeUInt8(0, 3)
    entry.writeUInt16LE(1, 4)
    entry.writeUInt16LE(0, 6)
    entry.writeUInt32LE(png.length, 8)
    entry.writeUInt32LE(dataOffset, 12)
    dataOffset += png.length
    entries.push(entry)
  }

  return Buffer.concat([header, Buffer.concat(entries), ...pngBuffers])
}
