import { Button } from '@/components/ui/button';
import {
  User, Search, Home, MapPinned, Plus,
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function NavBar () {
  return (
    <div className='flex w-full justify-evenly'>
      <Link href='/dashboard/home'>
        <Button>
          <Home />
        </Button>
      </Link>
      <Link href='/dashboard/search'>
        <Button>
          <Search />
        </Button>
      </Link>
      <Link href='/dashboard/add'>
        <Button>
          <Plus />
        </Button>
      </Link>
      <Link href='/dashboard'>
        <Button>
          <MapPinned />
        </Button>
      </Link>
      <Link href='/dashboard/user'>
        <Button>
          <User />
        </Button>
      </Link>
    </div>
  );
}
