// page.tsx
import React from 'react';
import ProfileHeader from '@components/profileHeader';
import Settings from '@components/settings';
import type { User } from '@/types/user';
import { getSession } from '@/hooks/getSession';

export default async function Page () {
  const session = await getSession();
  const user = session?.user as User;

  // Ensure user data is available
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className='mx-5 my-5 flex flex-col gap-4'>
      <div className='flex justify-end'>
        <Settings />
      </div>
      <ProfileHeader
        first_name={user.first_name || 'First Name'}
        last_name={user.last_name || 'Last Name'}
        image={user.image || ''}
      />
    </div>
  );
}
