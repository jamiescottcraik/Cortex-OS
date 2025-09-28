import { defineConfig } from 'vitest/config';

export default defineConfig({
        test: {
                environment: 'node',
                globals: true,
                include: ['src/__tests__/**/*.test.ts', 'tests/**/*.test.ts'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json'],
			exclude: ['node_modules/', 'dist/'],
		},
	},
});
