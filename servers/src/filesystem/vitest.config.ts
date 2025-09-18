import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		environment: 'node',
		globals: false,
		include: ['__tests__/**/*.test.ts'],
		coverage: {
			provider: 'v8',
		},
	},
});
