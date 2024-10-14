import { currentUser } from '@clerk/nextjs/server';
import ReviewForm from '@components/forms/ReviewForm';
import { Card } from '@ui/card';
import { redirect } from 'next/navigation';
import prisma from '@lib/prisma';
import React from 'react';
import { User } from '@prisma/client';

interface PageProps {
  searchParams: {
    restaurant: string;
    imgSource: string;
  };
}

export default async function Page ({ searchParams }: PageProps) {
  const session = await currentUser();

  if (!session || !session.username) {
    redirect('/');
  }

  const user = await prisma.user.findUnique({
    where: { username: session.username },
  });

  const restaurant = JSON.parse(searchParams.restaurant);
  const img = JSON.parse(searchParams.imgSource);

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
        <ReviewForm restaurant={restaurant} user={user as User} />
      </div>
    </div>
  );
}
