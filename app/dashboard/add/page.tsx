'use client';

import React, { useState } from 'react';
import { Rate } from 'antd';
import { PiggyBank, Flame, Cookie } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function Page () {
  const [food, setFood] = useState(2.5);
  const [value, setValue] = useState(2.5);
  const [vibe, setVibe] = useState(2.5);
  return (
    <div className='p-6'>
      <div className='flex w-full flex-col gap-4'>
        <h1 className='pl-6 pt-7 text-3xl font-extrabold'>Add a review</h1>
        <div className='flex w-full justify-center'>
          <Card className='h-56 w-11/12 bg-gray-50' />
        </div>
        <div className='flex flex-col gap-2 pl-6'>
          <h1 className='text-3xl font-extrabold'>Itsu</h1>
          <h4 className='pb-1 text-sm'>60 Horseferry Rd, London, SW1P 2AF</h4>
        </div>
        <div className='flex w-full flex-col items-center justify-center gap-7'>
          <Card className='w-11/12 bg-gray-50'>
            <CardContent className='flex gap-3 pb-7'>
              <div className='flex w-4/6 flex-col gap-3 pt-6'>
                <Label className='text-md flex w-20 items-center justify-between'>
                  Food
                  {' '}
                  <Cookie size={20} />
                </Label>
                <Rate
                  value={food}
                  onChange={(v) => {
                    setFood(v);
                    console.log(food);
                  }}
                  allowHalf
                  style={{ color: 'black' }}
                />
                <Label className='text-md flex w-20 items-center justify-between'>
                  Value
                  {' '}
                  <PiggyBank size={20} />
                </Label>
                <Rate
                  value={value}
                  onChange={(v) => {
                    setValue(v);
                    console.log(value);
                  }}
                  allowHalf
                  style={{ color: 'black' }}
                />
                <Label className='text-md flex w-20 items-center justify-between'>
                  Vibe
                  {' '}
                  <Flame size={20} className='mb-1' />
                </Label>
                <Rate
                  value={vibe}
                  onChange={(v) => {
                    setVibe(v);
                    console.log(vibe);
                  }}
                  allowHalf
                  style={{ color: 'black' }}
                />
              </div>
              <div className='flex w-3/6 flex-col items-center gap-2 pt-6'>
                <Card className='flex h-16 w-24 items-center justify-center'>
                  <h1 className='text-lg font-bold text-black'>{food}</h1>
                </Card>
                <Card className='flex h-16 w-24 items-center justify-center'>
                  <h1 className='text-lg font-bold text-black'>{value}</h1>
                </Card>
                <Card className='flex h-16 w-24 items-center justify-center'>
                  <h1 className='text-lg font-bold text-black'>{vibe}</h1>
                </Card>
              </div>
            </CardContent>
          </Card>
          <div className='flex w-11/12 flex-col gap-2'>
            <Button className='h-12'>Submit</Button>
            <Button variant='outline' className='h-12'>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
