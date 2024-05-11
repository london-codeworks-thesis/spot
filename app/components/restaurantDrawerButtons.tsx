import React from 'react';
import { Button } from './ui/button';

type RestaurantDrawerButtonProps = {
  Icon: React.ElementType;
  Title: string;
  handleClick: () => void;
};
export default function RestaurantDrawerButton ({
  Icon,
  Title,
  handleClick,
}: RestaurantDrawerButtonProps) {
  return (
    <Button
      variant='outline'
      className='flex items-center rounded-xl text-xs'
      onClick={handleClick}
    >
      <Icon size={15} />
      &nbsp;
      {' '}
      {Title}
    </Button>
  );
}
