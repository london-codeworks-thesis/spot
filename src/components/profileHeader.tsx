import React from 'react';
import ProfileActionButton from '@/components/profileActionButton';
import { getUserById, getActionButtonForTarget } from '@/lib/userService';
import ProfileStats from './profileStats';
import ProfileImage from './profileImage';

async function ProfileHeader ({ profileId }: { profileId: string }) {
  const actionButtonValue = await getActionButtonForTarget(profileId);

  const user = await getUserById(profileId);

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex w-full flex-grow items-center'>
        <ProfileImage profileId={profileId} />
        <div className='flex h-[100px] flex-grow flex-col justify-evenly gap-4'>
          <ProfileStats profileId={profileId} />
          <div className='mx-auto w-[210px]'>
            <ProfileActionButton
              actionButtonValue={actionButtonValue}
              profileId={profileId}
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
