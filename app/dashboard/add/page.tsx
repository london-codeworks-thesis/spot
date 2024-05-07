'use client';

import React, { useState } from 'react';
import { Rate } from 'antd';
import { PiggyBank, Flame, Cookie } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export default function Page () {
  const [food, setFood] = useState(3);
  const [value, setValue] = useState(3);
  const [vibe, setVibe] = useState(3);
  return (
    <div className=''>
      <div className='flex w-full flex-col justify-center'>
        <h1 className='text-3xl font-extrabold'>Add a Review</h1>
        <Card className='w-11/12 bg-gray-50'>
          <CardContent className='flex flex-col gap-3 pb-7 pt-6'>
            <Label className='text-md flex items-center gap-1'>
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
            />
            <Label className='text-md flex items-center gap-1'>
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
            />
            <Label className='text-md flex items-center gap-1'>
              Vibe
              {' '}
              <Flame size={20} />
            </Label>
            <Rate
              value={vibe}
              onChange={(v) => {
                setVibe(v);
                console.log(vibe);
              }}
              allowHalf
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
