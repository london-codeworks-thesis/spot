import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const result = await prisma.restaurant.findMany();
  return NextResponse.json(result);
}

export async function POST () {
  const result = await prisma.restaurant.create({
    data: {
      google_id: 'ChIJaeMWvsIEdkgRPKGlNOE_vd8',
      name: 'Sapori',
      address: '60 Horseferry Rd, London SW1P 2AF, UK',
      phone: '+442072225488',
      google_maps_uri: 'https://maps.google.com/?cid=16122112477539705148',
      price_level: 'INEXPENSIVE',
      type: 'Italian Restaurant',
      opening_hours: [
        'Monday: 6:30 AM – 10:00 PM',
        'Tuesday: 6:30 AM – 10:00 PM',
        'Wednesday: 6:30 AM – 10:00 PM',
        'Thursday: 6:30 AM – 10:00 PM',
        'Friday: 6:30 AM – 10:00 PM',
        'Saturday: 6:30 AM – 4:00 PM',
        'Sunday: Closed',
      ],
      summary: 'A chalkboard menu of Italian classic dishes & British fare in a relaxed counter-service setting.',
      image_url: 'null',
      latitude: 51.4949702,
      longitude: -0.1277006,
    },
  });
  return NextResponse.json(result);
}
