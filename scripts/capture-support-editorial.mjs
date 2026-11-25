/**
 * Captures avant/après — page soutien (design-lab/, gitignored).
 * Usage:
 *   node scripts/capture-support-editorial.mjs --base https://ijipop.com
 *   node scripts/capture-support-editorial.mjs --base http://127.0.0.1:3000 --tag apres
 */
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { chromium } from 'playwright'

const PATH = '/soutien-informatique-montreal'
const WIDTHS = [1440, 1024, 768, 390, 320]

function parseArgs() {
  const args = process.argv.slice(2)
  let base = 'http://127.0.0.1:3000'
  let tag = 'apres'
  for (let i = 0; i < args.length; i += 1) {
    if (args[i] === '--base') base = args[i + 1]
    if (args[i] === '--tag') tag = args[i + 1]
  }
  return { base: base.replace(/\/$/, ''), tag }
}

const SECTIONS = [
  { id: 'full', fullPage: true },
  { id: 'hero', selector: 'header[aria-labelledby="support-hero-title"]' },
  { id: 'services', selector: 'section[aria-labelledby="support-services-title"]' },
  { id: 'process', selector: 'section[aria-labelledby="support-process-title"]' },
  { id: 'contact', selector: 'section[aria-labelledby="support-contact-title"]' },
]

async function main() {
  const { base, tag } = parseArgs()
  const outRoot = path.join(process.cwd(), 'design-lab', 'support-editorial-3', tag)
  await mkdir(outRoot, { recursive: true })

  const browser = await chromium.launch()
  const page = await browser.newPage()
  await page.goto(`${base}${PATH}`, { waitUntil: 'networkidle', timeout: 120_000 })
  await page.evaluate(() => window.scrollTo(0, 0))

  for (const width of WIDTHS) {
    await page.setViewportSize({ width, height: width <= 390 ? 900 : 1100 })
    for (const section of SECTIONS) {
      const file = path.join(outRoot, `${width}-${section.id}.png`)
      if (section.fullPage) {
        await page.screenshot({ path: file, fullPage: true })
      } else {
        const el = page.locator(section.selector).first()
        if (await el.count()) {
          await el.screenshot({ path: file })
        }
      }
    }
  }

  await writeFile(
    path.join(outRoot, 'meta.json'),
    JSON.stringify({ base, path: PATH, tag, widths: WIDTHS, at: new Date().toISOString() }, null, 2),
  )
  await browser.close()
  console.log(`Captures → ${outRoot}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})