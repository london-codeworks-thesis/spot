'use client';

import React from 'react';
import { signIn } from 'next-auth/react';
import AuthButton from '@/ui/authButton';

export default function AuthButtons () {
  function handleClick (provider: string) {
    signIn(provider, { callbackUrl: '/dashboard' });
  }

  return (
    <div className='flex w-full flex-row justify-center gap-4'>
      <AuthButton icon='google' onClick={() => handleClick('google')} />
      <AuthButton icon='facebook' onClick={() => handleClick('facebook')} />
      <AuthButton icon='apple' onClick={() => handleClick('apple')} />
    </div>
  );
}
