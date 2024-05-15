'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

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
    <div className='text-center'>Loading...</div>
  );
}

export default ProfileActionButton;
