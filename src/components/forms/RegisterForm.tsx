'use client';

import { Input } from '@ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import React from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ui/form';
import { Button } from '@components/ui/button';
import { signIn } from 'next-auth/react';

const RegisterSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords don\'t match',
    path: ['confirmPassword'],
  })
  .superRefine(({ password }, ctx) => {
    const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
    const containsLowercase = (ch: string) => /[a-z]/.test(ch);
    // eslint-disable-next-line no-useless-escape
    const containsSpecialChar = (ch: string) => /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);
    let countOfUpperCase = 0;
    let countOfLowerCase = 0;
    let countOfNumbers = 0;
    let countOfSpecialChar = 0;
    for (let i = 0; i < password.length; i++) {
      const ch = password.charAt(i);
      if (!Number.isNaN(+ch)) countOfNumbers++;
      else if (containsUppercase(ch)) countOfUpperCase++;
      else if (containsLowercase(ch)) countOfLowerCase++;
      else if (containsSpecialChar(ch)) countOfSpecialChar++;
    }
    if (
      countOfLowerCase < 1
      || countOfUpperCase < 1
      || countOfSpecialChar < 1
      || countOfNumbers < 1
    ) {
      ctx.addIssue({
        code: 'custom',
        message: 'Password does not meet complexity requirements',
        path: ['password'],
      });
    }
  });

export default function RegisterForm () {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit (data: z.infer<typeof RegisterSchema>) {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const signInResponse = await signIn('credentials', {
          redirect: false,
          email: data.email,
          password: data.password,
        });

        if (signInResponse && signInResponse.error) {
          console.error('Sign in error:', signInResponse.error);
        } else {
          console.log('Sign in successful:', signInResponse);
        }
      } else {
        const { error } = await response.json();
        console.error('Failed to register: ', error);
      }
    } catch (error) {
      console.error('An error occurred during registration:', error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex w-full flex-col justify-center gap-5'
      >
        <div className='flex flex-row gap-2'>
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input className='py-6 pl-4' placeholder='John' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='lastName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input className='py-6 pl-4' placeholder='Doe' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  className='py-6 pl-4'
                  placeholder='example@gmail.com'
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
                  type='password'
                  className='py-6 pl-4'
                  placeholder='Must be at least 8 characters'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  className='py-6 pl-4'
                  placeholder='Must match password'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='mt-4 w-full p-6'>
          Register
        </Button>
      </form>
    </Form>
  );
}
