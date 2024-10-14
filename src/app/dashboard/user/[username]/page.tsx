import MarkerMap from '@components/markerMap';
import ProfileHeader from '@components/profile/ProfileHeader';
import RecentReviews from '@components/RecentReviews';
import Settings from '@components/settings';
import { getRestaurantsReviewedByUser } from '@lib/restaurantService';
import { getUserByUsername } from '@lib/userService';
import React from 'react';
import { auth } from '@clerk/nextjs/server';

interface UserPageProps {
  params: {
    username: string;
  };
}

async function UserPage ({ params }: UserPageProps) {
  const { username } = params;
  const profile = await getUserByUsername(username);
  const session = await auth();

  if (!profile) {
    return <div>User not found</div>;
  }

  const profileId = profile.id;

  if (!session) {
    return <div>Loading...</div>;
  }

  const [user, restaurants] = await Promise.all([
    getUserByUsername(username),
    getRestaurantsReviewedByUser(username),
  ]);

  if (!user) {
    return <div>User not found</div>;
  }

  const isCurrentUser = session.userId === profileId;
  const topMargin = isCurrentUser ? 'mt-4' : 'mt-8';

  return (
    <div className={`mx-5 mb-5 ${topMargin} flex flex-col gap-4`}>
      <div className='flex w-full flex-col gap-1'>
        {isCurrentUser && (
          <div className='flex justify-end '>
            <Settings />
          </div>
        )}
        <ProfileHeader username={username} />
      </div>
      <div className='flex flex-col gap-2'>
        <h2 className='text-2xl font-semibold'>Review Map</h2>
        <div className='h-[30vh] w-full overflow-clip rounded-2xl'>
          <MarkerMap data={restaurants} hideSearch />
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <h2 className='text-2xl font-semibold'>Recent Reviews</h2>
        <RecentReviews username={username} />
      </div>
    </div>
  );
}

export default UserPage;
