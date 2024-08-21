import AuthButtons from '@components/authButtons';
import RegisterForm from '@components/forms/RegisterForm';
import { SeparatorText } from '@ui/separatorText';
import Link from 'next/link';
import React from 'react';

export default function Register () {
  return (
    <div className='flex w-screen flex-col gap-8 px-5 pt-20'>
      <h1 className='text-3xl font-extrabold'>Register</h1>
      <RegisterForm />
      <div className='flex w-full items-center justify-center gap-3'>
        <SeparatorText text='Or Login with' />
      </div>
      <AuthButtons />
      <p className='text-center text-xs'>
        Already have an account?
        <Link href='/login'>
          <span className='font-extrabold'> Log in</span>
        </Link>
      </p>
    </div>
  );
}
