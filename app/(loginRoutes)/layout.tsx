import React from 'react';
import { redirect } from 'next/navigation';
import { getSession } from '@/hooks/getSession';

export default async function Layout ({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (session) {
    redirect('/dashboard');
  }
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}
