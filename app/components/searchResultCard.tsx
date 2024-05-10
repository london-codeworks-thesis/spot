import React from 'react';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { Card, CardContent, CardTitle } from './ui/card';
import { DrawerClose } from './ui/drawer';

type Restaurant = {
  id: string;
  displayName: DisplayName;
  primaryTypeDisplayName: PrimaryTypeDisplayName;
  formattedAddress: string;
  photos: Photo[];
};

type DisplayName = {
  text: string;
  languageCode: string;
};

type PrimaryTypeDisplayName = {
  text: string;
  languageCode: string;
};

type Photo = {
  name: string;
  widthPx: number;
  heightPx: number;
  authorAttributions: AuthorAttributions[];
};

type AuthorAttributions = {
  displayName: string;
  uri: string;
  photoUri: string;
};

type RestaurantSearchResultCardProps = {
  restaurant: Restaurant;
};
export default function RestaurantSearchResultCard ({
  restaurant,
}: RestaurantSearchResultCardProps) {
  return (
    <DrawerClose asChild>
      <Link href='/dashboard/add'>
        <Card className='flex h-24 w-full shrink-0 items-center justify-center hover:bg-slate-50'>
          <CardContent className='flex h-full w-full items-center gap-3 p-2'>
            <Card className='h-20 w-20 shrink-0' />
            <div className='flex h-20 w-full flex-col'>
              <CardTitle className='m-0 p-0 text-lg'>
                {restaurant.displayName.text}
              </CardTitle>
              <p className='text-xs font-light text-slate-500'>
                {restaurant.primaryTypeDisplayName !== undefined ? (
                  restaurant.primaryTypeDisplayName.text
                ) : (
                  <span>Restaurant</span>
                )}
              </p>
              <p className='flex items-center text-[.60rem] font-light text-slate-500'>
                <MapPin size={10} />
                &nbsp;
                {' '}
                {restaurant.formattedAddress !== undefined ? (
                  restaurant.formattedAddress
                ) : (
                  <p>Restaurant Address</p>
                )}
              </p>
            </div>
          </CardContent>
        </Card>
      </Link>
    </DrawerClose>
  );
}
