import React from 'react';
import Image from 'next/image';
import { getUserById } from '@/lib/userService';

// To account for multiword names
const getInitials = (name: string) => name
  .split(' ')
  .map((word) => word[0])
  .join('')
  .toUpperCase();

export default async function ProfileImage ({
  profileId,
}: {
  profileId: string;
}) {
  const user = await getUserById(profileId);

  if (!user) {
    throw new Error('User not found');
  }

  // TODO: HANDLE CASE WHERE USER HAS NO NAME
  const initials = `${getInitials(user.first_name!)}${getInitials(user.last_name!)}`;

  if (!user) {
    return null;
  }

  if (user.image) {
    return (
      <Image
        src={user.image as string}
        alt='Profile Picture'
        width={100}
        height={100}
        className='aspect-square rounded-full object-cover'
        priority
      />
    );
  }
  return (
    <div className='flex h-24 w-24 items-center justify-center rounded-full bg-gray-500'>
      <span className='text-3xl font-semibold text-white'>{initials}</span>
    </div>
  );
}
