import React from 'react';
import Link from 'next/link';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import AuthButtons from '@/components/authButtons';

export default function Login () {
  console.log(process.env.GOOGLE_CLIENT_ID);
  return (
    <main className='flex min-h-screen flex-col items-center'>
      <div className='flex h-[70v] w-4/5 flex-col items-start justify-center gap-8 pt-20'>
        <h1 className='mb-4 text-3xl font-extrabold'>Log In</h1>
        <div className='flex w-full flex-col gap-3'>
          <Label>Email address</Label>
          <Input
            type='email'
            placeholder='johndoe@gmail.com'
            className='h-12'
          />
        </div>
        <div className='flex w-full flex-col gap-3'>
          <Label>Password</Label>
          <Input type='password' placeholder='•••••••••••' className='h-12' />
          <div className='flex w-full justify-end'>
            <Link href='/forgottenPassword'>
              <p className='text-xs'>Forgot password?</p>
            </Link>
          </div>
        </div>
        <Button className='h-12 w-full'>Log In</Button>
        <div className='flex w-full items-center justify-center gap-3'>
          <Separator className='w-4/12' />
          <p className='text-xs text-gray-400'>Or Login with</p>
          <Separator className='w-4/12' />
        </div>
        <AuthButtons />
      </div>
      <div className='flex h-[30vh] items-end justify-end pb-8'>
        <p className='text-center text-xs'>
          Don&apos;t have an account?
          <Link href='/register'>
            <span className='font-extrabold'>&nbsp;Sign up</span>
          </Link>
        </p>
      </div>
    </main>
  );
}
