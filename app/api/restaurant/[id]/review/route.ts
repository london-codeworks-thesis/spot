import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET () {
  const result = await prisma.review.findMany();
  return NextResponse.json(result);
}

// add new review
export async function POST (req: NextRequest) {
  const data = await req.json();

  const existingRestaurant = await prisma.restaurant.findUnique({
    where: {
      google_id: data.google_id,
    },
  });

  let restaurant;

  if (!existingRestaurant) {
    restaurant = await prisma.restaurant.create({
      data: {
        google_id: data.google_id,
        name: data.name,
        address: data.address,
        phone: data.phone,
        google_maps_uri: data.google_maps_uri,
        price_level: data.price_level,
        type: data.type,
        opening_hours: data.opening_hours,
        summary: data.summary,
        image_url: data.image_url,
        latitude: data.latitude,
        longitude: data.longitude,
      },
    });
  }

  const review = await prisma.review.create({
    data: {
      user_id: data.userId,
      restaurant_id: existingRestaurant
        ? existingRestaurant.id
        : restaurant!.id,
      rating_food: data.rating_food,
      rating_value: data.rating_value,
      rating_atmosphere: data.rating_atmosphere,
      created_at: new Date(Date.now()),
    },
  });

  return NextResponse.json(review, { status: 201 });
}
