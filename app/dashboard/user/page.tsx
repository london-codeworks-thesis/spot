import React from 'react';
import { getServerSession } from 'next-auth';
import ProfileHeader from '@components/profileHeader';
import Settings from '@components/settings';
import { authConfig } from '@lib/auth';
import type { User } from '@/types/user';

export default async function Page () {
  const session = await getServerSession(authConfig);
  const user = session?.user as User;
  console.log(user);
  return (
    <div className='mx-5 my-5 flex flex-col gap-8'>
      <div className='flex justify-end'>
        <Settings />
      </div>
      <ProfileHeader name={user.name} image={user.image} />
    </div>
  );
}
