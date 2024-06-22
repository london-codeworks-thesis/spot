// 'use client';

import React, { MouseEventHandler } from 'react';
import Image from 'next/image';
import { Button } from 'src/components/ui/button';
import appleIcon from '~/apple.svg';
import facebookIcon from '~/facebook.svg';
import googleIcon from '~/google.svg';

interface Prop {
  icon: 'google' | 'facebook' | 'apple';
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const iconMap = {
  google: googleIcon,
  facebook: facebookIcon,
  apple: appleIcon,
};

function AuthButton ({ icon, onClick }: Prop) {
  const svg = iconMap[icon];

  return (
    <Button variant='outline' className='flex-1 py-6' onClick={onClick}>
      <Image src={svg} alt={icon} priority />
    </Button>
  );
}

export default AuthButton;
