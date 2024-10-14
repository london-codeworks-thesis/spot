import React from 'react';
import ProfileActionButton from '@components/profile/ProfileActionButton';
import { getUserByUsername, getActionButtonForTarget } from '@lib/userService';
import ProfileStats from '@components/profile/ProfileStats';
import ProfileImage from '@components/profile/ProfileImage';

async function ProfileHeader ({ username }: { username: string }) {
  const actionButtonValue = await getActionButtonForTarget(username);

  const user = await getUserByUsername(username);

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex w-full flex-grow items-center'>
        <ProfileImage username={username} />
        <div className='flex h-[100px] flex-grow flex-col justify-evenly gap-4'>
          <ProfileStats username={username} />
          <div className='mx-auto w-[210px]'>
            <ProfileActionButton
              actionButtonValue={actionButtonValue}
              username={username}
            />
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <h1 className='text-3xl font-semibold text-neutral-900'>
          {user?.first_name}
          {' '}
          {user?.last_name}
        </h1>
      </div>
    </div>
  );
}

export default ProfileHeader;
