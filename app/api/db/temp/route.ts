import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// get restaurants reviewed by followed users for specific user
export async function GET() {
  const follower_user_id = '2c2dc6a6-f09b-42ef-9ff3-ae0d9135ac08';
  
  const followedUsers = await prisma.follow.findMany({
  const followedUserIds = [];
    where: { follower_user_id: follower_user_id },
    select: { following_user_id: true },
  });

  followedUsers.forEach((user) => {
    followedUserIds.push(user.following_user_id);
  });

  const restaurants = await prisma.review.findMany({
    where: { user_id: { in: followedUserIds } },
    select: { restaurant: true },
    distinct: ['restaurant_id'],
  });

  return NextResponse.json(restaurants);
}

export async function POST () {
  const result = 'restaurant post';
  return NextResponse.json(result);
}
