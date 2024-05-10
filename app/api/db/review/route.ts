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
      google_id: data.googleId,
    },
  });

  let restaurant;

  if (!existingRestaurant) {
    restaurant = await prisma.restaurant.create({
      data: {
        google_id: data.googleId,
        name: data.name,
        address: data.address,
        phone: data.phone,
        google_maps_uri: data.googleMapsUri,
        price_level: data.priceLevel,
        type: data.type,
        opening_hours: data.openingHours,
        summary: data.summary,
        image_url: data.imageUrl,
        latitude: data.latitude,
        longitude: data.longitude,
      },
    });
  }

  const review = await prisma.review.create({
    data: {
      user_id: data.userId,
      restaurant_id: existingRestaurant ? existingRestaurant.id : restaurant.id,
      rating_food: data.ratingFood,
      rating_value: data.ratingValue,
      rating_atmosphere: data.ratingAtmosphere,
      created_at: new Date(Date.now()),
    },
  });

  return NextResponse.json(review);
}
