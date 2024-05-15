import React from 'react';
import Image from 'next/image';

function ProfileHeader ({
  first_name,
  last_name,
  image,
  followers,
  following,
  reviews,
}: {
  first_name: string;
  last_name: string;
  image: string;
  followers: number;
  following: number;
  reviews: number;
}) {
  // To account for multiword names
  const getInitials = (name: string) => name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  const initials = `${getInitials(first_name)}${getInitials(last_name)}`;

  return (
    <div className='flex items-center gap-4'>
      {image ? (
        <Image
          src={image as string}
          alt='Profile Picture'
          width={100}
          height={100}
          className='aspect-square rounded-full object-cover'
          priority
        />
      ) : (
        <div className='flex h-24 w-24 items-center justify-center rounded-full bg-gray-500'>
          <span className='text-3xl font-semibold text-white'>{initials}</span>
        </div>
      )}
      <div className='flex-grow-1 flex flex-grow flex-col'>
        <h1 className='text-3xl font-semibold'>{first_name}</h1>
        <p className='text-3xl font-semibold'>{last_name}</p>
        <div className='flex flex-row gap-6 font-semibold text-neutral-700'>
          <div className='flex flex-col items-center'>
            <p>{followers}</p>
            <p className='text-xs'>Followers</p>
          </div>
          <div className='flex flex-col items-center'>
            <p>{following}</p>
            <p className='text-xs'>Following</p>
          </div>
          <div className='flex flex-col items-center'>
            <p>{reviews}</p>
            <p className='text-xs'>Reviews</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
