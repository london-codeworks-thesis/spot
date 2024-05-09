import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// get average ratings for specific restaurant
export async function GET () {
  const restaurantId = '8622a26f-fcc4-49b4-bd4b-d11357adbb0d'; // get from params
  const rating = await prisma.review.aggregate({
    where: {
      restaurant_id: restaurantId,
    },
    _avg: {
      rating_food: true,
      rating_value: true,
      rating_atmosphere: true,
    }
  });
  return NextResponse.json(rating._avg);
}

// get reviews for specific restaurant
// export async function GET () {
//   const restaurantId = '8622a26f-fcc4-49b4-bd4b-d11357adbb0d'; // get from params
//   const reviews = await prisma.review.findMany({
//     where: {
//       restaurant_id: restaurantId,
//     },
//     select: {
//       user: {
//         select: {
//           username: true,
//           first_name: true,
//           last_name: true,
//           image_url: true,
//         },
//       },
//       rating_food: true,
//       rating_value: true,
//       rating_atmosphere: true,
//       created_at: true,
//     },
//   });
//   return NextResponse.json(reviews);
// }

// get restaurants reviewed by followed users for specific user
// export async function GET () {
//   const userId = '2c2dc6a6-f09b-42ef-9ff3-ae0d9135ac08'; // get from params

//   const followedUsers = await prisma.follow.findMany({
//     where: { follower_user_id: userId },
//     select: { following_user_id: true },
//   });

//   const followedUserIds: string[] = [];
//   followedUsers.forEach((user) => {
//     followedUserIds.push(user.following_user_id);
//   });

//   const restaurants = await prisma.review.findMany({
//     where: { user_id: { in: followedUserIds } },
//     select: { restaurant: true },
//     distinct: ['restaurant_id'],
//   });

//   return NextResponse.json(restaurants);
// }

export async function POST () {
  const result = 'restaurant post';
  return NextResponse.json(result);
}
