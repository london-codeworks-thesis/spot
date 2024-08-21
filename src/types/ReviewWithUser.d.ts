import type { Restaurant, Review } from '@prisma/client';

interface ReviewWithUser extends Review {
  user: { id: string; image: string | null };
  restaurant: Restaurant;
}
