import React from 'react';
import { Skeleton } from '@ui/skeleton';

export default function CustomSkeletonComponent () {
  return (
    <div>
      <Skeleton className='h-[130px] w-full rounded-lg' />
      <div className='m-1 flex items-center p-1'>
        <Skeleton className='mr-1 h-[35px] w-[35px] rounded-full' />
        <div className='ml-0.5 flex flex-1 flex-col space-y-2'>
          <Skeleton className='h-3 w-[90%]' />
          <Skeleton className='h-3 w-[70%]' />
        </div>
      </div>
    </div>
  );
}
