import { auth } from '@/auth';
import { authRoutes } from '@/router/routes';
// eslint-disable-next-line consistent-return
export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Handle the case where user is accessing an auth route
  if (authRoutes.includes(pathname)) {
    // Redirect to dashboard if user is already authenticated
    if (req.auth) {
      const newUrl = new URL('/dashboard', req.nextUrl.origin);
      return Response.redirect(newUrl);
    }
    // Continue to the route if user is not authenticated
  } else if (pathname.startsWith('/api')) {
    // Handle the case where user is accessing a protected API route
    if (!pathname.startsWith('/api/auth') && !req.auth) {
      // Redirect to login if user is not authenticated
      const newUrl = new URL('/login', req.nextUrl.origin);
      return Response.redirect(newUrl);
    }
  } else if (!req.auth) {
    // Handle the case where user is accessing a protected route
    const newUrl = new URL('/', req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
