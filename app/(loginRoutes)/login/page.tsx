import React from 'react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import AuthButtons from '@/components/authButtons';
import LoginForm from '@/components/loginForm';

export default function Login () {
  return (
    <main className='flex min-h-full flex-col items-center px-5'>
      <h1 className='text-3xl font-extrabold'>Log In</h1>
      <LoginForm />
      <div className='flex w-full items-center justify-center gap-3'>
        <Separator className='' />
        <p className='text-xs text-gray-400'>Or Login with</p>
        <Separator className='' />
      </div>
      <AuthButtons />
      <div className='flex'>
        <Link href='/register'>
          <p className='text-center text-xs'>
            Don&apos;t have an account?
            <span className='font-extrabold'>&nbsp;Sign up</span>
          </p>
        </Link>
      </div>
    </main>
  );
}
