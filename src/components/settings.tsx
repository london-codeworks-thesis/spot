'use client';

import React from 'react';
import { SignOutButton } from '@clerk/nextjs';
import { Settings as SettingsIcon } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@components/ui/sheet';
import { Button } from '@components/ui/button';

function Settings () {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost'>
          <SettingsIcon size={20} strokeWidth={2.5} />
        </Button>
      </SheetTrigger>
      <SheetContent className='flex w-full flex-col justify-between'>
        <SheetHeader>
          <SheetTitle className='text-3xl font-extrabold'>Settings</SheetTitle>
        </SheetHeader>
        <SheetFooter>
          <SignOutButton>
            <Button className='p-6'>Logout</Button>
          </SignOutButton>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default Settings;
