import React from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import NavBar from '@/components/nav-bar';

export default async function Layout ({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
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
