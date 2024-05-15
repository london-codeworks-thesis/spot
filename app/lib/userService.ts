import type { User } from '@prisma/client';
import { getSession } from '@/hooks/getSession';
import prisma from './prisma';

export async function getUserById (userId: string) {
  if (!userId) {
    throw new Error('User ID is required');
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      image: true,
      reviews: {
        select: {
          restaurant: {
            select: {
              id: true,
              name: true,
              image_url: true,
              reviews: true,
              latitude: true,
              longitude: true,
            },
          },
          id: true,
          rating_food: true,
          rating_value: true,
          rating_atmosphere: true,
          created_at: true,
        },
        orderBy: {
          created_at: 'desc',
        },
      },
      _count: {
        select: {
          reviews: true,
          followers: true,
          following: true,
        },
      },
    },
  });
  return user;
}

export async function getUserFollowers (userId: string) {
  try {
    const followers = await prisma.userRelationship.findMany({
      where: {
        followed_user_id: userId,
      },
      select: {
        follower_user: true,
      },
    });

    return followers.map((relationship) => relationship.follower_user);
  } catch (error) {
    console.error('Error fetching followers:', error);
    throw new Error('Could not fetch followers');
  }
}

export async function getUserFollowing (userId: string) {
  try {
    const following = await prisma.userRelationship.findMany({
      where: {
        follower_user_id: userId,
      },
      select: {
        followed_user: true,
      },
    });

    return following.map((relationship) => relationship.followed_user);
  } catch (error) {
    console.error('Error fetching following:', error);
    throw new Error('Could not fetch following users');
  }
}

/**
 * Retrieves the value of an action button from the perspective of the given user.
 * @param currentUserId - The ID of the current user.
 * @param targetUserId - The ID of the target user.
 * @returns An array of objects representing the possible actions between the given user and other users.
 */
export async function getActionButtonsBasedOnTargetUserFollowList (
  currentUserId: string,
  targetUserId: string,
) {
  const [userFollowers, userFollowing, targetFollowers, targetFollowing] = await Promise.all([
    getUserFollowers(currentUserId),
    getUserFollowing(currentUserId),
    getUserFollowers(targetUserId),
    getUserFollowing(targetUserId),
  ]);

  const allTargetUserRelations = new Set([
    ...targetFollowers.map((user) => user.id),
    ...targetFollowing.map((user) => user.id),
  ]);

  const actionLookupTable: { userId: string; relationship: string }[] = [];

  allTargetUserRelations.forEach((id) => {
    if (userFollowing.some((user) => user.id === id)) {
      actionLookupTable.push({ userId: id, relationship: 'unfollow' });
    } else if (userFollowers.some((user) => user.id === id)) {
      actionLookupTable.push({ userId: id, relationship: 'followBack' });
    } else {
      actionLookupTable.push({ userId: id, relationship: 'follow' });
    }
  });

  return actionLookupTable;
}

/**
 * Retrieves the value of an action button for the given target user.
 * @param currentUserId - The ID of the current user.
 * @param targetUserId - The ID of the target user.
 * @returns A string representing the action to be taken for the target user.
 */
export async function getActionButtonForTarget (
  currentUserId: string,
  targetUserId: string,
) {
  if (currentUserId === targetUserId) {
    return 'Edit Profile';
  }

  const [userFollowers, userFollowing] = await Promise.all([
    getUserFollowers(currentUserId),
    getUserFollowing(currentUserId),
  ]);

  if (userFollowing.some((user) => user.id === targetUserId)) {
    return 'Unfollow';
  }
  if (userFollowers.some((user) => user.id === targetUserId)) {
    return 'Follow Back';
  }
  return 'Follow';
}

export async function getUserSuggestions (): Promise<User[]> {
  const session = await getSession();
  const currentUser = session?.user;

  if (!currentUser) {
    throw new Error('User not found in session');
  }

  // Fetch users the current user is following
  const following = await prisma.userRelationship.findMany({
    where: {
      follower_user_id: currentUser.id,
    },
    select: {
      followed_user: true,
    },
  });

  // Fetch users following the current user
  const followers = await prisma.userRelationship.findMany({
    where: {
      followed_user_id: currentUser.id,
    },
    select: {
      follower_user: true,
    },
  });

  // Get the user IDs
  const followingUserIds = following.map((rel) => rel.followed_user.id);
  const followerUserIds = followers.map((rel) => rel.follower_user.id);

  // Combine and deduplicate user IDs
  const suggestedUserIds = Array.from(
    new Set([...followingUserIds, ...followerUserIds]),
  );

  // Fetch user details for the suggested user IDs
  let suggestedUsers = await prisma.user.findMany({
    where: {
      id: {
        in: suggestedUserIds,
      },
    },
    take: 50,
  });

  // If we have less than 50 suggestions, fill up with additional users
  if (suggestedUsers.length < 50) {
    const additionalUsers = await prisma.user.findMany({
      where: {
        id: {
          notIn: [currentUser.id, ...suggestedUserIds],
        },
      },
      take: 50 - suggestedUsers.length,
    });
    suggestedUsers = suggestedUsers.concat(additionalUsers);
  }

  return suggestedUsers;
}

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
  'use server';

  if (actionButtonValue === 'Follow' || actionButtonValue === 'Follow Back') {
    return follow(currentUserId as string, profileUserId as string);
  }
  if (actionButtonValue === 'Unfollow') {
    return unfollow(currentUserId as string, profileUserId as string);
  }
  console.log('NOT IMPLEMENTED YET');
  return false;
}
