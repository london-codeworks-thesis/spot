import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// get reviews for specific restaurant
export async function GET (req: NextRequest, { params }: { params: { id: string } }) {
  const restaurantId = params.id;
  const reviews = await prisma.review.findMany({
    where: {
      restaurant_id: restaurantId,
    },
    select: {
      user: {
        select: {
          username: true,
          first_name: true,
          last_name: true,
          image_url: true,
        },
      },
      rating_food: true,
      rating_value: true,
      rating_atmosphere: true,
      created_at: true,
    },
  });
  return NextResponse.json(reviews);
}

export default GET;
