'use client';

import React from 'react';
import { signOut } from 'next-auth/react';
import { Settings as SettingsIcon } from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@components/ui/sheet';
import { Button } from '@/components/ui/button';

function Settings () {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost'>
          <SettingsIcon size={28} strokeWidth={2.25} />
        </Button>
      </SheetTrigger>
      <SheetContent className='flex w-full flex-col justify-between'>
        <SheetHeader>
          <SheetTitle className='text-3xl font-extrabold'>Settings</SheetTitle>
        </SheetHeader>
        <SheetFooter>
          <SheetClose asChild>
            <Button onClick={() => signOut()} className='p-6'>
              Logout
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default Settings;
