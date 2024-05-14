import React from 'react';
import { redirect } from 'next/navigation';
import NavBar from '@/components/nav-bar';
import { getSession } from '@/hooks/getSession';

export default async function Layout ({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) {
    redirect('/');
  }
  return (
    <div className='flex h-screen flex-col justify-between'>
      <div className='grow overflow-scroll scrollbar-none md:p-12'>
        {children}
      </div>
      <NavBar />
    </div>
  );
}
