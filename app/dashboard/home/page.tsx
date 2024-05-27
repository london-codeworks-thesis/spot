import React from 'react';
import { getReviewsFromFollowedUsers } from '@/lib/reviewService';
import { ParallaxScroll } from '@/components/ui/parallax-scroll';

async function Page () {
  const data: any[] = await getReviewsFromFollowedUsers();

  return (
    <div className='flex h-full w-full flex-col justify-center pt-8'>
      <div className='mx-auto flex h-full w-[90%] flex-col'>
        <div className='mb-4 text-2xl font-extrabold'>
          <h1>For You</h1>
        </div>
        <div className='relative flex-1 overflow-clip'>
          <ParallaxScroll data={data} />
        </div>
      </div>
    </div>
  );
}

export default Page;
