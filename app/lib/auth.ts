import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// eslint-disable-next-line import/prefer-default-export
export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
};
