import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST (req: Request) {
  try {
    console.log('Received request:', req);
    const {
      email, password, firstName, lastName, username,
    } = await req.json();

    // Check if the email or username already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      console.log('User already exists:', existingUser);
      return NextResponse.json(
        { error: 'Email or username already exists' },
        { status: 400 },
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        first_name: firstName,
        last_name: lastName,
      },
    });

    console.log('User created successfully:', user);
    return NextResponse.json(
      { message: 'User created successfully', user },
      { status: 201 },
    );
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'An error occurred while creating the user' },
      { status: 500 },
    );
  }
}
