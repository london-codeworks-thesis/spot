'use client';

import React, { MouseEventHandler } from 'react';
import { FaApple, FaFacebook, FaGoogle } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

interface Prop {
  icon: 'google' | 'facebook' | 'apple';
  onClick: MouseEventHandler<HTMLButtonElement>;
}

function AuthButton ({ icon, onClick }: Prop) {
  return (
    <Button variant='outline' className='flex-1 py-6' onClick={onClick}>
      {icon === 'google' && <FaGoogle />}
      {icon === 'facebook' && <FaFacebook />}
      {icon === 'apple' && <FaApple />}
    </Button>
  );
}

export default AuthButton;
