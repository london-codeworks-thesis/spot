import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

export async function GET () {
  return NextResponse.json({
    hello: 'world',
  });
}

export async function POST (request: Request) {
  try {
    const requestedData = await request.json();
    const res = await fetch(
      'https://places.googleapis.com/v1/places:searchText',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': `${process.env.GOOGLE_API_KEY}`,
          'X-Goog-FieldMask':
            'places.displayName,places.formattedAddress,places.priceLevel,places.id',
        },
        body: JSON.stringify(requestedData),
      },
    );

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
  }
}
