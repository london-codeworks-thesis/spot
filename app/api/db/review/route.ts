import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const result = await prisma.review.findMany()
  return NextResponse.json(result);
}

export async function POST () {
  const result = 'review post';
  return NextResponse.json(result);
}
