/* eslint-disable no-param-reassign */
import { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import type { Adapter, AdapterUser } from 'next-auth/adapters';
import prisma from '@/lib/prisma';

// eslint-disable-next-line import/prefer-default-export
export const authConfig: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  pages: {
    signIn: '/login',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID ?? '',
      clientSecret: process.env.AUTH_GOOGLE_SECRET ?? '',
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
      clientId: process.env.AUTH_FACEBOOK_ID ?? '',
      clientSecret: process.env.AUTH_FACEBOOK_SECRET ?? '',
      allowDangerousEmailAccountLinking: true,
      profileUrl:
        'https://graph.facebook.com/me?fields=id,name,email,picture,first_name,last_name',
      profile (profile) {
        return {
          id: profile.id,
          name: profile.name,
          first_name: profile.first_name,
          last_name: profile.last_name,
          email: profile.email,
          image: profile.picture.data.url,
        };
      },
    }),
  ],
  callbacks: {
    async session ({
      session,
      user,
    }: {
      session: any;
      user: AdapterUser & { first_name?: string; last_name?: string };
    }) {
      if (session?.user) {
        session.user.id = user.id!;
        session.user.first_name = user.first_name!;
        session.user.last_name = user.last_name!;
      }
      return session;
    },
    async jwt ({ token }) {
      return token;
    },
  },
};
