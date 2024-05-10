import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// get followers and following for specific user
export async function GET (req: NextRequest, { params }: { params: { id: string } }) {
  const userId = params.id;
  const followers = await prisma.follow.findMany({
    where: { following_user_id: userId },
    select: {
      follower_user: {
        select: {
          id: true,
          username: true,
          first_name: true,
          last_name: true,
          image_url: true,
        },
      },
      is_accepted: true,
      created_at: true,
      updated_at: true,
    },
  });

  const following = await prisma.follow.findMany({
    where: { follower_user_id: userId },
    select: {
      following_user: {
        select: {
          id: true,
          username: true,
          first_name: true,
          last_name: true,
          image_url: true,
        },
      },
      is_accepted: true,
      created_at: true,
      updated_at: true,
    },
  });

  const response = {
    followers,
    following,
  };

  return NextResponse.json(response);
}

export default GET;
