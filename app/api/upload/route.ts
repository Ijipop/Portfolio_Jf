import { NextRequest, NextResponse } from 'next/server'
import { authAdminToken } from '@/lib/auth-admin-request'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

// POST /api/upload - Uploader une image (PROTÉGÉ)
export async function POST(request: NextRequest) {
  const auth = authAdminToken(request)
  if (!auth.ok) {
    return NextResponse.json({ success: false, error: auth.error }, { status: auth.status })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'Aucun fichier fourni' },
        { status: 400 }
      )
    }

    // Vérifier le type de fichier
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Type de fichier non autorisé. Utilisez JPEG, PNG, WEBP ou GIF' },
        { status: 400 }
      )
    }

    // Vérifier la taille (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: 'Le fichier est trop volumineux. Taille maximale: 5MB' },
        { status: 400 }
      )
    }

    // Créer le nom de fichier unique
    const timestamp = Date.now()
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const fileName = `${timestamp}_${originalName}`
    
    // Chemin de destination
    const uploadDir = path.join(process.cwd(), 'public', 'imgs', 'projets')
    
    // Créer le dossier s'il n'existe pas
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    // Lire le fichier et l'écrire
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filePath = path.join(uploadDir, fileName)
    
    await writeFile(filePath, buffer)

    // Retourner l'URL relative pour l'utiliser dans l'application
    const imageUrl = `/imgs/projets/${fileName}`

    return NextResponse.json({
      success: true,
      data: {
        url: imageUrl,
        fileName: fileName,
        size: file.size,
        type: file.type
      },
      message: 'Image uploadée avec succès'
    })
  } catch (error) {
    console.error('Erreur lors de l\'upload:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors de l\'upload de l\'image'
      },
      {
        status: 500
      }
    )
  }
}

