import React from 'react';
import { Input } from '@/components/ui/input';
import MarkerMap from '@/components/markerMap';
import data from '../../lib/data';

export default function Page () {
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
