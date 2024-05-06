import Link from 'next/link';
import React from 'react';

export default function Login () {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>login page</h1>
      <Link href="/dashboard">
        <button>login</button>
      </Link>
    </main>
  );
}
