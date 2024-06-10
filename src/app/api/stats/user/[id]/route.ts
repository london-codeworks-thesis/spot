import { NextResponse } from 'next/server';
import { getUserById } from 'src/lib/userService';

export async function GET (
  req: Request,
  { params }: { params: { id: string } },
) {
  const userId = params.id;

  if (!userId) {
    return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
  }

  try {
    const user = await getUserById(userId);
    if (!user) throw new Error('User not found');
    return NextResponse.json(user._count);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 },
    );
  }
}
