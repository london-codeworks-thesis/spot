'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

export default function Page () {
  const router = useRouter();
  const [users, setUsers] = useState([] as any[]);

  useEffect(() => {
    fetch('http://localhost:3000/api/db/users', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  function handleClick (id: String) {
    console.log('user id', id);
    router.push(`/dashboard/profile/${id}`);
  }

  return (
    <div>
      <div className='flex w-full justify-center pt-[10%]'>
        <div className='w-[90%] flex-col'>
          <Command>
            <CommandInput placeholder='Type a command or search...' />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading='Suggestions'>
                {users.map((user) => (
                  <div
                    role='button'
                    key={user.id}
                    onClick={() => handleClick(user.id)}
                    aria-hidden='true'
                  >
                    <CommandItem key={user.id}>
                      {user.first_name}
                      {user.last_name}
                    </CommandItem>
                  </div>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      </div>
    </div>
  );
}
