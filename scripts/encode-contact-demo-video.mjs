/**
 * Réencode public/img/demo1.mp4 (contact) — même rendu visuel, fichier plus léger.
 * Prérequis : ffmpeg sur le PATH.
 *
 * Usage (depuis Portfolio/) :
 *   node scripts/encode-contact-demo-video.mjs
 *   node scripts/encode-contact-demo-video.mjs --replace   # remplace demo1.mp4 (sauvegarde .bak)
 */

import { existsSync, copyFileSync, renameSync, unlinkSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { spawnSync } from 'child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const INPUT = join(ROOT, 'public', 'img', 'demo1.mp4')
const TEMP_OUT = join(ROOT, 'public', 'img', 'demo1.optimized.mp4')

const replaceInPlace = process.argv.includes('--replace')

function runFfmpeg(args) {
  const r = spawnSync('ffmpeg', args, { stdio: 'inherit', shell: false })
  if (r.error) {
    console.error(r.error.message)
    process.exit(1)
  }
  if (r.status !== 0) process.exit(r.status ?? 1)
}

if (!existsSync(INPUT)) {
  console.error(`Fichier introuvable : ${INPUT}`)
  console.error('Placez la vidéo contact (demo1.mp4) dans public/img/ puis relancez.')
  process.exit(1)
}

console.log('Encodage H.264 (CRF 28, faststart, max 1920px de large)...')

runFfmpeg([
  '-y',
  '-i',
  INPUT,
  '-an',
  '-c:v',
  'libx264',
  '-pix_fmt',
  'yuv420p',
  '-crf',
  '28',
  '-preset',
  'slow',
  '-movflags',
  '+faststart',
  '-vf',
  'scale=min(1920\\,iw):-2',
  TEMP_OUT,
])

if (replaceInPlace) {
  const backup = `${INPUT}.bak`
  copyFileSync(INPUT, backup)
  try {
    unlinkSync(INPUT)
    renameSync(TEMP_OUT, INPUT)
    console.log(`OK : ${INPUT} remplacé (sauvegarde : ${backup})`)
  } catch (err) {
    console.error('Échec remplacement — restauration depuis .bak', err)
    if (existsSync(backup)) copyFileSync(backup, INPUT)
    process.exit(1)
  }
} else {
  console.log(`OK : ${TEMP_OUT}`)
  console.log('Vérifiez la qualité, puis : node scripts/encode-contact-demo-video.mjs --replace')
}
