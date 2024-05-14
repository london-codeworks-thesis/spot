import React from 'react';
import ProfileHeader from '@components/profileHeader';
import MarkerMap from '@components/markerMap';
import RecentReviews from '@components/recentReviews';
import FollowButton from '@components/followButton';
import { getSession } from '@/hooks/getSession';
import { getUserById, getRestaurantsReviewedByUser } from '@/lib/userService';

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
      <div className='flex flex-col'>
        <ProfileHeader
          first_name={user.first_name || 'First Name'}
          last_name={user.last_name || 'Last Name'}
          image={user.image || ''}
          followers={user._count.followers ?? 0}
          following={user._count.following ?? 0}
          reviews={user._count.reviews ?? 0}
        />
      </div>
      <div className='flex flex-row'>
        <div className='ml-[116px] w-[207px]'>
          <FollowButton userIdToFollow={profileId} />
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <h2 className='text-2xl font-semibold'>Review Map</h2>
        <div className='h-[30vh] w-full overflow-clip rounded-2xl'>
          <MarkerMap data={restaurants} />
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
