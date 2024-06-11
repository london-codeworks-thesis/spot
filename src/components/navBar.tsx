import {
  User, Search, Home, MapPinned,
} from 'lucide-react';
import React from 'react';
import AddReviewButton from 'src/components/addNewReviewButton';
import NavBarButton from 'src/components/navbarButtons';
import { auth } from '@/auth';

export default async function NavBar () {
  const session = await auth();
  if (session === null) {
    return <div>Not authenticated</div>;
  }

  return (
    <div className='flex w-full justify-evenly bg-white pb-3 pt-3 shadow-[0_-1px_24px_0px_rgba(0,0,0,0.1)]'>
      <NavBarButton Icon={Home} Route='home' />
      <NavBarButton Icon={Search} Route='search' />
      <AddReviewButton />
      <NavBarButton Icon={MapPinned} Route='' />
      <NavBarButton Icon={User} Route={`user/${session.user.id}`} />
    </div>
  );
}
