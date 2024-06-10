import NextAuth, { NextAuthConfig } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import type { Adapter, AdapterUser } from 'next-auth/adapters';
import prisma from 'src/lib/prisma';

type ExtendedAdapterUser = AdapterUser & {
  first_name?: string;
  last_name?: string;
  email?: string;
};

const BASE_PATH = '/api/auth';

const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(prisma) as Adapter,
  basePath: BASE_PATH,
  pages: {
    signIn: '/login',
  },
  providers: [
    GoogleProvider({
      allowDangerousEmailAccountLinking: true,
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
    session ({ session, user }) {
      session.user.id = user.id!.toString();
      session.user.first_name = (user as ExtendedAdapterUser).first_name?.toString()
        ?? session.user.name?.split(' ')[0]
        ?? '';
      session.user.last_name = (user as ExtendedAdapterUser).last_name?.toString()
        ?? session.user.name?.split(' ').slice(1).join(' ')
        ?? '';
      return session;
    },
  },
};

export const { handlers, auth } = NextAuth(authOptions);
