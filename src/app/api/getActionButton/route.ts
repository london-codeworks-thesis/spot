import { NextRequest, NextResponse } from 'next/server';
import { getActionButtonForTarget } from 'src/lib/userService';

export async function POST (req: NextRequest) {
  try {
    const data = await req.json(); // Parse the JSON body
    const { currentUserId, profileUserId } = data;

    if (!currentUserId || !profileUserId) {
      return NextResponse.json({ error: 'Missing user IDs' }, { status: 400 });
    }

    const actionButtonText = await getActionButtonForTarget(
      currentUserId,
      profileUserId,
    );
    console.log('actionButtonText:', actionButtonText);
    return NextResponse.json({ actionButtonText });
  } catch (error) {
    console.error('Error getting action button text:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
