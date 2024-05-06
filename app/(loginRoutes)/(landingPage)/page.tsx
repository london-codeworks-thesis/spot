import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className='flex min-h-screen flex-col items-center p-24 '>
      <div className="bg-black">
      <h1>Landing page</h1>
      </div>
      <div className='flex'>
        <Link href='/login'>
          <button>login</button>
        </Link>
        <div className='p-8'></div>
        <Link href='/register'>
          <button>Register</button>
        </Link>
      </div>
    </main>
  );
}
