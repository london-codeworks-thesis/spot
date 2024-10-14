import { currentUser } from '@clerk/nextjs/server';
import prisma from '@lib/prisma';
import { getUserFollowing } from '@lib/userService';
import type { Restaurant } from '@prisma/client';

export async function getRestaurant (
  restaurantId: string,
): Promise<Restaurant | null> {
  const restaurant = await prisma.restaurant.findUnique({
    where: { id: restaurantId },
  });
  return restaurant;
}

export async function getRestaurantsReviewedByFollowedUsers (): Promise<
Restaurant[]
> {
  const user = await currentUser();
  if (!user || !user.username) {
    throw new Error('User not found');
  }

  // Get the list of users that the session user is following
  const followingUsers = await getUserFollowing(user.username);
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
  const uniqueRestaurants = reviews.reduce((acc, review) => {
    if (!acc.some((restaurant) => restaurant.id === review.restaurant.id)) {
      acc.push(review.restaurant);
    }
    return acc;
  }, [] as Array<Restaurant>);

  return uniqueRestaurants;
}

/**
 * Retrieves all restaurants reviewed by a specific user.
 * @param username - The username of the user.
 * @returns An array of restaurants reviewed by the user.
 */
export async function getRestaurantsReviewedByUser (username: string) {
  // Get the reviews of the restaurants by the specified user
  const user = await prisma.user.findUnique({
    where: { username: username },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const reviews = await prisma.review.findMany({
    where: {
      user_id: user.id,
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
