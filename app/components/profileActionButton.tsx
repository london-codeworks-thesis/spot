'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

interface ProfileActionButtonProps {
  handleActionButtonClick: (
    currentUserId: string,
    profileUserId: string,
    actionButtonValue: string
  ) => void;
  currentUserId: string;
  profileUserId: string;
  actionButtonValue: string;
}

function ProfileActionButton ({
  handleActionButtonClick,
  currentUserId,
  profileUserId,
  actionButtonValue,
}: ProfileActionButtonProps) {
  const actionButtonVariant: 'default' | 'secondary' = actionButtonValue === 'Unfollow' || actionButtonValue === 'Edit Profile'
    ? 'secondary'
    : 'default';

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleActionButtonClick(currentUserId, profileUserId, actionButtonValue);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input name='itemId' className='hidden' />
      <Button className='w-full' variant={actionButtonVariant} type='submit'>
        {actionButtonValue}
      </Button>
    </form>
  );
}

export default ProfileActionButton;
