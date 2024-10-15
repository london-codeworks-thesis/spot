'use client';

import React, { useState } from 'react';
import { Button } from '@ui/button';
import { handleActionButtonClick } from '@lib/actionService';
import type { getActionButtonForTarget } from '@lib/userService';
import { RedirectToUserProfile } from '@clerk/nextjs';

interface ProfileActionButtonProps {
  actionButtonValue: Awaited<ReturnType<typeof getActionButtonForTarget>>;
  username: string;
}

function ProfileActionButton ({
  actionButtonValue,
  username,
}: ProfileActionButtonProps) {
  const [redirect, setRedirect] = useState(false);

  const actionButtonVariant: 'default' | 'secondary' = actionButtonValue === 'Unfollow' || actionButtonValue === 'Edit Profile'
    ? 'secondary'
    : 'default';

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (actionButtonValue === 'Edit Profile') {
      setRedirect(true);
    } else {
      handleActionButtonClick(actionButtonValue, username);
    }
  };

  return (
    <>
      {redirect && <RedirectToUserProfile />}
      {actionButtonValue ? (
        <form onSubmit={handleSubmit}>
          <Button
            className='w-full'
            variant={actionButtonVariant}
            type='submit'
          >
            {actionButtonValue}
          </Button>
        </form>
      ) : (
        <Button className='w-full' variant='secondary'>
          Loading...
        </Button>
      )}
    </>
  );
}

export default ProfileActionButton;
