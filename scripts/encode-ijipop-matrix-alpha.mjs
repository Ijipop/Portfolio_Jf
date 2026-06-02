/**
 * Détoure ijipopMatrix.mp4 (fond gris clair) → WebM VP9 avec alpha (lettrage seul).
 *
 * Prérequis : ffmpeg sur le PATH (libvpx pour VP9).
 *
 * Usage (depuis Portfolio/) :
 *   node scripts/encode-ijipop-matrix-alpha.mjs
 *   node scripts/encode-ijipop-matrix-alpha.mjs --replace   # remplace aussi demo1 si besoin — non, juste outputs
 *
 * Entrée  : public/img/ijipopMatrix.mp4
 * Sorties : public/img/ijipopMatrix_alpha.webm
 *           public/img/ijipopMatrix_alpha.mp4  (H.264 fond noir, repli Safari)
 */

import { existsSync, copyFileSync, renameSync, unlinkSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { spawnSync } from 'child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const INPUT = join(ROOT, 'public', 'img', 'ijipopMatrix.mp4')
const WEBM_OUT = join(ROOT, 'public', 'img', 'ijipopMatrix_alpha.webm')
const MP4_FALLBACK = join(ROOT, 'public', 'img', 'ijipopMatrix_alpha.mp4')
const TEMP_WEBM = join(ROOT, 'public', 'img', 'ijipopMatrix_alpha.tmp.webm')

/** Couleur de fond mesurée sur la source (~gris clair uniforme). */
const COLORKEY = '0xE6E6E6'
const COLORKEY_SIMILARITY = '0.14'
const COLORKEY_BLEND = '0.06'

function runFfmpeg(args) {
  const r = spawnSync('ffmpeg', args, { stdio: 'inherit', shell: false, env: process.env })
  if (r.error) throw r.error
  if (r.status !== 0) process.exit(r.status ?? 1)
}

if (!existsSync(INPUT)) {
  console.error(`Fichier introuvable : ${INPUT}`)
  process.exit(1)
}

console.log('Encodage WebM VP9 + alpha (lettrage ijipop, fond retiré)...')

runFfmpeg([
  '-y',
  '-i',
  INPUT,
  '-an',
  '-vf',
  `colorkey=${COLORKEY}:${COLORKEY_SIMILARITY}:${COLORKEY_BLEND},format=yuva420p`,
  '-c:v',
  'libvpx-vp9',
  '-b:v',
  '0',
  '-crf',
  '28',
  '-row-mt',
  '1',
  TEMP_WEBM,
])

renameSync(TEMP_WEBM, WEBM_OUT)
console.log('OK:', WEBM_OUT)

console.log('Repli MP4 (fond noir, Safari / iOS)...')

runFfmpeg([
  '-y',
  '-i',
  WEBM_OUT,
  '-an',
  '-c:v',
  'libx264',
  '-pix_fmt',
  'yuv420p',
  '-crf',
  '23',
  '-preset',
  'medium',
  '-movflags',
  '+faststart',
  MP4_FALLBACK,
])

console.log('OK:', MP4_FALLBACK)
console.log('Utiliser ijipopMatrix_alpha.webm sur fond sombre ; .mp4 si transparence non supportée.')
