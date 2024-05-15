import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/hooks/getSession';
import { User } from '@/types/user';
import ReviewForm from '@/components/reviewForm';

interface PageProps {
  searchParams: {
    restaurant: string;
    imgSource: string;
  };
}

export default async function Page ({ searchParams }: PageProps) {
  const session = await getSession();
  const user = session?.user as User | null;

  if (!user) {
    redirect('/');
  }

  const restaurant = JSON.parse(searchParams.restaurant);
  const img = JSON.parse(searchParams.imgSource);

  return (
    <div className='flex h-full w-full justify-center'>
      <div className='flex h-full w-[90%] flex-col justify-around'>
        <h1 className='pl-6 pt-7 text-3xl font-extrabold'>Add a review</h1>
        <div className='flex w-full justify-center'>
          <div
            className='h-56 w-full bg-cover bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${img})` }}
          />
        </div>
        <div className='flex flex-col gap-2 pb-1 pl-6 '>
          <h1 className='text-3xl font-extrabold'>{restaurant.name}</h1>
          <h4 className='text-sm'>{restaurant.address}</h4>
        </div>
        <ReviewForm restaurant={restaurant} user={user} />
      </div>
    </div>
  );
}
