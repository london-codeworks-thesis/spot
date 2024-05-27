// import { NextResponse } from 'next/server';
// import { auth } from '@/auth';

// export async function middleware (req) {
//   const session = await auth();
//   console.log('session', session);

//   if (!session) {
//     return NextResponse.redirect(new URL('/', req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// };
import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export async function middleware (req) {
  const session = await auth();
  console.log('session', session);

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
