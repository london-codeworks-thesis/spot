import React from 'react';

export default function RootLayout ({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className='mb-10 mt-10 flex justify-center'>{children}</div>;
}
