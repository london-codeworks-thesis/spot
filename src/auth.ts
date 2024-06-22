import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/lib/prisma';
import authConfig from './auth.config';

// declare module 'next-auth' {
//   interface Session {
//     user: { id: string; name: string };
//   }
// }

export const {
  auth,
  handlers: { GET, POST },
  signIn,
} = NextAuth({
  ...authConfig,
  providers: [...authConfig.providers],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    ...authConfig.callbacks,
    session ({ token, user, ...rest }) {
      return {
        user: {
          id: token.sub!,
        },
        expires: rest.session.expires,
      };
    },
  },
});
