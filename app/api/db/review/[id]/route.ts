import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET () {
  const result = await prisma.review.findMany();
  return NextResponse.json(result);
}

export async function POST (request) {
  const data = await request.json();
  const review = await prisma.review.create({
    data: {
      user_id: data.userId,
      restaurant_id: data.restaurantId,
      rating_food: data.ratingFood,
      rating_value: data.ratingValue,
      rating_atmosphere: data.ratingAtmosphere,
      created_at: new Date(Date.now()),
    },
  });
  return NextResponse.json(review);
}
