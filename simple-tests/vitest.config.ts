import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		environment: 'node',
		include: ['**/*.test.ts'],
	},
	plugins: [tsconfigPaths({ ignoreConfigErrors: true })],
});
