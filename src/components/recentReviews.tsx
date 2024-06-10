import React from 'react';
import { ScrollArea, ScrollBar } from 'src/components/ui/scroll-area';
import RecentReviewCard from 'src/components/recentReviewCard';

function RecentReviews ({ reviews }: { reviews: any }) {
  return (
    <div className='flex flex-row'>
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
