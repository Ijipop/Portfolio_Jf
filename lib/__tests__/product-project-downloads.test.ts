import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  PRODUCT_DOWNLOADS,
  SPACE_TAKER_MACOS_URL,
  SPACE_TAKER_WINDOWS_URL,
} from '@/components/product-landings/productDownloads'
import {
  getCpuZeDownloads,
  getDeskDotDownloads,
  getSpaceTakerDownloads,
  getTraducteurDownloads,
} from '../product-project-downloads'

const { prismaMock } = vi.hoisted(() => ({
  prismaMock: {
    project: {
      findMany: vi.fn(),
    },
  },
}))

vi.mock('@/lib/prisma', () => ({
  prisma: prismaMock,
}))

describe('product-project-downloads', () => {
  beforeEach(() => {
    prismaMock.project.findMany.mockReset()
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('utilise les URLs admin Space Taker et réécrit un lien GitHub privé', async () => {
    prismaMock.project.findMany.mockResolvedValue([
      {
        name: 'Space Taker',
        url: '/spacetaker',
        windowsUrl: 'https://github.com/Ijipop/Space-Taker/releases/download/v0.2.23/SpaceTaker_0.2.23_x64-setup.exe',
        macosUrl: 'https://github.com/Ijipop/Space-Taker/releases/download/v0.2.0/app.dmg',
        downloadUrl: null,
      },
    ])
    await expect(getSpaceTakerDownloads()).resolves.toEqual({
      windows: SPACE_TAKER_WINDOWS_URL,
      macos: SPACE_TAKER_MACOS_URL,
      github: PRODUCT_DOWNLOADS.spaceTaker.github,
    })
  })

  it('retombe sur les fallbacks CPU-ZE / Traducteur si Prisma est vide', async () => {
    prismaMock.project.findMany.mockResolvedValue([])
    await expect(getCpuZeDownloads()).resolves.toEqual(PRODUCT_DOWNLOADS.cpuZe)
    await expect(getTraducteurDownloads()).resolves.toEqual({
      windows: PRODUCT_DOWNLOADS.traducteur.windows,
      github: PRODUCT_DOWNLOADS.traducteur.github,
    })
  })

  it('DeskDot n’a pas de fallback release hardcodé', async () => {
    prismaMock.project.findMany.mockResolvedValue([])
    await expect(getDeskDotDownloads()).resolves.toEqual({
      windows: '',
      github: '',
    })
  })

  it('priorise windowsUrl admin DeskDot / CPU-ZE', async () => {
    prismaMock.project.findMany.mockResolvedValue([
      {
        name: 'DeskDot',
        url: '/deskdot',
        windowsUrl: 'https://github.com/Ijipop/Deskdot-releases/releases/latest',
        macosUrl: null,
        downloadUrl: null,
      },
      {
        name: 'CPU-ZE',
        url: '/cpu-ze',
        windowsUrl: 'https://github.com/Ijipop/CPU-ZE/releases/download/v9.9.9/CPU-ZE.exe',
        macosUrl: null,
        downloadUrl: null,
      },
    ])
    await expect(getDeskDotDownloads()).resolves.toEqual({
      windows: 'https://github.com/Ijipop/Deskdot-releases/releases/latest',
      github: '',
    })
    await expect(getCpuZeDownloads()).resolves.toEqual({
      windows: 'https://github.com/Ijipop/CPU-ZE/releases/download/v9.9.9/CPU-ZE.exe',
      github: PRODUCT_DOWNLOADS.cpuZe.github,
    })
  })

  it('retombe sur les fallbacks si Prisma lève', async () => {
    prismaMock.project.findMany.mockRejectedValue(new Error('db unavailable'))
    await expect(getSpaceTakerDownloads()).resolves.toEqual({
      windows: PRODUCT_DOWNLOADS.spaceTaker.windows,
      macos: PRODUCT_DOWNLOADS.spaceTaker.macos,
      github: PRODUCT_DOWNLOADS.spaceTaker.github,
    })
    await expect(getTraducteurDownloads()).resolves.toMatchObject({
      windows: PRODUCT_DOWNLOADS.traducteur.windows,
    })
  })
})
