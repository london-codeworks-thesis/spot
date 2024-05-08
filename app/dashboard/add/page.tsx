'use client';

import React, { useState } from 'react';
import { PiggyBank, Flame, Cookie } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import RatingCard from '@/components/starNumberCard';
import StarRatingSystem from '@/components/ratingStars';

type Review = {
  user_id: string;
  restaurant_id: string;
  rating: {
    food: number;
    value: number;
    vibe: number;
  };
};
export default function Page () {
  const [food, setFood] = useState(2.5);
  const [value, setValue] = useState(2.5);
  const [vibe, setVibe] = useState(2.5);

  function handleSubmit (): void {
    const newReview: Review = {
      user_id: '12345',
      restaurant_id: '345788',
      rating: {
        food,
        value,
        vibe,
      },
    };
    console.log(newReview);
  }
  return (
    <div className='flex h-full w-full justify-center'>
      <div className='flex h-full w-[90%] flex-col justify-around'>
        <h1 className='pl-6 pt-7 text-3xl font-extrabold'>Add a review</h1>
        <div className='flex w-full justify-center'>
          <Card className='h-56 w-full bg-gray-50' />
        </div>
        <div className='flex flex-col gap-2 pb-1 pl-6 '>
          <h1 className='text-3xl font-extrabold'>Itsu</h1>
          <h4 className='text-sm'>60 Horseferry Rd, London, SW1P 2AF</h4>
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
            <Button className='h-12 w-[50%]' onClick={() => handleSubmit()}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
