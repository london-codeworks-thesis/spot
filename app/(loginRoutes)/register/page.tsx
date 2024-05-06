import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Register () {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <h1>Register</h1>
      <Label htmlFor="picture">Picture</Label>
      <Input type="email" placeholder="Email" />
    </div>
  );
}
