import type { NextAuthConfig } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import { authRoutes, unprotectedRoutes } from 'src/router/routes';
import { NextResponse } from 'next/server';

const BASE_PATH = '/api/auth';

export default {
  basePath: BASE_PATH,
  pages: {
    signIn: '/login',
  },
  providers: [
    GoogleProvider({
      allowDangerousEmailAccountLinking: true,
      checks: ['none'],
      profile (profile) {
        return {
          id: profile.sub,
          name: profile.name,
          first_name: profile.given_name,
          last_name: profile.family_name,
          email: profile.email,
          image: profile.picture.replace('s96-c', 's240-c'),
        };
      },
    }),
    FacebookProvider({
      allowDangerousEmailAccountLinking: true,
      profile (profile) {
        return {
          id: profile.id,
          name: profile.name,
          first_name: profile.first_name,
          last_name: profile.last_name,
          email: profile.email,
          image: profile.picture.data.url.replace(
            'width=50&height=50',
            'width=400&height=400',
          ),
        };
      },
    }),
  ],
  callbacks: {
    authorized ({ auth, request: { nextUrl } }) {
      const { pathname, search } = nextUrl;
      const isLoggedIn = !!auth?.user;
      const isOnAuthRoute = authRoutes.some((page) => pathname.startsWith(page));
      const isUnprotectedPage = pathname === '/'
        || unprotectedRoutes.some((page) => pathname.startsWith(page));
      const isProtectedPage = !isUnprotectedPage;

      if (isOnAuthRoute) {
        // Redirect to dashboard, if logged in and is on an auth page
        if (isLoggedIn) if (isLoggedIn) return NextResponse.redirect(new URL('/dashboard', nextUrl));
      } else if (isProtectedPage) {
        // Redirect to /login, if not logged in but is on a protected page
        if (!isLoggedIn) {
          const from = encodeURIComponent(pathname + search); // The /login page shall then use this `from` param as a `callbackUrl` upon successful sign in
          return NextResponse.redirect(new URL(`/login?from=${from}`, nextUrl));
        }
      }
      // Don't redirect if on an unprotected page, or if logged in and is on a protected page
      return true;
    },
  },
} satisfies NextAuthConfig;
