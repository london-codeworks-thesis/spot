import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ReviewWithUser } from 'types/ReviewWithUser';
import { Card, CardContent } from '@ui/card';
import MarkerPopupIcons from '@components/MarkerPopup/MarkerPopupRatingIcons';

export default function SingleReview ({ review }: { review: ReviewWithUser }) {
  function valueChecker (num: number): string {
    return Number.isInteger(num) ? `${num}.0` : `${num}`;
  }
  return (
    <Link href={`/dashboard/user/${review.user.id}`} className='h-full w-full'>
      <Card className='h-[90%] w-full shrink-0'>
        <CardContent className='flex h-full w-full items-center justify-between p-0 pl-3 pr-6'>
          {review.user.image ? (
            <Image
              src={review.user.image}
              alt='Profile Picture'
              width={50}
              height={50}
              className='aspect-square rounded-full object-cover'
            />
          ) : (
            <Card className='flex h-[60px] w-[60px] items-center justify-center rounded-full' />
          )}
          <MarkerPopupIcons
            value={valueChecker(review.rating_food)}
            IconType='Food'
            isReview
          />
          <MarkerPopupIcons
            value={valueChecker(review.rating_value)}
            IconType='Value'
            isReview
          />
          <MarkerPopupIcons
            value={valueChecker(review.rating_atmosphere)}
            IconType='Vibe'
            isReview
          />
        </CardContent>
      </Card>
    </Link>
  );
}
