import React from 'react';
import ProfileHeader from '@/components/profileHeader';
import MarkerMap from '@/components/markerMap';
import RecentReviews from '@/components/recentReviews';
import { getUserById } from '@/lib/userService';
import { getRestaurantsReviewedByUser } from '@/lib/restaurantService';
import { getSession } from '@/hooks/getSession';

interface UserPageProps {
  params: {
    id: string;
  };
}

async function UserPage ({ params }: UserPageProps) {
  const profileId = params.id;

  const session = await getSession();

  if (!session?.user?.id) {
    return <div>Loading...</div>;
  }

  const user = await getUserById(profileId);
  const restaurants = await getRestaurantsReviewedByUser(profileId);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className='mx-5 mb-5 mt-8 flex flex-col gap-4'>
      <ProfileHeader
        first_name={user.first_name || 'First Name'}
        last_name={user.last_name || 'Last Name'}
        image={user.image || ''}
        followers={user._count.followers ?? 0}
        following={user._count.following ?? 0}
        reviews={user._count.reviews ?? 0}
        profileUserId={profileId}
      />
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

export default UserPage;
