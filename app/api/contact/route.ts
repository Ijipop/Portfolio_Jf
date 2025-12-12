import { NextRequest, NextResponse } from 'next/server'

// POST /api/contact - Envoyer un message de contact
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

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

    // Ici, vous pouvez ajouter l'envoi d'email via un service comme Resend, SendGrid, etc.
    // Pour l'instant, on simule juste le succès
    // TODO: Intégrer un service d'email (Resend, SendGrid, Nodemailer, etc.)
    
    console.log('📧 Nouveau message de contact:')
    console.log('Nom:', name)
    console.log('Email:', email)
    console.log('Sujet:', subject)
    console.log('Message:', message)

    // Simuler un délai d'envoi
    await new Promise(resolve => setTimeout(resolve, 500))

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

