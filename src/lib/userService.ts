import { currentUser } from '@clerk/nextjs/server';
import prisma from '@lib/prisma';
import type { User } from '@prisma/client';
import { revalidateTag, unstable_cache } from 'next/cache';

const SECONDS_IN_HOUR = 60 * 60;

export async function getUserById (userId: string) {
  if (!userId) {
    throw new Error('User ID is required');
  }

  // Create the function to fetch data
  const fetchUserData = async () => prisma.user.findUnique({
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

  // Immediately invoke the function returned by unstable_cache
  const cachedUser = await unstable_cache(fetchUserData, [userId], {
    revalidate: 60, // Cache duration in seconds
    tags: [`user_${userId}`], // Tag the cache with `user_${userId}`
  })();

  return cachedUser;
}

export async function getUserFollowers (userId: string) {
  if (!userId) {
    throw new Error('User ID is required');
  }

  const fetchFollowers = async () => {
    const followers = await prisma.userRelationship.findMany({
      where: {
        followed_user_id: userId,
      },
      select: {
        follower_user: true,
      },
    });

    return followers.map((relationship) => relationship.follower_user);
  };

  const cachedFollowers = await unstable_cache(fetchFollowers, [userId], {
    revalidate: SECONDS_IN_HOUR,
    tags: [`user_${userId}_followers`],
  })();

  return cachedFollowers;
}

export async function getUserFollowing (userId: string) {
  if (!userId) {
    throw new Error('User ID is required');
  }

  const fetchFollowing = async () => {
    const following = await prisma.userRelationship.findMany({
      where: {
        follower_user_id: userId,
      },
      select: {
        followed_user: true,
      },
    });

    return following.map((relationship) => relationship.followed_user);
  };

  const cachedFollowing = await unstable_cache(fetchFollowing, [userId], {
    revalidate: 60, // Cache duration in seconds
    tags: [`user_${userId}_following`], // Tag cache with user-specific following tag
  })();

  return cachedFollowing;
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
 * @param targetUserId - The ID of the target user.
 * @returns A string representing the action to be taken for the target user.
 */
export async function getActionButtonForTarget (targetUserId: string) {
  const user = await currentUser();

  if (!user) {
    throw new Error('User not found');
  }

  if (user.id === targetUserId) {
    return 'Edit Profile';
  }

  // Define a cacheable function
  const fetchActionButtonValue = async () => {
    const [userFollowers, userFollowing] = await Promise.all([
      getUserFollowers(user.id),
      getUserFollowing(user.id),
    ]);

    if (userFollowing.some((followed) => followed.id === targetUserId)) {
      return 'Unfollow';
    }
    if (userFollowers.some((follower) => follower.id === targetUserId)) {
      return 'Follow Back';
    }
    return 'Follow';
  };

  // Use unstable_cache to cache the result based on user.id and targetUserId
  const cachedActionButtonValue = await unstable_cache(
    fetchActionButtonValue,
    [user.id, targetUserId],
    {
      revalidate: 60, // Cache duration in seconds
      tags: [`user_${user.id}`, `user_${targetUserId}`], // Tag cache with specific ids
    },
  )();

  return cachedActionButtonValue;
}

export async function getUserSuggestions (): Promise<User[]> {
  const user = await currentUser();

  if (!user) {
    throw new Error('User not found in session');
  }

  // Fetch users the current user is following
  const following = await prisma.userRelationship.findMany({
    where: {
      follower_user_id: user.id,
    },
    select: {
      followed_user: true,
    },
  });

  // Fetch users following the current user
  const followers = await prisma.userRelationship.findMany({
    where: {
      followed_user_id: user.id,
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
          notIn: [user.id, ...suggestedUserIds],
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

    // Invalidate caches for currentUser's following and targetUser's followers
    revalidateTag(`user_${currentUserId}_following`);
    revalidateTag(`user_${targetUserId}_followers`);

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

    // Invalidate caches for currentUser's following and targetUser's followers
    revalidateTag(`user_${currentUserId}_following`);
    revalidateTag(`user_${targetUserId}_followers`);

    return true;
  } catch (error) {
    console.error('Error unfollowing user:', error);
    return false;
  }
}
