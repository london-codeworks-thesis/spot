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
      '@components': path.resolve(__dirname, 'app/components/'),
      '@ui': path.resolve(__dirname, 'app/components/ui/'),
      '@api': path.resolve(__dirname, 'app/api/'),
      '@lib': path.resolve(__dirname, 'app/lib/'),
      '@types': path.resolve(__dirname, 'app/types/'),
      '@tests': path.resolve(__dirname, 'app/__tests__/'),
      '@': path.resolve(__dirname, 'app/'),
      '~': path.resolve(__dirname, 'public/'),
    },
  },
});
