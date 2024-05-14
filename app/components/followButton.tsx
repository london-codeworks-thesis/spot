import React from 'react';
import { Button } from '@/components/ui/button';
import { getSession } from '@/hooks/getSession';

interface FollowButtonProps {
  userIdToFollow: string;
}

async function FollowButton ({ userIdToFollow }: FollowButtonProps) {
  const session = await getSession();
  if (!session?.user?.id) {
    return <div>Loading...</div>;
  }

  if (session.user.id === userIdToFollow) {
    return (
      <Button className='w-full' variant='secondary'>
        Edit Profile
      </Button>
    );
  }

  return <Button className='w-full'>Follow</Button>;
}

export default FollowButton;
