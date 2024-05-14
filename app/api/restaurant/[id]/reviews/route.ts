import { NextResponse } from 'next/server';
import { getReviewsByRestaurantId } from '@/lib/reviewService';

export async function GET (
  req: Request,
  { params }: { params: { id: string } },
) {
  const restaurantId = params.id;

  if (!restaurantId) {
    return NextResponse.json(
      { error: 'Invalid restaurant ID' },
      { status: 400 },
    );
  }

  try {
    const reviews = await getReviewsByRestaurantId(restaurantId);
    return NextResponse.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 },
    );
  }
}
