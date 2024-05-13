import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { User } from '@/types/user';

function ProfileHeader ({
  name,
  image,
}: {
  name: User['name'];
  image: User['image'];
}) {
  return (
    <div className='mx-5 flex gap-4'>
      <Avatar>
        <AvatarImage src={image as string} width={100} height={100} />
        <AvatarFallback>TDS</AvatarFallback>
      </Avatar>
      <div className='flex flex-col'>
        <h1 className='text-3xl font-semibold'>{name}</h1>
        <div className='flex flex-row gap-8 font-semibold'>
          <div className='flex flex-col items-center'>
            <p>20</p>
            <p className='text-xs'>Followers</p>
          </div>
          <div className='flex flex-col items-center'>
            <p>30</p>
            <p className='text-xs'>Following</p>
          </div>
          <div className='flex flex-col items-center'>
            <p>10</p>
            <p className='text-xs'>Reviews</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
