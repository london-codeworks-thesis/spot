import { PrismaClient } from '@prisma/client';
import users from './users';
import restaurants from './restaurants';

const prisma = new PrismaClient();

async function main () {
  console.log('seed start');
  await prisma.review.deleteMany();
  await prisma.follow.deleteMany();
  await prisma.user.deleteMany();
  await prisma.restaurant.deleteMany();

  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }

  for (const restaurant of restaurants) {
    await prisma.restaurant.create({
      data: restaurant,
    });
  }

  for (const user of users) {
    const selectedUser = await prisma.user.findUnique({
      where: {
        username: user.username,
      },
    });

    for (const restaurant of restaurants) {
      const selectedRestaurant = await prisma.restaurant.findUnique({
        where: {
          google_id: restaurant.google_id,
        },
      });

      await prisma.review.create({
        data: {
          user_id: selectedUser?.id,
          restaurant_id: selectedRestaurant?.id,
          rating_food: Math.floor(Math.random() * (5 - 2 + 1)) + 2,
          rating_value: Math.floor(Math.random() * (5 - 2 + 1)) + 2,
          rating_atmosphere: Math.floor(Math.random() * (5 - 2 + 1)) + 2,
          created_at: new Date(Date.now()),
        },
      });
    }
  }

  console.log('seed end');
}

main().catch((e) => {
  console.log(e);
  process.exit(1);
}).finally(() => {
  prisma.$disconnect();
});
