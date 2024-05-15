'use server';

import prisma from './prisma';

export async function follow (currentUserId: string, targetUserId: string) {
  try {
    await prisma.userRelationship.create({
      data: {
        follower_user_id: currentUserId,
        followed_user_id: targetUserId,
      },
    });
    return true;
  } catch (error) {
    console.error('Error following user:', error);
    return false;
  }
}

export async function unfollow (currentUserId: string, targetUserId: string) {
  try {
    await prisma.userRelationship.deleteMany({
      where: {
        follower_user_id: currentUserId,
        followed_user_id: targetUserId,
      },
    });
    return true;
  } catch (error) {
    console.error('Error unfollowing user:', error);
    return false;
  }
}

export async function handleActionButtonClick (
  currentUserId: string,
  profileUserId: string,
  actionButtonValue: string,
) {
  if (actionButtonValue === 'Follow' || actionButtonValue === 'Follow Back') {
    return follow(currentUserId as string, profileUserId as string);
  }
  if (actionButtonValue === 'Unfollow') {
    return unfollow(currentUserId as string, profileUserId as string);
  }
  console.log('NOT IMPLEMENTED YET');
  return false;
}
