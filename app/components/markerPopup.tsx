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
import DetailCard from './detailsCard';
import { Card } from './ui/card';

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
  const nameRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef(null);
  const { restaurant } = markerData;

  function scrollToDetails () {
    if (detailsRef.current) {
      const container: HTMLElement | null = detailsRef.current.parentElement;
      if (container) {
        container.style.scrollBehavior = 'smooth';
        container.scrollTop = container?.offsetHeight;
      }
    }
  }

  function scrollName () {
    if (nameRef.current) {
      const container: HTMLElement | null = nameRef.current;
      if (container) {
        if (
          container.scrollLeft + container.offsetWidth + 5
          > container.scrollWidth
        ) {
          container.style.scrollBehavior = 'smooth';
          setTimeout(() => {
            container.scrollLeft = 0;
          }, 500);
        } else {
          container.style.scrollBehavior = 'smooth';
          container.scrollLeft += 5;
          setTimeout(() => scrollName(), 0);
        }
      }
    }
  }
  function average (name: string): string {
    const ratingTypeArray: number[] = restaurant.reviews.map(
      (review: any) => review[name],
    );

    const result = Math.round(
      (ratingTypeArray.reduce((a, b) => a + b) / ratingTypeArray.length) * 10,
    ) / 10;

    return Number.isInteger(result) ? `${result}.0` : `${result}`;
  }

  function mainAverage (): number {
    return (
      Math.round(
        ((Number(average('rating_food'))
          + Number(average('rating_atmosphere'))
          + Number(average('rating_value')))
          / 3)
          * 10,
      ) / 10
    );
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
                    handleClick={() => console.log('')}
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
            <div className='flex w-full items-center justify-between gap-4'>
              <div
                className='w-full overflow-scroll scrollbar-none'
                ref={nameRef}
              >
                <Label
                  className='flex w-full flex-row whitespace-nowrap text-3xl font-extrabold'
                  onClick={() => scrollName()}
                >
                  {restaurant.name}
                </Label>
              </div>
              <Rate
                defaultValue={mainAverage()}
                disabled
                style={{ color: 'black', fontSize: 14, flexShrink: 0 }}
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
            <div className='relative flex h-[80%] w-full flex-col gap-3 overflow-scroll pb-[80%] scrollbar-none'>
              <div className='flex w-full items-center justify-around'>
                <MarkerPopupIcons
                  value={average('rating_food')}
                  IconType='Food'
                />
                <Separator orientation='vertical' />
                <MarkerPopupIcons
                  value={average('rating_value')}
                  IconType='Value'
                />
                <Separator orientation='vertical' />
                <MarkerPopupIcons
                  value={average('rating_atmosphere')}
                  IconType='Vibe'
                />
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
              <Label className='pr-[10%] text-lg font-bold'>
                Reviews (
                {restaurant.reviews.length}
                )
              </Label>
              <Card className='h-[40%] w-full shrink-0' />
              <div>
                <Label className='pr-[10%] text-lg font-bold'>Details</Label>
              </div>
              <DetailCard
                phone={restaurant.phone}
                hours={restaurant.opening_hours}
                detailsRef={detailsRef}
                directions={restaurant.address}
                mapUri={restaurant.google_maps_uri}
              />
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
