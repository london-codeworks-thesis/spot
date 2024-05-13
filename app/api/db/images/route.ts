import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET () {
  const result = await prisma.review.findMany({
    select: {
      restaurant: {
        select: {
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
  const images: any[] = [];
  result.forEach((item) => images.push(item.restaurant.image_url));
  return NextResponse.json(images);
  // return result;
}

// add new review
export async function POST () {
  console.log('post');
}
