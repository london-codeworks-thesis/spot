import React, { useState, useEffect } from 'react';
import { GET } from '@/api/googleapi/route';
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
  googleMapsUri: string;
  editorialSummary: string;
  location: Location;
  regularOpeningHours: RegularOpeningHours;
  internationalPhoneNumber: string;
  priceLevel: string;
};

type RegularOpeningHours = {
  weekdayDescriptions: string[];
};

type Location = {
  latitude: number;
  longitude: number;
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
  setResults: (value: Restaurant[]) => void;
};

export default function RestaurantSearchResultCard ({
  restaurant,
  setResults,
}: RestaurantSearchResultCardProps) {
  const [imgUri, setImgUri] = useState('');

  useEffect(() => {
    async function fetchUserData () {
      const photoData = await GET(restaurant.photos[0].name);
      setImgUri(photoData);
    }
    if (restaurant && restaurant.photos) {
      fetchUserData();
    }
  }, [restaurant]);

  return (
    <DrawerClose asChild>
      <Link
        href={{
          pathname: '/dashboard/add',
          query: {
            restaurant: JSON.stringify(restaurant),
            imgSource: JSON.stringify(imgUri),
          },
        }}
      >
        <Card
          className='flex h-24 w-full shrink-0 items-center justify-center hover:bg-slate-50'
          onClick={() => setResults([])}
        >
          <CardContent className='flex h-full w-full items-center gap-3 p-2'>
            {imgUri ? (
              <Card
                className='h-20 w-20 shrink-0 bg-cover bg-center bg-no-repeat'
                style={{ backgroundImage: `url(${imgUri})` }}
              />
            ) : (
              <Card className='h-20 w-20 shrink-0' />
            )}
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
