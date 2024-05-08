import React from 'react';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { Card, CardContent, CardTitle } from './ui/card';

export default function RestaurantSearchResultCard () {
  return (
    <Link href='/dashboard/add'>
      <Card className='flex h-24 w-full shrink-0 items-center justify-center hover:bg-slate-50'>
        <CardContent className='flex h-full w-full items-center gap-3 p-2'>
          <Card className='h-20 w-20 shrink-0' />
          <div className='flex h-20 w-full flex-col'>
            <CardTitle className='m-0 p-0 text-lg'>Itsu</CardTitle>
            <p className='text-xs font-light text-slate-500'>
              Japanese restaurant
            </p>
            <p className='text-[.60rem] font-light text-slate-500'>
              1.10 miles away
            </p>
            <p className='flex items-center text-[.60rem] font-light text-slate-500'>
              <MapPin size={10} />
              &nbsp; 60 Horseferry Rd, London, SW1P 2AF
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
