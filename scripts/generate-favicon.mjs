/**
 * Génère app/icon.png et app/favicon.ico à partir de app/icon.svg.
 * Usage : node scripts/generate-favicon.mjs
 */
import sharp from 'sharp'
import toIco from 'to-ico'
import { writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const svgPath = join(root, 'app', 'icon.svg')

const png32 = await sharp(svgPath).resize(32, 32).png().toBuffer()
const png48 = await sharp(svgPath).resize(48, 48).png().toBuffer()
writeFileSync(join(root, 'app', 'icon.png'), png32)

const ico = await toIco([png32, png48])
writeFileSync(join(root, 'app', 'favicon.ico'), ico)

console.log('OK: app/icon.png, app/favicon.ico')
