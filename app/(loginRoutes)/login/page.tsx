import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Login () {
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
      </div>
    </main>
  );
}
