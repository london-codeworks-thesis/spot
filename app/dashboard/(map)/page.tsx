import React from 'react';
import { Input } from '@/components/ui/input';
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
      <Input
        placeholder='Search...'
        className='absolute left-16 top-4 z-10 w-4/6 bg-white p-6'
      />
      <MarkerMap data={data} />
    </div>
  );
}
