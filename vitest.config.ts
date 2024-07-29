/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['src/__tests__/setup.ts'],
    coverage: {
      include: ['src/**'],
      exclude: [
        '**/ui/*',
        '**/__tests__/*',
        '**/types/*',
        '!**/ui/authButton.tsx',
        '!**/ui/separatorText.tsx',
        '!**/ui/parallax-scroll.tsx',
      ],
    },
  },
});
