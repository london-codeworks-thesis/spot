'use client';

import React, { forwardRef } from 'react';
import Image from 'next/image';
import type { ReviewWithUser } from 'types/ReviewWithUser';
import { Rate } from 'antd';

interface IScrollContainerCardProps {
  el: ReviewWithUser;
}

const ScrollContainerCard = forwardRef<
HTMLDivElement,
IScrollContainerCardProps
>(({ el }, ref) => (
  <div ref={ref} className='h-auto'>
    <Image
      src={el.restaurant.image_url!}
      className='!m-0 h-60 w-full gap-3 rounded-lg object-contain object-left-top !p-0'
      width='400'
      height={0}
      style={{ height: 'auto' }}
      alt='thumbnail'
    />
    <div className='m-1 flex flex-row items-center p-1'>
      <div className='mr-1'>
        {el?.user?.image && (
          <Image
            src={el.user.image!}
            className='aspect-square rounded-full'
            height={35}
            width={35}
            alt='profilePic'
          />
        )}
      </div>
      <div className='ml-0.5 flex w-20 flex-1 flex-col'>
        <h1 className='-mb-1 truncate text-nowrap'>{el?.restaurant?.name}</h1>
        <Rate
          count={5}
          defaultValue={el?.rating_food || 0}
          disabled
          style={{ padding: '2px', color: 'black', fontSize: 12 }}
        />
      </div>
    </div>
  </div>
));

export default ScrollContainerCard;
