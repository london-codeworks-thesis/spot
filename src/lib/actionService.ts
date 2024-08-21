'use server';

import { auth } from '@auth';
import prisma from '@lib/prisma';
import { revalidateTag } from 'next/cache';

export async function follow (targetUserId: string) {
  const session = await auth();
  if (!session) {
    throw new Error('User is not authenticated.');
  }
  try {
    await prisma.userRelationship.create({
      data: {
        follower_user_id: session.user.id,
        followed_user_id: targetUserId,
      },
    });
  } catch (error) {
    throw new Error(`Error following user: ${error}`);
  }
  revalidateTag(`user_${targetUserId}`);
  revalidateTag(`user_${session.user.id}`);
}

export async function unfollow (targetUserId: string) {
  const session = await auth();
  if (!session) {
    throw new Error('User is not authenticated.');
  }
  try {
    await prisma.userRelationship.deleteMany({
      where: {
        follower_user_id: session.user.id,
        followed_user_id: targetUserId,
      },
    });
  } catch (error) {
    throw new Error(`Error Unfollowing user: ${error}`);
  }
  revalidateTag(`user_${targetUserId}`);
  revalidateTag(`user_${session.user.id}`);
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
