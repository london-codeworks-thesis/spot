import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// get all users excl. current user
export async function GET (req: NextRequest, { params }: { params: { id: string } }) {
  const userId = params.id;
  const result = await prisma.user.findMany({
    where: {
      id: { not: userId },
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      image_url: true,
    },
  });
  return NextResponse.json(result);
}

export async function POST () {
  return NextResponse.json('post');
}

