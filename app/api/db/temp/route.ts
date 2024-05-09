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
    },
  });
  return NextResponse.json(rating._avg);
}

export async function POST () {
  const result = 'restaurant post';
  return NextResponse.json(result);
}
