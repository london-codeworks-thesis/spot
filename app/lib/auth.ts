import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// eslint-disable-next-line import/prefer-default-export
export const authConfig: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
  ],
};
