import React from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

export default async function Layout ({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  if (session) {
    redirect('/dashboard');
  }
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}
