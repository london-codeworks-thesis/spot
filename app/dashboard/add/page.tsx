'use client';

import React, { useState } from 'react';
import { PiggyBank, Flame, Cookie } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import RatingCard from '@/components/starNumberCard';
import Link from 'next/link';
import StarRatingSystem from '@/components/ratingStars';
import { User } from '@/types/user';
import { useSession } from 'next-auth/react';

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
  const { data } = useSession();

  if (!data) {
    // TODO: handle error
    return null;
  }
  const user = data?.user as User;

  async function postReview () {
    try {
      const body = {
        ...restaurant,
        rating_food: food,
        rating_value: value,
        rating_atmosphere: vibe,
        userId: user.id,
      };
      const res = await fetch('http://localhost:3000/api/db/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      console.log('new mcdo', res.json());
      if (!res.ok) {
        throw new Error(`Failed to post review: ${res.status}`);
      }
    } catch (error) {
      console.error('Error sending reviews', error);
      throw error;
    }
  }

  return (
    <div className='flex h-full w-full justify-center'>
      <div className='flex h-full w-[90%] flex-col justify-around'>
        <h1 className='pl-6 pt-7 text-3xl font-extrabold'>Add a review</h1>
        <div className='flex w-full justify-center'>
          <Card
            className='h-56 w-full bg-cover bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${img})` }}
          />
        </div>
        <div className='flex flex-col gap-2 pb-1 pl-6 '>
          <h1 className='text-3xl font-extrabold'>{restaurant.name}</h1>
          <h4 className='text-sm'>{restaurant.address}</h4>
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
            <Link href='/dashboard' className='w-[50%]'>
              <Button className='h-12 w-full' onClick={() => postReview()}>
                Submit
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
