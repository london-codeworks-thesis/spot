import type { Review } from '@prisma/client';
import prisma from './prisma';

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
