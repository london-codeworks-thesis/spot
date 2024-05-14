import type { Restaurant } from '@prisma/client';
import { getSession } from '@/hooks/getSession';
import prisma from './prisma';
import { getUserFollowing } from './userService';

export async function getRestaurant (
  restaurantId: string,
): Promise<Restaurant | null> {
  const restaurant = await prisma.restaurant.findUnique({
    where: { id: restaurantId },
  });
  return restaurant;
}

export async function getRestaurantsReviewedByFollowedUsers () {
  const session = await getSession();
  const user = session?.user;

  if (!user) {
    throw new Error('User not found in session');
  }

  // Get the list of users that the session user is following
  const followingUsers = await getUserFollowing(user.id);
  const followingUserIds = followingUsers.map(
    (followingUser) => followingUser.id,
  );

  // Get the reviews of the restaurants by the followed users
  const reviews = await prisma.review.findMany({
    where: {
      user_id: { in: followingUserIds },
    },
    include: {
      restaurant: true, // Include the restaurant details in the review
    },
  });

  // Extract unique restaurants from the reviews
  const uniqueRestaurants = reviews.reduce(
    (acc, review) => {
      if (!acc.some((restaurant) => restaurant.id === review.restaurant.id)) {
        acc.push(review.restaurant);
      }
      return acc;
    },
    [] as Array<(typeof reviews)[0]['restaurant']>,
  );

  return uniqueRestaurants;
}
