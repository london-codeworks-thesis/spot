import React from 'react';
import { getServerSession } from 'next-auth';
import ProfileHeader from '@components/profileHeader';
import { Settings } from 'lucide-react';
import type { User } from '@/types/user';

export default async function Page () {
  const session = await getServerSession();
  if (!session) {
    // TODO: handle error
    return null;
  }
  const user = session?.user as User;
  console.log(user.image);
  return (
    <div className='mx-5 my-5 flex flex-col gap-8'>
      <div className='flex justify-end'>
        <Settings size={28} strokeWidth={2.25} />
      </div>
      <ProfileHeader name={user.name} image={user.image} />
    </div>
  );
}
