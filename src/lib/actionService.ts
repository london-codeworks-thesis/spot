'use server';

import { currentUser } from '@clerk/nextjs/server';
import prisma from '@lib/prisma';
import { revalidateTag } from 'next/cache';
import { getActionButtonForTarget } from '@lib/userService';

export async function follow (targetUsername: string) {
  const targetUser = await prisma.user.findUnique({
    where: { username: targetUsername },
  });

  if (!targetUser) {
    throw new Error('User not found');
  }

  const user = await currentUser();
  if (!user) {
    throw new Error('User is not authenticated.');
  }

  const userRecord = await prisma.user.findUnique({
    where: { clerk_id: user.id },
  });

  try {
    await prisma.userRelationship.create({
      data: {
        follower_user_id: userRecord!.id,
        followed_user_id: targetUser.id,
      },
    });
  } catch (error) {
    throw new Error(`Error following user: ${error}`);
  }
  revalidateTag(`user_${targetUser.username}`);
  revalidateTag(`user_${user.username}`);
}

export async function unfollow (targetUsername: string) {
  const targetUser = await prisma.user.findUnique({
    where: { username: targetUsername },
  });

  if (!targetUser) {
    throw new Error('User not found');
  }

  const user = await currentUser();
  if (!user) {
    throw new Error('User is not authenticated.');
  }

  const userRecord = await prisma.user.findUnique({
    where: { clerk_id: user.id },
  });

  try {
    await prisma.userRelationship.deleteMany({
      where: {
        follower_user_id: userRecord!.id,
        followed_user_id: targetUser.id,
      },
    });
  } catch (error) {
    throw new Error(`Error Unfollowing user: ${error}`);
  }
  revalidateTag(`user_${targetUser.username}`);
  revalidateTag(`user_${user.username}`);
}

export async function handleActionButtonClick (
  actionButtonValue: Exclude<
  Awaited<ReturnType<typeof getActionButtonForTarget>>,
  'Edit Profile'
  >,
  username: string,
) {
  if (actionButtonValue === 'Follow' || actionButtonValue === 'Follow Back') {
    return follow(username);
  }
  return unfollow(username);
}
