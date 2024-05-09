import React from 'react';
import { getServerSession } from 'next-auth';
import { Input } from '@/components/ui/input';
import MarkerMap from '@/components/markerMap';
import data from '../../lib/data';

const coordinates = data.markerData;

export default async function Page () {
  const session = await getServerSession();
  if (session) {
    return (
      <div className='relative h-full w-full'>
        <Input
          placeholder='Search...'
          className='absolute left-16 top-4 z-10 w-4/6 bg-white p-6'
        />
        <MarkerMap coordinates={coordinates} />
      </div>
    );
  }
  return <div>Not Authenticated</div>;
}
