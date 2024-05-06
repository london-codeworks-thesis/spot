import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';

export default function Login () {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>login page</h1>
      <Link href="/dashboard">
        <Button>login</Button>
      </Link>
    </main>
  );
}
