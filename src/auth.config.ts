import { authRoutes, unprotectedRoutes } from '@router/routes';
import type { NextAuthConfig, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@lib/prisma';

const BASE_PATH = '/api/auth';

// Function to check if the current environment is edge
const isEdgeEnvironment = () => process.env.NEXT_RUNTIME === 'edge';

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
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize (credentials) {
        console.log('Authorize method called with credentials:', credentials);
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (
          user
          && bcrypt.compareSync(
            credentials.password as string,
            user.password as string,
          )
        ) {
          // Explicitly type the user object to match the User type
          const typedUser: User = {
            id: user.id,
            email: user.email,
            image: user.image,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
          };
          return typedUser;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt ({ token, user }) {
      // When the user is first created or updated, include the username in the token
      if (user) {
        token.username = user.username;
      } else {
        // Fetch the username from the database if it's not already in the token and not in an edge environment
        // eslint-disable-next-line no-lonely-if
        if (!token.username && !isEdgeEnvironment()) {
          const dbUser = await prisma.user.findUnique({
            where: { id: token.sub },
          });
          if (dbUser) {
            token.username = dbUser.username;
          }
        }
      }
      return token;
    },
    async session ({ session, token }) {
      // Include the username in the session object
      if (token?.username) {
        session.user.username = token.username.toString();
      }
      return session;
    },
    authorized ({ auth, request: { nextUrl } }) {
      const { pathname, search } = nextUrl;
      const isLoggedIn = !!auth?.user;
      const isOnAuthRoute = authRoutes.some((page) => pathname.startsWith(page));
      const isUnprotectedPage = pathname === '/'
        || unprotectedRoutes.some((page) => pathname.startsWith(page));
      const isProtectedPage = !isUnprotectedPage;
      const hasUsername = auth?.user?.username;

      console.log('User in auth middleware:', auth);

      if (isOnAuthRoute && isLoggedIn) {
        // Redirect to dashboard, if logged in and is on an auth page
        return NextResponse.redirect(new URL('/dashboard', nextUrl));
      }
      if (isProtectedPage) {
        // Redirect to /login, if not logged in but is on a protected page
        if (!isLoggedIn) {
          const from = encodeURIComponent(pathname + search); // The /login page shall then use this `from` param as a `callbackUrl` upon successful sign in
          if (!nextUrl.searchParams.has('from')) {
            return NextResponse.redirect(
              new URL(`/login?from=${from}`, nextUrl),
            );
          }
        }
        if (isLoggedIn && !hasUsername && pathname !== '/onboarding') {
          return NextResponse.redirect(new URL('/onboarding', nextUrl));
        }
      }
      // Don't redirect if on an unprotected page, or if logged in and is on a protected page
      return true;
    },
  },
} satisfies NextAuthConfig;
