// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware (req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Define routes for logged-in users to be redirected away from
  const loginRoutes = ['/login', '/'];

  // Redirect logged in users away from login routes
  if (token && loginRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Redirect not logged in users trying to access protected routes
  if (!token && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login/:path*', // Apply to login routes
    '/dashboard/:path*', // Apply to dashboard routes
    '/', // Apply to welcome page
  ],
};
