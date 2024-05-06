import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <h1>Landing page</h1>
      <div className='flex'>
        <Link href='/loginRoutes/login'>
          <button>login</button>
        </Link>
        <div className='p-8'></div>
        <Link href='/loginRoutes/register'>
          <button>Register</button>
        </Link>
      </div>
    </main>
  );
}
