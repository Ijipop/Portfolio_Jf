export interface Project {
  id: number
  name: string
  description: string
  technologies: string
  status: string
  projectType?: 'logiciel' | 'web'
  webAudience?: 'personal' | 'professional' | null
  displayOrder?: number
  url: string
  siteUrl?: string | null
  downloadUrl?: string | null
  imageUrl?: string
  createdAt: string
  updatedAt: string
}

export interface TimelendrLatestLinks {
  windowsUrl: string | null
  macosUrl: string | null
}
