import React from 'react';
import { Button } from '@ui/button';
import { Input } from '@ui/input';
import { Label } from '@ui/label';
import Link from 'next/link';
import { Input } from 'src/components/ui/input';

export default function Register () {
  return (
    <div className='flex w-screen flex-col gap-8 px-5 pt-20'>
      <h1 className='text-3xl font-extrabold'>Register</h1>
      <div className='flex flex-row gap-2'>
        <div className='flex flex-col'>
          <Label className='mb-2'>First Name</Label>
          <Input placeholder='John' className='p-6' />
        </div>
        <div className='flex flex-col'>
          <Label className='mb-2'>Last Name</Label>
          <Input placeholder='Doe' className='p-6' />
        </div>
      </div>
      <div className='flex flex-col'>
        <Label className='mb-2'>Email</Label>
        <Input placeholder='Example@gmail.com' className='p-6' />
      </div>
      <div className='flex flex-col'>
        <Label className='mb-2'>Create a password</Label>
        <Input placeholder='Must be 8 characters' className='p-6' />
      </div>
      <div className='flex flex-col'>
        <Label className='mb-2'>Confirm password</Label>
        <Input placeholder='Must be 8 characters' className='p-6' />
      </div>
      <Button className='mt-4 w-full py-6'> Register</Button>
      <div className='flex w-full items-center justify-center gap-4'>
        <Separator className='w-3/12' />
      </div>
      <div className='flex flex-row justify-center gap-4'>
      <p className='text-center text-xs'>
        Already have an account?
        <Link href='/login'>
          <span className='font-extrabold'> Log in</span>
        </Link>
      </p>
    </div>
  );
}
