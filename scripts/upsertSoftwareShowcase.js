/**
 * Upsert showcase logiciels: Timelendr, Overstamp, Space Taker, CPU-ZE.
 * Usage: node scripts/upsertSoftwareShowcase.js
 */
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const SPACE_TAKER_WINDOWS_EXE =
  'https://github.com/Ijipop/Space-Taker/releases/download/v0.2.23/SpaceTaker_0.2.23_x64-setup.exe'
const SPACE_TAKER_MACOS_DMG =
  'https://github.com/Ijipop/Space-Taker/releases/download/v0.2.0/SpaceTaker_0.2.0_aarch64.dmg'
const CPU_ZE_WINDOWS_EXE =
  'https://github.com/Ijipop/CPU-ZE/releases/download/v0.3.13/CPU-ZE_0.3.13_x64-setup.exe'

const SHOWCASE = [
  {
    matchNames: ['timelendr', 'timelendar'],
    data: {
      name: 'Timelendr',
      description:
        'Timeline collaborative en temps réel et calendrier classique — planifier, synchroniser et livrer plus clairement.',
      technologies: 'React, TypeScript, Tauri, Vite, Supabase',
      status: 'Terminé',
      projectType: 'logiciel',
      webAudience: null,
      displayOrder: 1,
      url: '/logiciel/timelendr',
      siteUrl: null,
      imageUrl: '/imgs/images/timelendrpro.svg',
    },
  },
  {
    matchNames: ['overstamp', 'overtstamp', 'fanmark', 'fan mark'],
    data: {
      name: 'Overstamp',
      description:
        'Filigrane en lot confidentiel pour créateurs indépendants, browser based, rapide.',
      technologies: 'Browser, Web',
      status: 'Terminé',
      projectType: 'logiciel',
      webAudience: null,
      displayOrder: 2,
      url: 'https://www.overstamp.studio/',
      siteUrl: 'https://www.overstamp.studio/',
      downloadUrl: null,
      imageUrl: '/imgs/images/Overstamp_icon.svg',
    },
  },
  {
    matchNames: ['space taker', 'spacetaker', 'space-taker'],
    data: {
      name: 'Space Taker',
      description:
        'Outil simple et rapide pour voir d’un coup d’œil ce qui prend de la place sur votre disque dur.',
      technologies: 'Desktop, Windows, macOS',
      status: 'Terminé',
      projectType: 'logiciel',
      webAudience: null,
      displayOrder: 3,
      /** Landing produit. */
      url: '/spacetaker',
      siteUrl: null,
      downloadUrl: null,
      windowsUrl: SPACE_TAKER_WINDOWS_EXE,
      macosUrl: SPACE_TAKER_MACOS_DMG,
      imageUrl: '/imgs/images/SpaceTaker_icon.png',
    },
  },
  {
    matchNames: ['cpu-ze', 'cpu ze', 'cpuze'],
    data: {
      name: 'CPU-ZE',
      description:
        'Voir CPU, RAM et températures en un coup d’œil — mini gestionnaire de tâches Windows, clair et léger.',
      technologies: 'Desktop, Windows',
      status: 'Terminé',
      projectType: 'logiciel',
      webAudience: null,
      displayOrder: 4,
      url: '/cpu-ze',
      siteUrl: null,
      downloadUrl: null,
      windowsUrl: CPU_ZE_WINDOWS_EXE,
      macosUrl: null,
      imageUrl: '/img/cpu-ze/cpu-ze-01.png',
    },
  },
]

function matchesName(name, matchNames) {
  const n = (name || '').toLowerCase()
  return matchNames.some((m) => n.includes(m))
}

async function upsertOne({ matchNames, data }) {
  const existing = await prisma.project.findMany({
    where: { projectType: 'logiciel' },
  })
  const hit = existing.find((p) => matchesName(p.name, matchNames))

  if (hit) {
    const updated = await prisma.project.update({
      where: { id: hit.id },
      data: {
        name: data.name,
        description: data.description,
        technologies: data.technologies,
        status: data.status,
        projectType: data.projectType,
        webAudience: data.webAudience,
        displayOrder: data.displayOrder,
        url: data.url ?? hit.url,
        siteUrl: Object.prototype.hasOwnProperty.call(data, 'siteUrl') ? data.siteUrl : hit.siteUrl,
        imageUrl: data.imageUrl,
        ...(Object.prototype.hasOwnProperty.call(data, 'downloadUrl')
          ? { downloadUrl: data.downloadUrl }
          : {}),
        ...(Object.prototype.hasOwnProperty.call(data, 'windowsUrl')
          ? { windowsUrl: data.windowsUrl }
          : {}),
        ...(Object.prototype.hasOwnProperty.call(data, 'macosUrl') ? { macosUrl: data.macosUrl } : {}),
      },
    })
    console.log(`Updated: ${updated.name} (#${updated.id})`)
    return updated
  }

  const created = await prisma.project.create({
    data: {
      name: data.name,
      description: data.description,
      technologies: data.technologies,
      status: data.status,
      projectType: data.projectType,
      webAudience: data.webAudience,
      displayOrder: data.displayOrder,
      url: data.url || '',
      siteUrl: data.siteUrl,
      downloadUrl: data.downloadUrl ?? null,
      windowsUrl: data.windowsUrl ?? null,
      macosUrl: data.macosUrl ?? null,
      imageUrl: data.imageUrl,
    },
  })
  console.log(`Created: ${created.name} (#${created.id})`)
  return created
}

async function main() {
  for (const entry of SHOWCASE) {
    await upsertOne(entry)
  }
  console.log('Done.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
