import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// get user info for profile page
export async function GET (
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const userId = params.id;
  const result = await prisma.user.findUnique({
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
              latitude: true,
              longitude: true,
            },
          },
          rating_food: true,
          rating_value: true,
          rating_atmosphere: true,
          created_at: true,
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
  return NextResponse.json(result);
}

export async function POST () {
  console.log('post');
}
