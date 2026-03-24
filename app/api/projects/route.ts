import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

type ProjectType = 'logiciel' | 'web'

function parseProjectType(input: unknown): ProjectType {
  return input === 'logiciel' ? 'logiciel' : 'web'
}

function parseDisplayOrder(input: unknown): number {
  const value = typeof input === 'number' ? input : Number(input)
  if (!Number.isFinite(value)) return 0
  return Math.max(0, Math.trunc(value))
}

// GET /api/projects - Obtenir tous les projects
export async function GET()
{
	try
	{
		const projects = await prisma.project.findMany({
			orderBy: [
        { displayOrder: 'asc' },
        { id: 'asc' },
      ] as any
		})
		
		return NextResponse.json({
			success: true,
			data: projects,
			message: `${projects.length} project(s) trouvé(s)`
		})
	}
	catch (error)
	{
		console.error('Erreur lors de la récupération des projects:', error)
		return NextResponse.json(
			{
				success: false,
				error: 'Erreur lors de la récupération des projects'
			},
			{
				status: 500
			}
		)
	}
}

// POST /api/projects - Ajouter un nouveau project (PROTÉGÉ)
export async function POST(request: NextRequest)
{
	// Vérifier l'authentification
	const authHeader = request.headers.get('authorization')
	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		return NextResponse.json(
			{ success: false, error: 'Token d\'authentification requis' },
			{ status: 401 }
		)
	}

	const token = authHeader.substring(7)
	try {
		if (!process.env.JWT_SECRET) {
			throw new Error('JWT_SECRET non configuré')
		}
		jwt.verify(token, process.env.JWT_SECRET)
	} catch (error) {
		return NextResponse.json(
			{ success: false, error: 'Token invalide ou expiré' },
			{ status: 401 }
		)
	}

	try
	{
		const body = await request.json()
		const { name, description, technologies, status, url, downloadUrl, imageUrl, projectType, displayOrder } = body

		// Validation des données
		if (!name || typeof name !== 'string' || name.trim().length === 0) {
			return NextResponse.json(
				{
					success: false,
					error: 'Le nom du project est requis et doit être une chaîne non vide'
				},
				{
					status: 400
				}
			)
		}

		if (!description || typeof description !== 'string' || description.trim().length === 0) {
			return NextResponse.json(
				{
					success: false,
					error: 'La description du project est requise'
				},
				{
					status: 400
				}
			)
		}

		if (!technologies || typeof technologies !== 'string' || technologies.trim().length === 0) {
			return NextResponse.json(
				{
					success: false,
					error: 'Les technologies du project sont requises'
				},
				{
					status: 400
				}
			)
		}

		if (!status || typeof status !== 'string' || status.trim().length === 0) {
			return NextResponse.json(
				{
					success: false,
					error: 'Le statut du project est requis'
				},
				{
					status: 400
				}
			)
		}

		const dl =
			typeof downloadUrl === 'string' && downloadUrl.trim().length > 0 ? downloadUrl.trim() : null
		if (dl && !/^https?:\/\//i.test(dl)) {
			return NextResponse.json(
				{ success: false, error: 'L’URL de téléchargement doit commencer par http:// ou https://' },
				{ status: 400 }
			)
		}

		// Créer le project
		const project = await prisma.project.create({
			data: {
				name: name.trim(),
				description: description.trim(),
				technologies: technologies.trim(),
				status: status.trim(),
				url: url || '',
				downloadUrl: dl,
				imageUrl: imageUrl || '',
        projectType: parseProjectType(projectType),
        displayOrder: parseDisplayOrder(displayOrder),
			} as any
		})

		return NextResponse.json(
			{
				success: true,
				data: project,
				message: 'Project créé avec succès'
			},
			{
				status: 201
			}
		)
	}
	catch (error)
	{
		console.error('Erreur lors de la création du project:', error)
		return NextResponse.json(
			{
				success: false,
				error: 'Erreur lors de la création du project'
			},
			{
				status: 500
			}
		)
	}
}
