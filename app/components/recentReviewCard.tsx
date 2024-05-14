import React from 'react';
import Image from 'next/image';

function RecentReviewCard ({ review }: any) {
  return (
    <div className='flex w-[180px] flex-col'>
      <div className='relative h-[140px] w-[170px]'>
        <Image
          className='rounded-md object-cover'
          src={review.restaurant.image_url}
          fill
          alt={`Image of ${review.restaurant.name}`}
        />
      </div>
      <div className=''>
        <h3 className='overflow-hidden text-ellipsis text-xl font-bold text-zinc-900'>
          {review.restaurant.name}
        </h3>
      </div>
    </div>
  );
}

export default RecentReviewCard;
