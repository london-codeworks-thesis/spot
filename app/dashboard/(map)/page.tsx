import React from 'react';
import { getRestaurantsReviewedByFollowedUsers } from '@/lib/restaurantService';
import MarkerMap from '@/components/markerMap';

export default async function Page () {
  // Fetch restaurants reviewed by followed users
  const data = await getRestaurantsReviewedByFollowedUsers();

  return (
    <div className='relative h-full w-full'>
      <MarkerMap data={data} />
    </div>
  );
}
