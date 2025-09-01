import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    coverage: {
      exclude: ['src/tracing/**', 'src/index.ts'],
    },
  },
});
