import React from 'react';
import { Card } from '@/ui/card';

type RatingCardProps = {
  ratingFor: number;
};

export default function RatingCard ({ ratingFor }: RatingCardProps) {
  function numberFixer (n: number): string | number {
    if (Number.isInteger(n)) {
      return `${n}.0`;
    }
    return n;
  }
  return (
    <Card className='flex h-16 w-24 items-center justify-center'>
      <h1 className='text-lg font-bold text-black'>{numberFixer(ratingFor)}</h1>
    </Card>
  );
}
