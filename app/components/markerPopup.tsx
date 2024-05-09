import React from 'react';
import { Marker } from 'react-map-gl';
import Link from 'next/link';
import {
  Plus, Milestone, Clock, Phone, Globe,
} from 'lucide-react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from './ui/button';
import RestaurantDrawerButton from './restaurantDrawerButtons';

type MarkerData = number[];
type MarkerPopupProps = {
  markerData: MarkerData;
};

export default function MarkerPopup ({ markerData }: MarkerPopupProps) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Marker
          key={markerData[2]}
          latitude={markerData[0]}
          longitude={markerData[1]}
          color='black'
        />
      </DrawerTrigger>
      <DrawerContent className='h-[90vh] overflow-hidden'>
        <div className='flex h-full w-full flex-col items-center gap-4'>
          <DrawerClose asChild>
            <Button className='absolute right-1 top-1' variant='ghost'>
              X
            </Button>
          </DrawerClose>
          <div className='mt-[-6%] h-[40%] w-full shrink-0 bg-gray-200'>
            Image Here
          </div>
          <div className='h-full w-[90%]'>
            <div className='flex w-full gap-2 overflow-scroll p-2 scrollbar-none'>
              <DrawerClose asChild>
                <Link href='/dashboard/add'>
                  <RestaurantDrawerButton Icon={Plus} Title='Review' />
                </Link>
              </DrawerClose>
              <RestaurantDrawerButton Icon={Milestone} Title='Directions' />
              <RestaurantDrawerButton Icon={Clock} Title='Hours' />
              <RestaurantDrawerButton Icon={Phone} Title='Call' />
              <RestaurantDrawerButton Icon={Globe} Title='Website' />
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
