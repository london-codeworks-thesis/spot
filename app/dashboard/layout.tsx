// layout.tsx
import React from 'react';
import NavBar from '@/components/nav-bar';

export default function Layout ({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-screen flex-col justify-between'>
      <div className='grow overflow-scroll scrollbar-none md:p-12'>
        {children}
      </div>
      <NavBar />
    </div>
  );
}
