import {
  PRODUCT_DOWNLOADS,
  toSpaceTakerPublicDownloadUrl,
  type ProductDownloadLinks,
} from '@/components/product-landings/productDownloads'
import { prisma } from '@/lib/prisma'

export type { ProductDownloadLinks }

type ProjectDownloadRow = {
  name: string
  url: string | null
  windowsUrl: string | null
  macosUrl: string | null
  downloadUrl: string | null
}

function normalize(value: string | null | undefined): string {
  return (value ?? '').trim().toLowerCase()
}

function pickUrl(...candidates: Array<string | null | undefined>): string | null {
  for (const candidate of candidates) {
    const value = candidate?.trim()
    if (value) return value
  }
  return null
}

function matchProject(project: ProjectDownloadRow, keys: string[]): boolean {
  const name = normalize(project.name)
  const url = normalize(project.url)
  return keys.some((key) => name.includes(key) || url.includes(key))
}

async function findSoftwareProject(keys: string[]): Promise<ProjectDownloadRow | null> {
  try {
    const projects = await prisma.project.findMany({
      where: { projectType: 'logiciel' },
      select: {
        name: true,
        url: true,
        windowsUrl: true,
        macosUrl: true,
        downloadUrl: true,
      },
    })
    return projects.find((project) => matchProject(project, keys)) ?? null
  } catch (error) {
    console.error('Impossible de charger les liens de téléchargement produit:', error)
    return null
  }
}

/** Liens Space Taker : admin (windowsUrl / macosUrl) en priorité, fallback page Releases. */
export async function getSpaceTakerDownloads(): Promise<ProductDownloadLinks> {
  const project = await findSoftwareProject(['space taker', 'spacetaker', 'space-taker', '/spacetaker'])
  return {
    windows: toSpaceTakerPublicDownloadUrl(
      pickUrl(project?.windowsUrl, project?.downloadUrl) ?? PRODUCT_DOWNLOADS.spaceTaker.windows,
      'windows',
    ),
    macos: toSpaceTakerPublicDownloadUrl(
      pickUrl(project?.macosUrl) ?? PRODUCT_DOWNLOADS.spaceTaker.macos,
      'macos',
    ),
    github: PRODUCT_DOWNLOADS.spaceTaker.github,
  }
}

/** Liens CPU-ZE : admin (windowsUrl) en priorité, fallback hardcodé. */
export async function getCpuZeDownloads(): Promise<ProductDownloadLinks> {
  const project = await findSoftwareProject(['cpu-ze', 'cpu ze', 'cpuze', '/cpu-ze'])
  return {
    windows: pickUrl(project?.windowsUrl, project?.downloadUrl) ?? PRODUCT_DOWNLOADS.cpuZe.windows,
    github: PRODUCT_DOWNLOADS.cpuZe.github,
  }
}

/** Liens DeskDot : admin (windowsUrl) en priorité — pas de fallback release. */
export async function getDeskDotDownloads(): Promise<ProductDownloadLinks> {
  const project = await findSoftwareProject(['deskdot', 'desk dot', 'desk-dot', '/deskdot'])
  return {
    windows: pickUrl(project?.windowsUrl, project?.downloadUrl) ?? PRODUCT_DOWNLOADS.deskDot.windows,
    github: PRODUCT_DOWNLOADS.deskDot.github,
  }
}
