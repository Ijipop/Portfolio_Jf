#!/usr/bin/env node
/**
 * Crée des branches locales pointant vers des commits précis pour bissection
 * des déploiements Vercel (« Deploying outputs »).
 *
 * Usage (depuis la racine Portfolio/) :
 *   node scripts/vercel-bisect-branches.mjs
 *
 * Puis pousser chaque branche pour déclencher un Preview Deploy :
 *   git push -u origin vercel-bisect-8c57f6d
 *   git push -u origin vercel-bisect-8b7c010
 *   ...
 */

import { execSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
process.chdir(root)

const COMMITS = [
  { sha: '8c57f6d', label: 'UploadBG (pointe au merge vert 9636af7 côté feature)' },
  { sha: '8b7c010', label: 'UploadBG2 + demos boutique/cabinet + PNG site-beige' },
  { sha: '5bc11a3', label: 'spelling (middleware → proxy)' },
  { sha: '9659aa2', label: 'Retrait PNG site-beige (HEAD récent si aligné)' },
]

function sh(cmd) {
  return execSync(cmd, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] }).trim()
}

try {
  sh('git rev-parse --is-inside-work-tree')
} catch {
  console.error('Erreur : exécuter ce script à la racine du dépôt Git (dossier Portfolio/).')
  process.exit(1)
}

console.log('\nVercel — bissection par déploiement\n')
console.log('Ordre suggéré : pousser les branches une par une et noter où « Deploying outputs » échoue.\n')

for (const { sha, label } of COMMITS) {
  let full
  try {
    // Pas de ^{commit} : sous Windows (cmd) le ^ casse la commande.
    full = sh(`git rev-parse ${sha}`)
  } catch {
    console.warn(`Commit introuvable : ${sha} (${label}) — ignoré.`)
    continue
  }
  const branch = `vercel-bisect-${sha}`
  try {
    sh(`git branch -f ${branch} ${full}`)
    console.log(`OK  ${branch}  →  ${full.slice(0, 7)}  (${label})`)
  } catch (e) {
    console.error(`Échec branche ${branch}:`, e.message || e)
  }
}

console.log(`
Étapes suivantes :
  1. Vérifier le dashboard Vercel : Build Command = override via vercel.json ("npm run build").
  2. Pour chaque branche :  git push -u origin vercel-bisect-<sha>  (forcer preview si besoin).
  3. Noter le premier commit où l’étape « Deploying outputs » échoue.

Branche diagnostic sans proxy (si l’échec suit 5bc11a3) :
  node scripts/vercel-no-proxy-branch.mjs
`)
