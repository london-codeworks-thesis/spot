import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET () {
  const result = await prisma.user.findMany();
  return NextResponse.json(result);
}

export async function POST () {
  const result = await prisma.user.createMany({
    data: [{
      username: 'sunnyanter',
      password: 'sunnylovessam',
      email: 'sunnyn@test.com',
      first_name: 'sunny',
      last_name: 'anter',
      image_url: 'placeholder',
    },
    {
      username: 'sampolge',
      password: 'samlovessunny',
      email: 'sam@test.com',
      first_name: 'sam',
      last_name: 'polge',
      image_url: 'placeholder',
    }],
  });
  return NextResponse.json(result);
}
