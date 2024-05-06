import Image from 'next/image';
import { Button } from '@/components/ui/button';
import React from 'react';
import Logo from '~/Logo_Dark.svg';

export default function LandingPage () {
  return (
    <main className='flex min-h-screen flex-col items-center bg-black'>
      <Image
        src={Logo}
        width={150}
        height={150}
        alt='Spot logo white'
        className='pt-[20vh]'
      />
      <div className='absolute bottom-0 z-20 flex h-[45vh] w-full flex-col items-center justify-start gap-4 rounded-t-3xl bg-white pt-12'>
        <div className='flex w-4/5 flex-col gap-5'>
          <div>
            <h1 className='font-poppins text-4xl font-bold'>Welcome to</h1>
            <h1 className='font-poppins text-4xl font-bold text-gray-600'>
              Spot
            </h1>
          </div>
          <h4 className='w-11/12 text-lg font-semibold text-gray-400'>
            Lorem ipsum dolor sit amet consectetur. Aenean sed nibh gravida vel
            platea varius.
          </h4>
        </div>
        <div className='flex w-4/5 justify-center gap-2'>
          <Button className='w-3/6'>Log In</Button>
          <Button variant='outline' className='w-4/6'>
            Register
          </Button>
        </div>
      </div>
    </main>
  );
}
