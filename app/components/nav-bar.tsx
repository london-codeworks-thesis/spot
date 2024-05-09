import {
  User, Search, Home, Plus, MapPinned,
} from 'lucide-react';
import React from 'react';
import AddReviewButton from './addNewReviewButton';
import NavBarButton from './navbarButtons';

export default function NavBar () {
  return (
    <div className='flex w-full justify-evenly bg-white pb-3 pt-3 shadow-[0_-1px_24px_0px_rgba(0,0,0,0.1)]'>
      <NavBarButton Icon={Home} Route='home' />
      <NavBarButton Icon={Search} Route='search' />
      <AddReviewButton/>
      <NavBarButton Icon={MapPinned} Route='' />
      <NavBarButton Icon={User} Route='user' />
    </div>
  );
}
