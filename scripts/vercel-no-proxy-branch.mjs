#!/usr/bin/env node
/**
 * Crée une branche locale vercel-diag-no-proxy : retire proxy.ts du build Next
 * (renommé en .vercel-disabled) pour tester si l’edge proxy cause « Deploying outputs ».
 *
 * Ne pas merger. Après test : git checkout v1.0.8 && git branch -D vercel-diag-no-proxy
 *
 * Usage :
 *   node scripts/vercel-no-proxy-branch.mjs
 */

import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
process.chdir(root)

function sh(cmd, opts = {}) {
  execSync(cmd, { stdio: 'inherit', ...opts })
}

function shOut(cmd) {
  return execSync(cmd, { encoding: 'utf8' }).trim()
}

const current = shOut('git rev-parse --abbrev-ref HEAD')
if (current !== 'v1.0.8') {
  console.warn(
    `Attention : branche actuelle « ${current} ». Pour un test aligné au plan, lancer depuis v1.0.8 :  git checkout v1.0.8`
  )
}

const BRANCH = 'vercel-diag-no-proxy'
const PROXY = path.join(root, 'proxy.ts')
const DISABLED = path.join(root, 'proxy.ts.vercel-disabled')

try {
  execSync('git rev-parse --is-inside-work-tree', { stdio: 'pipe' })
} catch {
  console.error('Exécuter depuis la racine Git (Portfolio/).')
  process.exit(1)
}

if (!fs.existsSync(PROXY)) {
  console.error('proxy.ts introuvable — rien à faire.')
  process.exit(1)
}

sh(`git checkout -B ${BRANCH}`)

fs.renameSync(PROXY, DISABLED)
sh('git add -A')
sh(`git commit -m "chore(vercel): diagnostic — proxy désactivé (ne pas merger)"`)
console.log(`
Branche ${BRANCH} créée (proxy.ts renommé en proxy.ts.vercel-disabled).

Pousser pour test Vercel :
  git push -u origin ${BRANCH}

⚠ Admin / APIs protégées ne seront plus filtrées par le proxy sur ce déploiement.
`)
