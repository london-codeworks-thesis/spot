'use server';

import { currentUser } from '@clerk/nextjs/server';
import prisma from '@lib/prisma';
import { revalidateTag } from 'next/cache';

export async function follow (targetUserId: string) {
  const user = await currentUser();
  if (!user) {
    throw new Error('User is not authenticated.');
  }
  try {
    await prisma.userRelationship.create({
      data: {
        follower_user_id: user.id,
        followed_user_id: targetUserId,
      },
    });
  } catch (error) {
    throw new Error(`Error following user: ${error}`);
  }
  revalidateTag(`user_${targetUserId}`);
  revalidateTag(`user_${user.id}`);
}

export async function unfollow (targetUserId: string) {
  const user = await currentUser();
  if (!user) {
    throw new Error('User is not authenticated.');
  }
  try {
    await prisma.userRelationship.deleteMany({
      where: {
        follower_user_id: user.id,
        followed_user_id: targetUserId,
      },
    });
  } catch (error) {
    throw new Error(`Error Unfollowing user: ${error}`);
  }
  revalidateTag(`user_${targetUserId}`);
  revalidateTag(`user_${user.id}`);
}

export async function handleActionButtonClick (
  actionButtonValue: string,
  profileId: string,
) {
  if (actionButtonValue === 'Follow' || actionButtonValue === 'Follow Back') {
    return follow(profileId);
  }
  if (actionButtonValue === 'Unfollow') {
    return unfollow(profileId);
  }
  console.log('NOT IMPLEMENTED YET');
  return false;
}
