import MarkerMap from '@components/MarkerMap';
import ProfileHeader from '@components/ProfileHeader';
import RecentReviews from '@components/RecentReviews';
import Settings from '@components/Settings';
import { getRestaurantsReviewedByUser } from '@lib/restaurantService';
import { getUserById } from '@lib/userService';
import React from 'react';
import { auth } from 'src/auth';

interface UserPageProps {
  params: {
    id: string;
  };
}

async function UserPage ({ params }: UserPageProps) {
  const profileId = params.id;
  const session = await auth();

  if (!session) {
    return <div>Loading...</div>;
  }

  const [user, restaurants] = await Promise.all([
    getUserById(profileId),
    getRestaurantsReviewedByUser(profileId),
  ]);

  if (!user) {
    return <div>User not found</div>;
  }

  const isCurrentUser = session.user.id === profileId;
  const topMargin = isCurrentUser ? 'mt-4' : 'mt-8';

  return (
    <div className={`mx-5 mb-5 ${topMargin} flex flex-col gap-4`}>
      <div className='flex w-full flex-col gap-1'>
        {isCurrentUser && (
          <div className='flex justify-end '>
            <Settings />
          </div>
        )}
        <ProfileHeader profileId={profileId} />
      </div>
      <div className='flex flex-col gap-2'>
        <h2 className='text-2xl font-semibold'>Review Map</h2>
        <div className='h-[30vh] w-full overflow-clip rounded-2xl'>
          <MarkerMap data={restaurants} hideSearch />
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <h2 className='text-2xl font-semibold'>Recent Reviews</h2>
        <RecentReviews profileId={profileId} />
      </div>
    </div>
  );
}

export default UserPage;
