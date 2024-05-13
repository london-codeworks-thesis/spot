import React from 'react';
import Image from 'next/image';

function ProfileHeader ({
  first_name,
  last_name,
  image,
}: {
  first_name: string;
  last_name: string;
  image: string;
}) {
  return (
    <div className='mx-5 flex items-center gap-4'>
      <Image
        src={image as string}
        alt='Profile Picture'
        width={100}
        height={100}
        className='aspect-square rounded-full object-cover'
      />
      <div className='flex flex-col'>
        <p className='text-3xl font-semibold'>{first_name}</p>
        <p className='text-3xl font-semibold'>{last_name}</p>
        <div className='flex flex-row gap-8 font-semibold'>
          <div className='flex flex-col items-center'>
            <p>20</p>
            <p className='text-xs'>Followers</p>
          </div>
          <div className='flex flex-col items-center'>
            <p>30</p>
            <p className='text-xs'>Following</p>
          </div>
          <div className='flex flex-col items-center'>
            <p>10</p>
            <p className='text-xs'>Reviews</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
