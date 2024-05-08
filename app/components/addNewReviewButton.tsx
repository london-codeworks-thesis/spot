import React from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerClose,
  DrawerTrigger,
  DrawerHeader,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Input } from './ui/input';
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
      <DrawerContent className='flex h-[90vh] items-center'>
        <div className='flex h-full w-[90%] flex-col gap-3'>
          <DrawerHeader className='text-2xl font-extrabold'>
            Visited a new spot?
          </DrawerHeader>
          <Input
            className='h-12 shrink-0'
            placeholder='Search for it and leave a review '
          />
          <div className='flex w-full flex-col gap-4 overflow-scroll pt-4 scrollbar-none'>
            <DrawerClose asChild>
              <RestaurantSearchResultCard />
            </DrawerClose>
            <DrawerClose asChild>
              <RestaurantSearchResultCard />
            </DrawerClose>
            <DrawerClose asChild>
              <RestaurantSearchResultCard />
            </DrawerClose>
            <DrawerClose asChild>
              <RestaurantSearchResultCard />
            </DrawerClose>
            <DrawerClose asChild>
              <RestaurantSearchResultCard />
            </DrawerClose>
            <DrawerClose asChild>
              <RestaurantSearchResultCard />
            </DrawerClose>
            <DrawerClose asChild>
              <RestaurantSearchResultCard />
            </DrawerClose>
            <DrawerClose asChild>
              <RestaurantSearchResultCard />
            </DrawerClose>
            <DrawerClose asChild>
              <RestaurantSearchResultCard />
            </DrawerClose>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
