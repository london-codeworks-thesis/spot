import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from './ui/card';

export default function RestaurantSearchResultCard () {
  return (
    <Link href='/dashboard/add'>
      <Card className='flex h-24 w-full shrink-0 items-center justify-center'>
        <CardContent>
          <h1>Hey</h1>
        </CardContent>
      </Card>
    </Link>
  );
}
