'use client';

import React from 'react';
import { Button } from 'src/components/ui/button';

interface ProfileActionButtonProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  actionButtonValue: string | null;
}

function ProfileActionButton ({
  handleSubmit,
  actionButtonValue,
}: ProfileActionButtonProps) {
  const actionButtonVariant: 'default' | 'secondary' = actionButtonValue === 'Unfollow' || actionButtonValue === 'Edit Profile'
    ? 'secondary'
    : 'default';

  return actionButtonValue ? (
    <form onSubmit={handleSubmit}>
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
