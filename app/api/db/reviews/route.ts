import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET () {
  const result = await prisma.review.findMany({
    select: {
      id: true,
      rating_food: true,
      rating_value: true,
      rating_atmosphere: true,
      created_at: true,
      user: {
        select: {
          id: true,
          name: true,
          image: true,
          first_name: true,
          last_name: true,
        },
      },
      restaurant: {
        select: {
          id: true,
          google_id: true,
          name: true,
          address: true,
          image_url: true,
        },
      },
    },
    orderBy: [
      {
        created_at: 'desc',
      },
    ],
  });
  return NextResponse.json(result);
  // return result;
}

// add new review
export async function POST () {
  console.log('post');
}
