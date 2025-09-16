import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export interface AuthUser {
  userId: number;
  email: string;
  role: string;
}

export function verifyToken(request: NextRequest): AuthUser | null {
  try {
    // Récupérer le token depuis les cookies
    const token = request.cookies.get('adminToken')?.value;
    
    if (!token) {
      return null;
    }

    // Vérifier le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    
    return {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role
    };
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

export function requireAuth(handler: (request: NextRequest, user: AuthUser, ...args: any[]) => Promise<Response>) {
  return async (request: NextRequest, ...args: any[]): Promise<Response> => {
    const user = verifyToken(request);
    
    if (!user) {
      return new Response(
        JSON.stringify({ success: false, error: 'Non autorisé' }),
        { 
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    return handler(request, user, ...args);
  };
}
