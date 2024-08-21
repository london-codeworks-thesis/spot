'use client';

import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import Image from 'next/image';
import { Restaurant } from 'types/restaurant';
import {
  Drawer, DrawerContent, DrawerTrigger, DrawerHeader,
} from '@ui/drawer';
import { Button } from '@ui/button';
import { Input } from '@ui/input';
import { Label } from '@ui/label';
import { Separator } from '@ui/separator';
import RestaurantSearchResultCard from '@components/RestaurantSearchResultCard';
import { POST } from '@/api/googleapi/route';
import Logo from '~/Logo.svg';

export default function AddReviewButton () {
  const [input, setInput] = useState('');
  const [results, setResults] = useState<Restaurant[]>([]);

  async function handleSubmit () {
    if (input === '') return;
    try {
      const res: Restaurant[] = await POST({ textQuery: input });
      if (res[0].displayName.text !== undefined) {
        setResults(res);
        setInput('');
      }
    } catch (error) {
      console.log(error);
    }
  }
  function handleKeyDown (e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  }
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant='ghost'>
          <Plus />
        </Button>
      </DrawerTrigger>
      <DrawerContent className='flex h-[90vh] items-center'>
        <div className='flex h-full w-[90%] flex-col gap-3'>
          <DrawerHeader className='text-2xl font-extrabold'>
            Visited a new spot?
          </DrawerHeader>
          <div className='flex w-full items-center'>
            <Input
              className='h-12 shrink-0 pr-[18%]'
              placeholder='Search for it and leave a review '
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
            />
            <Button
              variant='ghost'
              className='ml-[-15%] w-[12%]'
              onClick={() => handleSubmit()}
            >
              <Search size={20} className='shrink-0' />
            </Button>
          </div>
          {results.length > 0 ? (
            <div>
              <Label className='p-3 text-xl font-bold'>Results</Label>
              <Separator className='mt-3' />
            </div>
          ) : (
            <div />
          )}
          <div className='flex h-full w-full flex-col gap-4 overflow-scroll pt-4 scrollbar-none'>
            {results.length ? (
              results.map((restaurant) => (
                <RestaurantSearchResultCard
                  restaurant={restaurant}
                  setResults={setResults}
                  key={restaurant.id}
                />
              ))
            ) : (
              <div className='mt-[-10%] flex h-full w-full items-center justify-center'>
                <Image
                  src={Logo}
                  width={600}
                  height={600}
                  alt='Spot Logo'
                  className='opacity-[2%]'
                />
              </div>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
