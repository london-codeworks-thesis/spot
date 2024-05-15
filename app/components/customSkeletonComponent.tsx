import React from 'react';
import { Skeleton } from './ui/skeleton';

export default function CustomSkeletonComponent () {
  return (
    <div className='flex flex-col space-y-3 pb-5'>
      <Skeleton className='h-[80px] w-[150px] rounded-xl' />
      <div className='flex items-center space-x-4'>
        <Skeleton className='h-8 w-8 rounded-full' />
        <div className='space-y-2'>
          <Skeleton className='h-2 w-[70px]' />
          <Skeleton className='h-2 w-[70px]' />
        </div>
      </div>
    </div>
  );
}
