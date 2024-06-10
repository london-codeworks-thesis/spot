'use client';

import React from 'react';
import { signOut } from 'next-auth/react';
import { Settings as SettingsIcon } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from 'src/components/ui/sheet';
import { Button } from 'src/components/ui/button';

function Settings () {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='ghost'>
          <SettingsIcon size={18} strokeWidth={2.5} />
        </Button>
      </SheetTrigger>
      <SheetContent className='flex w-full flex-col justify-between'>
        <SheetHeader>
          <SheetTitle className='text-3xl font-extrabold'>Settings</SheetTitle>
        </SheetHeader>
        <SheetFooter>
          <Button onClick={() => signOut({ callbackUrl: '/' })} className='p-6'>
            Logout
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default Settings;
