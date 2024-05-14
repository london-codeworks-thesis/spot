import React from 'react';
import Image from 'next/image';

import MarkerPopupIcons from './markerPopupRatingIcons';

function RecentReviewCard ({ review }: any) {
  return (
    <div className='flex w-[180px] flex-col'>
      <div className='relative h-[140px] w-[180px]'>
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
        <div className='flex gap-1'>
          <MarkerPopupIcons
            value={review.rating_food}
            IconType='Food'
            isReview
          />
          <MarkerPopupIcons
            value={review.rating_value}
            IconType='Value'
            isReview
          />
          <MarkerPopupIcons
            value={review.rating_atmosphere}
            IconType='Vibe'
            isReview
          />
        </div>
      </div>
    </div>
  );
}

export default RecentReviewCard;
