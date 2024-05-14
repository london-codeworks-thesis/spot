import React from 'react';
import MarkerMap from '@/components/markerMap';

export default async function Page () {
  async function getRestaurants () {
    const res = await fetch('http://localhost:3000/api/db/restaurants', {
      cache: 'no-store',
    });
    const restaurantData = await res.json();
    return restaurantData;
  }
  const data = await getRestaurants();

  return (
    <div className='relative h-full w-full'>
      <MarkerMap data={data} />
    </div>
  );
}
