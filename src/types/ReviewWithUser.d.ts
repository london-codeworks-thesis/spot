import type { Review, Restaurant } from '@prisma/client';

interface ReviewWithUser extends Review {
  user: { id: string; image: string | null };
  restaurant: Restaurant;
}
