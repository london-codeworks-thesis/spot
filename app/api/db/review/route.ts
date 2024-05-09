import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET () {
  const result = await prisma.review.findMany()
  return NextResponse.json(result);
}

export async function POST() {
  const user_id = '8cea02cd-cab3-4995-9af5-28b6a0163558';
  const restaurant_id = '190bd1f6-d0d8-40b2-ad64-be0eb96cf7f8'
  
  const result = await prisma.review.create({
    data: {
      user_id,
      restaurant_id,
      rating_food: 1,
      rating_value: 2,
      rating_atmosphere: 3,
      created_at: new Date(Date.now()),
    },
  });
  return NextResponse.json(result);
}
