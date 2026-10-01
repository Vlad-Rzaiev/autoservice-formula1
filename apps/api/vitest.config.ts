import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    setupFiles: ['./src/test/setup.ts'],
    hookTimeout: 120_000,
    exclude: ['**/node_modules/**', '**/dist/**'],
  },
});
