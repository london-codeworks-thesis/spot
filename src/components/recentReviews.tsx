import React from 'react';
import { ScrollArea, ScrollBar } from 'src/components/ui/scroll-area';
import RecentReviewCard from 'src/components/recentReviewCard';
import { getUserById } from '@/lib/userService';

async function RecentReviews ({ profileId }: { profileId: string }) {
  const user = await getUserById(profileId);
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
