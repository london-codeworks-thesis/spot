import React, { forwardRef, useRef } from 'react';
import { Marker } from 'react-map-gl';
import Link from 'next/link';
import {
  Plus, Milestone, Clock, Phone, Globe, MapPin,
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
import MarkerPopupIcons from './markerPopupRatingIcons';

type MarkerPopupProps = {
  markerData: any;
};

const FocusableMarker = forwardRef<HTMLButtonElement | null, any>(
  (props, ref) => (
    <button
      type='button'
      ref={ref}
      style={{ background: 'none', border: 'none', padding: 0 }}
    >
      <Marker {...props} />
    </button>
  ),
);

export default function MarkerPopup ({ markerData }: MarkerPopupProps) {
  const detailsRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef(null);
  const { restaurant } = markerData;
  function scrollToDetails () {
    if (detailsRef.current) {
      const container: HTMLElement | null = detailsRef.current.parentElement;
      if (container) {
        container.style.scrollBehavior = 'smooth';
        container.scrollTop = container?.offsetTop;
      }
    }
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <FocusableMarker
          ref={markerRef}
          key={restaurant.id}
          latitude={restaurant.latitude}
          longitude={restaurant.longitude}
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
          <div
            className='mt-[-6%] h-[40%] w-full shrink-0 bg-cover bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${restaurant.image_url})` }}
          />
          <div className='flex h-full w-[90%] flex-col gap-4'>
            <div className='flex w-full shrink-0 gap-2 overflow-scroll scrollbar-none'>
              <DrawerClose asChild>
                <Link
                  href={{
                    pathname: '/dashboard/add',
                    query: {
                      restaurant: JSON.stringify(restaurant),
                      imgSource: JSON.stringify(restaurant.image_url),
                    },
                  }}
                >
                  <RestaurantDrawerButton
                    Icon={Plus}
                    Title='Review'
                    handleClick={() => console.log('hey')}
                  />
                </Link>
              </DrawerClose>
              <RestaurantDrawerButton
                Icon={Milestone}
                Title='Directions'
                handleClick={() => scrollToDetails()}
              />
              <RestaurantDrawerButton
                Icon={Clock}
                Title='Hours'
                handleClick={() => scrollToDetails()}
              />
              <RestaurantDrawerButton
                Icon={Phone}
                Title='Call'
                handleClick={() => scrollToDetails()}
              />
              <RestaurantDrawerButton
                Icon={Globe}
                Title='Website'
                handleClick={() => scrollToDetails()}
              />
            </div>
            <div className='flex w-full items-center justify-start gap-3'>
              <Label className='flex w-[40%] flex-row pr-[10%] text-3xl font-extrabold'>
                {restaurant.name}
              </Label>
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
            <div className='relative flex h-[80%] w-full flex-col gap-3 overflow-scroll pb-4 scrollbar-none'>
              <div className='flex w-full items-center justify-around'>
                <MarkerPopupIcons value='4.0' IconType='Food' />
                <Separator orientation='vertical' />
                <MarkerPopupIcons value='3.5' IconType='Value' />
                <Separator orientation='vertical' />
                <MarkerPopupIcons value='5.0' IconType='Vibe' />
              </div>
              <Separator />
              <p className='text-sm text-gray-500'>
                {restaurant.summary}
                {' '}
              </p>
              <p className='flex items-center gap-3 text-sm text-gray-500'>
                <MapPin size={14} />
                {restaurant.address}
              </p>
              <Separator />
              <Label className='pr-[10%] text-lg font-bold'>Reviews (23)</Label>
              <div className='h-[40%] w-full shrink-0 rounded-xl bg-gray-400' />
              <div ref={detailsRef}>
                <Label className='pr-[10%] text-lg font-bold'>Details</Label>
              </div>
              <div className='h-[80%] w-full shrink-0 rounded-xl bg-gray-400' />
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
