import React from 'react';
import { ParallaxScroll } from '@/components/ui/parallax-scroll';
import { getReviewsFromFollowedUsers } from '@/lib/reviewService';

async function Page () {
  const data: any[] = await getReviewsFromFollowedUsers();

  return (
    <div className='flex w-full justify-center pt-[10%]'>
      <div className='w-[90%] flex-col'>
        <div className='mb-4 text-2xl font-extrabold'>
          <h1>For You</h1>
        </div>
        <div className=''>
          <ParallaxScroll data={data} />
        </div>
      </div>
    </div>
  );
}

export default Page;
