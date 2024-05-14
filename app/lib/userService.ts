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

export async function getRestaurantsReviewedByUser (userId: string) {
  const restaurants = await prisma.review.findMany({
    where: { user_id: userId },
    select: {
      restaurant: {
        include: {
          reviews: {
            select: {
              user: {
                select: {
                  id: true,
                  username: true,
                  image: true,
                },
              },
              rating_food: true,
              rating_atmosphere: true,
              rating_value: true,
              created_at: true,
            },
          },
        },
      },
    },
    distinct: ['restaurant_id'],
  });
  return restaurants;
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
  const [userFollowers, userFollowing] = await Promise.all([
    getUserFollowers(currentUserId),
    getUserFollowing(currentUserId),
  ]);

  console.log('Current user is Following:', userFollowing);
  console.log('Current user is Followed By:', userFollowers);

  if (userFollowing.some((user) => user.id === targetUserId)) {
    return 'unfollow';
  }
  if (userFollowers.some((user) => user.id === targetUserId)) {
    return 'followBack';
  }
  return 'follow';
}
