import React from 'react';
import { getUserById } from '@lib/userService';

export default async function ProfileStats ({
  profileId,
}: {
  profileId: string;
}) {
  const user = await getUserById(profileId);
  return (
    <div className='align-center flex flex-row justify-center gap-6 font-semibold text-neutral-700'>
      <div className='flex flex-col items-center'>
        <p>{user?._count.followers}</p>
        <p className='text-xs'>Followers</p>
      </div>
      <div className='flex flex-col items-center'>
        <p>{user?._count.following}</p>
        <p className='text-xs'>Following</p>
      </div>
      <div className='flex flex-col items-center'>
        <p>{user?._count.reviews}</p>
        <p className='text-xs'>Reviews</p>
      </div>
    </div>
  );
}
