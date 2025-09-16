import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  // Vérifier si c'est une route admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = request.cookies.get('adminToken')?.value;
    
    if (!token) {
      // Rediriger vers la page d'accueil si pas de token
      return NextResponse.redirect(new URL('/', request.url));
    }

    try {
      // Vérifier le token
      jwt.verify(token, process.env.JWT_SECRET!);
      // Token valide, continuer
      return NextResponse.next();
    } catch (error) {
      // Token invalide, rediriger
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};
