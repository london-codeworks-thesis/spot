import React from 'react';
import Link from 'next/link';
import { Button } from '@/ui/button';

type NavBarButtonProps = {
  Icon: React.ElementType;
  Route: string;
};
export default function NavBarButton ({ Icon, Route }: NavBarButtonProps) {
  return (
    <Link href={`/dashboard/${Route}`}>
      <Button variant='ghost'>
        <Icon />
      </Button>
    </Link>
  );
}
