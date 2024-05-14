import React from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import RecentReviewCard from './recentReviewCard';

function RecentReviews ({ reviews }: { reviews: any }) {
  return (
    <div className='flex h-[200px] flex-row'>
      <ScrollArea className='whitespace-nowrap'>
        <div className='relative flex w-max space-x-4'>
          {reviews.map((review: any) => (
            <RecentReviewCard key={review.id} review={review} />
          ))}
        </div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </div>
  );
}

export default RecentReviews;
