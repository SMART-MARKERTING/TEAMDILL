import { defineConfig } from "vitest/config";
import path from "node:path";

// Node-environment vitest config for the Cloudflare Pages Functions test
// suite plus pure client-side libs under src/ (e.g. autoQuote calc). No DOM
// is needed — server helpers, the orchestrator, the retry cron, and the
// quote math are all environment-agnostic. The path alias mirrors
// vite.config.ts so `@/...` keeps resolving in tests.
export default defineConfig({
  test: {
    environment: "node",
    include: [
      "functions/**/*.test.ts",
      "functions/**/*.test.tsx",
      "src/**/*.test.ts",
    ],
    globals: false,
    clearMocks: true,
    restoreMocks: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
