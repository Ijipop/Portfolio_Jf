/**
 * Postinstall Prisma avec retries : sous Windows, `rename` du query engine peut
 * échouer en EPERM si `next dev`, un autre `node`, ou l'antivirus verrouille le fichier.
 *
 * Ne pas utiliser `npx prisma` : sans binaire local résolu, npx installe Prisma 7+,
 * incompatible avec un schéma Prisma 6 (`datasource url` dans schema.prisma).
 */

import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { setTimeout as delay } from 'node:timers/promises'

function runPrismaGenerate() {
  return new Promise((resolve) => {
    const cli = path.join(process.cwd(), 'node_modules', 'prisma', 'build', 'index.js')
    if (!existsSync(cli)) {
      console.error(
        `[postinstall] Prisma CLI introuvable : ${cli}\n` +
          '  → Vérifie que `prisma` est installé (même version que @prisma/client, ex. 6.x).'
      )
      return resolve(1)
    }
    const child = spawn(process.execPath, [cli, 'generate'], {
      stdio: 'inherit',
      cwd: process.cwd(),
    })
    child.on('close', (code) => resolve(code ?? 1))
    child.on('error', () => resolve(1))
  })
}

const maxAttempts = 8
const baseWaitMs = 600

for (let attempt = 1; attempt <= maxAttempts; attempt++) {
  const code = await runPrismaGenerate()
  if (code === 0) {
    process.exit(0)
  }
  if (attempt < maxAttempts) {
    const wait = baseWaitMs + attempt * 350
    console.warn(
      `[postinstall] prisma generate a échoué (code ${code}), nouvel essai ${attempt + 1}/${maxAttempts} dans ${wait}ms…`
    )
    await delay(wait)
  }
}

console.error(
  '\n[postinstall] prisma generate a échoué après plusieurs essais.\n' +
    '  → Ferme `npm run dev`, les tests Playwright, et tout process Node sur ce repo.\n' +
    '  → Puis : npx prisma generate\n' +
    '  → Ou supprime node_modules/.prisma et relance npm install.\n'
)
process.exit(1)
