import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@lib/prisma';
import NextAuth from 'next-auth';
import authConfig from 'src/auth.config';

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
    session ({ token, ...rest }) {
      return {
        user: {
          id: token.sub!,
        },
        expires: rest.session.expires,
      };
    },
  },
});
