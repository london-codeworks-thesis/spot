import Image from 'next/image';
import { Button } from '@/components/ui/button';
import React from 'react';
import Logo from '~/Logo_Dark.svg';

export default function LandingPage () {
  return (
    <main className="flex min-h-screen flex-col items-center bg-black">
      <Image
        src={Logo}
        width={150}
        height={150}
        alt="Spot logo white"
        className="pt-[20vh]"
      />
      <div className="absolute bottom-0 z-20 flex h-[45vh] w-full flex-col items-center justify-center rounded-t-3xl bg-white">
        <div className="flex w-4/5 justify-center gap-2">
          <Button className="w-2/6">Log In</Button>
          <Button variant="outline" className="w-3/6">
            Register
          </Button>
        </div>
      </div>
    </main>
  );
}
