import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// get restaurants reviewed by followed users for specific user
export async function GET (
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const userId = params.id;

  const followedUsers = await prisma.follow.findMany({
    where: { follower_user_id: userId },
    select: { following_user_id: true },
  });

  const followedUserIds: string[] = [];
  followedUsers.forEach((user) => {
    followedUserIds.push(user.following_user_id);
  });

  const restaurants = await prisma.review.findMany({
    where: { user_id: { in: followedUserIds } },
    select: {
      restaurant: {
        include: {
          reviews: {
            select: {
              user: {
                select: {
                  id: true,
                  username: true,
                  image_url: true,
                },
              },
            },
          },
        },
      },
    },
    distinct: ['restaurant_id'],
  });

  return NextResponse.json(restaurants);
}

export default GET;
