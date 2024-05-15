import React from 'react';
import Image from 'next/image';

import ProfileActionButton from '@components/profileActionButton';
import {
  getActionButtonForTarget,
  handleActionButtonClick,
} from '@lib/userService';
import { redirect } from 'next/navigation';
import { getSession } from '@/hooks/getSession';

async function ProfileHeader ({
  first_name,
  last_name,
  image,
  followers,
  following,
  reviews,
  profileUserId,
}: {
  first_name: string;
  last_name: string;
  image: string;
  followers: number;
  following: number;
  reviews: number;
  profileUserId: string;
}) {
  const session = await getSession();

  if (!session) {
    redirect('/login');
  }

  const currentUserId = session.user.id;

  const actionButtonValue = await getActionButtonForTarget(
    currentUserId,
    profileUserId,
  );
  // To account for multiword names
  const getInitials = (name: string) => name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  const initials = `${getInitials(first_name)}${getInitials(last_name)}`;

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex w-full flex-grow items-center'>
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
            <span className='text-3xl font-semibold text-white'>
              {initials}
            </span>
          </div>
        )}
        <div className='flex h-[100px] flex-grow flex-col justify-evenly gap-4'>
          <div className='align-center flex flex-row justify-center gap-6 font-semibold text-neutral-700'>
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
          <div className='mx-auto w-[210px]'>
            <ProfileActionButton
              handleActionButtonClick={handleActionButtonClick}
              profileUserId={profileUserId}
              currentUserId={currentUserId}
              actionButtonValue={actionButtonValue}
            />
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <h1 className='text-3xl font-semibold text-neutral-900'>
          {first_name}
          {' '}
          {last_name}
        </h1>
      </div>
    </div>
  );
}

export default ProfileHeader;
