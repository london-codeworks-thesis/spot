// import { NextResponse, NextRequest } from 'next/server';
// import { auth } from '@/auth';

// export async function middleware (req: NextRequest) {
//   try {
//     const session = await auth();
//     console.log('session', session);

//     if (!session || !session.user?.id) {
//       throw new Error('Session is undefined or id is missing');
//     }

//     return NextResponse.next();
//   } catch (error) {
//     // console.error(error);
//     // Redirect to login page or throw error
//     return NextResponse.rewrite(new URL('/', req.url));
//   }
// }
// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// };
export { auth as middleware } from '@/auth';
