import React from 'react';
import { Button } from '@ui/button';
import { handleActionButtonClick } from '@lib/actionService';

interface ProfileActionButtonProps {
  actionButtonValue: string;
  username: string;
}

function ProfileActionButton ({
  actionButtonValue,
  username,
}: ProfileActionButtonProps) {
  const actionButtonVariant: 'default' | 'secondary' = actionButtonValue === 'Unfollow' || actionButtonValue === 'Edit Profile'
    ? 'secondary'
    : 'default';

  const onClick = handleActionButtonClick.bind(
    null,
    actionButtonValue,
    username,
  );

  return actionButtonValue ? (
    <form action={onClick}>
      <Button className='w-full' variant={actionButtonVariant} type='submit'>
        {actionButtonValue}
      </Button>
    </form>
  ) : (
    <Button className='w-full' variant='secondary'>
      Loading...
    </Button>
  );
}

export default ProfileActionButton;
