import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

function escapeHtml(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const SITE_TYPE_LABELS: Record<string, string> = {
  vitrine: 'Site vitrine / présentation d’entreprise',
  portfolio: 'Portfolio',
  boutique: 'Boutique en ligne',
  rdv: 'Prise de rendez-vous / réservation',
  app: 'Application web / espace client',
  other: 'Autre',
}

const BUDGET_LABELS: Record<string, string> = {
  under1000: 'Moins de 1000 $',
  '1000_2500': '1000 $ à 2500 $',
  '2500plus': '2500 $ et plus',
  discuss: 'À discuter',
}

function formatProjectWebHtml(pw: Record<string, unknown>): string | null {
  const parts: string[] = []

  const siteType = typeof pw.siteType === 'string' ? pw.siteType : ''
  if (siteType && SITE_TYPE_LABELS[siteType]) {
    let line = `<p><strong>Type de site :</strong> ${escapeHtml(SITE_TYPE_LABELS[siteType])}</p>`
    if (siteType === 'other' && typeof pw.siteTypeOther === 'string' && pw.siteTypeOther.trim()) {
      line += `<p><strong>Précision :</strong> ${escapeHtml(pw.siteTypeOther.trim())}</p>`
    }
    parts.push(line)
  }

  if (typeof pw.mainGoal === 'string' && pw.mainGoal.trim()) {
    parts.push(`<p><strong>Objectif principal :</strong><br>${escapeHtml(pw.mainGoal.trim()).replace(/\n/g, '<br />')}</p>`)
  }

  const sectionBits: string[] = []
  if (pw.pageHome === true) sectionBits.push('Accueil')
  if (pw.pageServices === true) sectionBits.push('Services')
  if (pw.pageProducts === true) sectionBits.push('Produits')
  if (pw.pageAbout === true) sectionBits.push('À propos')
  if (pw.pageContact === true) sectionBits.push('Contact')
  if (pw.pageFaq === true) sectionBits.push('FAQ')
  if (pw.pageBlog === true) sectionBits.push('Blogue')
  if (pw.pageOther === true) {
    const detail = typeof pw.pagesOtherDetail === 'string' ? pw.pagesOtherDetail.trim() : ''
    sectionBits.push(detail ? `Autre — ${detail}` : 'Autre')
  }
  if (sectionBits.length) {
    parts.push(`<p><strong>Pages / sections :</strong> ${escapeHtml(sectionBits.join(', '))}</p>`)
  }

  if (typeof pw.pagesSections === 'string' && pw.pagesSections.trim()) {
    parts.push(`<p><strong>Pages / sections (texte) :</strong><br>${escapeHtml(pw.pagesSections.trim()).replace(/\n/g, '<br />')}</p>`)
  }

  const contentBits: string[] = []
  if (pw.contentTexts === true) contentBits.push('Textes')
  if (pw.contentPhotos === true) contentBits.push('Photos / logo')
  if (pw.contentBranding === true) contentBits.push('Couleurs / identité visuelle')
  if (pw.contentNeedHelp === true) contentBits.push('Besoin d’aide pour le contenu')
  if (contentBits.length) {
    parts.push(`<p><strong>Contenu prêt :</strong> ${escapeHtml(contentBits.join(', '))}</p>`)
  }

  if (typeof pw.exampleLinks === 'string' && pw.exampleLinks.trim()) {
    parts.push(`<p><strong>Exemples de sites :</strong><br>${escapeHtml(pw.exampleLinks.trim()).replace(/\n/g, '<br />')}</p>`)
  }

  if (typeof pw.features === 'string' && pw.features.trim()) {
    parts.push(`<p><strong>Fonctionnalités :</strong><br>${escapeHtml(pw.features.trim()).replace(/\n/g, '<br />')}</p>`)
  }

  if (typeof pw.deadline === 'string' && pw.deadline.trim()) {
    parts.push(`<p><strong>Échéance :</strong> ${escapeHtml(pw.deadline.trim())}</p>`)
  }

  const budget = typeof pw.budget === 'string' ? pw.budget : ''
  if (budget && BUDGET_LABELS[budget]) {
    parts.push(`<p><strong>Budget :</strong> ${escapeHtml(BUDGET_LABELS[budget])}</p>`)
  }

  if (parts.length === 0) return null

  return `
    <hr />
    <h3>Demande de projet web</h3>
    ${parts.join('\n')}
  `
}

// POST /api/contact - Envoyer un message de contact via Resend
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message, projectWeb } = body

    // Validation des champs
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          error: 'Tous les champs sont requis'
        },
        { status: 400 }
      )
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Format d\'email invalide'
        },
        { status: 400 }
      )
    }

    const contactEmail = process.env.CONTACT_EMAIL || 'ijipop82@gmail.com'
    if (!process.env.CONTACT_EMAIL) {
      console.warn(
        '[contact] CONTACT_EMAIL non défini — utilisation du repli. Définissez CONTACT_EMAIL sur Vercel (Production).'
      )
    }
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY manquant')
      return NextResponse.json(
        { success: false, error: 'Configuration email manquante' },
        { status: 500 }
      )
    }

    let projectSection = ''
    if (projectWeb && typeof projectWeb === 'object' && !Array.isArray(projectWeb)) {
      const formatted = formatProjectWebHtml(projectWeb as Record<string, unknown>)
      if (formatted) {
        projectSection = formatted
      }
    }

    // Expéditeur : domaine vérifié dans Resend (ex. contact@votredomaine.com). Voir RESEND_FROM sur Vercel.
    const fromAddress =
      process.env.RESEND_FROM?.trim() || 'Portfolio Contact <onboarding@resend.dev>'

    if (fromAddress.includes('onboarding@resend.dev')) {
      console.warn(
        '[contact] Expéditeur Resend par défaut (onboarding@resend.dev). En test, seuls les destinataires vérifiés chez Resend reçoivent le mail — voir dashboard Resend → Emails / Logs. Utilisez un domaine vérifié + RESEND_FROM pour la prod.'
      )
    }

    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: contactEmail,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <p><strong>De:</strong> ${escapeHtml(String(name))} &lt;${escapeHtml(String(email))}&gt;</p>
        <p><strong>Sujet:</strong> ${escapeHtml(String(subject))}</p>
        <hr />
        <p>${escapeHtml(String(message)).replace(/\n/g, '<br />')}</p>
        ${projectSection}
      `
    })

    if (error) {
      console.error('[contact] Erreur Resend:', JSON.stringify(error, null, 2))
      return NextResponse.json(
        { success: false, error: 'Erreur lors de l\'envoi du message' },
        { status: 500 }
      )
    }

    console.info('[contact] Resend a accepté le message', {
      resendId: data?.id ?? null,
      to: contactEmail,
    })

    return NextResponse.json({
      success: true,
      message: 'Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.'
    })
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur lors de l\'envoi du message'
      },
      { status: 500 }
    )
  }
}
