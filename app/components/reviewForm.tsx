'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PiggyBank, Flame, Cookie } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import RatingCard from '@/components/starNumberCard';
import StarRatingSystem from '@/components/ratingStars';
import { User } from '@/types/user';

interface ReviewFormProps {
  restaurant: any;
  user: User;
}

export default function ReviewForm ({ restaurant, user }: ReviewFormProps) {
  const [food, setFood] = useState(2.5);
  const [value, setValue] = useState(2.5);
  const [vibe, setVibe] = useState(2.5);
  const router = useRouter();

  async function postReview () {
    try {
      const body = {
        ...restaurant,
        rating_food: food,
        rating_value: value,
        rating_atmosphere: vibe,
        userId: user.id,
      };
      const res = await fetch(`/api/restaurant/${restaurant.id}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      await res.json();
      // TODO: handle Success
      if (!res.ok) {
        throw new Error(`Failed to post review: ${res.status}`);
      }
    } catch (error) {
      console.error('Error sending reviews', error);
      throw error;
    }
  }

  function handleCancel () {
    router.back();
  }

  return (
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
        <Button
          variant='outline'
          className='h-12 w-[50%]'
          onClick={() => handleCancel()}
        >
          Cancel
        </Button>
        <Button className='h-12 w-[50%]' onClick={() => postReview()}>
          Submit
        </Button>
      </div>
    </div>
  );
}
