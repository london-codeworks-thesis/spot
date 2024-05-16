import React from 'react';
import CustomSkeletonComponent from '@components/customSkeletonComponent';

async function Page () {
  return (
    <div className='flex w-full justify-center pt-[10%]'>
      <div className='w-[90%] flex-col'>
        <div className='mb-4 text-2xl font-extrabold'>
          <h1>For You</h1>
        </div>
        <div className='flex w-[100%] flex-row gap-3'>
          <div className='flex w-[50%] flex-col overflow-hidden'>
            <CustomSkeletonComponent />
            <CustomSkeletonComponent />
            <CustomSkeletonComponent />
            <CustomSkeletonComponent />
            <CustomSkeletonComponent />
          </div>
          <div className='flex w-[50%] flex-col overflow-hidden'>
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
