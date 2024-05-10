import { PrismaClient } from '@prisma/client';
import users from './users';
import restaurants from './restaurants';

const prisma = new PrismaClient();

async function main () {
  console.log('seed start');

  // empty database
  await Promise.all([
    prisma.review.deleteMany(),
    prisma.follow.deleteMany(),
    prisma.user.deleteMany(),
    prisma.restaurant.deleteMany(),
  ]);

  const promises: any[] = [];

  // seed users
  users.forEach((user) => {
    promises.push(prisma.user.create({ data: user }));
  });

  // seed restaurants
  restaurants.forEach((restaurant) => {
    promises.push(prisma.restaurant.create({ data: restaurant }));
  });
  await Promise.all(promises);

  for (const user of users) {
    const selectedUser = await prisma.user.findUnique({
      where: {
        username: user.username,
      },
    });

    // seed ratings
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

  // seed followers // TBU
  const firstUser = await prisma.user.findFirst();
  const secondUser = await prisma.user.findFirst({ skip: 1 });
  const thirdUser = await prisma.user.findFirst({ skip: 2 });

  await prisma.follow.createMany({
    data: [
      {
        follower_user_id: secondUser?.id,
        following_user_id: firstUser?.id,
        is_accepted: true,
        created_at: new Date(Date.now()),
        updated_at: new Date(Date.now()),
      },
      {
        follower_user_id: firstUser?.id,
        following_user_id: secondUser?.id,
        is_accepted: true,
        created_at: new Date(Date.now()),
        updated_at: new Date(Date.now()),
      },
      {
        follower_user_id: secondUser?.id,
        following_user_id: thirdUser?.id,
        is_accepted: true,
        created_at: new Date(Date.now()),
        updated_at: new Date(Date.now()),
      },
      {
        follower_user_id: thirdUser?.id,
        following_user_id: firstUser?.id,
        is_accepted: true,
        created_at: new Date(Date.now()),
        updated_at: new Date(Date.now()),
      },
    ],
  });

  console.log('seed end');
}

main().catch((e) => {
  console.log(e);
  process.exit(1);
}).finally(() => {
  prisma.$disconnect();
});

// // seed users
//   for (const user of users) {
//     await prisma.user.create({
//       data: user,
//     });
//   }

//   // seed restaurants
//   for (const restaurant of restaurants) {
//     await prisma.restaurant.create({
//       data: restaurant,
//     });
//   }

//   for (const user of users) {
//     const selectedUser = await prisma.user.findUnique({
//       where: {
//         username: user.username,
//       },
//     });

//     // seed ratings
//     for (const restaurant of restaurants) {
//       const selectedRestaurant = await prisma.restaurant.findUnique({
//         where: {
//           google_id: restaurant.google_id,
//         },
//       });
//       await prisma.review.create({
//         data: {
//           user_id: selectedUser?.id,
//           restaurant_id: selectedRestaurant?.id,
//           rating_food: Math.floor(Math.random() * (5 - 2 + 1)) + 2,
//           rating_value: Math.floor(Math.random() * (5 - 2 + 1)) + 2,
//           rating_atmosphere: Math.floor(Math.random() * (5 - 2 + 1)) + 2,
//           created_at: new Date(Date.now()),
//         },
//       });
//     }
//   }
