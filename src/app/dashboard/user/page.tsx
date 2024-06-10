import React from 'react';
import ProfileHeader from 'src/components/profileHeader';
import Settings from 'src/components/settings';
import MarkerMap from 'src/components/markerMap';
import RecentReviews from 'src/components/recentReviews';
import { getUserById } from 'src/lib/userService';
import { getRestaurantsReviewedByUser } from 'src/lib/restaurantService';
import { auth } from 'src/auth';

export default async function Page () {
  const session = await auth();

  if (!session) {
    return <div>Not authenticated</div>;
  }

  const user = await getUserById(session.user.id);
  const restaurants = await getRestaurantsReviewedByUser(session.user.id);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className='mx-5 flex flex-col gap-4'>
      <div className='flex flex-col'>
        <div className='flex justify-end '>
          <Settings />
        </div>
        <ProfileHeader
          first_name={user.first_name || 'First Name'}
          last_name={user.last_name || 'Last Name'}
          image={user.image || ''}
          followers={user._count.followers ?? 0}
          following={user._count.following ?? 0}
          reviews={user._count.reviews ?? 0}
          profileUserId={session.user.id}
        />
      </div>
      <div className='flex flex-col gap-2'>
        <h2 className='text-2xl font-semibold'>Review Map</h2>
        <div className='h-[30vh] w-full overflow-clip rounded-2xl'>
          <MarkerMap data={restaurants} hideSearch />
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <h2 className='text-2xl font-semibold'>Recent Reviews</h2>
        <RecentReviews reviews={user.reviews} />
      </div>
    </div>
  );
}
