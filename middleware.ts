import { auth } from '@/auth';

// eslint-disable-next-line consistent-return
export default auth((req) => {
  if (
    !req.auth
    && req.nextUrl.pathname !== '/login'
    && req.nextUrl.pathname !== '/'
  ) {
    const newUrl = new URL('/', req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
