import type { Review } from '@prisma/client';
import { getSession } from '@/hooks/getSession';
import prisma from './prisma';
import { getUserFollowing } from './userService';

/**
 * Retrieves all reviews for a given restaurant.
 * @param restaurantId - The ID of the restaurant.
 * @returns An array of reviews related to the restaurant.
 */
export async function getReviewsByRestaurantId (
  restaurantId: string,
): Promise<Review[]> {
  try {
    const reviews = await prisma.review.findMany({
      where: {
        restaurant_id: restaurantId,
      },
      include: {
        user: {
          select: {
            id: true,
            image: true, // Include user's image
          },
        },
        restaurant: true, // Include restaurant details if needed
      },
    });

    return reviews;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw new Error('Could not fetch reviews');
  }
}

export async function getReviewsFromFollowedUsers (): Promise<Review[]> {
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

  // Get the reviews by the followed users
  const reviews = await prisma.review.findMany({
    where: {
      user_id: { in: followingUserIds },
    },
    include: {
      user: {
        select: {
          id: true,
          image: true, // Include user's image
        },
      },
      restaurant: true, // Include the restaurant details in the review
    },
  });

  return reviews;
}
