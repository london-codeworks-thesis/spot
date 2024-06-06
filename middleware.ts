import { auth } from '@/auth';
import { authRoutes } from '@/router/routes';
// eslint-disable-next-line consistent-return
export default auth((req) => {
  // Handle the case were user is accessing an auth route
  if (authRoutes.includes(req.nextUrl.pathname)) {
    // Redirect to dashboard if user is already authenticated
    if (req.auth) {
      const newUrl = new URL('/dashboard', req.nextUrl.origin);
      return Response.redirect(newUrl);
    }
    // Continue to the route if user is not authenticated
  } else if (!req.auth) {
    // Handle the case were user is accessing a protected route
    if (!authRoutes.includes(req.nextUrl.pathname)) {
      // Redirect to login if user is not authenticated
      const newUrl = new URL('/', req.nextUrl.origin);
      return Response.redirect(newUrl);
    }
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
