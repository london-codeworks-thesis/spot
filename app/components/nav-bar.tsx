import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  User, Search, Home, MapPinned, Plus,
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
  DrawerTrigger,
} from '@/components/ui/drawer';

export default function NavBar () {
  return (
    <div className='flex w-full justify-evenly pb-3 pt-3 shadow-[0_-1px_24px_0px_rgba(0,0,0,0.1)]'>
      <Link href='/dashboard/home'>
        <Button variant='ghost'>
          <Home />
        </Button>
      </Link>
      <Link href='/dashboard/search'>
        <Button variant='ghost'>
          <Search />
        </Button>
      </Link>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant='ghost'>
            <Plus />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className='mx-auto h-[50vh] w-full max-w-sm'>
            <DrawerHeader>
              <DrawerTitle>New Spot</DrawerTitle>
            </DrawerHeader>
            <div className='flex w-full justify-center'>
              <Input
                className='h-12 w-11/12'
                placeholder="Search for a spot you'd like to review"
              />
            </div>
            <DrawerFooter className='absolute bottom-1 w-full'>
              <DrawerClose asChild>
                <Link href='/dashboard/add' className='w-full'>
                  <Button className='h-12 w-full'>Review</Button>
                </Link>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
      <Link href='/dashboard'>
        <Button variant='ghost'>
          <MapPinned />
        </Button>
      </Link>
      <Link href='/dashboard/user'>
        <Button variant='ghost'>
          <User />
        </Button>
      </Link>
    </div>
  );
}
