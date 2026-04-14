#!/usr/bin/env node
/**
 * Copie les frames PNG/WebP/JPEG/GIF depuis deux dossiers sources vers
 * public/img/projects-loading/{gears,loading-text}/ et écrit frames.json (ordre trié).
 *
 * Usage (depuis le dossier Portfolio) :
 *   npm run sync-loading-frames -- --gears "C:\chemin\Gears_frames" --loading "C:\chemin\Laodin(Gears_frames)"
 */

import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORTFOLIO_ROOT = path.join(__dirname, '..')

const GEARS_DEST = path.join(PORTFOLIO_ROOT, 'public', 'img', 'projects-loading', 'gears')
const LOADING_DEST = path.join(PORTFOLIO_ROOT, 'public', 'img', 'projects-loading', 'loading-text')

const IMAGE_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif'])

function parseArgs() {
  const argv = process.argv.slice(2)
  let gears = null
  let loading = null
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--gears' && argv[i + 1]) {
      gears = argv[++i]
      continue
    }
    if (argv[i] === '--loading' && argv[i + 1]) {
      loading = argv[++i]
      continue
    }
  }
  return { gears, loading }
}

async function pathExists(p) {
  try {
    await fs.access(p)
    return true
  } catch {
    return false
  }
}

/**
 * @param {string} sourceDir
 * @param {string} destDir
 * @param {string} label
 */
async function syncFolder(sourceDir, destDir, label) {
  const abs = path.resolve(sourceDir)
  if (!(await pathExists(abs))) {
    console.error(`[sync-loading-frames] Dossier introuvable (${label}): ${abs}`)
    process.exit(1)
  }

  const entries = await fs.readdir(abs, { withFileTypes: true })
  const files = entries
    .filter((e) => e.isFile() && IMAGE_EXT.has(path.extname(e.name).toLowerCase()))
    .map((e) => e.name)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))

  if (files.length === 0) {
    console.error(`[sync-loading-frames] Aucune image dans (${label}): ${abs}`)
    process.exit(1)
  }

  await fs.mkdir(destDir, { recursive: true })

  for (const name of files) {
    await fs.copyFile(path.join(abs, name), path.join(destDir, name))
  }

  const manifestPath = path.join(destDir, 'frames.json')
  await fs.writeFile(manifestPath, JSON.stringify(files, null, 2) + '\n', 'utf8')

  console.log(`[sync-loading-frames] ${label}: ${files.length} fichier(s) -> ${destDir}`)
  console.log(`[sync-loading-frames] Manifest: ${manifestPath}`)
}

async function main() {
  const { gears, loading } = parseArgs()

  if (!gears || !loading) {
    console.log(`
Usage:
  npm run sync-loading-frames -- --gears "<dossier engrenages>" --loading "<dossier Loading>"

Exemple (PowerShell):
  npm run sync-loading-frames -- --gears "D:\\assets\\Gears_frames" --loading "D:\\assets\\Laodin(Gears_frames)"
`)
    process.exit(gears || loading ? 1 : 0)
  }

  await syncFolder(gears, GEARS_DEST, 'gears')
  await syncFolder(loading, LOADING_DEST, 'loading-text')
  console.log('[sync-loading-frames] Terminé.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
