'use client';

import React, { useState } from 'react';
import { PiggyBank, Flame, Cookie } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import RatingCard from '@/components/starNumberCard';
import StarRatingSystem from '@/components/ratingStars';
import Image from 'next/image';

interface PageProps {
  searchParams: {
    restaurant: string;
    imgSource: string;
  };
}

export default function Page ({ searchParams }: PageProps) {
  const [food, setFood] = useState(2.5);
  const [value, setValue] = useState(2.5);
  const [vibe, setVibe] = useState(2.5);
  const restaurant = JSON.parse(searchParams.restaurant);
  const img = JSON.parse(searchParams.imgSource);
  function saveReview () {
    const body = {
      google_id: restaurant.id,
      name: restaurant.displayName.text,
      address: restaurant.formattedAddress,
      phone: restaurant.internationalPhoneNumber,
      google_maps_uri: restaurant.googleMapsUri,
      price_level: restaurant.priceLevel
        ? restaurant.priceLevel.split('_')[2]
        : '',
      type: restaurant.primaryTypeDisplayName
        ? restaurant.primaryTypeDisplayName.text
        : 'Restaurant',
      opening_hours: restaurant.regularOpeningHours.weekdayDescriptions,
      summary: restaurant.editorialSummary
        ? restaurant.editorialSummary.text
        : '',
      image_url: img,
      latitude: restaurant.location.latitude,
      longitude: restaurant.location.longitude,
      rating_food: food,
      rating_atmosphere: vibe,
      rating_value: value,
    };
    console.log(body);
  }
  return (
    <div className='flex h-full w-full justify-center'>
      <div className='flex h-full w-[90%] flex-col justify-around'>
        <h1 className='pl-6 pt-7 text-3xl font-extrabold'>Add a review</h1>
        <div className='flex w-full justify-center'>
          <Card className='h-56 w-full bg-gray-50'>
            <Image src={img} alt='practice' height='200' width='200' />
          </Card>
        </div>
        <div className='flex flex-col gap-2 pb-1 pl-6 '>
          <h1 className='text-3xl font-extrabold'>
            {restaurant.displayName.text}
          </h1>
          <h4 className='text-sm'>{restaurant.formattedAddress}</h4>
        </div>
        <div className='flex w-full flex-col items-center justify-center gap-7'>
          <Card className='w-full bg-gray-50'>
            <CardContent className='flex gap-3 pb-7'>
              <div className='flex w-2/3 flex-col gap-3 pt-6'>
                <StarRatingSystem
                  Icon={Cookie}
                  Title='Food'
                  valueType={food}
                  setValueType={setFood}
                />
                <StarRatingSystem
                  Icon={PiggyBank}
                  Title='Value'
                  valueType={value}
                  setValueType={setValue}
                />
                <StarRatingSystem
                  Icon={Flame}
                  Title='Vibe'
                  valueType={vibe}
                  setValueType={setVibe}
                />
              </div>
              <div className='flex w-[50%] flex-col items-center gap-2 pt-6'>
                <RatingCard ratingFor={food} />
                <RatingCard ratingFor={value} />
                <RatingCard ratingFor={vibe} />
              </div>
            </CardContent>
          </Card>
          <div className='mx-2 my-4 flex w-full gap-2'>
            <Button variant='outline' className='h-12 w-[50%]'>
              Cancel
            </Button>
            <Button className='h-12 w-[50%]' onClick={() => saveReview()}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
