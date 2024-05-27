/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    coverage: {
      include: ['app/**'],
    },
  },
  resolve: {
    alias: {
      '@/components': path.resolve(__dirname, 'components/'),
      '@/hooks': path.resolve(__dirname, 'hooks/'),
      '@/lib': path.resolve(__dirname, 'lib/'),
      '@/prisma': path.resolve(__dirname, 'prisma/'),
      '@/store': path.resolve(__dirname, 'store/'),
      '@/tests': path.resolve(__dirname, '__tests__/'),
      '@/ui': path.resolve(__dirname, 'components/ui/'),
      '@': path.resolve(__dirname, 'app/'),
      types: path.resolve(__dirname, 'types/'),
      '~': path.resolve(__dirname, 'public/'),
    },
  },
});
