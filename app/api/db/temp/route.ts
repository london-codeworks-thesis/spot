import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// get average ratings for specific restaurant
export async function POST () {
  const restaurantId = '2f1f38bc-3f3f-4bcb-bc16-1ee4e099765a'; // get from params
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

export default POST;
