import React from 'react';
import NavBar from '@/components/nav-bar';
import { auth } from '@/auth';

export default async function Layout ({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  console.log('🚀 ~ file: layout.tsx:11 ~ session:', session);
  return (
    <div className='flex h-screen flex-col'>
      <div className='flex-1 overflow-y-auto scrollbar-none'>{children}</div>
      <NavBar />
    </div>
  );
}
