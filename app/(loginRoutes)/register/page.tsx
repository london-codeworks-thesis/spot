import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Register () {
  return (
    <div className='flex min-h-screen flex-col justify-center'>
      <h1>Register</h1>
      <div className='flex flex-row'>
        <div className='flex flex-col'>
          <Label>First Name</Label>
          <Input type='email' placeholder='John' />
        </div>
        <div className='flex flex-col'>
          <Label>First Name</Label>
          <Input type='email' placeholder='John' />
        </div>
      </div>
    </div>
  );
}
