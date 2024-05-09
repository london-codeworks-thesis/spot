import fetch from 'node-fetch';

export async function GET () {
  return 'hey';
}

export async function POST (request: any) {
  try {
    const res = await fetch(
      'https://places.googleapis.com/v1/places:searchText?includedType=restaurant',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': `${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
          'X-Goog-FieldMask':
            'places.displayName,places.formattedAddress,places.id,places.primaryTypeDisplayName,places.photos',
        },
        body: JSON.stringify(request),
      },
    );

    const data = await res.json();
    return data.places;
  } catch (error) {
    console.log('Error searching restaurants', error);
  }
}
