import { PrismaClient } from '@prisma/client';
import { clerkClient } from '@clerk/nextjs/server';
import users from './users';
import restaurants from './restaurant';

const prisma = new PrismaClient();

async function main () {
  console.log('seed start');

  // extract user ids
  const userClerkIds = Object.values(users);

  // empty database
  // Delete linking tables first
  await Promise.all([
    prisma.review.deleteMany(),
    prisma.userRelationship.deleteMany(),
  ]);
  // Then delete the main tables
  await Promise.all([prisma.user.deleteMany(), prisma.restaurant.deleteMany()]);

  // seed users
  const userPromises = userClerkIds.map(async (userId) => {
    const user = await clerkClient.users.getUser(userId); // Fetch user details by ID
    if (!user) {
      throw new Error(`User not found: ${userId}`);
    }

    return prisma.user.create({
      data: {
        clerk_id: user.id,
        image: user.imageUrl,
        first_name: user.firstName!,
        last_name: user.lastName!,
        username: user.username!,
      },
    });
  });

  // seed restaurants
  const restaurantPromises = restaurants.map((restaurant) => prisma.restaurant.create({ data: restaurant }));

  const createdUsers = await Promise.all(userPromises);
  const createdRestaurants = await Promise.all(restaurantPromises);

  const userIds = createdUsers.map((user) => user.id);

  // seed user ratings
  await Promise.all(
    createdUsers.map(async (selectedUser) => {
      await Promise.all(
        createdRestaurants.map(async (restaurant) => {
          // Generate a random number between 0 and 1
          const chance = Math.random();

          // If the number is less than 0.5, create a review
          if (chance < 0.5) {
            const selectedRestaurant = await prisma.restaurant.findUnique({
              where: {
                google_id: restaurant.google_id,
              },
            });
            await prisma.review.create({
              data: {
                user_id: selectedUser?.id!,
                restaurant_id: selectedRestaurant?.id!,
                rating_food: Math.floor(Math.random() * (5 - 2 + 1)) + 2,
                rating_value: Math.floor(Math.random() * (5 - 2 + 1)) + 2,
                rating_atmosphere: Math.floor(Math.random() * (5 - 2 + 1)) + 2,
                created_at: new Date(Date.now()),
              },
            });
          }
        }),
      );
    }),
  );

  // Seed user relationships with 70% chance
  await Promise.all(
    userIds.map(async (follower_user_id) => {
      await Promise.all(
        userIds.map(async (followed_user_id) => {
          // Avoid self-relationship
          if (follower_user_id !== followed_user_id) {
            // Generate a random number between 0 and 1
            const chance = Math.random();

            // If the number is less than 0.7, create a user relationship
            if (chance < 0.7) {
              await prisma.userRelationship.create({
                data: {
                  follower_user_id,
                  followed_user_id,
                },
              });
            }
          }
        }),
      );
    }),
  );

  await Promise.all([
    prisma.review.deleteMany({
      where: {
        user: {
          OR: [
            {
              clerk_id: users.Toby,
            },
            {
              clerk_id: users.Sunny,
            },
          ],
        },
      },
    }),

    prisma.userRelationship.deleteMany({
      where: {
        followed_user: {
          clerk_id: users.Toby,
        },
      },
    }),

    prisma.review.deleteMany({
      where: {
        restaurant: {
          name: 'Gold',
        },
      },
    }),
  ]);

  console.log('seed end');
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
