import React from 'react';
import ProfileHeader from '@components/profileHeader';
import Settings from '@components/settings';
import MarkerMap from '@components/markerMap';
import { getSession } from '@/hooks/getSession';
import { getUserById } from '@/lib/userService';

export default async function Page () {
  const session = await getSession();

  if (!session?.user?.id) {
    return <div>Loading...</div>;
  }

  const user = await getUserById(session.user.id);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className='mx-5 my-5 flex flex-col gap-8'>
      <div className='flex flex-col gap-4'>
        <div className='flex justify-end'>
          <Settings />
        </div>
        <ProfileHeader
          first_name={user.first_name || 'First Name'}
          last_name={user.last_name || 'Last Name'}
          image={user.image || ''}
        />
      </div>
      <div>
        <h2 className='text-2xl font-semibold'>Review Map</h2>
        <div className='h-[30vh] w-full'>
          <MarkerMap data={user.reviews} />
        </div>
      </div>
      <div>
        <h2 className='text-2xl font-semibold'> Recent Reviews</h2>
      </div>
    </div>
  );
}
