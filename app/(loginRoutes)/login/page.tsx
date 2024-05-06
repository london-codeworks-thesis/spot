import Link from 'next/link';

export default function Login() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1>login page</h1>
      <Link href='/dashboard/map'>
        <button>login</button>
      </Link>
    </main>
  );
}
