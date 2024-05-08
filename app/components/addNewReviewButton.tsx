import React from 'react';
import Link from 'next/link';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from './ui/label';
import RestaurantSearchResultCard from './searchResultCard';

type AddReviewButtonProps = {
  Icon: React.ElementType;
};
export default function AddReviewButton ({ Icon }: AddReviewButtonProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant='ghost'>
          <Icon />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className='mx-auto h-[90vh] w-full max-w-sm'>
          <DrawerHeader>
            <DrawerTitle>Visited a New Spot ?</DrawerTitle>
          </DrawerHeader>
          <div className='flex h-full w-full justify-center'>
            <div className='flex h-[80%] w-[90%] flex-col gap-4 overflow-scroll'>
              <Input
                className='h-12 w-full shrink-0'
                placeholder='Search for it and leave a review'
              />
              <Label className='text-md pb-3 pt-3'>Results</Label>
              <div className='flex h-full flex-col gap-4 overflow-scroll scrollbar-none'>
                <RestaurantSearchResultCard />
                <RestaurantSearchResultCard />
                <RestaurantSearchResultCard />
                <RestaurantSearchResultCard />
                <RestaurantSearchResultCard />
                <RestaurantSearchResultCard />
                <RestaurantSearchResultCard />
              </div>
            </div>
          </div>
        </div>
        <DrawerFooter className='absolute bottom-1 w-full'>
          <DrawerClose asChild>
            <Link href='/dashboard/add' className='w-full'>
              <Button className='h-12 w-full'>Review</Button>
            </Link>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
