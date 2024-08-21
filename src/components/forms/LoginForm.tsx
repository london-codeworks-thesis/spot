'use client';

import React from 'react';
import Link from 'next/link';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@ui/input';
import { Button } from '@ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ui/form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginSchema = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .min(1, 'Email is required')
    .email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export default function LoginForm () {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const router = useRouter();

  async function onSubmit (data: z.infer<typeof LoginSchema>) {
    const result = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    if (result?.error) {
      form.setError('password', {
        type: 'manual',
        message: 'Incorrect username or password',
      });
      form.setValue('password', ''); // Manually clear the password field
    } else {
      router.push('/dashboard');
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex w-full flex-col justify-center gap-5'
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input
                  className='py-6 pl-4'
                  type='email'
                  placeholder='johndoe@gmail.com'
                  autoComplete='email'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  className='py-6 pl-4'
                  type='password'
                  placeholder='•••••••••••'
                  autoComplete='current-password'
                  {...field}
                />
              </FormControl>
              <FormMessage>
                {form.formState.errors.password?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <div className='flex justify-end'>
          <Link href='/forgottenPassword'>
            <p className='text-xs'>Forgot password?</p>
          </Link>
        </div>
        <Button type='submit' className='mt-4 w-full p-6'>
          Log In
        </Button>
      </form>
    </Form>
  );
}
