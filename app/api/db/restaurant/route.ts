import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET () {
  const result = await prisma.restaurant.findMany();
  return NextResponse.json(result);
}

export async function POST () {
  const result = 'restaurant post';
  return NextResponse.json(result);
}

