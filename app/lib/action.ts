'use server';

import { z } from 'zod';

const LoginSchema = z.object({
  email: z.string().email().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z.string().min(8),
});
