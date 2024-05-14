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
