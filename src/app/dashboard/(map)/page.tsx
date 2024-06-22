import React from 'react';
import MarkerMap from 'src/components/markerMap';
import { getRestaurantsReviewedByFollowedUsers } from 'src/lib/restaurantService';

export default async function Page () {
  // Fetch restaurants reviewed by followed users
  const data = await getRestaurantsReviewedByFollowedUsers();
  return (
    <div className='relative h-full w-full'>
      <MarkerMap data={data} />
    </div>
  );
}
