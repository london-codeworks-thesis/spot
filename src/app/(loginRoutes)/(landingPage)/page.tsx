import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from 'src/components/ui/button';
import { Separator } from 'src/components/ui/separator';
import Logo from '~/Logo_Dark.svg';

export default function LandingPage () {
  return (
    <main className='flex min-h-dvh flex-col items-center bg-black'>
      <Image
        src={Logo}
        width='0'
        height='0'
        alt='Spot logo white'
        className='h-auto w-[150px] pt-[20vh]'
        priority
      />
      <div className='absolute bottom-0 z-20 flex h-[45vh] w-full flex-col items-center justify-evenly rounded-t-3xl bg-white pt-7'>
        <div className='flex w-4/5 flex-col gap-7'>
          <div>
            <h1 className='font-poppins text-4xl font-bold'>Welcome to</h1>
            <h1 className='font-poppins text-4xl font-bold text-gray-600'>
              Spot
            </h1>
          </div>
          <h4 className='text-md w-11/12 font-semibold text-gray-400'>
            Find and rate the tastiest spots in town. Discover hidden gems, and
            share with your friends!
          </h4>
        </div>
        <div className='flex w-4/5 items-center justify-center gap-4'>
          <Separator className='w-4/12' />
          <h4 className='text-xs text-gray-300'>Get Started</h4>
          <Separator className='w-4/12' />
        </div>
        <div className='flex w-4/5 justify-center gap-2'>
          <Link href='/login' className='w-3/6'>
            <Button className='w-full'>Log In</Button>
          </Link>
          <Link href='/register' className='w-4/6'>
            <Button variant='outline' className='w-full'>
              Register
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
