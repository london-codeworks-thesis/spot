import { ParallaxScroll } from '@/components/ui/parallax-scroll';
import React from 'react';

async function getData () {
  const res = await fetch('http://localhost:3000/api/db/reviews', {
    cache: 'no-store',
  });
  return res.json();
}

async function getImages () {
  const res = await fetch('http://localhost:3000/api/db/images', {
    cache: 'no-store',
  });
  return res.json();
}

async function Page () {
  const data = await getData();
  const images: string[] = await getImages();

  return (
    <div className='flex w-full justify-center pt-[10%]'>
      <div className='w-[90%] flex-col'>
        <div className='mb-4 text-2xl font-extrabold'>
          <h1>For You</h1>
        </div>
        <div className=''>
          <ParallaxScroll images={images} data={data} />
        </div>
      </div>
    </div>
  );
}

export default Page;
