'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@prisma/client';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/ui/command';

type UserSuggestionsProps = {
  users: User[];
};

export default function UserSearch ({ users }: UserSuggestionsProps) {
  const router = useRouter();

  function handleClick (id: string) {
    router.push(`/dashboard/user/${id}`);
  }

  return (
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
                {' '}
                {user.last_name}
              </CommandItem>
            </div>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
