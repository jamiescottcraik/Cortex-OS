import { defineConfig } from 'vitest/config';

// Local Vitest config to keep test discovery within this package
export default defineConfig({
	test: {
		environment: 'node',
		include: ['src/**/*.test.ts', 'src/**/*.spec.ts', 'tests/**/*.test.ts', 'tests/**/*.spec.ts'],
		exclude: ['**/node_modules/**', '**/dist/**', '**/build/**'],
		passWithNoTests: false,
	},
});
