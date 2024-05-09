import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET () {
  const result = await prisma.follow.findMany({
    select: {
      follower_user: true,
      following_user: true,
    },
  });
  return NextResponse.json(result);
}

export async function POST () {
  const follower_user_id = '79e6bfeb-843c-4e7e-a2e1-cbdac1e5ae14';
  const following_user_id = '7d8ad67c-351e-4302-91d5-a087e6d5e68c';

  const result = await prisma.follow.create({
    data: {
      follower_user_id,
      following_user_id,
      is_accepted: true,
      created_at: new Date(Date.now()),
      updated_at: new Date(Date.now()),
    },
  });
  return NextResponse.json(result);
}
