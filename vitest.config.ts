/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['/app/__tests__/setup.ts'],
    coverage: {
      include: ['app/**'],
      exclude: [
        '**/ui/*',
        '**/__tests__/*',
        '**/setup.ts',
        '**/types/*',
        '!**/ui/authButton.tsx',
        '!**/ui/separatorText.tsx',
        '!**/ui/parallax-scroll.tsx',
      ],
    },
  },
  resolve: {
    alias: {
      '@/auth': path.resolve(__dirname, 'auth/'),
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
