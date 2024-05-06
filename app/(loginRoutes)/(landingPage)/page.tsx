import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Logo from '~/Logo_Dark.svg'
export default function LandingPage() {
  return (
    <main className='flex min-h-screen flex-col items-center'>
      <div className='bg-black w-full h-[60vh] flex justify-center items-center z-10'>
       <Image
        src={Logo}
        width={150}
        alt="Spot logo white"
      />
      </div>
      <div className='absolute bottom-0 h-[50vh] w-full z-20'>
        
      </div>
    </main>
  );
}
