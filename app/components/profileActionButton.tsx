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
  const actionButtonValue = await getActionButtonForTarget(
    currentUserId,
    profileUserId,
  );

  const handleActionButtonClick = async () => {
    'use server';

    if (actionButtonValue === 'Follow' || actionButtonValue === 'Follow Back') {
      console.log('Follow user');
    } else if (actionButtonValue === 'Unfollow') {
      console.log('Unfollow user');
    } else {
      console.log('NOT IMPLEMENTED YET');
    }
  };
  const actionButtonVariant: 'default' | 'secondary' = actionButtonValue === 'Unfollow' || actionButtonValue === 'Edit Profile'
    ? 'secondary'
    : 'default';

  return (
    <form action={handleActionButtonClick}>
      <input name='itemId' className='hidden' value={actionButtonValue} />
      <Button className='w-full' variant={actionButtonVariant} type='submit'>
        {actionButtonValue}
      </Button>
    </form>
  );
}

export default ProfileActionButton;
