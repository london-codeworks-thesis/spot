import React from 'react';
import { getUserSuggestions } from '@/lib/userService';
import UserSearch from '@/components/UserSearch';

export default async function Page () {
  const users = await getUserSuggestions();

  return (
    <div>
      <div className='flex w-full justify-center pt-[10%]'>
        <div className='w-[90%] flex-col'>
          <UserSearch users={users} />
        </div>
      </div>
    </div>
  );
}
