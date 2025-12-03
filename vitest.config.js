import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    exclude: ['template/**', 'node_modules/**'],
  },
});
