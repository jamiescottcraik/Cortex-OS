import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
        test: {
                environment: "node",
                include: ["**/*.test.ts"],
        },
        plugins: [tsconfigPaths({ ignoreConfigErrors: true })],
});
