import {
  User, Search, Home, MapPinned,
} from 'lucide-react';
import React from 'react';
import AddReviewButton from '@components/addNewReviewButton';
import NavbarButton from '@components/Navbar/NavbarButtons';
import { currentUser } from '@clerk/nextjs/server';

export default async function NavBar () {
  const user = await currentUser();
  if (!user || !user.username) {
    return <div>Not authenticated</div>;
  }

  return (
    <div className='flex w-full justify-evenly bg-white pb-3 pt-3 shadow-[0_-1px_24px_0px_rgba(0,0,0,0.1)]'>
      <NavbarButton Icon={Home} Route='home' />
      <NavbarButton Icon={Search} Route='search' />
      <AddReviewButton />
      <NavbarButton Icon={MapPinned} Route='' />
      <NavbarButton Icon={User} Route={`user/${user.username}`} />
    </div>
  );
}
