import React from 'react';
import { getActionButtonForTarget } from '@lib/userService';
import { Button } from '@/components/ui/button';
import { getSession } from '@/hooks/getSession';

interface ProfileActionButtonProps {
  profileUserId: string;
}

async function ProfileActionButton ({
  profileUserId,
}: ProfileActionButtonProps) {
  const session = await getSession();
  if (!session?.user?.id) {
    return <div>Loading...</div>;
  }

  const currentUserId = session.user.id;
  if (currentUserId === profileUserId) {
    return (
      <Button className='w-full' variant='secondary'>
        Edit Profile
      </Button>
    );
  }

  const actionButtonValue = await getActionButtonForTarget(
    currentUserId,
    profileUserId,
  );

  console.log(actionButtonValue);

  return <Button className='w-full'>{actionButtonValue}</Button>;
}

export default ProfileActionButton;
