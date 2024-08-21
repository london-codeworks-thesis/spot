import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      first_name: string | null;
      last_name: string | null;
      username?: string | null;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    id: string;
    first_name: string | null;
    last_name: string | null;
    username?: string | null;
  }
}
