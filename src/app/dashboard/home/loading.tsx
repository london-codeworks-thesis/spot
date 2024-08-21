import CustomSkeletonComponent from '@components/customSkeletonComponent';
import React from 'react';

async function Page () {
  return (
    <div className='flex h-full w-full flex-col justify-center pt-8'>
      <div className='mx-auto flex h-full w-[90%] flex-col'>
        <div className='mb-4 text-2xl font-extrabold'>
          <h1>For You</h1>
        </div>
        <div className='relative grid flex-1 grid-cols-2 gap-3 overflow-hidden'>
          <div className='grid gap-3'>
            <CustomSkeletonComponent />
            <CustomSkeletonComponent />
            <CustomSkeletonComponent />
            <CustomSkeletonComponent />
            <CustomSkeletonComponent />
          </div>
          <div className='grid gap-1'>
            <CustomSkeletonComponent />
            <CustomSkeletonComponent />
            <CustomSkeletonComponent />
            <CustomSkeletonComponent />
            <CustomSkeletonComponent />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
