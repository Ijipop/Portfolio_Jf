/**
 * Génère app/icon.png (48×48, recommandé Google), app/apple-icon.png (180×180)
 * et public/favicon.ico (16/32/48) à partir de app/icon.svg.
 * Le .ico est sous public/ pour éviter que Turbopack tente de le traiter comme image app/.
 * Usage : npm run favicon
 */
import sharp from 'sharp'
import toIco from 'to-ico'
import { writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const svgPath = join(root, 'app', 'icon.svg')

const png16 = await sharp(svgPath).resize(16, 16).png().toBuffer()
const png32 = await sharp(svgPath).resize(32, 32).png().toBuffer()
const png48 = await sharp(svgPath).resize(48, 48).png().toBuffer()
writeFileSync(join(root, 'app', 'icon.png'), png48)

const apple = await sharp(svgPath).resize(180, 180).png().toBuffer()
writeFileSync(join(root, 'app', 'apple-icon.png'), apple)

const ico = await toIco([png16, png32, png48])
writeFileSync(join(root, 'public', 'favicon.ico'), ico)

console.log('OK: app/icon.png (48), app/apple-icon.png (180), public/favicon.ico')
