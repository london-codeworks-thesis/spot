import { User } from './user';

export interface Review {
  user: User;
  created_at: string;
  rating_atmosphere: number;
  rating_value: number;
  rating_food: number;
}
