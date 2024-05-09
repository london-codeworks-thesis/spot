import React from 'react';
import { Button } from './ui/button';

type RestaurantDrawerButtonProps = {
  Icon: React.ElementType;
  Title: string;
};
export default function RestaurantDrawerButton ({
  Icon,
  Title,
}: RestaurantDrawerButtonProps) {
  return (
    <Button variant='outline' className='flex items-center rounded-xl text-xs'>
      <Icon size={15} />
      &nbsp;
      {' '}
      {Title}
    </Button>
  );
}
