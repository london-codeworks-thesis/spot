'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useSession } from 'next-auth/react';
import { handleActionButtonClick } from '@/lib/actionService';
import ProfileActionButton from '@/components/profileActionButton';

interface ProfileHeaderProps {
  first_name: string;
  last_name: string;
  image: string;
  followers: number;
  following: number;
  reviews: number;
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
async function fetchProfileData (profileUserId: string) {
  // Replace this with your actual API call to fetch profile data
  const response = await fetch(`/api/stats/user/${profileUserId}`);
  const data = await response.json();
  return data;
}

function ProfileHeader ({
  first_name,
  last_name,
  image,
  followers,
  following,
  reviews,
  profileUserId,
}: ProfileHeaderProps) {
  const [actionButtonValue, setActionButtonValue] = useState<string>('');
  const [followerCount, setFollowerCount] = useState(followers);
  const [followingCount, setFollowingCount] = useState(following);
  const [reviewCount, setReviewCount] = useState(reviews);
  const router = useRouter();

  const session = useSession();

  if (!session) {
    router.push('/login');
  }

  const currentUserId = session?.data?.user?.id ?? '';

  // To account for multiword names
  const getInitials = (name: string) => name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase();

  const initials = `${getInitials(first_name)}${getInitials(last_name)}`;

  useEffect(() => {
    async function getActionButtonValue () {
      if (currentUserId !== '') {
        const value = await fetchActionButtonValue(
          currentUserId,
          profileUserId,
        );
        setActionButtonValue(value);
      }
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
      const updatedData = await fetchProfileData(profileUserId);
      setFollowerCount(updatedData.followers);
      setFollowingCount(updatedData.following);
      setReviewCount(updatedData.reviews);
    }
  };

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex w-full flex-grow items-center'>
        {image ? (
          <Image
            src={image as string}
            alt='Profile Picture'
            width={100}
            height={100}
            className='aspect-square rounded-full object-cover'
            priority
          />
        ) : (
          <div className='flex h-24 w-24 items-center justify-center rounded-full bg-gray-500'>
            <span className='text-3xl font-semibold text-white'>
              {initials}
            </span>
          </div>
        )}
        <div className='flex h-[100px] flex-grow flex-col justify-evenly gap-4'>
          <div className='align-center flex flex-row justify-center gap-6 font-semibold text-neutral-700'>
            <div className='flex flex-col items-center'>
              <p>{followerCount}</p>
              <p className='text-xs'>Followers</p>
            </div>
            <div className='flex flex-col items-center'>
              <p>{followingCount}</p>
              <p className='text-xs'>Following</p>
            </div>
            <div className='flex flex-col items-center'>
              <p>{reviewCount}</p>
              <p className='text-xs'>Reviews</p>
            </div>
          </div>
          <div className='mx-auto w-[210px]'>
            <ProfileActionButton
              handleSubmit={handleSubmit}
              actionButtonValue={actionButtonValue}
            />
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <h1 className='text-3xl font-semibold text-neutral-900'>
          {first_name}
          {' '}
          {last_name}
        </h1>
      </div>
    </div>
  );
}

export default ProfileHeader;
