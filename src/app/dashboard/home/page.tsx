import React from 'react';
import ScrollContainer from '@/components/ScrollContainer';
import { getReviewsFromFollowedUsers } from '@/lib/reviewService';

async function Page () {
  const data = await getReviewsFromFollowedUsers();

  return (
    <div className='mx-auto flex h-full w-[85%] flex-col justify-center'>
      <div className='mb-4 mt-8 text-3xl font-extrabold'>
        <h1>For You</h1>
      </div>
      <ScrollContainer data={data} />
    </div>
  );
}

export default Page;
