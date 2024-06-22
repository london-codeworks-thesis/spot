import React from 'react';
import NavBar from 'src/components/navBar';

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
