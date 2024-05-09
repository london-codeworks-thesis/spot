import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET () {
  const result = await prisma.user.findMany();
  return NextResponse.json(result);
}

export async function POST () {
  const result = 'user post';
  return NextResponse.json(result);
}
