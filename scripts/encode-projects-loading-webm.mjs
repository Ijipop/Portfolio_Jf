/**
 * Encode les séquences PNG de l’écran chargement Projets en WebM VP9 (alpha).
 *
 * Prérequis : ffmpeg sur le PATH.
 *
 * Usage (depuis la racine du dossier Portfolio) :
 *   node scripts/encode-projects-loading-webm.mjs
 *
 * Entrées : public/img/projects-loading/gears/*.png + loading-text/*.png (voir frames.json)
 * Sorties :
 *   - gears.webm + loading-text.webm (VP9 + alpha)
 *   - gears.mp4 + loading-text.mp4 (H.264, repli Safari — alpha fusionnée sur noir)
 */

import { readFileSync, writeFileSync, unlinkSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { spawnSync } from 'child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const BASE = join(ROOT, 'public', 'img', 'projects-loading')

const FPS = 30
/** Largeur max (16:9 source) — allège fortement vs 2560×1440 en PNG. */
const SCALE_W = 1280

function escapeConcatPath(name) {
  return name.replace(/'/g, "'\\''")
}

/** Fichier ffconcat : une image + duration par frame, dernière image dupliquée (requis par ffmpeg). */
function buildFfconcatLines(filenames) {
  const dur = (1 / FPS).toFixed(8)
  const lines = ['ffconcat version 1.0']
  for (const f of filenames) {
    lines.push(`file '${escapeConcatPath(f)}'`)
    lines.push(`duration ${dur}`)
  }
  const last = filenames[filenames.length - 1]
  lines.push(`file '${escapeConcatPath(last)}'`)
  return lines.join('\n')
}

function runFfmpeg(args, cwd) {
  const r = spawnSync('ffmpeg', args, {
    cwd,
    stdio: 'inherit',
    shell: false,
    env: process.env,
  })
  if (r.error) throw r.error
  if (r.status !== 0) process.exit(r.status ?? 1)
}

/** MP4 H.264 pour Safari / iOS (pas d’alpha en H.264 classique : transparence → fond noir). */
function transcodeWebmToMp4H264(webmName, mp4Name) {
  runFfmpeg(
    [
      '-y',
      '-i',
      webmName,
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
      '-an',
      mp4Name,
    ],
    BASE
  )
  console.log('OK:', join(BASE, mp4Name))
}

function encodeGears() {
  const dir = join(BASE, 'gears')
  const list = JSON.parse(readFileSync(join(dir, 'frames.json'), 'utf8'))
  if (!Array.isArray(list) || list.length === 0) {
    console.error('gears/frames.json vide ou invalide')
    process.exit(1)
  }
  const concatPath = join(dir, '_encode_concat.ffconcat')
  writeFileSync(concatPath, buildFfconcatLines(list), 'utf8')
  const out = join(BASE, 'gears.webm')
  try {
    runFfmpeg(
      [
        '-y',
        '-f',
        'concat',
        '-safe',
        '0',
        '-i',
        '_encode_concat.ffconcat',
        '-vf',
        `fps=${FPS},format=rgba,scale=${SCALE_W}:-2:flags=lanczos,format=yuva420p`,
        '-c:v',
        'libvpx-vp9',
        '-b:v',
        '0',
        '-crf',
        '34',
        '-row-mt',
        '1',
        '-an',
        '-auto-alt-ref',
        '0',
        out,
      ],
      dir
    )
  } finally {
    try {
      unlinkSync(concatPath)
    } catch {
      /* ignore */
    }
  }
  console.log('OK:', out)
}

function encodeLoadingText() {
  const dir = join(BASE, 'loading-text')
  const out = join(BASE, 'loading-text.webm')
  // 00000 → 00077 = 78 frames
  runFfmpeg(
    [
      '-y',
      '-framerate',
      String(FPS),
      '-start_number',
      '0',
      '-i',
      'Gearloading3_%05d.png',
      '-frames:v',
      '78',
      '-vf',
      `fps=${FPS},format=rgba,scale=${SCALE_W}:-2:flags=lanczos,format=yuva420p`,
      '-c:v',
      'libvpx-vp9',
      '-b:v',
      '0',
      '-crf',
      '34',
      '-row-mt',
      '1',
      '-an',
      '-auto-alt-ref',
      '0',
      out,
    ],
    dir
  )
  console.log('OK:', out)
}

console.log('Encodage VP9 (transparence),', FPS, 'fps, scale max', SCALE_W, 'px de large…')
encodeGears()
encodeLoadingText()
console.log('Transcodage H.264 MP4 (repli Safari)…')
transcodeWebmToMp4H264('gears.webm', 'gears.mp4')
transcodeWebmToMp4H264('loading-text.webm', 'loading-text.mp4')
console.log('Terminé.')
