import NavBar from '@components/Navbar';
import React from 'react';

export default async function Layout ({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex h-dvh flex-col'>
      <div className='flex-1 overflow-y-auto scrollbar-none'>{children}</div>
      <NavBar />
    </div>
  );
}
