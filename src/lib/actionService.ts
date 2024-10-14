'use server';

import { currentUser } from '@clerk/nextjs/server';
import prisma from '@lib/prisma';
import { revalidateTag } from 'next/cache';

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
  try {
    await prisma.userRelationship.create({
      data: {
        follower_user_id: user.id,
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
  try {
    await prisma.userRelationship.deleteMany({
      where: {
        follower_user_id: user.id,
        followed_user_id: targetUser.id,
      },
    });
  } catch (error) {
    throw new Error(`Error Unfollowing user: ${error}`);
  }
  revalidateTag(`user_${targetUser.username}`);
  revalidateTag(`user_${user.id}`);
}

export async function handleActionButtonClick (
  actionButtonValue: string,
  username: string,
) {
  if (actionButtonValue === 'Follow' || actionButtonValue === 'Follow Back') {
    return follow(username);
  }
  if (actionButtonValue === 'Unfollow') {
    return unfollow(username);
  }
  // TODO: Implement edit profile functionality
  console.log('NOT IMPLEMENTED YET');
  return false;
}
