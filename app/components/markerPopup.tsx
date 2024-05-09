import React from 'react';
import { Marker } from 'react-map-gl';
import Link from 'next/link';
import {
  Plus,
  Milestone,
  Clock,
  Phone,
  Globe,
  Cookie,
  PiggyBank,
  Flame,
  MapPin,
} from 'lucide-react';
import { Rate } from 'antd';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Label } from './ui/label';
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
          <div className='flex h-full w-[90%] flex-col gap-4'>
            <div className='flex w-full gap-2 overflow-scroll scrollbar-none'>
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
            <div className='flex w-full items-center justify-start gap-3'>
              <Label className='pr-[10%] text-3xl font-extrabold'>Sapori</Label>
              <Label className='text-lg font-bold'>4.7</Label>
              <Rate
                defaultValue={4.7}
                disabled
                style={{ color: 'black' }}
                tooltips={[
                  'Avoid At All Cost',
                  'Maybe Another Try',
                  'Not My First Option',
                  'Would Go Again',
                  'Definite Yes',
                ]}
                allowHalf
              />
            </div>
            <div className='flex w-full items-center justify-around'>
              <div className='flex h-12 gap-2'>
                <Cookie size={45} strokeWidth={1.5} className='shrink-0' />
                <div className='flex h-full w-full flex-col items-center justify-center'>
                  <Rate
                    count={1}
                    defaultValue={1}
                    style={{ color: 'black' }}
                    disabled
                  />
                  <Label className='text-xs font-bold'>4.5</Label>
                </div>
              </div>
              <div className='flex h-12 gap-2'>
                <PiggyBank strokeWidth={1.5} size={45} className='shrink-0' />
                <div className='flex h-full w-full flex-col items-center justify-center'>
                  <Rate
                    count={1}
                    defaultValue={1}
                    style={{ color: 'black' }}
                    disabled
                  />
                  <Label className='text-xs font-bold'>4.5</Label>
                </div>
              </div>
              <div className='flex h-12 gap-1'>
                <Flame size={45} strokeWidth={1.5} className='shrink-0' />
                <div className='flex h-full w-full flex-col items-center justify-center'>
                  <Rate
                    count={1}
                    defaultValue={1}
                    style={{ color: 'black' }}
                    disabled
                  />
                  <Label className='text-xs font-bold'>4.5</Label>
                </div>
              </div>
            </div>
            <Separator />
            <p className='text-sm text-gray-500'>
              A chalkboard menu of Italian classic dishes & British fare in a
              relaxed counter-service setting.
              {' '}
            </p>
            <p className='flex items-center gap-3 text-sm text-gray-500'>
              <MapPin size={14} />
              60 Horseferry Rd, London, SW1P 2AF
            </p>
            <Separator />
            <Label className='pr-[10%] text-lg font-bold'>Reviews (23)</Label>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
