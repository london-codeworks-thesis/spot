import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// get restaurants reviewed by followed users for specific user
export async function GET () {
  const account = await prisma.account.findFirst();
  const userId = account?.userId;

  const followedUsers = await prisma.follow.findMany({
    where: { follower_user_id: userId },
    select: { following_user_id: true },
  });

  const followedUserIds: string[] = [];
  followedUsers.forEach((user) => {
    followedUserIds.push(user.following_user_id);
  });

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

  return NextResponse.json(restaurants);
}

export async function POST () {
  console.log('post');
}
