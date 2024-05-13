// TODO: Fix eslint error

'use client';

import React from 'react';
import Link from 'next/link';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
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
    console.log(data);
  }
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
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
                  // eslint-disable-next-line react/jsx-props-no-spreading
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
                  // eslint-disable-next-line react/jsx-props-no-spreading
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
