import { PrismaClient } from '@prisma/client';
import { UserJSON } from '@clerk/nextjs/server';

const prisma = new PrismaClient();

export async function syncUserWithDatabase (clerkUser: UserJSON) {
  const { username } = clerkUser;

  const user = await prisma.user.upsert({
    where: { clerk_id: clerkUser.id },
    update: {
      image: clerkUser.image_url || null,
      first_name: clerkUser.first_name,
      last_name: clerkUser.last_name,
      username,
    },
    create: {
      clerk_id: clerkUser.id,
      image: clerkUser.image_url || null,
      first_name: clerkUser.first_name,
      last_name: clerkUser.last_name,
      username,
    },
  });

  return user;
}
