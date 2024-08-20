'use client';

import React from 'react';
import Link from 'next/link';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from 'src/components/ui/input';
import { Button } from 'src/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'src/components/ui/form';

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

  function onSubmit (data: z.infer<typeof LoginSchema>) {
    // TODO: Handle login
    console.log(data);
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
              <FormMessage />
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
