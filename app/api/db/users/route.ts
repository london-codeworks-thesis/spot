import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// get all users excl. current user
export async function GET () {
  const account = await prisma.account.findFirst();
  const result = await prisma.user.findMany({
    where: {
      id: { not: account?.userId! },
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      image: true,
    },
  });
  return NextResponse.json(result);
}

// export default GET;
export async function POST () {
  console.log('post');
}
