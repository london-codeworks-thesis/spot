import React from 'react';

function RecentReviewCard ({ review }: any) {
  return (
    <div className='flex w-[180px] flex-col'>
      <div className='h-[140px]  bg-slate-400' />
      <h3 className='overflow-hidden text-ellipsis text-xl font-bold text-zinc-900'>
        {review.restaurant.name}
      </h3>
    </div>
  );
}

export default RecentReviewCard;
