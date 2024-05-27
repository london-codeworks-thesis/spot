import { getServerSession } from 'next-auth';
import { authConfig } from '@/lib/auth';

export async function getSession () {
  return getServerSession(authConfig);
}
