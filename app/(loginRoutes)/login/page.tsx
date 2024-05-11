import React from 'react';
import Link from 'next/link';
import { SeparatorText } from '@/components/ui/separatorText';
import AuthButtons from '@/components/authButtons';
import LoginForm from '@/components/loginForm';

export default function Login () {
  return (
    <main className='mx-5 flex min-h-[100vh] flex-col items-center'>
      <div className='mt-[9vh] flex w-full grow flex-col'>
        <div className='mb-5 flex w-full flex-col gap-9'>
          <h1 className='text-3xl font-extrabold'>Log In</h1>
          <LoginForm />
        </div>
        <div className='flex w-full items-center justify-center gap-3'>
          <SeparatorText text='Or Login with' />
        </div>
        <AuthButtons />
      </div>
      <div className='my-[4.5vh] flex'>
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
