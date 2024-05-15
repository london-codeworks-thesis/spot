'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface ProfileActionButtonProps {
  handleActionButtonClick: (
    currentUserId: string,
    profileUserId: string,
    actionButtonValue: string
  ) => Promise<boolean>;
  currentUserId: string;
  profileUserId: string;
}

async function fetchActionButtonValue (
  currentUserId: string,
  profileUserId: string,
) {
  try {
    const response = await fetch('/api/getActionButton', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ currentUserId, profileUserId }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch action button value');
    }

    const data = await response.json();
    return data.actionButtonText;
  } catch (error) {
    console.error('Error fetching action button value:', error);
    return null;
  }
}

function ProfileActionButton ({
  handleActionButtonClick,
  currentUserId,
  profileUserId,
}: ProfileActionButtonProps) {
  const [actionButtonValue, setActionButtonValue] = useState<string | null>(
    null,
  );

  useEffect(() => {
    async function getActionButtonValue () {
      const value = await fetchActionButtonValue(currentUserId, profileUserId);
      setActionButtonValue(value);
    }
    getActionButtonValue();
  }, [currentUserId, profileUserId]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const success = await handleActionButtonClick(
      currentUserId,
      profileUserId,
      actionButtonValue!,
    );
    if (success) {
      const newValue = await fetchActionButtonValue(
        currentUserId,
        profileUserId,
      );
      setActionButtonValue(newValue);
    }
  };

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
