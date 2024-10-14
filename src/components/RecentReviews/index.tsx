import React from 'react';
import { ScrollArea, ScrollBar } from '@ui/scroll-area';
import RecentReviewCard from '@components/RecentReviews/RecentReviewCard';
import { getUserByUsername } from '@lib/userService';

async function RecentReviews ({ username }: { username: string }) {
  const user = await getUserByUsername(username);
  if (!user) {
    return <div>User not found</div>;
  }
  return (
    <div className='flex flex-row'>
      <ScrollArea className='whitespace-nowrap'>
        <div className='relative flex w-max space-x-4'>
          {user.reviews.map((review: any) => (
            <RecentReviewCard key={review.id} review={review} />
          ))}
        </div>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </div>
  );
}

export default RecentReviews;
