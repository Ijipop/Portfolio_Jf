import { prisma } from '@/lib/prisma'
import { authAdminToken } from '@/lib/auth-admin-request'
import { messageForProjectSaveError } from '@/lib/prisma-project-save-error'
import { resolveWebAudience } from '@/lib/project-web-audience'
import { NextRequest, NextResponse } from 'next/server'

type ProjectType = 'logiciel' | 'web'

function parseProjectType(input: unknown): ProjectType {
  return input === 'logiciel' ? 'logiciel' : 'web'
}

function parseDisplayOrder(input: unknown): number {
  const value = typeof input === 'number' ? input : Number(input)
  if (!Number.isFinite(value)) return 0
  return Math.max(0, Math.trunc(value))
}

type RouteParams = { params: Promise<{ id: string }> }

// DELETE /api/projects/[id] - Supprimer un project par ID (PROTÉGÉ)
export async function DELETE(request: NextRequest, { params }: RouteParams)
{
	const auth = authAdminToken(request)
	if (!auth.ok) {
		return NextResponse.json({ success: false, error: auth.error }, { status: auth.status })
	}

	try
	{
		const { id: idParam } = await params
		const id = parseInt(idParam)

		// Validation de l'ID
		if (isNaN(id) || id <= 0)
		{
			return NextResponse.json(
				{
					success: false,
					error: 'ID du project invalide'
				},
				{
					status: 400
				}
			)
		}

		// Vérifier si le project existe
		const existingProject = await prisma.project.findUnique({
			where: { id }
		})

		if (!existingProject)
		{
			return NextResponse.json(
				{
					success: false,
					error: 'Project non trouvé'
				},
				{
					status: 404
				}
			)
		}

		// Supprimer le project
		await prisma.project.delete({
			where: { id }
		})

		return NextResponse.json({
			success: true,
			message: 'Project supprimé avec succès'
		})
	}
	catch (error)
	{
		console.error('Erreur lors de la suppression du project:', error)
		return NextResponse.json(
			{
				success: false,
				error: 'Erreur lors de la suppression du project'
			},
			{
				status: 500
			}
		)
	}
}

// PUT /api/projects/[id] - Modifier un project par ID (PROTÉGÉ)
export async function PUT(request: NextRequest, { params }: RouteParams)
{
	const auth = authAdminToken(request)
	if (!auth.ok) {
		return NextResponse.json({ success: false, error: auth.error }, { status: auth.status })
	}

	try
	{
		const { id: idParam } = await params
		const id = parseInt(idParam)

		// Validation de l'ID
		if (isNaN(id) || id <= 0)
		{
			return NextResponse.json(
				{
					success: false,
					error: 'ID du project invalide'
				},
				{
					status: 400
				}
			)
		}

		const body = await request.json()
		const { name, description, technologies, status, url, siteUrl, downloadUrl, imageUrl, projectType, displayOrder, webAudience } = body
		const pt = parseProjectType(projectType)

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

		// Vérifier si le project existe
		const existingProject = await prisma.project.findUnique({
			where: { id }
		})

		if (!existingProject)
		{
			return NextResponse.json(
				{
					success: false,
					error: 'Project non trouvé'
				},
				{
					status: 404
				}
			)
		}

		const site =
			typeof siteUrl === 'string' && siteUrl.trim().length > 0 ? siteUrl.trim() : null
		if (site && !/^https?:\/\//i.test(site)) {
			return NextResponse.json(
				{ success: false, error: 'L’URL du site doit commencer par http:// ou https://' },
				{ status: 400 }
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

		// Mettre à jour le project
		const updatedProject = await prisma.project.update({
			where: { id },
			data: {
				name: name.trim(),
				description: description.trim(),
				technologies: technologies.trim(),
				status: status.trim(),
				url: url || '',
				siteUrl: site,
				downloadUrl: dl,
				imageUrl: imageUrl || '',
				projectType: pt,
				displayOrder: parseDisplayOrder(displayOrder),
				webAudience: resolveWebAudience(webAudience, pt),
			},
		})

		return NextResponse.json({
			success: true,
			data: updatedProject,
			message: 'Project modifié avec succès'
		})
	}
	catch (error)
	{
		console.error('Erreur lors de la modification du project:', error)
		return NextResponse.json(
			{
				success: false,
				error: messageForProjectSaveError(error, 'Erreur lors de la modification du project'),
			},
			{
				status: 500
			}
		)
	}
}

// GET /api/projects/[id] - Obtenir un project par ID (bonus)
export async function GET(request: NextRequest, { params }: RouteParams)
{
	try
	{
		const { id: idParam } = await params
		const id = parseInt(idParam)

		// Validation de l'ID
		if (isNaN(id) || id <= 0)
		{
			return NextResponse.json(
				{
					success: false,
					error: 'ID du project invalide'
				},
				{
					status: 400
				}
			)
		}

		// Récupérer le project
		const project = await prisma.project.findUnique({
			where: { id }
		})

		if (!project)
		{
			return NextResponse.json(
				{
					success: false,
					error: 'Project non trouvé'
				},
				{
					status: 404
				}
			)
		}

		return NextResponse.json({
			success: true,
			data: project,
			message: 'Project trouvé'
		})
	}
	catch (error)
	{
		console.error('Erreur lors de la récupération du project:', error)
		return NextResponse.json(
			{
				success: false,
				error: 'Erreur lors de la récupération du project'
			},
			{
				status: 500
			}
		)
	}
}